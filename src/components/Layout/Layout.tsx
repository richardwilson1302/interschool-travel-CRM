import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import SchoolsList from '../Schools/SchoolsList';
import TripsList from '../Trips/TripsList';
import BookingsList from '../Bookings/BookingsList';
import SuppliersList from '../Suppliers/SuppliersList';
import QuotesPage from '../Quotes/QuotesPage';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');

  const renderContent = () => {
    switch (currentView) {
      case 'schools':
        return <SchoolsList />;
      case 'trips':
        return <TripsList />;
      case 'bookings':
        return <BookingsList />;
      case 'quotes':
        return <QuotesPage />;
      case 'suppliers':
        return <SuppliersList />;
      default:
        return children;
    }
  };
  return (
    <div className="h-screen flex bg-gray-50">
      <Sidebar 
        open={sidebarOpen} 
        setOpen={setSidebarOpen}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}