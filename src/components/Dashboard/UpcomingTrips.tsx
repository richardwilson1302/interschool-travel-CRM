import React from 'react';
import { useData } from '../../contexts/DataContext';
import { MapPin, Calendar, Users } from 'lucide-react';
import { statusColors, statusLabels } from '../../utils/constants';

export default function UpcomingTrips() {
  const { trips, bookings } = useData();

  const upcomingTrips = trips
    .filter(trip => new Date(trip.departure_date) > new Date())
    .sort((a, b) => new Date(a.departure_date).getTime() - new Date(b.departure_date).getTime())
    .slice(0, 5);

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Upcoming Tours</h3>
        <p className="mt-1 text-sm text-gray-500">Next departures and availability</p>
      </div>
      <div className="p-6">
        {upcomingTrips.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No upcoming tours scheduled</p>
        ) : (
          <div className="space-y-4">
            {upcomingTrips.map((trip) => {
              const tripBookings = bookings.filter(booking => booking.trip_id === trip.id);
              const activeBookings = tripBookings.filter(booking => 
                booking.status !== 'quote_lost' && booking.status !== 'cancelled'
              );
              
              return (
                <div key={trip.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-900">{trip.title}</h4>
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        {trip.destination}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(trip.departure_date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Users className="h-3 w-3 mr-1" />
                        Max {trip.max_participants} participants
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">
                      £{trip.base_price}
                    </div>
                    <div className="text-xs text-gray-500">per person</div>
                  </div>
                </div>
                
                {activeBookings.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h5 className="text-xs font-medium text-gray-700 mb-2">
                      Bookings ({activeBookings.length})
                    </h5>
                    <div className="space-y-2">
                      {activeBookings.slice(0, 3).map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between text-xs">
                          <span className="text-gray-600 truncate mr-2">
                            {booking.school?.name || 'Unknown School'}
                          </span>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[booking.status]}`}>
                            {statusLabels[booking.status]}
                          </span>
                        </div>
                      ))}
                      {activeBookings.length > 3 && (
                        <div className="text-xs text-gray-500">
                          +{activeBookings.length - 3} more bookings
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}