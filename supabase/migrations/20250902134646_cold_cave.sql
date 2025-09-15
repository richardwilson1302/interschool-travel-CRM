/*
  # Add Activities/Communication Log System

  1. New Tables
    - `activities` table already exists but needs to be enhanced
    - Add indexes for better performance
    - Ensure proper RLS policies

  2. Security
    - Enable RLS on activities table
    - Add policies for authenticated users to manage activities

  3. Enhancements
    - Add indexes for better query performance
    - Ensure foreign key constraints are proper
*/

-- Add index for better performance on booking_id lookups
CREATE INDEX IF NOT EXISTS idx_activities_booking_id_created_at 
ON public.activities (booking_id, created_at DESC);

-- Add index for activity type filtering
CREATE INDEX IF NOT EXISTS idx_activities_type 
ON public.activities (type);

-- Ensure RLS is enabled (should already be enabled)
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Update policies to ensure they exist and are correct
DROP POLICY IF EXISTS "Users can insert activities" ON activities;
DROP POLICY IF EXISTS "Users can read all activities" ON activities;
DROP POLICY IF EXISTS "Users can update activities" ON activities;

CREATE POLICY "Users can insert activities"
  ON activities
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can read all activities"
  ON activities
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update activities"
  ON activities
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Users can delete activities"
  ON activities
  FOR DELETE
  TO authenticated
  USING (true);