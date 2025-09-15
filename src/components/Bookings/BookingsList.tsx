import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Calendar, Users, Phone, Mail, MapPin, Plus, Search, DollarSign, Edit } from 'lucide-react';
import BookingForm from '../Forms/BookingForm';
import EditBookingForm from '../Forms/EditBookingForm';
import { statusColors, statusLabels } from '../../utils/constants';
import type { Booking } from '../../types';

export default function BookingsList() {
  const { bookings, loading } = useData();
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingBookingId, setEditingBookingId] = useState<string | null>(null);

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.school?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.trip?.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.contact_email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage all your educational tour bookings
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Booking
        </button>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search bookings by school, destination, or contact..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Statuses</option>
          <option value="enquiry">Enquiries</option>
          <option value="quoted">Quoted</option>
          <option value="quote_follow_up">Quote Follow Up</option>
          <option value="quote_lost">Quote Lost</option>
          <option value="confirmed">Provisional</option>
          <option value="paid">Booked</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria.' 
              : 'Get started by creating your first booking.'
            }
          </p>
          {!searchTerm && statusFilter === 'all' && (
            <div className="mt-6">
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Booking
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <button
                    onClick={() => setEditingBookingId(booking.id)}
                    className="text-lg font-semibold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer text-left"
                  >
                    {booking.school?.name || 'Unknown School'}
                  </button>
                  <div className="flex items-center mt-1 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {booking.trip?.destination || 'Unknown Destination'}
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[booking.status]}`}>
                    {statusLabels[booking.status]}
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{booking.participant_count} participants</span>
                  </div>
                  <div className="flex items-center text-gray-900 font-semibold">
                    <span>£{booking.total_price.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  <a href={`mailto:${booking.contact_email}`} className="hover:text-blue-600 truncate">
                    {booking.contact_email}
                  </a>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                  <a href={`tel:${booking.contact_phone}`} className="hover:text-blue-600">
                    {booking.contact_phone}
                  </a>
                </div>
              </div>

              {booking.special_requirements && (
                <div className="mb-4 p-3 bg-yellow-50 rounded-md">
                  <h4 className="text-sm font-medium text-yellow-800 mb-1">Special Requirements</h4>
                  <p className="text-sm text-yellow-700">{booking.special_requirements}</p>
                </div>
              )}

              {booking.excursions && booking.excursions.length > 0 && (
                <div className="mb-4 p-3 bg-blue-50 rounded-md">
                  <h4 className="text-sm font-medium text-blue-800 mb-1">
                    Excursions ({booking.excursions.length})
                  </h4>
                  <div className="space-y-1">
                    {booking.excursions.slice(0, 2).map((excursion) => (
                      <div key={excursion.id} className="text-sm text-blue-700">
                        {excursion.excursion?.name || 'Unknown Excursion'}
                      </div>
                    ))}
                    {booking.excursions.length > 2 && (
                      <div className="text-sm text-blue-600">
                        +{booking.excursions.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              )}

              {booking.notes && (
                <div className="mb-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">{booking.notes}</p>
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Created {new Date(booking.created_at).toLocaleDateString()}</span>
                {booking.trip?.departure_date && (
                  <span className="text-sm font-bold text-gray-600">Departs {new Date(booking.trip.departure_date).toLocaleDateString()}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && <BookingForm onClose={() => setShowForm(false)} />}
      {editingBookingId && (
        <EditBookingForm 
          bookingId={editingBookingId} 
          onClose={() => setEditingBookingId(null)} 
        />
      )}
    </div>
  );
}