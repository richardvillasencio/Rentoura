-- Clean up any duplicate or problematic user data

-- First, let's see what we have
SELECT 'Current users:' as info;
SELECT id, email, name, role FROM users ORDER BY created_at;

-- Remove any users that might be causing conflicts (be careful with this!)
-- Only run this if you're sure you want to clean up test data

-- DELETE FROM users WHERE email IN ('test@example.com', 'demo@example.com');

-- If you want to start fresh with user data (CAUTION: This will delete all users!)
-- TRUNCATE TABLE users CASCADE;

-- Re-insert sample data if needed
-- (The sample data from the init script will be re-inserted)

SELECT 'Cleanup completed. You can now try signing up again.' as result;
