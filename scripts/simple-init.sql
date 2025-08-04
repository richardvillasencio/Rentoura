-- Create tables without RLS for easier setup
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255),
    role VARCHAR(20) DEFAULT 'renter' CHECK (role IN ('renter', 'host', 'admin')),
    profile_image TEXT,
    bio TEXT,
    phone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cars (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price_per_day DECIMAL(10,2) NOT NULL,
    images TEXT[] DEFAULT '{}',
    location VARCHAR(255) NOT NULL,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    type VARCHAR(50) NOT NULL,
    transmission VARCHAR(20) NOT NULL,
    fuel VARCHAR(20) NOT NULL,
    seats INTEGER NOT NULL,
    year INTEGER,
    make VARCHAR(50),
    model VARCHAR(50),
    availability_calendar JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    instant_book BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    car_id UUID REFERENCES cars(id) ON DELETE CASCADE,
    renter_id UUID REFERENCES users(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'cancelled', 'completed')),
    insurance_tier VARCHAR(20) DEFAULT 'standard' CHECK (insurance_tier IN ('none', 'standard', 'premium')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    car_id UUID REFERENCES cars(id) ON DELETE CASCADE,
    reviewer_id UUID REFERENCES users(id) ON DELETE CASCADE,
    reviewee_id UUID REFERENCES users(id) ON DELETE CASCADE,
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    role VARCHAR(10) NOT NULL CHECK (role IN ('host', 'renter')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
    receiver_id UUID REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    car_id UUID REFERENCES cars(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, car_id)
);

-- Disable RLS for now to make development easier
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE cars DISABLE ROW LEVEL SECURITY;
ALTER TABLE bookings DISABLE ROW LEVEL SECURITY;
ALTER TABLE reviews DISABLE ROW LEVEL SECURITY;
ALTER TABLE messages DISABLE ROW LEVEL SECURITY;
ALTER TABLE favorites DISABLE ROW LEVEL SECURITY;

-- Insert sample data only if tables are empty
DO $$
BEGIN
    -- Insert users if table is empty
    IF NOT EXISTS (SELECT 1 FROM users LIMIT 1) THEN
        INSERT INTO users (id, email, name, role, profile_image, bio, phone) VALUES
        ('550e8400-e29b-41d4-a716-446655440001', 'admin@rentoura.com', 'Admin User', 'admin', '/placeholder.svg?height=100&width=100', 'Platform administrator', '+1234567890'),
        ('550e8400-e29b-41d4-a716-446655440002', 'john.host@example.com', 'John Smith', 'host', '/placeholder.svg?height=100&width=100', 'Luxury car enthusiast and host', '+1234567891'),
        ('550e8400-e29b-41d4-a716-446655440003', 'jane.renter@example.com', 'Jane Doe', 'renter', '/placeholder.svg?height=100&width=100', 'Travel lover', '+1234567892'),
        ('550e8400-e29b-41d4-a716-446655440004', 'mike.host@example.com', 'Mike Johnson', 'host', '/placeholder.svg?height=100&width=100', 'Car collector and host', '+1234567893');
    END IF;

    -- Insert cars if table is empty
    IF NOT EXISTS (SELECT 1 FROM cars LIMIT 1) THEN
        INSERT INTO cars (id, user_id, title, description, price_per_day, images, location, latitude, longitude, type, transmission, fuel, seats, year, make, model, instant_book) VALUES
        ('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', '2023 Tesla Model S Plaid', 'Experience the future of driving with this stunning Tesla Model S Plaid. Zero emissions, incredible acceleration, and luxury comfort.', 299.99, ARRAY['/placeholder.svg?height=400&width=600'], 'Los Angeles, CA', 34.0522, -118.2437, 'luxury', 'automatic', 'electric', 5, 2023, 'Tesla', 'Model S Plaid', true),
        ('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', '2022 Porsche 911 Turbo S', 'Pure driving excitement in this iconic Porsche 911 Turbo S. Perfect for weekend getaways and special occasions.', 499.99, ARRAY['/placeholder.svg?height=400&width=600'], 'Miami, FL', 25.7617, -80.1918, 'sports', 'automatic', 'gasoline', 4, 2022, 'Porsche', '911 Turbo S', false),
        ('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440004', '2023 BMW X7 M50i', 'Luxury SUV perfect for family trips or business travel. Spacious, comfortable, and powerful.', 199.99, ARRAY['/placeholder.svg?height=400&width=600'], 'New York, NY', 40.7128, -74.0060, 'suv', 'automatic', 'gasoline', 7, 2023, 'BMW', 'X7 M50i', true),
        ('660e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440004', '2022 Mercedes-AMG GT 63 S', 'High-performance luxury coupe that combines comfort with track-ready performance.', 399.99, ARRAY['/placeholder.svg?height=400&width=600'], 'San Francisco, CA', 37.7749, -122.4194, 'luxury', 'automatic', 'gasoline', 4, 2022, 'Mercedes-AMG', 'GT 63 S', true),
        ('660e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440002', '2023 Audi RS e-tron GT', 'Electric performance meets Audi luxury. Sustainable driving without compromising on style or performance.', 349.99, ARRAY['/placeholder.svg?height=400&width=600'], 'Chicago, IL', 41.8781, -87.6298, 'luxury', 'automatic', 'electric', 4, 2023, 'Audi', 'RS e-tron GT', false),
        ('660e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440004', '2023 Lamborghini Huracán EVO', 'Exotic supercar experience with incredible performance and stunning design.', 899.99, ARRAY['/placeholder.svg?height=400&width=600'], 'Las Vegas, NV', 36.1699, -115.1398, 'sports', 'automatic', 'gasoline', 2, 2023, 'Lamborghini', 'Huracán EVO', false);
    END IF;

    -- Insert sample reviews if table is empty
    IF NOT EXISTS (SELECT 1 FROM reviews LIMIT 1) THEN
        INSERT INTO reviews (car_id, reviewer_id, reviewee_id, rating, comment, role) VALUES
        ('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440002', 5, 'Amazing car! The Tesla was in perfect condition and John was a great host. Highly recommended!', 'renter'),
        ('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440002', 4, 'Great sports car experience! The Porsche handled beautifully.', 'renter'),
        ('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440004', 5, 'Perfect family car for our trip. Mike was very helpful.', 'renter');
    END IF;
END $$;
