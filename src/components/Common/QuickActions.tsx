import React, { useState } from 'react';
import { Plus, School, MapPin, Calendar, Building2 } from 'lucide-react';
import SchoolForm from '../Forms/SchoolForm';
import TripForm from '../Forms/TripForm';
import BookingForm from '../Forms/BookingForm';
import SupplierForm from '../Forms/SupplierForm';

export default function QuickActions() {
  const [showSchoolForm, setShowSchoolForm] = useState(false);
  const [showTripForm, setShowTripForm] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showSupplierForm, setShowSupplierForm] = useState(false);

  const actions = [
    {
      name: 'New School',
      icon: School,
      color: 'bg-blue-600 hover:bg-blue-700',
      onClick: () => setShowSchoolForm(true)
    },
    {
      name: 'New Tour',
      icon: MapPin,
      color: 'bg-green-600 hover:bg-green-700',
      onClick: () => setShowTripForm(true)
    },
    {
      name: 'New Booking',
      icon: Calendar,
      color: 'bg-purple-600 hover:bg-purple-700',
      onClick: () => setShowBookingForm(true)
    },
    {
      name: 'New Supplier',
      icon: Building2,
      color: 'bg-orange-600 hover:bg-orange-700',
      onClick: () => setShowSupplierForm(true)
    }
  ];

  return (
    <>
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.name}
                onClick={action.onClick}
                className={`${action.color} text-white p-4 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-150`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{action.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {showSchoolForm && <SchoolForm onClose={() => setShowSchoolForm(false)} />}
      {showTripForm && <TripForm onClose={() => setShowTripForm(false)} />}
      {showBookingForm && <BookingForm onClose={() => setShowBookingForm(false)} />}
      {showSupplierForm && <SupplierForm onClose={() => setShowSupplierForm(false)} />}
    </>
  );
}