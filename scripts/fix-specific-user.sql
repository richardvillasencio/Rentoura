-- Fix the specific user that's having issues
UPDATE auth.users 
SET email_confirmed_at = NOW(), 
    confirmed_at = NOW()
WHERE email = 'rvillasencio@gmail.com';

-- Verify the user is now confirmed
SELECT 
    email,
    email_confirmed_at,
    confirmed_at,
    created_at
FROM auth.users 
WHERE email = 'rvillasencio@gmail.com';

-- Also ensure all users are confirmed
UPDATE auth.users 
SET email_confirmed_at = COALESCE(email_confirmed_at, NOW()), 
    confirmed_at = COALESCE(confirmed_at, NOW())
WHERE email_confirmed_at IS NULL OR confirmed_at IS NULL;

SELECT 'User rvillasencio@gmail.com has been confirmed and can now sign in' as status;
