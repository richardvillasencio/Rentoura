-- Disable RLS temporarily to fix policies
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE cars DISABLE ROW LEVEL SECURITY;
ALTER TABLE bookings DISABLE ROW LEVEL SECURITY;
ALTER TABLE reviews DISABLE ROW LEVEL SECURITY;
ALTER TABLE messages DISABLE ROW LEVEL SECURITY;
ALTER TABLE favorites DISABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Users can insert own profile" ON users;
DROP POLICY IF EXISTS "Cars are publicly readable" ON cars;
DROP POLICY IF EXISTS "Users can insert own cars" ON cars;
DROP POLICY IF EXISTS "Users can update own cars" ON cars;
DROP POLICY IF EXISTS "Users can delete own cars" ON cars;

-- Re-enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Create proper RLS policies for users table
CREATE POLICY "Enable insert for authenticated users only" ON users
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable select for users based on user_id" ON users
    FOR SELECT USING (auth.uid() = id OR true); -- Allow public read for basic info

CREATE POLICY "Enable update for users based on user_id" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Create proper RLS policies for cars table
CREATE POLICY "Enable read access for all users" ON cars
    FOR SELECT USING (is_active = true);

CREATE POLICY "Enable insert for authenticated users only" ON cars
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable update for car owners only" ON cars
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Enable delete for car owners only" ON cars
    FOR DELETE USING (auth.uid() = user_id);

-- Create proper RLS policies for bookings table
CREATE POLICY "Enable read for booking participants" ON bookings
    FOR SELECT USING (
        auth.uid() = renter_id OR 
        auth.uid() IN (SELECT user_id FROM cars WHERE id = car_id)
    );

CREATE POLICY "Enable insert for authenticated users" ON bookings
    FOR INSERT WITH CHECK (auth.uid() = renter_id);

CREATE POLICY "Enable update for booking participants" ON bookings
    FOR UPDATE USING (
        auth.uid() = renter_id OR 
        auth.uid() IN (SELECT user_id FROM cars WHERE id = car_id)
    );

-- Create proper RLS policies for reviews table
CREATE POLICY "Enable read access for all users" ON reviews
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON reviews
    FOR INSERT WITH CHECK (auth.uid() = reviewer_id);

-- Create proper RLS policies for messages table
CREATE POLICY "Enable read for message participants" ON messages
    FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Enable insert for authenticated users" ON messages
    FOR INSERT WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Enable update for message recipients" ON messages
    FOR UPDATE USING (auth.uid() = receiver_id);

-- Create proper RLS policies for favorites table
CREATE POLICY "Enable all operations for own favorites" ON favorites
    FOR ALL USING (auth.uid() = user_id);
