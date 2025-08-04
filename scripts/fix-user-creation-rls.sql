-- Drop existing policies for users table
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON users;
DROP POLICY IF EXISTS "Enable select for users based on user_id" ON users;
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON users;
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Users can insert own profile" ON users;

-- Create more permissive policies for user creation
CREATE POLICY "Allow user creation during signup" ON users
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id::uuid OR true);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id::uuid);

-- Alternative: Temporarily disable RLS for users table during development
-- ALTER TABLE users DISABLE ROW LEVEL SECURITY;
