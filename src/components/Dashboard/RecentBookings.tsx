import React from 'react';
import { useData } from '../../contexts/DataContext';
import { Calendar, Users, Phone, Mail, MapPin, ChevronDown, ChevronRight } from 'lucide-react';
import ExcursionStatus from './ExcursionStatus';
import EditBookingForm from '../Forms/EditBookingForm';
import { statusColors } from '../../utils/constants';

export default function RecentBookings() {
  const { bookings } = useData();
  const [expandedBookings, setExpandedBookings] = React.useState<Set<string>>(new Set());
  const [editingBookingId, setEditingBookingId] = React.useState<string | null>(null);

  const recentBookings = bookings.slice(0, 8);

  const toggleExpanded = (bookingId: string) => {
    const newExpanded = new Set(expandedBookings);
    if (newExpanded.has(bookingId)) {
      newExpanded.delete(bookingId);
    } else {
      newExpanded.add(bookingId);
    }
    setExpandedBookings(newExpanded);
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Recent Bookings</h3>
        <p className="mt-1 text-sm text-gray-500">Latest booking activity and enquiries</p>
      </div>
      <div className="overflow-hidden">
        {recentBookings.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No bookings yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    School & Trip
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Excursions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Participants
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentBookings.map((booking) => (
                  <React.Fragment key={booking.id}>
                    <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <button
                          onClick={() => setEditingBookingId(booking.id)}
                          className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline cursor-pointer text-left"
                        >
                          {booking.school?.name || 'Unknown School'}
                        </button>
                        <div className="text-sm text-gray-500 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {booking.trip?.destination || 'Unknown Trip'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {booking.excursions && booking.excursions.length > 0 ? (
                        <button
                          onClick={() => toggleExpanded(booking.id)}
                          className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                        >
                          {expandedBookings.has(booking.id) ? (
                            <ChevronDown className="h-4 w-4 mr-1" />
                          ) : (
                            <ChevronRight className="h-4 w-4 mr-1" />
                          )}
                          {booking.excursions.length} excursion{booking.excursions.length !== 1 ? 's' : ''}
                        </button>
                      ) : (
                        <span className="text-sm text-gray-400">None</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center">
                          <Mail className="h-3 w-3 mr-1 text-gray-400" />
                          {booking.contact_email}
                        </div>
                        <div className="flex items-center mt-1">
                          <Phone className="h-3 w-3 mr-1 text-gray-400" />
                          {booking.contact_phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Users className="h-4 w-4 mr-1 text-gray-400" />
                        {booking.participant_count}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[booking.status]}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      £{booking.total_price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(booking.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                    {expandedBookings.has(booking.id) && booking.excursions && booking.excursions.length > 0 && (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 bg-gray-50">
                          <div className="space-y-3">
                            <h4 className="text-sm font-medium text-gray-900">Excursions for this booking:</h4>
                            {booking.excursions.map((bookingExcursion) => (
                              <ExcursionStatus key={bookingExcursion.id} bookingExcursion={bookingExcursion} />
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {editingBookingId && (
        <EditBookingForm 
          bookingId={editingBookingId} 
          onClose={() => setEditingBookingId(null)} 
        />
      )}
    </div>
  );
}