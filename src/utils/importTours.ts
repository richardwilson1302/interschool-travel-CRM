import { supabase } from '../lib/supabase';

export const importEducationalTours = async () => {
  const tours = [
    {
      title: 'Amsterdam: Art & History Tour',
      destination: 'Amsterdam, Netherlands',
      description: 'Explore Amsterdam\'s rich artistic heritage and historical significance through world-class museums and cultural sites.',
      duration_days: 3,
      base_price: 385,
      max_participants: 40,
      departure_date: '2025-04-15',
      return_date: '2025-04-17',
      itinerary: 'Day 1: Arrive, transfer, and visit the Anne Frank House.\nDay 2: Visit the Rijksmuseum and the NEMO Science Museum. End the day with a Canal Cruise.\nDay 3: Visit the Van Gogh Museum and enjoy free time before the airport transfer.'
    },
    {
      title: 'Barcelona: Culture & Sport Tour',
      destination: 'Barcelona, Spain',
      description: 'Experience Barcelona\'s unique culture, stunning architecture, and sporting heritage.',
      duration_days: 3,
      base_price: 420,
      max_participants: 35,
      departure_date: '2025-05-10',
      return_date: '2025-05-12',
      itinerary: 'Day 1: Arrive, transfer, and explore Park Güell.\nDay 2: Tour the Sagrada Família, experience the Camp Nou, and have a group dinner.\nDay 3: Discover hands-on science at the CosmoCaixa Science Museum and enjoy free time before the airport transfer.'
    },
    {
      title: 'Berlin: History & Political Studies Tour',
      destination: 'Berlin, Germany',
      description: 'Delve into Berlin\'s complex history and modern political landscape through key historical sites.',
      duration_days: 3,
      base_price: 395,
      max_participants: 40,
      departure_date: '2025-06-05',
      return_date: '2025-06-07',
      itinerary: 'Day 1: Arrive, transfer, and visit the Berlin Wall Memorial and the East Side Gallery.\nDay 2: Tour the Reichstag Building and visit the Jewish Museum Berlin.\nDay 3: Explore the DDR Museum and visit the Memorial & Museum Sachsenhausen before the airport transfer.'
    },
    {
      title: 'Rome: Classics & History Tour',
      destination: 'Rome, Italy',
      description: 'Journey through ancient Rome and Vatican City to explore classical history and art.',
      duration_days: 3,
      base_price: 450,
      max_participants: 35,
      departure_date: '2025-04-20',
      return_date: '2025-04-22',
      itinerary: 'Day 1: Arrive, transfer, and start with a guided tour of Ancient Rome, visiting the Colosseum, Roman Forum, and Palatine Hill.\nDay 2: Explore Vatican City, including St. Peter\'s Basilica, the Vatican Museums, and the Sistine Chapel.\nDay 3: Take a trip to Ostia Antica, an ancient seaport, to see well-preserved ruins and houses.'
    },
    {
      title: 'Venice: Art & Culture Tour',
      destination: 'Venice, Italy',
      description: 'Discover Venice\'s artistic treasures and traditional crafts through museums and island workshops.',
      duration_days: 3,
      base_price: 465,
      max_participants: 30,
      departure_date: '2025-05-15',
      return_date: '2025-05-17',
      itinerary: 'Day 1: Arrive, transfer, and explore the Grand Canal, including the Rialto Bridge and St. Mark\'s Square.\nDay 2: Visit a traditional Mask Workshop and the Peggy Guggenheim Collection, a modern art museum.\nDay 3: Take a boat tour to the islands of Murano (known for glass blowing) and Burano (known for lace making and colorful houses).'
    },
    {
      title: 'London: History & Theatre Tour',
      destination: 'London, England',
      description: 'Experience London\'s rich history and world-famous theatre scene through iconic landmarks and West End shows.',
      duration_days: 3,
      base_price: 380,
      max_participants: 45,
      departure_date: '2025-03-25',
      return_date: '2025-03-27',
      itinerary: 'Day 1: Arrive, transfer, and take a guided tour to see major sights like the London Eye, Big Ben, and Westminster Abbey.\nDay 2: Visit the Natural History Museum and the Imperial War Museum.\nDay 3: Explore the Tower of London and end the day with a West End theatre show.'
    },
    {
      title: 'Bremen: Science Tour',
      destination: 'Bremen, Germany',
      description: 'Explore science and natural history through interactive exhibits and cultural discoveries.',
      duration_days: 3,
      base_price: 350,
      max_participants: 40,
      departure_date: '2025-06-12',
      return_date: '2025-06-14',
      itinerary: 'Day 1: Arrive, transfer, and explore the historic city centre, including the Bremen Town Musicians Statue.\nDay 2: Spend the day at Universum Bremen Science Centre with its interactive exhibits.\nDay 3: Visit the Übersee-Museum to learn about natural history and world cultures before departing.'
    },
    {
      title: 'Paris: French Language & Culture Tour',
      destination: 'Paris, France',
      description: 'Immerse yourself in French language and culture through iconic Parisian landmarks and experiences.',
      duration_days: 3,
      base_price: 425,
      max_participants: 35,
      departure_date: '2025-04-08',
      return_date: '2025-04-10',
      itinerary: 'Day 1: Arrive, transfer, and take a local language-focused walk through a Parisian market.\nDay 2: Visit the Eiffel Tower and the Louvre Museum, with opportunities to practice French.\nDay 3: Explore the Palace of Versailles and then take a Seine River cruise with French commentary.'
    },
    {
      title: 'Krakow: Holocaust & Jewish History Tour',
      destination: 'Krakow, Poland',
      description: 'A profound educational journey exploring Jewish history and Holocaust remembrance.',
      duration_days: 3,
      base_price: 375,
      max_participants: 35,
      departure_date: '2025-05-20',
      return_date: '2025-05-22',
      itinerary: 'Day 1: Arrive, transfer, and take a guided walking tour of the Old Town and Main Market Square.\nDay 2: Take a day trip to visit the Auschwitz-Birkenau Memorial and Museum.\nDay 3: Visit the Oskar Schindler\'s Factory Museum and take a guided tour of the historic Jewish Quarter (Kazimierz).'
    },
    {
      title: 'Florence: Renaissance Art & History Tour',
      destination: 'Florence, Italy',
      description: 'Discover the birthplace of the Renaissance through world-renowned art galleries and historic palaces.',
      duration_days: 3,
      base_price: 440,
      max_participants: 30,
      departure_date: '2025-04-25',
      return_date: '2025-04-27',
      itinerary: 'Day 1: Arrive, transfer, and take a guided tour of the city to see sights like the Florence Duomo and Piazzale Michelangelo.\nDay 2: Take a guided tour of the Uffizi Gallery and the Galleria dell\'Accademia to see Michelangelo\'s David.\nDay 3: Explore the Pitti Palace and Boboli Gardens before an afternoon transfer and departure.'
    },
    {
      title: 'Brussels: Politics & European Studies Tour',
      destination: 'Brussels, Belgium',
      description: 'Explore European politics and governance through visits to EU institutions and cultural experiences.',
      duration_days: 3,
      base_price: 390,
      max_participants: 40,
      departure_date: '2025-06-18',
      return_date: '2025-06-20',
      itinerary: 'Day 1: Arrive, transfer, and visit the Atomium.\nDay 2: Tour the European Parliament and participate in the interactive Parlamentarium to learn about EU governance.\nDay 3: Visit the European Commission and take part in a chocolate workshop before your transfer and departure.'
    },
    {
      title: 'London: Business Studies Tour',
      destination: 'London, England',
      description: 'Gain insights into business operations through tours of London\'s financial district and major venues.',
      duration_days: 3,
      base_price: 395,
      max_participants: 40,
      departure_date: '2025-03-18',
      return_date: '2025-03-20',
      itinerary: 'Day 1: Arrive, transfer, and take an Insider London tour of the Financial District.\nDay 2: Take a West End Retail Design Tour, then a guided visit to St Paul\'s Cathedral to learn about its business operations.\nDay 3: Take a tour of The O2 and learn about its business operations before the airport transfer.'
    },
    {
      title: 'Normandy: WWI & WWII History Tour',
      destination: 'Normandy, France',
      description: 'Explore pivotal moments in world history through D-Day landing sites and historic monuments.',
      duration_days: 3,
      base_price: 410,
      max_participants: 35,
      departure_date: '2025-05-08',
      return_date: '2025-05-10',
      itinerary: 'Day 1: Arrive, transfer to Normandy, and visit the Bayeux Tapestry for a look into early history.\nDay 2: Take a day trip to the Arromanches D-Day Landing Site and visit a British Military Cemetery.\nDay 3: Explore Mont Saint-Michel, a historic abbey and island, before the return journey.'
    },
    {
      title: 'Iceland: Geography & Science Tour',
      destination: 'Reykjavik, Iceland',
      description: 'Discover Iceland\'s unique geography and sustainable energy solutions through natural wonders and modern facilities.',
      duration_days: 3,
      base_price: 520,
      max_participants: 25,
      departure_date: '2025-07-15',
      return_date: '2025-07-17',
      itinerary: 'Day 1: Arrive, transfer, and tour the Golden Circle, seeing Geysir and Gullfoss waterfall.\nDay 2: Take a guided tour of a geothermal power plant and learn about sustainable energy.\nDay 3: Visit the Blue Lagoon for a hands-on learning experience about geothermal heat before the airport transfer.'
    },
    {
      title: 'Madrid: Spanish Language & Culture Tour',
      destination: 'Madrid, Spain',
      description: 'Immerse yourself in Spanish language and culture through museums, palaces, and culinary experiences.',
      duration_days: 3,
      base_price: 405,
      max_participants: 35,
      departure_date: '2025-04-30',
      return_date: '2025-05-02',
      itinerary: 'Day 1: Arrive, transfer, and take a language-focused walking tour of the city center, with a visit to a local market.\nDay 2: Take a guided tour of the Prado Museum and the Royal Palace of Madrid.\nDay 3: Participate in a Spanish cooking class, followed by a farewell dinner.'
    },
    {
      title: 'Edinburgh: History & Culture Tour',
      destination: 'Edinburgh, Scotland',
      description: 'Explore Scotland\'s capital through its historic castle, museums, and underground mysteries.',
      duration_days: 3,
      base_price: 385,
      max_participants: 40,
      departure_date: '2025-06-25',
      return_date: '2025-06-27',
      itinerary: 'Day 1: Arrive, transfer, and take a walking tour of the Royal Mile.\nDay 2: Visit Edinburgh Castle and the National Museum of Scotland.\nDay 3: Take an underground tour of The Real Mary King\'s Close before the airport transfer.'
    },
    {
      title: 'Ypres & Somme: WWI Battlefields Tour',
      destination: 'Ypres, Belgium & Somme, France',
      description: 'A moving journey through WWI battlefields and memorials to understand the Great War\'s impact.',
      duration_days: 3,
      base_price: 395,
      max_participants: 35,
      departure_date: '2025-05-25',
      return_date: '2025-05-27',
      itinerary: 'Day 1: Arrive, transfer to Ypres, and visit the In Flanders Fields Museum.\nDay 2: Tour Tyne Cot Cemetery and the German trench system at Bayernwald. End the day with the Last Post Ceremony at the Menin Gate.\nDay 3: Travel to the Somme region to see the Thiepval Memorial and Lochnagar Crater before the return journey.'
    },
    {
      title: 'Barcelona: Science Tour',
      destination: 'Barcelona, Spain',
      description: 'Explore science through interactive museums, marine life, and entertaining educational experiences.',
      duration_days: 3,
      base_price: 415,
      max_participants: 35,
      departure_date: '2025-06-08',
      return_date: '2025-06-10',
      itinerary: 'Day 1: Arrive, transfer, and spend the afternoon at the CosmoCaixa Science Museum.\nDay 2: Explore the Barcelona Aquarium and take a Las Golondrinas Boat Trip to learn about the port.\nDay 3: Visit the Tibidabo Amusement Park which offers great views and a fun mix of science and entertainment before the airport transfer.'
    },
    {
      title: 'London: Drama & Performing Arts Tour',
      destination: 'London, England',
      description: 'Immerse yourself in London\'s theatrical world through backstage tours, workshops, and performances.',
      duration_days: 3,
      base_price: 400,
      max_participants: 35,
      departure_date: '2025-03-12',
      return_date: '2025-03-14',
      itinerary: 'Day 1: Arrive in London, take a Backstage Tour of the National Theatre.\nDay 2: Participate in a West End theatre workshop, followed by an evening show.\nDay 3: Tour Shakespeare\'s Globe and the accompanying exhibition before departing.'
    },
    {
      title: 'Berlin: German Language Tour',
      destination: 'Berlin, Germany',
      description: 'Practice German language skills while exploring Berlin\'s landmarks and cultural sites.',
      duration_days: 3,
      base_price: 380,
      max_participants: 40,
      departure_date: '2025-06-15',
      return_date: '2025-06-17',
      itinerary: 'Day 1: Arrive, transfer, and take a walking tour of the Brandenburg Gate and Potsdamer Platz while practicing basic German.\nDay 2: Take a themed German language trail around Alexanderplatz to practice speaking with locals and visiting the DDR Museum.\nDay 3: Participate in an immersive German language workshop, followed by a visit to the Olympic Stadium before the airport transfer.'
    },
    {
      title: 'Bay of Naples: Geography Tour',
      destination: 'Naples, Italy',
      description: 'Study geography and geology through volcanic landscapes and ancient archaeological sites.',
      duration_days: 3,
      base_price: 435,
      max_participants: 30,
      departure_date: '2025-05-05',
      return_date: '2025-05-07',
      itinerary: 'Day 1: Arrive in Naples, transfer to accommodation, and have a local orientation.\nDay 2: Take a guided excursion to the Phlegraean Fields to learn about tectonic activity.\nDay 3: Take a full-day guided excursion to Mount Vesuvius and the ancient city of Pompeii.'
    },
    {
      title: 'Krakow: Science Tour',
      destination: 'Krakow, Poland',
      description: 'Explore science through historical perspectives, including geology and the intersection of science and history.',
      duration_days: 3,
      base_price: 365,
      max_participants: 35,
      departure_date: '2025-05-28',
      return_date: '2025-05-30',
      itinerary: 'Day 1: Arrive, transfer, and take a walking tour of the Old Town.\nDay 2: Visit the Auschwitz-Birkenau Memorial for a historical look at the use of science in warfare.\nDay 3: Explore the Wieliczka Salt Mine to learn about geology and mining history before departing.'
    }
  ];

  try {
    console.log('Starting import of educational tours...');
    
    for (const tour of tours) {
      const { error } = await supabase
        .from('trips')
        .insert([tour]);
      
      if (error) {
        console.error(`Error importing tour "${tour.title}":`, error);
      } else {
        console.log(`Successfully imported: ${tour.title}`);
      }
    }
    
    console.log('Tour import completed!');
    return { success: true, count: tours.length };
  } catch (error) {
    console.error('Error during tour import:', error);
    return { success: false, error };
  }
};