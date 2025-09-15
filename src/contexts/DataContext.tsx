import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { School, Trip, Booking, Excursion, Activity, Supplier, BookingExcursion } from '../types';

interface DataContextType {
  schools: School[];
  trips: Trip[];
  bookings: Booking[];
  excursions: Excursion[];
  activities: Activity[];
  suppliers: Supplier[];
  loading: boolean;
  refreshData: () => Promise<void>;
  addSchool: (school: Omit<School, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  addTrip: (trip: Omit<Trip, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  addBooking: (booking: Omit<Booking, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  addSupplier: (supplier: Omit<Supplier, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  addExcursion: (excursion: Omit<Excursion, 'id' | 'created_at' | 'updated_at'>) => Promise<Excursion>;
  updateBooking: (id: string, updates: Partial<Booking>) => Promise<void>;
  updateBookingExcursion: (id: string, updates: Partial<BookingExcursion>) => Promise<void>;
  updateSchool: (id: string, updates: Partial<School>) => Promise<void>;
  updateTrip: (id: string, updates: Partial<Trip>) => Promise<void>;
  updateSupplier: (id: string, updates: Partial<Supplier>) => Promise<void>;
  addBookingExcursion: (bookingId: string, excursionId: string, participantCount: number, excursionPrice: number) => Promise<void>;
  removeBookingExcursion: (id: string) => Promise<void>;
  deleteTrip: (id: string) => Promise<void>;
  addActivity: (activity: Omit<Activity, 'id' | 'created_at'>) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [schools, setSchools] = useState<School[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [excursions, setExcursions] = useState<Excursion[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      console.log('Starting data fetch...');
      
      // Test basic connection first
      const { data: testData, error: testError } = await supabase
        .from('schools')
        .select('count')
        .limit(1);
        
      if (testError) {
        console.error('Supabase connection test failed:', testError);
        throw new Error(`Database connection failed: ${testError.message}`);
      }
      
      console.log('Supabase connection test successful');

      // Fetch all data in parallel
      const [
        schoolsResponse,
        tripsResponse,
        bookingsResponse,
        excursionsResponse,
        activitiesResponse,
        suppliersResponse,
        bookingExcursionsResponse
      ] = await Promise.all([
        supabase.from('schools').select('*').order('name'),
        supabase.from('trips').select('*').order('departure_date'),
        supabase.from('bookings').select(`
          *,
          school:schools(*),
          trip:trips(*)
        `).order('created_at', { ascending: false }),
        supabase.from('excursions').select(`
          *,
          supplier:suppliers(*)
        `).order('name'),
        supabase.from('activities').select('*').order('created_at', { ascending: false }),
        supabase.from('suppliers').select('*').order('name'),
        supabase.from('booking_excursions').select(`
          *,
          excursion:excursions(
            *,
            supplier:suppliers(*)
          )
        `)
      ]);

      if (schoolsResponse.error) throw schoolsResponse.error;
      if (tripsResponse.error) throw tripsResponse.error;
      if (bookingsResponse.error) throw bookingsResponse.error;
      if (excursionsResponse.error) throw excursionsResponse.error;
      if (activitiesResponse.error) throw activitiesResponse.error;
      if (suppliersResponse.error) throw suppliersResponse.error;
      if (bookingExcursionsResponse.error) throw bookingExcursionsResponse.error;

      console.log('Fetched booking excursions:', bookingExcursionsResponse.data?.length || 0);
      console.log('All booking excursions data:', bookingExcursionsResponse.data);
      
      // Combine bookings with their excursions
      const bookingsWithExcursions = bookingsResponse.data.map(booking => ({
        ...booking,
        excursions: bookingExcursionsResponse.data?.filter(be => be.booking_id === booking.id) || []
      })).sort((a, b) => {
        // Sort by trip departure date, soonest first
        const dateA = a.trip?.departure_date ? new Date(a.trip.departure_date).getTime() : 0;
        const dateB = b.trip?.departure_date ? new Date(b.trip.departure_date).getTime() : 0;
        return dateA - dateB;
      });
      
      console.log('Bookings with excursions after mapping:', bookingsWithExcursions.map(b => ({ 
        id: b.id, 
        school: b.school?.name, 
        excursions: b.excursions?.length || 0,
        excursionIds: b.excursions?.map(e => e.id) || []
      })));

      setSchools(schoolsResponse.data);
      setTrips(tripsResponse.data);
      setBookings(bookingsWithExcursions);
      console.log('State updated with new bookings data - total bookings:', bookingsWithExcursions.length);
      setExcursions(excursionsResponse.data);
      setActivities(activitiesResponse.data);
      setSuppliers(suppliersResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addSchool = async (schoolData: Omit<School, 'id' | 'created_at' | 'updated_at'>) => {
    const { error } = await supabase.from('schools').insert([schoolData]);
    if (error) throw error;
    await refreshData();
  };

  const addTrip = async (tripData: Omit<Trip, 'id' | 'created_at' | 'updated_at'>) => {
    const { error } = await supabase.from('trips').insert([tripData]);
    if (error) throw error;
    await refreshData();
  };

  const addBooking = async (bookingData: Omit<Booking, 'id' | 'created_at' | 'updated_at'>) => {
    const { error } = await supabase.from('bookings').insert([bookingData]);
    if (error) throw error;
    await refreshData();
  };

  const addSupplier = async (supplierData: Omit<Supplier, 'id' | 'created_at' | 'updated_at'>) => {
    const { error } = await supabase.from('suppliers').insert([supplierData]);
    if (error) throw error;
    await refreshData();
  };

  const addExcursion = async (excursionData: Omit<Excursion, 'id' | 'created_at' | 'updated_at'>): Promise<Excursion> => {
    const { data, error } = await supabase.from('excursions').insert([excursionData]).select().single();
    if (error) throw error;
    await refreshData();
    return data;
  };

  const updateBooking = async (id: string, updates: Partial<Booking>) => {
    const { error } = await supabase.from('bookings').update(updates).eq('id', id);
    if (error) throw error;
    await refreshData(); // Keep this to update the main bookings list
  };

  const updateBookingExcursion = async (id: string, updates: Partial<BookingExcursion>) => {
    const { error } = await supabase.from('booking_excursions').update(updates).eq('id', id);
    if (error) throw error;
    await refreshData();
  };

  const updateSchool = async (id: string, updates: Partial<School>) => {
    const { error } = await supabase.from('schools').update(updates).eq('id', id);
    if (error) throw error;
    await refreshData();
  };

  const updateTrip = async (id: string, updates: Partial<Trip>) => {
    const { error } = await supabase.from('trips').update(updates).eq('id', id);
    if (error) throw error;
    await refreshData();
  };

  const updateSupplier = async (id: string, updates: Partial<Supplier>) => {
    const { error } = await supabase.from('suppliers').update(updates).eq('id', id);
    if (error) throw error;
    await refreshData();
  };

  const addBookingExcursion = async (bookingId: string, excursionId: string, participantCount: number, excursionPrice: number) => {
    const totalPrice = excursionPrice * participantCount;

    const { error } = await supabase.from('booking_excursions').insert([{
      booking_id: bookingId,
      excursion_id: excursionId,
      participant_count: participantCount,
      total_price: totalPrice,
      provider_status: 'not_contacted'
    }]);

    if (error) throw error;
    await refreshData();
  };

  const removeBookingExcursion = async (id: string) => {
    const { error } = await supabase
      .from('booking_excursions')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Delete error:', error);
      throw error;
    }

    await refreshData();
  };

  const deleteTrip = async (id: string) => {
    const { error } = await supabase.from('trips').delete().eq('id', id);
    await refreshData();
  }

  const addActivity = async (activityData: Omit<Activity, 'id' | 'created_at'>) => {
    const { data, error } = await supabase.from('activities').insert([activityData]).select().single();
    if (error) throw error;
    
    // Add the new activity to the local state immediately
    if (data) {
      setActivities(prev => [data, ...prev]);
    }
  };

  return (
    <DataContext.Provider value={{
      schools,
      trips,
      bookings,
      excursions,
      activities,
      suppliers,
      loading,
      refreshData,
      addSchool,
      addTrip,
      addBooking,
      addSupplier,
      addExcursion,
      updateBooking,
      updateBookingExcursion,
      updateSchool,
      updateTrip,
      updateSupplier,
      addBookingExcursion,
      removeBookingExcursion,
      deleteTrip,
      addActivity
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}