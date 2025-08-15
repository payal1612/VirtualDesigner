/*
  # Fix profiles table INSERT policy

  1. Security Policy Update
    - Drop the existing INSERT policy that uses incorrect `uid()` function
    - Create new INSERT policy using correct `auth.uid()` function
    - This allows authenticated users to insert their own profile during signup

  2. Changes
    - Replace `uid()` with `auth.uid()` in the INSERT policy
    - Ensure users can only insert profiles with their own user ID
*/

-- Drop the existing INSERT policy
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

-- Create the corrected INSERT policy
CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);