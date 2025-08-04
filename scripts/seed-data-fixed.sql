-- Insert sample users first
INSERT INTO users (id, email, name, role, profile_image, bio, phone) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'admin@rentoura.com', 'Admin User', 'admin', '/placeholder.svg?height=100&width=100', 'Platform administrator', '+1234567890'),
('550e8400-e29b-41d4-a716-446655440002', 'john.host@example.com', 'John Smith', 'host', '/placeholder.svg?height=100&width=100', 'Luxury car enthusiast and host with over 5 years of experience in the premium car rental industry.', '+1234567891'),
('550e8400-e29b-41d4-a716-446655440003', 'jane.renter@example.com', 'Jane Doe', 'renter', '/placeholder.svg?height=100&width=100', 'Travel lover and luxury car enthusiast', '+1234567892'),
('550e8400-e29b-41d4-a716-446655440004', 'mike.host@example.com', 'Mike Johnson', 'host', '/placeholder.svg?height=100&width=100', 'Car collector and professional host specializing in exotic and luxury vehicles.', '+1234567893'),
('550e8400-e29b-41d4-a716-446655440005', 'sarah.renter@example.com', 'Sarah Wilson', 'renter', '/placeholder.svg?height=100&width=100', 'Business executive who loves luxury travel', '+1234567894');

-- Insert sample cars
INSERT INTO cars (id, user_id, title, description, price_per_day, images, location, latitude, longitude, type, transmission, fuel, seats, year, make, model, instant_book) VALUES
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', '2023 Tesla Model S Plaid', 'Experience the future of driving with this stunning Tesla Model S Plaid. Zero emissions, incredible acceleration (0-60 in 1.99s), and luxury comfort. Features autopilot, premium interior, and a 400+ mile range. Perfect for eco-conscious luxury travel.', 299.99, ARRAY['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600'], 'Los Angeles, CA', 34.0522, -118.2437, 'luxury', 'automatic', 'electric', 5, 2023, 'Tesla', 'Model S Plaid', true),

('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', '2022 Porsche 911 Turbo S', 'Pure driving excitement in this iconic Porsche 911 Turbo S. Twin-turbo flat-six engine producing 640hp. Perfect for weekend getaways and special occasions. Features sport chrono package, ceramic brakes, and premium leather interior.', 499.99, ARRAY['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600'], 'Miami, FL', 25.7617, -80.1918, 'sports', 'automatic', 'gasoline', 4, 2022, 'Porsche', '911 Turbo S', false),

('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440004', '2023 BMW X7 M50i', 'Luxury SUV perfect for family trips or business travel. Spacious 7-seater with premium materials, advanced technology, and powerful twin-turbo V8 engine. Features panoramic sunroof, massage seats, and premium sound system.', 199.99, ARRAY['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600'], 'New York, NY', 40.7128, -74.0060, 'suv', 'automatic', 'gasoline', 7, 2023, 'BMW', 'X7 M50i', true),

('660e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440004', '2022 Mercedes-AMG GT 63 S', 'High-performance luxury coupe that combines comfort with track-ready performance. 4.0L twin-turbo V8 producing 630hp. Features AMG performance seats, carbon fiber trim, and advanced driver assistance systems.', 399.99, ARRAY['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600'], 'San Francisco, CA', 37.7749, -122.4194, 'luxury', 'automatic', 'gasoline', 4, 2022, 'Mercedes-AMG', 'GT 63 S', true),

('660e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440002', '2023 Audi RS e-tron GT', 'Electric performance meets Audi luxury. Sustainable driving without compromising on style or performance. 590hp electric powertrain with quattro all-wheel drive. Features premium interior, advanced infotainment, and rapid charging capability.', 349.99, ARRAY['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600'], 'Chicago, IL', 41.8781, -87.6298, 'luxury', 'automatic', 'electric', 4, 2023, 'Audi', 'RS e-tron GT', false),

('660e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440004', '2023 Lamborghini Huracán EVO', 'Exotic supercar experience with the Lamborghini Huracán EVO. 5.2L V10 engine producing 640hp. Features advanced aerodynamics, all-wheel drive, and stunning Italian design. Perfect for special occasions and unforgettable experiences.', 899.99, ARRAY['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600'], 'Las Vegas, NV', 36.1699, -115.1398, 'sports', 'automatic', 'gasoline', 2, 2023, 'Lamborghini', 'Huracán EVO', false),

('660e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440002', '2023 Range Rover Sport HSE', 'Luxury SUV combining off-road capability with on-road refinement. Features air suspension, premium leather interior, panoramic roof, and advanced terrain response system. Perfect for both city driving and outdoor adventures.', 249.99, ARRAY['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600'], 'Denver, CO', 39.7392, -104.9903, 'suv', 'automatic', 'gasoline', 5, 2023, 'Land Rover', 'Range Rover Sport', true),

('660e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440004', '2022 Ferrari F8 Tributo', 'Pure Italian excellence in the Ferrari F8 Tributo. 3.9L twin-turbo V8 producing 710hp. Features advanced aerodynamics, carbon fiber construction, and race-inspired technology. An unforgettable driving experience for special occasions.', 1299.99, ARRAY['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600'], 'Miami, FL', 25.7617, -80.1918, 'sports', 'automatic', 'gasoline', 2, 2022, 'Ferrari', 'F8 Tributo', false);

-- Insert sample bookings
INSERT INTO bookings (id, car_id, renter_id, start_date, end_date, total_price, status, insurance_tier) VALUES
('770e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', '2024-01-15', '2024-01-18', 899.97, 'completed', 'premium'),
('770e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', '2024-02-20', '2024-02-25', 999.95, 'approved', 'standard'),
('770e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440005', '2024-03-10', '2024-03-12', 999.98, 'pending', 'premium');

-- Insert sample reviews
INSERT INTO reviews (car_id, reviewer_id, reviewee_id, booking_id, rating, comment, role) VALUES
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440001', 5, 'Amazing car! The Tesla was in perfect condition and John was a great host. The acceleration is incredible and the autopilot feature made the drive so relaxing. Highly recommended!', 'renter'),
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440001', 5, 'Jane was a responsible renter. Returned the car in excellent condition and was very communicative throughout the rental period. Would rent to her again!', 'host'),
('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440004', '770e8400-e29b-41d4-a716-446655440002', 5, 'Perfect family car for our NYC trip. Mike was very helpful and the BMW was spotless. The kids loved the entertainment system and we appreciated the safety features.', 'renter'),
('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440005', NULL, 4, 'Great sports car experience! The Porsche handled beautifully on the coastal roads. Only minor issue was pickup timing, but overall fantastic.', 'host');

-- Insert sample messages
INSERT INTO messages (sender_id, receiver_id, content, is_read) VALUES
('550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440002', 'Hi John, I''m interested in renting your Tesla for the weekend. Is it available?', true),
('550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003', 'Hi Jane! Yes, the Tesla is available. I''ll send you the details shortly.', true),
('550e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440004', 'Hello Mike, can you tell me more about the BMW X7? Planning a family trip.', false);

-- Insert sample favorites
INSERT INTO favorites (user_id, car_id) VALUES
('550e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440004'),
('550e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440002'),
('550e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440006');

-- Insert sample promo codes
INSERT INTO promo_codes (code, discount_percentage, max_uses, expires_at) VALUES
('WELCOME20', 20.00, 100, '2024-12-31 23:59:59'),
('LUXURY15', 15.00, 50, '2024-06-30 23:59:59'),
('NEWUSER25', 25.00, 200, '2024-08-31 23:59:59');
