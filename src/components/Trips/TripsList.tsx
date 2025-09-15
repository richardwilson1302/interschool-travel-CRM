import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { MapPin, Calendar, Users, DollarSign, Plus, Search, Clock, Edit, Activity, Trash2 } from 'lucide-react';
import TripForm from '../Forms/TripForm';
import EditTripForm from '../Forms/EditTripForm';
import ExcursionForm from '../Forms/ExcursionForm';
import type { Trip } from '../../types';

export default function TripsList() {
  const { trips, excursions, loading, deleteTrip } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const [showExcursionForm, setShowExcursionForm] = useState<{ tripId: string; tripTitle: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showImport, setShowImport] = useState(false);

  const [deletingTripId, setDeletingTripId] = useState<string | null>(null);
  const filteredTrips = trips.filter(trip =>
    trip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteTrip = async (tripId: string, tripTitle: string) => {
    if (window.confirm(`Are you sure you want to delete "${tripTitle}"? This action cannot be undone and will also delete all associated excursions and bookings.`)) {
      setDeletingTripId(tripId);
      try {
        await deleteTrip(tripId);
      } catch (error) {
        console.error('Error deleting trip:', error);
        alert('Error deleting trip. Please try again.');
      } finally {
        setDeletingTripId(null);
      }
    }
  };

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
          <h1 className="text-2xl font-bold text-gray-900">Tours</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your educational tour offerings
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Tour
        </button>
        <button
          onClick={() => setShowImport(true)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Import CSV
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search tours by title, destination, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {filteredTrips.length === 0 ? (
        <div className="text-center py-12">
          <MapPin className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No tours found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first tour.'}
          </p>
          {!searchTerm && (
            <div className="mt-6">
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Tour
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map((trip) => {
            const isUpcoming = new Date(trip.departure_date) > new Date();
            const isPast = new Date(trip.return_date) < new Date();
            const tripExcursions = excursions.filter(e => e.trip_id === trip.id);
            
            return (
              <div key={trip.id} className="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{trip.title}</h3>
                    <div className="flex items-center mt-1 text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      {trip.destination}
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <button
                      onClick={() => setShowExcursionForm({ tripId: trip.id, tripTitle: trip.title })}
                      className="text-gray-400 hover:text-green-600 p-1"
                      title="Add excursions"
                    >
                      <Activity className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setEditingTrip(trip)}
                      className="text-gray-400 hover:text-blue-600 p-1"
                      title="Edit trip"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteTrip(trip.id, trip.title)}
                      disabled={deletingTripId === trip.id}
                      className="text-gray-400 hover:text-red-600 p-1 disabled:opacity-50"
                      title="Delete trip"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">
                      £{trip.base_price}
                    </div>
                    <div className="text-xs text-gray-500">per person</div>
                    </div>
                  </div>
                </div>

                {trip.description && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{trip.description}</p>
                )}

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    <span>
                      {new Date(trip.departure_date).toLocaleDateString()} - {new Date(trip.return_date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{trip.duration_days} days</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2 text-gray-400" />
                    <span>Max {trip.max_participants} participants</span>
                  </div>
                  
                  {tripExcursions.length > 0 && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Activity className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{tripExcursions.length} excursion{tripExcursions.length !== 1 ? 's' : ''}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    isPast 
                      ? 'bg-gray-100 text-gray-800' 
                      : isUpcoming 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {isPast ? 'Completed' : isUpcoming ? 'Upcoming' : 'In Progress'}
                  </span>
                  
                  <div className="text-xs text-gray-400">
                    Created {new Date(trip.created_at).toLocaleDateString()}
                  </div>
                </div>

                {trip.itinerary && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Itinerary</h4>
                    <p className="text-sm text-gray-600 line-clamp-3">{trip.itinerary}</p>
                  </div>
                )}
                
                {tripExcursions.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Available Excursions</h4>
                    <div className="space-y-1">
                      {tripExcursions.slice(0, 3).map((excursion) => (
                        <div key={excursion.id} className="text-sm text-gray-600 flex justify-between">
                          <span>{excursion.name}</span>
                          <span className="font-medium">£{excursion.price}</span>
                        </div>
                      ))}
                      {tripExcursions.length > 3 && (
                        <div className="text-sm text-gray-500">
                          +{tripExcursions.length - 3} more excursions
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

      {showForm && <TripForm onClose={() => setShowForm(false)} />}
      {showImport && <CSVImport onClose={() => setShowImport(false)} />}
      {editingTrip && (
        <EditTripForm 
          trip={editingTrip} 
          onClose={() => setEditingTrip(null)} 
        />
      )}
      {showExcursionForm && (
        <ExcursionForm 
          tripId={showExcursionForm.tripId}
          tripTitle={showExcursionForm.tripTitle}
          onClose={() => setShowExcursionForm(null)} 
        />
      )}
    </div>
  );
}