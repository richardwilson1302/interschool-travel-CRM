/*
  # Interschool Travel CRM Database Schema

  1. New Tables
    - `schools` - Store school information and contacts
      - `id` (uuid, primary key)
      - `name` (text, school name)
      - `address` (text, school address)
      - `city` (text, city)
      - `postcode` (text, postal code)
      - `phone` (text, contact phone)
      - `email` (text, contact email)
      - `website` (text, optional website)
      - `contact_person` (text, optional main contact)
      - `notes` (text, optional notes)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `trips` - Store available educational trips
      - `id` (uuid, primary key)
      - `title` (text, trip title)
      - `destination` (text, destination location)
      - `description` (text, optional description)
      - `duration_days` (integer, trip length)
      - `base_price` (numeric, price per person)
      - `max_participants` (integer, maximum group size)
      - `departure_date` (date, departure date)
      - `return_date` (date, return date)
      - `itinerary` (text, optional detailed itinerary)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `bookings` - Store booking requests and their status
      - `id` (uuid, primary key)
      - `school_id` (uuid, foreign key to schools)
      - `trip_id` (uuid, foreign key to trips)
      - `status` (enum: enquiry, quoted, confirmed, paid, completed, cancelled)
      - `participant_count` (integer, number of participants)
      - `total_price` (numeric, total booking value)
      - `special_requirements` (text, optional special needs)
      - `contact_email` (text, booking contact email)
      - `contact_phone` (text, booking contact phone)
      - `notes` (text, optional booking notes)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `excursions` - Store optional activities for trips
      - `id` (uuid, primary key)
      - `trip_id` (uuid, foreign key to trips)
      - `name` (text, excursion name)
      - `description` (text, optional description)
      - `price` (numeric, price per person)
      - `duration_hours` (integer, optional duration)
      - `max_participants` (integer, optional max group size)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `booking_excursions` - Junction table for booked excursions
      - `id` (uuid, primary key)
      - `booking_id` (uuid, foreign key to bookings)
      - `excursion_id` (uuid, foreign key to excursions)
      - `participant_count` (integer, participants for this excursion)
      - `total_price` (numeric, total excursion cost)
      - `created_at` (timestamptz)

    - `activities` - Store activity log for bookings
      - `id` (uuid, primary key)
      - `booking_id` (uuid, foreign key to bookings)
      - `type` (enum: note, email, call, meeting, quote_sent, payment_received)
      - `description` (text, activity description)
      - `user_id` (uuid, user who performed activity)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their data

  3. Features
    - Automatic timestamps with triggers
    - Proper foreign key constraints
    - Indexes for performance
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE booking_status AS ENUM ('enquiry', 'quoted', 'confirmed', 'paid', 'completed', 'cancelled');
CREATE TYPE activity_type AS ENUM ('note', 'email', 'call', 'meeting', 'quote_sent', 'payment_received');

-- Schools table
CREATE TABLE IF NOT EXISTS schools (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  postcode text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  website text,
  contact_person text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Trips table
CREATE TABLE IF NOT EXISTS trips (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  destination text NOT NULL,
  description text,
  duration_days integer NOT NULL DEFAULT 1,
  base_price numeric(10,2) NOT NULL DEFAULT 0,
  max_participants integer NOT NULL DEFAULT 50,
  departure_date date NOT NULL,
  return_date date NOT NULL,
  itinerary text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id uuid NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  trip_id uuid NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  status booking_status NOT NULL DEFAULT 'enquiry',
  participant_count integer NOT NULL DEFAULT 1,
  total_price numeric(10,2) NOT NULL DEFAULT 0,
  special_requirements text,
  contact_email text NOT NULL,
  contact_phone text NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Excursions table
CREATE TABLE IF NOT EXISTS excursions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id uuid NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  price numeric(10,2) NOT NULL DEFAULT 0,
  duration_hours integer,
  max_participants integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Booking excursions junction table
CREATE TABLE IF NOT EXISTS booking_excursions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  excursion_id uuid NOT NULL REFERENCES excursions(id) ON DELETE CASCADE,
  participant_count integer NOT NULL DEFAULT 1,
  total_price numeric(10,2) NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Activities table
CREATE TABLE IF NOT EXISTS activities (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  type activity_type NOT NULL,
  description text NOT NULL,
  user_id uuid NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_bookings_school_id ON bookings(school_id);
CREATE INDEX IF NOT EXISTS idx_bookings_trip_id ON bookings(trip_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at);
CREATE INDEX IF NOT EXISTS idx_excursions_trip_id ON excursions(trip_id);
CREATE INDEX IF NOT EXISTS idx_booking_excursions_booking_id ON booking_excursions(booking_id);
CREATE INDEX IF NOT EXISTS idx_activities_booking_id ON activities(booking_id);
CREATE INDEX IF NOT EXISTS idx_trips_departure_date ON trips(departure_date);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_schools_updated_at
  BEFORE UPDATE ON schools
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trips_updated_at
  BEFORE UPDATE ON trips
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_excursions_updated_at
  BEFORE UPDATE ON excursions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE excursions ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_excursions ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Users can read all schools"
  ON schools
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert schools"
  ON schools
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update schools"
  ON schools
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Users can read all trips"
  ON trips
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert trips"
  ON trips
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update trips"
  ON trips
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Users can read all bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Users can read all excursions"
  ON excursions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert excursions"
  ON excursions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update excursions"
  ON excursions
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Users can read all booking_excursions"
  ON booking_excursions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert booking_excursions"
  ON booking_excursions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can read all activities"
  ON activities
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert activities"
  ON activities
  FOR INSERT
  TO authenticated
  WITH CHECK (true);