import React from 'react';
import { useData } from '../../contexts/DataContext';
import StatsCards from './StatsCards';
import RecentBookings from './RecentBookings';
import BookingsPipeline from './BookingsPipeline';
import UpcomingTrips from './UpcomingTrips';
import WelcomeSection from './WelcomeSection';

export default function Dashboard() {
  const { loading } = useData();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Here's what's happening with your educational tours.
        </p>
      </div>

      <WelcomeSection />
      <StatsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BookingsPipeline />
        <UpcomingTrips />
      </div>
      
      <RecentBookings />
    </div>
  );
}