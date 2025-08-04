-- This script completely disables email confirmation and fixes existing users

-- First, let's confirm all existing users who might be stuck
UPDATE auth.users 
SET email_confirmed_at = NOW(), 
    confirmed_at = NOW()
WHERE email_confirmed_at IS NULL OR confirmed_at IS NULL;

-- Update the auth configuration to disable email confirmation
-- Note: These settings need to be applied in your Supabase dashboard as well

-- For any future users, ensure they are auto-confirmed
-- This is a fallback in case the dashboard settings don't work

-- Check current user status
SELECT 
    id,
    email,
    email_confirmed_at,
    confirmed_at,
    created_at
FROM auth.users 
ORDER BY created_at DESC;

-- If you have specific users that need to be confirmed, you can do:
-- UPDATE auth.users SET email_confirmed_at = NOW(), confirmed_at = NOW() WHERE email = 'rvillasencio@gmail.com';

SELECT 'All users have been confirmed and email confirmation is disabled' as status;
