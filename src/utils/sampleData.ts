import { supabase } from '../lib/supabase';

export const createSampleData = async () => {
  try {
    // Sample schools
    const schools = [
      {
        name: 'Westminster Academy',
        address: '123 Education Street',
        city: 'London',
        postcode: 'SW1A 1AA',
        phone: '020 7946 0958',
        email: 'admin@westminster-academy.co.uk',
        website: 'https://westminster-academy.co.uk',
        contact_person: 'Sarah Johnson',
        notes: 'Very active in educational tours, prefer cultural experiences'
      },
      {
        name: 'Oakwood High School',
        address: '456 School Lane',
        city: 'Manchester',
        postcode: 'M1 1AA',
        phone: '0161 123 4567',
        email: 'info@oakwood-high.co.uk',
        contact_person: 'David Smith',
        notes: 'Budget conscious, interested in STEM-focused trips'
      },
      {
        name: 'Riverside College',
        address: '789 River Road',
        city: 'Cambridge',
        postcode: 'CB1 1AA',
        phone: '01223 123456',
        email: 'trips@riverside-college.ac.uk',
        contact_person: 'Emma Wilson',
        notes: 'Premium school, interested in exclusive experiences'
      }
    ];

    const { data: schoolData } = await supabase
      .from('schools')
      .insert(schools)
      .select();

    // Sample trips
    const trips = [
      {
        title: 'Historical Paris Discovery',
        destination: 'Paris, France',
        description: 'Explore the rich history of Paris with visits to major landmarks and museums',
        duration_days: 4,
        base_price: 450,
        max_participants: 40,
        departure_date: '2025-04-15',
        return_date: '2025-04-18',
        itinerary: 'Day 1: Arrival and Eiffel Tower\nDay 2: Louvre Museum and Notre-Dame\nDay 3: Versailles Palace\nDay 4: Departure'
      },
      {
        title: 'Science & Innovation Berlin',
        destination: 'Berlin, Germany',
        description: 'STEM-focused educational tour exploring science and technology',
        duration_days: 5,
        base_price: 520,
        max_participants: 35,
        departure_date: '2025-05-20',
        return_date: '2025-05-24',
        itinerary: 'Day 1: Arrival and city orientation\nDay 2: Science Museum and Planetarium\nDay 3: Technology centers\nDay 4: Historical sites\nDay 5: Departure'
      },
      {
        title: 'Roman Heritage Rome',
        destination: 'Rome, Italy',
        description: 'Ancient history comes alive in the Eternal City',
        duration_days: 6,
        base_price: 680,
        max_participants: 30,
        departure_date: '2025-06-10',
        return_date: '2025-06-15',
        itinerary: 'Day 1: Arrival\nDay 2: Colosseum and Roman Forum\nDay 3: Vatican City\nDay 4: Pompeii day trip\nDay 5: Local culture\nDay 6: Departure'
      }
    ];

    const { data: tripData } = await supabase
      .from('trips')
      .insert(trips)
      .select();

    // Sample bookings
    if (schoolData && tripData) {
      const bookings = [
        {
          school_id: schoolData[0].id,
          trip_id: tripData[0].id,
          status: 'confirmed' as const,
          participant_count: 25,
          total_price: 11250,
          special_requirements: 'Two vegetarian meals required',
          contact_email: 'sarah.johnson@westminster-academy.co.uk',
          contact_phone: '020 7946 0958',
          notes: 'Group leader very experienced with international travel'
        },
        {
          school_id: schoolData[1].id,
          trip_id: tripData[1].id,
          status: 'quoted' as const,
          participant_count: 20,
          total_price: 10400,
          special_requirements: 'One wheelchair accessible room needed',
          contact_email: 'david.smith@oakwood-high.co.uk',
          contact_phone: '0161 123 4567',
          notes: 'Waiting for final approval from school board'
        },
        {
          school_id: schoolData[2].id,
          trip_id: tripData[2].id,
          status: 'enquiry' as const,
          participant_count: 15,
          total_price: 10200,
          special_requirements: '',
          contact_email: 'emma.wilson@riverside-college.ac.uk',
          contact_phone: '01223 123456',
          notes: 'Initial enquiry, very interested in premium options'
        }
      ];

      await supabase.from('bookings').insert(bookings);
    }

    console.log('Sample data created successfully!');
  } catch (error) {
    console.error('Error creating sample data:', error);
  }
};