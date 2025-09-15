import { supabase } from '../lib/supabase';

export const createSupplierData = async () => {
  try {
    // Check if suppliers already exist to avoid duplicates
    const { data: existingSuppliers, error: checkError } = await supabase
      .from('suppliers')
      .select('id')
      .limit(1);
    
    if (checkError) {
      console.error('Error checking existing suppliers:', checkError);
      throw checkError;
    }
    
    if (existingSuppliers && existingSuppliers.length > 0) {
      console.log('Suppliers already exist, skipping creation');
      return;
    }

    // Amsterdam suppliers
    const amsterdamSuppliers = [
      {
        name: 'Rijksmuseum',
        category: 'Attractions',
        focus: 'Art and History',
        city: 'Amsterdam',
        address: 'Museumstraat 1, 1071 XX Amsterdam',
        phone: '+31 20 674 7000',
        email: 'info@rijksmuseum.nl',
        website: 'riksmuseum.nl',
        approx_price: 'Free for under 18s',
        notes_for_groups: 'Iconic Dutch art and history; offers guided tours for school groups; interactive workshops and educational programs available.'
      },
      {
        name: 'Anne Frank House',
        category: 'Attractions',
        focus: 'Historical Museum',
        city: 'Amsterdam',
        address: 'Westerkerk 20, 1016 GV Amsterdam',
        phone: '+31 20 556 7100',
        email: 'info@annefrank.org',
        website: 'annefrank.org',
        approx_price: '€7 per student',
        notes_for_groups: 'Focuses on Anne Frank\'s life and the Holocaust; online reservations required; suitable for history lessons about WWII and tolerance.'
      },
      {
        name: 'NEMO Science Museum',
        category: 'Attractions',
        focus: 'Science and Technology',
        address: 'Oosterdok 2, 1011 VX Amsterdam',
        city: 'Amsterdam',
        phone: '+31 20 531 3233',
        email: 'info@nemosciencemuseum.nl',
        website: 'nemosciencemuseum.nl',
        approx_price: 'Free for school groups',
        notes_for_groups: 'Hands-on science exhibits; workshops and group tours available; designed to engage children in STEM subjects.'
      },
      {
        name: 'Van Gogh Museum',
        category: 'Attractions',
        focus: 'Art and Culture',
        address: 'Museumplein 6, 1071 DJ Amsterdam',
        city: 'Amsterdam',
        phone: '+31 20 570 5200',
        email: 'info@vangoghmuseum.nl',
        website: 'vangoghmuseum.nl',
        approx_price: 'Free for under 18s',
        notes_for_groups: 'Dedicated to the works of Vincent van Gogh; offers group discounts and educational materials for art students.'
      },
      {
        name: 'Stayokay Amsterdam Oost',
        category: 'Accommodation',
        focus: 'Hostel, budget-friendly',
        address: 'Timorplein 21, 1094 CC Amsterdam',
        city: 'Amsterdam',
        phone: '+31 20 551 3190',
        email: 'amsterdam@stayokay.com',
        website: 'stayokay.com',
        approx_price: '€25–€40 per person/night',
        notes_for_groups: 'Large rooms suitable for groups; offers breakfast and lunch options; close to public transport; activities like bike rentals available.'
      },
      {
        name: 'Pannenkoekenhuis Candela',
        category: 'Restaurants',
        focus: 'Dutch pancakes',
        address: 'Bilderdijkstraat 61, 1053 KL Amsterdam',
        city: 'Amsterdam',
        phone: '+31 20 618 9090',
        email: 'info@candela.nl',
        website: 'candela.nl',
        approx_price: '€8–€12',
        notes_for_groups: 'Offers a variety of sweet and savory pancakes; casual setting; suitable for children; group-friendly atmosphere.'
      }
    ];

    // Barcelona suppliers
    const barcelonaSuppliers = [
      {
        name: 'Sagrada Família',
        category: 'Attractions',
        focus: 'Iconic basilica designed by Antoni Gaudí; focus on architecture and art',
        address: 'Carrer de Mallorca, 401, 08013 Barcelona',
        city: 'Barcelona',
        phone: '+34 932 08 04 14',
        email: 'info@sagradafamilia.org',
        website: 'www.sagradafamilia.org',
        approx_price: '€17–€20 per student',
        notes_for_groups: 'Offers educational tours for groups; tickets must be booked in advance for school visits.'
      },
      {
        name: 'Park Güell',
        category: 'Attractions',
        focus: 'Public park featuring Gaudí\'s colorful mosaics and unique architecture',
        address: 'Carrer d\'Olot, s/n, 08024 Barcelona',
        city: 'Barcelona',
        phone: '+34 934 09 18 31',
        email: 'info@parkguell.barcelona',
        website: 'www.parkguell.barcelona',
        approx_price: '€7 per student',
        notes_for_groups: 'Group tours available with interactive learning about art and nature; pre-booking required.'
      },
      {
        name: 'Generator Barcelona',
        category: 'Accommodation',
        focus: 'Trendy, budget-friendly hostel with group rooms',
        address: 'Carrer de Còrsega, 373-377, 08037 Barcelona',
        city: 'Barcelona',
        phone: '+34 932 20 37 37',
        email: 'barcelona@generatorhostels.com',
        website: 'www.generatorhostels.com',
        approx_price: '€20–€40 per person/night',
        notes_for_groups: 'Offers group discounts, centrally located near Sagrada Família and Passeig de Gràcia.'
      },
      {
        name: 'Tapa Tapa',
        category: 'Restaurants',
        focus: 'Casual dining offering a variety of traditional Spanish tapas',
        address: 'Passeig de Gràcia, 44, 08007 Barcelona',
        city: 'Barcelona',
        phone: '+34 933 18 96 21',
        email: 'info@tapatapa.com',
        website: 'www.tapatapa.com',
        approx_price: '€15–€20',
        notes_for_groups: 'Large dining area, perfect for introducing students to Spanish cuisine.'
      }
    ];

    // Berlin suppliers
    const berlinSuppliers = [
      {
        name: 'DDR Museum',
        category: 'Attractions',
        focus: 'Interactive exploration of life in East Germany',
        address: 'Karl-Liebknecht-Str. 1, 10178 Berlin',
        city: 'Berlin',
        phone: '+49 30 847 123 7-32',
        email: 'info@ddr-museum.de',
        website: 'www.ddr-museum.de/en/visit/school-classes-and-groups/group-booking',
        approx_price: '€5 per student',
        notes_for_groups: 'Offers guided tours and workshops; school group rate is €5 per student (minimum 10 students).'
      },
      {
        name: 'MEININGER Hotel Berlin Tiergarten',
        category: 'Accommodation',
        focus: 'Ideal for groups with multi-bed rooms, game zones, and packed lunch options',
        address: 'Turmstr. 25 (Stromstr.), 10559 Berlin',
        city: 'Berlin',
        phone: '+49 30 666363510',
        email: 'berlin@meininger-hotels.com',
        website: 'www.meininger-hotels.com',
        approx_price: '€24–€48 per person/night',
        notes_for_groups: 'Centrally located, near Bellevue Palace and Government District.'
      },
      {
        name: 'Café am Neuen See',
        category: 'Restaurants',
        focus: 'Located in Tiergarten, offers a great atmosphere and large outdoor seating area',
        address: 'Lichtensteinallee 2, 10787 Berlin',
        city: 'Berlin',
        phone: '+49 30 30110090',
        email: 'info@cafeamneuensee.de',
        website: 'www.cafeamneuensee.de',
        approx_price: '€10–€20',
        notes_for_groups: 'Perfect for groups, with a large outdoor area by the lake, ideal for school outings.'
      }
    ];

    // Bremen suppliers
    const bremenSuppliers = [
      {
        name: 'Universum Bremen',
        category: 'Attractions',
        focus: 'Science Museum & Interactive Exhibits',
        address: 'Wiener Str. 1a, 28359 Bremen',
        city: 'Bremen',
        phone: '+49 421 220 70 00',
        email: 'info@universum-bremen.de',
        website: 'www.universum-bremen.de',
        approx_price: '€12 per student',
        notes_for_groups: 'Hands-on science exhibits, ideal for children; educational workshops available.'
      },
      {
        name: 'DJH Jugendherberge Bremen',
        category: 'Accommodation',
        focus: 'Youth hostel, eco-certified',
        address: 'Kalkstraße 6, 28195 Bremen',
        city: 'Bremen',
        phone: '+49 421 3301 290',
        email: 'bremen@jugendherberge.de',
        website: 'bremen.jugendherberge.de',
        approx_price: '€20–€30 per person/night',
        notes_for_groups: '254 beds, group discounts, wheelchair accessible, family-friendly, catering options available'
      }
    ];

    // Bruges suppliers
    const brugesSuppliers = [
      {
        name: 'Belfry of Bruges (Belfort)',
        category: 'Attractions',
        focus: 'History, architecture, and views',
        address: 'Markt 7, 8000 Bruges',
        city: 'Bruges',
        phone: '+32 50 446 111',
        email: 'info@visitbruges.be',
        website: 'www.visitbruges.be/en/belfry',
        approx_price: '€17 per child',
        notes_for_groups: 'Iconic tower offering panoramic views; school groups can learn about medieval architecture.'
      },
      {
        name: 'St. Christopher\'s Inn',
        category: 'Accommodation',
        focus: 'Budget-friendly hostel',
        address: 'Canal 5, Bruges 8000',
        city: 'Bruges',
        phone: '+32 50 700 400',
        email: 'bruges@st-christophers.co.uk',
        website: 'www.st-christophers.co.uk',
        approx_price: '€20–€35 per person/night',
        notes_for_groups: 'Offers dormitory-style rooms; group discounts; close to historical sites and canals.'
      }
    ];

    // Combine all suppliers
    const allSuppliers = [
      ...amsterdamSuppliers,
      ...barcelonaSuppliers,
      ...berlinSuppliers,
      ...bremenSuppliers,
      ...brugesSuppliers
    ];

    // Insert suppliers in batches to avoid overwhelming the database
    const batchSize = 10;
    for (let i = 0; i < allSuppliers.length; i += batchSize) {
      const batch = allSuppliers.slice(i, i + batchSize);
      const { error } = await supabase
        .from('suppliers')
        .insert(batch);
      
      if (error) {
        console.error(`Error inserting supplier batch ${i / batchSize + 1}:`, error);
        throw error;
      }
    }

    console.log(`Successfully added ${allSuppliers.length} suppliers to the database!`);
  } catch (error) {
    console.error('Error creating supplier data:', error);
    throw error;
  }
};