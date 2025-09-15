/*
  # Add quote_lost status to booking_status enum

  1. Changes
    - Add 'quote_lost' as a valid value to the booking_status enum type
    - This resolves the database error when trying to set bookings to 'quote_lost' status

  2. Security
    - No changes to RLS policies needed
    - Existing policies will work with the new enum value
*/

ALTER TYPE public.booking_status ADD VALUE 'quote_lost';