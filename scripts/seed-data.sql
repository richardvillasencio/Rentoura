-- Insert sample users
INSERT INTO users (id, email, name, role, profile_image, bio, phone) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'admin@rentoura.com', 'Admin User', 'admin', '/placeholder.svg?height=100&width=100', 'Platform administrator', '+1234567890'),
('550e8400-e29b-41d4-a716-446655440002', 'john.host@example.com', 'John Smith', 'host', '/placeholder.svg?height=100&width=100', 'Luxury car enthusiast and host', '+1234567891'),
('550e8400-e29b-41d4-a716-446655440003', 'jane.renter@example.com', 'Jane Doe', 'renter', '/placeholder.svg?height=100&width=100', 'Travel lover', '+1234567892'),
('550e8400-e29b-41d4-a716-446655440004', 'mike.host@example.com', 'Mike Johnson', 'host', '/placeholder.svg?height=100&width=100', 'Car collector and host', '+1234567893');

-- Insert sample cars
INSERT INTO cars (id, user_id, title, description, price_per_day, images, location, latitude, longitude, type, transmission, fuel, seats, year, make, model, instant_book) VALUES
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', '2023 Tesla Model S Plaid', 'Experience the future of driving with this stunning Tesla Model S Plaid. Zero emissions, incredible acceleration, and luxury comfort.', 299.99, ARRAY['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600'], 'Los Angeles, CA', 34.0522, -118.2437, 'luxury', 'automatic', 'electric', 5, 2023, 'Tesla', 'Model S Plaid', true),
('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', '2022 Porsche 911 Turbo S', 'Pure driving excitement in this iconic Porsche 911 Turbo S. Perfect for weekend getaways and special occasions.', 499.99, ARRAY['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600'], 'Miami, FL', 25.7617, -80.1918, 'sports', 'automatic', 'gasoline', 4, 2022, 'Porsche', '911 Turbo S', false),
('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440004', '2023 BMW X7 M50i', 'Luxury SUV perfect for family trips or business travel. Spacious, comfortable, and powerful.', 199.99, ARRAY['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600'], 'New York, NY', 40.7128, -74.0060, 'suv', 'automatic', 'gasoline', 7, 2023, 'BMW', 'X7 M50i', true),
('660e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440004', '2022 Mercedes-AMG GT 63 S', 'High-performance luxury coupe that combines comfort with track-ready performance.', 399.99, ARRAY['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600'], 'San Francisco, CA', 37.7749, -122.4194, 'luxury', 'automatic', 'gasoline', 4, 2022, 'Mercedes-AMG', 'GT 63 S', true),
('660e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440002', '2023 Audi RS e-tron GT', 'Electric performance meets Audi luxury. Sustainable driving without compromising on style or performance.', 349.99, ARRAY['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600'], 'Chicago, IL', 41.8781, -87.6298, 'luxury', 'automatic', 'electric', 4, 2023, 'Audi', 'RS e-tron GT', false);

-- Insert sample bookings
INSERT INTO bookings (id, car_id, renter_id, start_date, end_date, total_price, status, insurance_tier) VALUES
('770e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', '2024-02-15', '2024-02-18', 899.97, 'completed', 'premium'),
('770e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', '2024-02-20', '2024-02-25', 999.95, 'approved', 'standard');

-- Insert sample reviews
INSERT INTO reviews (car_id, reviewer_id, reviewee_id, booking_id, rating, comment, role) VALUES
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440001', 5, 'Amazing car! The Tesla was in perfect condition and John was a great host. Highly recommended!', 'renter'),
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440001', 5, 'Jane was a responsible renter. Returned the car in excellent condition. Would rent to her again!', 'host');

-- Insert sample promo codes
INSERT INTO promo_codes (code, discount_percentage, max_uses, expires_at) VALUES
('WELCOME20', 20.00, 100, '2024-12-31 23:59:59'),
('LUXURY15', 15.00, 50, '2024-06-30 23:59:59');
