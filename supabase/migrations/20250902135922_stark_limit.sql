/*
  # Add quote_follow_up to booking_status enum

  1. Changes
    - Add 'quote_follow_up' value to the existing booking_status enum type
    - This allows the database to accept the new status value

  2. Security
    - No changes to RLS policies needed
*/

ALTER TYPE booking_status ADD VALUE 'quote_follow_up';