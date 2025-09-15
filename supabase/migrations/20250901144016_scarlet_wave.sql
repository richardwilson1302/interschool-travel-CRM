/*
  # Add additional fields to suppliers table

  1. New Fields
    - `city` (text) - City location
    - `category` (text) - Type of supplier (Attractions, Accommodation, etc.)
    - `focus` (text) - Main specialty area
    - `approx_price` (text) - Price range information
    - `notes_for_groups` (text) - Notes specific to school groups
    - `travel_time` (text) - Travel time information
    - `transport_mode` (text) - Method of transport

  2. Updates
    - Add indexes for better search performance
*/

-- Add new columns if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'suppliers' AND column_name = 'city'
  ) THEN
    ALTER TABLE suppliers ADD COLUMN city text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'suppliers' AND column_name = 'category'
  ) THEN
    ALTER TABLE suppliers ADD COLUMN category text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'suppliers' AND column_name = 'focus'
  ) THEN
    ALTER TABLE suppliers ADD COLUMN focus text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'suppliers' AND column_name = 'approx_price'
  ) THEN
    ALTER TABLE suppliers ADD COLUMN approx_price text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'suppliers' AND column_name = 'notes_for_groups'
  ) THEN
    ALTER TABLE suppliers ADD COLUMN notes_for_groups text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'suppliers' AND column_name = 'travel_time'
  ) THEN
    ALTER TABLE suppliers ADD COLUMN travel_time text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'suppliers' AND column_name = 'transport_mode'
  ) THEN
    ALTER TABLE suppliers ADD COLUMN transport_mode text;
  END IF;
END $$;

-- Add indexes for better search performance
CREATE INDEX IF NOT EXISTS idx_suppliers_category ON suppliers(category);
CREATE INDEX IF NOT EXISTS idx_suppliers_focus ON suppliers(focus);