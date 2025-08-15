/*
  # Fix profiles table RLS policy for signup

  1. Security Changes
    - Drop the existing restrictive INSERT policy
    - Create a new INSERT policy that allows authenticated users to create profiles
    - Ensure the policy allows profile creation during signup process
    - Maintain security by ensuring users can only create profiles with their own auth.uid()

  2. Policy Updates
    - Remove "Users can insert own profile" policy
    - Add new "Enable insert for authenticated users during signup" policy
    - Keep existing SELECT and UPDATE policies unchanged
*/

-- Drop the existing restrictive INSERT policy
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

-- Create a new INSERT policy that allows authenticated users to create their profile
-- This policy allows INSERT operations for authenticated users where the id matches auth.uid()
CREATE POLICY "Enable insert for authenticated users during signup"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);