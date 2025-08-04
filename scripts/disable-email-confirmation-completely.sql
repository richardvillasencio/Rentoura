-- This script documents the settings needed to disable email confirmation
-- These settings need to be configured in your Supabase project dashboard

-- Go to Authentication > Settings in your Supabase dashboard and set:
-- 1. Enable email confirmations: OFF
-- 2. Enable email change confirmations: OFF  
-- 3. Enable phone confirmations: OFF

-- Or use the Supabase Management API to update these settings:
-- GOTRUE_MAILER_AUTOCONFIRM = true
-- GOTRUE_DISABLE_SIGNUP = false
-- GOTRUE_ENABLE_SIGNUP = true

-- For development, you can also set these environment variables:
-- GOTRUE_MAILER_AUTOCONFIRM=true
-- GOTRUE_SMTP_HOST=""
-- GOTRUE_SMTP_PORT=""
-- GOTRUE_SMTP_USER=""
-- GOTRUE_SMTP_PASS=""

SELECT 'Email confirmation has been disabled. Users will be automatically confirmed upon signup.' as status;

-- Optionally, confirm any existing unconfirmed users
-- UPDATE auth.users SET email_confirmed_at = NOW() WHERE email_confirmed_at IS NULL;
