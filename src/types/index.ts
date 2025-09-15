export type School = {
  id: string;
  name: string;
  address: string;
  city: string;
  postcode: string;
  phone: string;
  email: string;
  website?: string;
  contact_person?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
};

export type Trip = {
  id: string;
  title: string;
  destination: string;
  description?: string;
  duration_days: number;
  base_price: number;
  max_participants: number;
  departure_date: string;
  return_date: string;
  itinerary?: string;
  created_at: string;
  updated_at: string;
};

export type BookingStatus = 'enquiry' | 'quoted' | 'quote_follow_up' | 'quote_lost' | 'confirmed' | 'paid' | 'completed' | 'cancelled';

export type Booking = {
  id: string;
  school_id: string;
  trip_id: string;
  status: BookingStatus;
  participant_count: number;
  total_price: number;
  special_requirements?: string;
  contact_email: string;
  contact_phone: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  school?: School;
  trip?: Trip;
  excursions?: BookingExcursion[];
};

export type Excursion = {
  id: string;
  trip_id: string;
  supplier_id?: string;
  name: string;
  description?: string;
  price: number;
  duration_hours?: number;
  max_participants?: number;
  created_at: string;
  updated_at: string;
  supplier?: Supplier;
};

export type BookingExcursion = {
  id: string;
  booking_id: string;
  excursion_id: string;
  participant_count: number;
  total_price: number;
  created_at: string;
  provider_status: 'not_contacted' | 'contacted' | 'booked' | 'paid';
  provider_notes?: string;
  provider_contact_date?: string;
  updated_at: string;
  excursion?: Excursion;
};

export type ActivityType = 'note' | 'email' | 'call' | 'meeting' | 'quote_sent' | 'payment_received';

export type Activity = {
  id: string;
  booking_id: string;
  type: ActivityType;
  description: string;
  user_id: string;
  created_at: string;
};
export type Supplier = {
  id: string;
  name: string;
  contact_person?: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  postcode?: string;
  website?: string;
  specialties?: string;
  notes?: string;
  category?: string;
  focus?: string;
  approx_price?: string;
  notes_for_groups?: string;
  travel_time?: string;
  transport_mode?: string;
  created_at: string;
  updated_at: string;
};