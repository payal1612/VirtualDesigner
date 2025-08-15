/*
  # Fix Authentication and Signup Issues

  1. Database Changes
    - Create trigger function to automatically create profiles for new users
    - Update RLS policies to allow profile creation during signup
    - Insert demo user for testing (with duplicate prevention)

  2. Security
    - Maintain RLS policies for data protection
    - Allow service role to create profiles via trigger
    - Enable authenticated users to create their own profiles
*/

-- Create or replace function to handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, created_at, updated_at)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name', NOW(), NOW())
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile when user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Update RLS policies for profiles table
DROP POLICY IF EXISTS "Enable insert for authenticated users during signup" ON profiles;
DROP POLICY IF EXISTS "Enable insert for service role" ON profiles;

-- Allow authenticated users to insert their own profile
CREATE POLICY "Enable insert for authenticated users during signup"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Allow service role to insert profiles (for trigger function)
CREATE POLICY "Enable insert for service role"
  ON profiles
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Insert demo user for testing (with proper duplicate handling)
DO $$
DECLARE
  demo_user_id uuid;
  demo_email text := 'demo@shinespace.com';
BEGIN
  -- Check if demo user already exists in auth.users
  SELECT id INTO demo_user_id
  FROM auth.users
  WHERE email = demo_email;
  
  -- If demo user doesn't exist, create it
  IF demo_user_id IS NULL THEN
    -- Generate a new UUID for the demo user
    demo_user_id := gen_random_uuid();
    
    -- Insert into auth.users
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      recovery_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      demo_user_id,
      'authenticated',
      'authenticated',
      demo_email,
      crypt('demo123', gen_salt('bf')),
      NOW(),
      NOW(),
      NOW(),
      '{"provider": "email", "providers": ["email"]}',
      '{"full_name": "Demo User"}',
      NOW(),
      NOW(),
      '',
      '',
      '',
      ''
    );
  END IF;
  
  -- Insert corresponding profile (with conflict handling)
  INSERT INTO public.profiles (id, email, full_name, created_at, updated_at)
  VALUES (demo_user_id, demo_email, 'Demo User', NOW(), NOW())
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    updated_at = NOW();
    
END $$;