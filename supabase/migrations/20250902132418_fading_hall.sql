/*
  # Add DELETE policy for booking_excursions table

  1. Security
    - Add policy to allow authenticated users to delete booking_excursions
    - This enables the removal of excursions from bookings in the UI

  2. Changes
    - Add DELETE policy for booking_excursions table
*/

-- Add DELETE policy for booking_excursions table
CREATE POLICY "Users can delete booking_excursions"
  ON booking_excursions
  FOR DELETE
  TO authenticated
  USING (true);