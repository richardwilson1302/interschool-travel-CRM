// Demo data for the CRM application
export const demoSchools = [
  {
    id: '1',
    name: 'Westminster Academy',
    address: '123 Education Street',
    city: 'London',
    postcode: 'SW1A 1AA',
    phone: '020 7946 0958',
    email: 'admin@westminster-academy.co.uk',
    website: 'https://westminster-academy.co.uk',
    contact_person: 'Sarah Johnson',
    notes: 'Very active in educational tours, prefer cultural experiences',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Oakwood High School',
    address: '456 School Lane',
    city: 'Manchester',
    postcode: 'M1 1AA',
    phone: '0161 123 4567',
    email: 'info@oakwood-high.co.uk',
    website: 'https://oakwood-high.co.uk',
    contact_person: 'David Smith',
    notes: 'Budget conscious, interested in STEM-focused trips',
    created_at: '2024-01-16T10:00:00Z',
    updated_at: '2024-01-16T10:00:00Z'
  },
  {
    id: '3',
    name: 'Riverside College',
    address: '789 River Road',
    city: 'Cambridge',
    postcode: 'CB1 1AA',
    phone: '01223 123456',
    email: 'trips@riverside-college.ac.uk',
    website: 'https://riverside-college.ac.uk',
    contact_person: 'Emma Wilson',
    notes: 'Premium school, interested in exclusive experiences',
    created_at: '2024-01-17T10:00:00Z',
    updated_at: '2024-01-17T10:00:00Z'
  }
];

export const demoTrips = [
  {
    id: '1',
    title: 'Historical Paris Discovery',
    destination: 'Paris, France',
    description: 'Explore the rich history of Paris with visits to major landmarks and museums',
    duration_days: 4,
    base_price: 450,
    max_participants: 40,
    departure_date: '2025-04-15',
    return_date: '2025-04-18',
    itinerary: 'Day 1: Arrival and Eiffel Tower\nDay 2: Louvre Museum and Notre-Dame\nDay 3: Versailles Palace\nDay 4: Departure',
    created_at: '2024-01-10T10:00:00Z',
    updated_at: '2024-01-10T10:00:00Z'
  },
  {
    id: '2',
    title: 'Science & Innovation Berlin',
    destination: 'Berlin, Germany',
    description: 'STEM-focused educational tour exploring science and technology',
    duration_days: 5,
    base_price: 520,
    max_participants: 35,
    departure_date: '2025-05-20',
    return_date: '2025-05-24',
    itinerary: 'Day 1: Arrival and city orientation\nDay 2: Science Museum and Planetarium\nDay 3: Technology centers\nDay 4: Historical sites\nDay 5: Departure',
    created_at: '2024-01-11T10:00:00Z',
    updated_at: '2024-01-11T10:00:00Z'
  },
  {
    id: '3',
    title: 'Roman Heritage Rome',
    destination: 'Rome, Italy',
    description: 'Ancient history comes alive in the Eternal City',
    duration_days: 6,
    base_price: 680,
    max_participants: 30,
    departure_date: '2025-06-10',
    return_date: '2025-06-15',
    itinerary: 'Day 1: Arrival\nDay 2: Colosseum and Roman Forum\nDay 3: Vatican City\nDay 4: Pompeii day trip\nDay 5: Local culture\nDay 6: Departure',
    created_at: '2024-01-12T10:00:00Z',
    updated_at: '2024-01-12T10:00:00Z'
  }
];

export const demoBookings = [
  {
    id: '1',
    school_id: '1',
    trip_id: '1',
    status: 'confirmed' as const,
    participant_count: 25,
    total_price: 11250,
    special_requirements: 'Two vegetarian meals required',
    contact_email: 'sarah.johnson@westminster-academy.co.uk',
    contact_phone: '020 7946 0958',
    notes: 'Group leader very experienced with international travel',
    created_at: '2024-02-01T10:00:00Z',
    updated_at: '2024-02-01T10:00:00Z',
    school: demoSchools[0],
    trip: demoTrips[0],
    excursions: []
  },
  {
    id: '2',
    school_id: '2',
    trip_id: '2',
    status: 'quoted' as const,
    participant_count: 20,
    total_price: 10400,
    special_requirements: 'One wheelchair accessible room needed',
    contact_email: 'david.smith@oakwood-high.co.uk',
    contact_phone: '0161 123 4567',
    notes: 'Waiting for final approval from school board',
    created_at: '2024-02-02T10:00:00Z',
    updated_at: '2024-02-02T10:00:00Z',
    school: demoSchools[1],
    trip: demoTrips[1],
    excursions: []
  },
  {
    id: '3',
    school_id: '3',
    trip_id: '3',
    status: 'enquiry' as const,
    participant_count: 15,
    total_price: 10200,
    special_requirements: '',
    contact_email: 'emma.wilson@riverside-college.ac.uk',
    contact_phone: '01223 123456',
    notes: 'Initial enquiry, very interested in premium options',
    created_at: '2024-02-03T10:00:00Z',
    updated_at: '2024-02-03T10:00:00Z',
    school: demoSchools[2],
    trip: demoTrips[2],
    excursions: []
  }
];

export const demoSuppliers = [
  {
    id: '1',
    name: 'Rijksmuseum',
    category: 'Attractions',
    focus: 'Art and History',
    city: 'Amsterdam',
    address: 'Museumstraat 1, 1071 XX Amsterdam',
    phone: '+31 20 674 7000',
    email: 'info@rijksmuseum.nl',
    website: 'riksmuseum.nl',
    approx_price: 'Free for under 18s',
    notes_for_groups: 'Iconic Dutch art and history; offers guided tours for school groups; interactive workshops and educational programs available.',
    created_at: '2024-01-01T10:00:00Z',
    updated_at: '2024-01-01T10:00:00Z'
  },
  {
    id: '2',
    name: 'Sagrada Família',
    category: 'Attractions',
    focus: 'Architecture and Art',
    address: 'Carrer de Mallorca, 401, 08013 Barcelona',
    city: 'Barcelona',
    phone: '+34 932 08 04 14',
    email: 'info@sagradafamilia.org',
    website: 'www.sagradafamilia.org',
    approx_price: '€17–€20 per student',
    notes_for_groups: 'Offers educational tours for groups; tickets must be booked in advance for school visits.',
    created_at: '2024-01-02T10:00:00Z',
    updated_at: '2024-01-02T10:00:00Z'
  }
];

export const demoExcursions = [];
export const demoActivities = [];