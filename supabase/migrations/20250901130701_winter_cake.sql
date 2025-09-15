/*
  # Add suppliers table for excursion providers

  1. New Tables
    - `suppliers`
      - `id` (uuid, primary key)
      - `name` (text, company name)
      - `contact_person` (text, main contact)
      - `email` (text, contact email)
      - `phone` (text, contact phone)
      - `address` (text, company address)
      - `city` (text)
      - `postcode` (text)
      - `website` (text, optional)
      - `specialties` (text, what they specialize in)
      - `notes` (text, additional notes)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `suppliers` table
    - Add policies for authenticated users to manage suppliers

  3. Updates
    - Add supplier_id foreign key to excursions table
*/

CREATE TABLE IF NOT EXISTS suppliers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  contact_person text,
  email text NOT NULL,
  phone text NOT NULL,
  address text,
  city text,
  postcode text,
  website text,
  specialties text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all suppliers"
  ON suppliers
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert suppliers"
  ON suppliers
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update suppliers"
  ON suppliers
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE TRIGGER update_suppliers_updated_at
  BEFORE UPDATE ON suppliers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add supplier_id to excursions table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'excursions' AND column_name = 'supplier_id'
  ) THEN
    ALTER TABLE excursions ADD COLUMN supplier_id uuid REFERENCES suppliers(id);
  END IF;
END $$;