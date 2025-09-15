/*
  # Add excursion provider status tracking

  1. New Tables
    - Update `booking_excursions` table to include provider status
  
  2. Changes
    - Add `provider_status` column to track excursion provider communication
    - Add `provider_notes` for additional details about provider interactions
    - Add `provider_contact_date` to track when provider was last contacted
  
  3. Security
    - Update RLS policies for the modified table
*/

-- Add provider status tracking to booking_excursions
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'booking_excursions' AND column_name = 'provider_status'
  ) THEN
    ALTER TABLE booking_excursions ADD COLUMN provider_status text DEFAULT 'not_contacted' CHECK (provider_status IN ('not_contacted', 'contacted', 'booked', 'paid'));
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'booking_excursions' AND column_name = 'provider_notes'
  ) THEN
    ALTER TABLE booking_excursions ADD COLUMN provider_notes text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'booking_excursions' AND column_name = 'provider_contact_date'
  ) THEN
    ALTER TABLE booking_excursions ADD COLUMN provider_contact_date timestamptz;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'booking_excursions' AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE booking_excursions ADD COLUMN updated_at timestamptz DEFAULT now();
  END IF;
END $$;

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.triggers
    WHERE trigger_name = 'update_booking_excursions_updated_at'
  ) THEN
    CREATE TRIGGER update_booking_excursions_updated_at
      BEFORE UPDATE ON booking_excursions
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

-- Update RLS policies
CREATE POLICY "Users can update booking_excursions"
  ON booking_excursions
  FOR UPDATE
  TO authenticated
  USING (true);