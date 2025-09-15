import React, { createContext, useContext, useState } from 'react';
import { demoSchools, demoTrips, demoBookings, demoSuppliers, demoExcursions, demoActivities } from '../lib/demoData';
import type { School, Trip, Booking, Excursion, Activity, Supplier, BookingExcursion } from '../types';

interface DemoDataContextType {
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

const DemoDataContext = createContext<DemoDataContextType | undefined>(undefined);

export function DemoDataProvider({ children }: { children: React.ReactNode }) {
  const [schools, setSchools] = useState<School[]>(demoSchools);
  const [trips, setTrips] = useState<Trip[]>(demoTrips);
  const [bookings, setBookings] = useState<Booking[]>(demoBookings);
  const [excursions, setExcursions] = useState<Excursion[]>(demoExcursions);
  const [activities, setActivities] = useState<Activity[]>(demoActivities);
  const [suppliers, setSuppliers] = useState<Supplier[]>(demoSuppliers);
  const [loading] = useState(false);

  const refreshData = async () => {
    // In demo mode, data is already in state
    return Promise.resolve();
  };

  const generateId = () => Math.random().toString(36).substr(2, 9);
  const getCurrentTimestamp = () => new Date().toISOString();

  const addSchool = async (schoolData: Omit<School, 'id' | 'created_at' | 'updated_at'>) => {
    const newSchool: School = {
      ...schoolData,
      id: generateId(),
      created_at: getCurrentTimestamp(),
      updated_at: getCurrentTimestamp()
    };
    setSchools(prev => [...prev, newSchool]);
  };

  const addTrip = async (tripData: Omit<Trip, 'id' | 'created_at' | 'updated_at'>) => {
    const newTrip: Trip = {
      ...tripData,
      id: generateId(),
      created_at: getCurrentTimestamp(),
      updated_at: getCurrentTimestamp()
    };
    setTrips(prev => [...prev, newTrip]);
  };

  const addBooking = async (bookingData: Omit<Booking, 'id' | 'created_at' | 'updated_at'>) => {
    const school = schools.find(s => s.id === bookingData.school_id);
    const trip = trips.find(t => t.id === bookingData.trip_id);
    
    const newBooking: Booking = {
      ...bookingData,
      id: generateId(),
      created_at: getCurrentTimestamp(),
      updated_at: getCurrentTimestamp(),
      school,
      trip,
      excursions: []
    };
    setBookings(prev => [...prev, newBooking]);
  };

  const addSupplier = async (supplierData: Omit<Supplier, 'id' | 'created_at' | 'updated_at'>) => {
    const newSupplier: Supplier = {
      ...supplierData,
      id: generateId(),
      created_at: getCurrentTimestamp(),
      updated_at: getCurrentTimestamp()
    };
    setSuppliers(prev => [...prev, newSupplier]);
  };

  const addExcursion = async (excursionData: Omit<Excursion, 'id' | 'created_at' | 'updated_at'>): Promise<Excursion> => {
    const newExcursion: Excursion = {
      ...excursionData,
      id: generateId(),
      created_at: getCurrentTimestamp(),
      updated_at: getCurrentTimestamp()
    };
    setExcursions(prev => [...prev, newExcursion]);
    return newExcursion;
  };

  const updateBooking = async (id: string, updates: Partial<Booking>) => {
    setBookings(prev => prev.map(booking => 
      booking.id === id 
        ? { ...booking, ...updates, updated_at: getCurrentTimestamp() }
        : booking
    ));
  };

  const updateBookingExcursion = async (id: string, updates: Partial<BookingExcursion>) => {
    // In demo mode, just simulate the update
    console.log('Demo: Updated booking excursion', id, updates);
  };

  const updateSchool = async (id: string, updates: Partial<School>) => {
    setSchools(prev => prev.map(school => 
      school.id === id 
        ? { ...school, ...updates, updated_at: getCurrentTimestamp() }
        : school
    ));
  };

  const updateTrip = async (id: string, updates: Partial<Trip>) => {
    setTrips(prev => prev.map(trip => 
      trip.id === id 
        ? { ...trip, ...updates, updated_at: getCurrentTimestamp() }
        : trip
    ));
  };

  const updateSupplier = async (id: string, updates: Partial<Supplier>) => {
    setSuppliers(prev => prev.map(supplier => 
      supplier.id === id 
        ? { ...supplier, ...updates, updated_at: getCurrentTimestamp() }
        : supplier
    ));
  };

  const addBookingExcursion = async (bookingId: string, excursionId: string, participantCount: number, excursionPrice: number) => {
    // In demo mode, just simulate
    console.log('Demo: Added booking excursion', { bookingId, excursionId, participantCount, excursionPrice });
  };

  const removeBookingExcursion = async (id: string) => {
    // In demo mode, just simulate
    console.log('Demo: Removed booking excursion', id);
  };

  const deleteTrip = async (id: string) => {
    setTrips(prev => prev.filter(trip => trip.id !== id));
    // Also remove related bookings
    setBookings(prev => prev.filter(booking => booking.trip_id !== id));
  };

  const addActivity = async (activityData: Omit<Activity, 'id' | 'created_at'>) => {
    const newActivity: Activity = {
      ...activityData,
      id: generateId(),
      created_at: getCurrentTimestamp()
    };
    setActivities(prev => [newActivity, ...prev]);
  };

  return (
    <DemoDataContext.Provider value={{
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
    </DemoDataContext.Provider>
  );
}

export function useDemoData() {
  const context = useContext(DemoDataContext);
  if (context === undefined) {
    throw new Error('useDemoData must be used within a DemoDataProvider');
  }
  return context;
}