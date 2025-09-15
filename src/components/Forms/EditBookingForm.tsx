import React, { useState, useEffect } from 'react';
import { useData } from '../../contexts/DataContext';
import { X, Plus, Trash2 } from 'lucide-react';
import type { Booking, BookingExcursion } from '../../types';
import ActivityLog from '../Activities/ActivityLog';

interface EditBookingFormProps {
  bookingId: string;
  onClose: () => void;
}

export default function EditBookingForm({ bookingId, onClose }: EditBookingFormProps) {
  const { bookings, updateBooking, schools, trips, addExcursion, addBookingExcursion, removeBookingExcursion, refreshData } = useData();
  const [loading, setLoading] = useState(false);
  const [deletingExcursionId, setDeletingExcursionId] = useState<string | null>(null);
  const [refreshTimestamp, setRefreshTimestamp] = useState(Date.now());

  // Find the current booking from the global state based on bookingId
  const currentBooking = bookings.find(b => b.id === bookingId);

  const [formData, setFormData] = useState({
    school_id: '',
    trip_id: '',
    status: 'enquiry' as const,
    participant_count: 1,
    total_price: 0,
    special_requirements: '',
    contact_email: '',
    contact_phone: '',
    notes: '',
  });

  // If booking is not found (e.g., deleted), close the form
  useEffect(() => {
    if (!currentBooking) {
      onClose();
    }
  }, [currentBooking, onClose]);

  // Update formData when currentBooking changes
  useEffect(() => {
    if (currentBooking) {
      setFormData({
        school_id: currentBooking.school_id,
        trip_id: currentBooking.trip_id,
        status: currentBooking.status,
        participant_count: currentBooking.participant_count,
        total_price: currentBooking.total_price,
        special_requirements: currentBooking.special_requirements || '',
        contact_email: currentBooking.contact_email,
        contact_phone: currentBooking.contact_phone,
        notes: currentBooking.notes || '',
      });
      // Force a re-render by updating the refresh timestamp
      setRefreshTimestamp(Date.now());
    }
  }, [currentBooking]);

  const selectedTrip = trips.find(t => t.id === formData.trip_id);

  useEffect(() => {
    if (selectedTrip) {
      setFormData(prev => ({
        ...prev,
        total_price: selectedTrip.base_price * prev.participant_count
      }));
    }
  }, [selectedTrip, formData.participant_count]);

  // If currentBooking is null, render nothing
  if (!currentBooking) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateBooking(bookingId, formData);
      onClose();
    } catch (error) {
      console.error('Error updating booking:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    }));
  };

  const handleRemoveExcursion = async (bookingExcursionId: string) => {
    if (!window.confirm('Are you sure you want to remove this excursion from the booking?')) {
      return;
    }

    setDeletingExcursionId(bookingExcursionId);
    
    try {
      await removeBookingExcursion(bookingExcursionId);
      // Force component to re-render with new timestamp
      setRefreshTimestamp(Date.now());
    } catch (error) {
      console.error('Error deleting excursion:', error);
      alert('Unable to delete this excursion. Please check database permissions.');
    } finally {
      setDeletingExcursionId(null);
    }
  };

  const handleAddManualExcursion = async (excursionData: {
    name: string;
    supplier: string;
    price: number;
    participants: number;
  }) => {
    try {
      // First create the excursion
      const newExcursion = await addExcursion({
        trip_id: formData.trip_id,
        name: excursionData.name,
        description: excursionData.supplier ? `Supplier: ${excursionData.supplier}` : '',
        price: excursionData.price,
        duration_hours: 2,
        max_participants: excursionData.participants
      });

      // Then add it to booking_excursions
      await addBookingExcursion(bookingId, newExcursion.id, excursionData.participants, newExcursion.price);
      
      // Force component to re-render with new timestamp
      setRefreshTimestamp(Date.now());
    } catch (error) {
      console.error('Error adding manual excursion:', error);
      alert('Error adding excursion. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Booking</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">School*</label>
              <select
                name="school_id"
                required
                value={formData.school_id}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a school</option>
                {schools.map(school => (
                  <option key={school.id} value={school.id}>
                    {school.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Trip*</label>
              <select
                name="trip_id"
                required
                value={formData.trip_id}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a trip</option>
                {trips.map(trip => (
                  <option key={trip.id} value={trip.id}>
                    {trip.title} - {trip.destination}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="enquiry">Enquiry</option>
                <option value="quoted">Quoted</option>
                <option value="quote_follow_up">Quote Follow Up</option>
                <option value="quote_lost">Quote Lost</option>
                <option value="confirmed">Provisional</option>
                <option value="paid">Booked</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Participants*</label>
              <input
                type="number"
                name="participant_count"
                required
                min="1"
                value={formData.participant_count}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Total Price (£)</label>
              <input
                type="number"
                name="total_price"
                value={formData.total_price}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Email*</label>
              <input
                type="email"
                name="contact_email"
                required
                value={formData.contact_email}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Phone*</label>
              <input
                type="tel"
                name="contact_phone"
                required
                value={formData.contact_phone}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Special Requirements</label>
            <textarea
              name="special_requirements"
              rows={3}
              value={formData.special_requirements}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Dietary requirements, accessibility needs, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              name="notes"
              rows={3}
              value={formData.notes}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Additional notes about this booking..."
            />
          </div>

          {/* Excursions Section */}
          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Trip Excursions</h4>
            
            {/* Current Excursions */}
            {currentBooking?.excursions && currentBooking.excursions.length > 0 && (
              <div className="mb-6">
                <h5 className="text-sm font-medium text-gray-700 mb-3">Selected Excursions</h5>
                <div className="space-y-3" key={`excursions-${refreshTimestamp}-${currentBooking.excursions.length}`}>
                  {currentBooking.excursions.map((bookingExcursion) => (
                    <div key={bookingExcursion.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {bookingExcursion.excursion?.name || 'Unknown Excursion'}
                        </div>
                        <div className="text-sm text-gray-600">
                          {bookingExcursion.excursion?.supplier?.name && (
                            <span>Supplier: {bookingExcursion.excursion.supplier.name} • </span>
                          )}
                          {bookingExcursion.participant_count} participants • £{bookingExcursion.total_price}
                        </div>
                        {bookingExcursion.excursion?.description && (
                          <div className="text-sm text-gray-500 mt-1">
                            {bookingExcursion.excursion.description}
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveExcursion(bookingExcursion.id)}
                        disabled={deletingExcursionId === bookingExcursion.id}
                        className="ml-3 text-red-600 hover:text-red-800 p-1 disabled:opacity-50"
                        title="Remove excursion"
                      >
                        {deletingExcursionId === bookingExcursion.id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add New Excursion */}
            <div>
              <h5 className="text-sm font-medium text-gray-700 mb-3">Add Excursion</h5>
              <ManualExcursionEntry
                key={`add-excursion-${refreshTimestamp}`}
                onAddExcursion={handleAddManualExcursion}
                maxParticipants={formData.participant_count}
              />
            </div>
          </div>

          {/* Activity Log Section */}
          <div className="border-t border-gray-200 pt-6">
            <ActivityLog bookingId={bookingId} />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Manual Excursion Entry Component
interface ManualExcursionEntryProps {
  onAddExcursion: (excursionData: {
    name: string;
    supplier: string;
    price: number;
    participants: number;
  }) => void;
  maxParticipants: number;
}

function ManualExcursionEntry({ onAddExcursion, maxParticipants }: ManualExcursionEntryProps) {
  const [excursionName, setExcursionName] = useState('');
  const [supplier, setSupplier] = useState('');
  const [price, setPrice] = useState(0);
  const [participantCount, setParticipantCount] = useState(1);

  const totalPrice = price * participantCount;

  const handleAdd = () => {
    if (excursionName.trim() && participantCount > 0) {
      onAddExcursion({
        name: excursionName.trim(),
        supplier: supplier.trim(),
        price: price,
        participants: participantCount
      });
      setExcursionName('');
      setSupplier('');
      setPrice(0);
      setParticipantCount(1);
    }
  };

  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Excursion Name*</label>
          <input
            type="text"
            value={excursionName}
            onChange={(e) => setExcursionName(e.target.value)}
            placeholder="e.g., Louvre Museum Visit"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Supplier</label>
          <input
            type="text"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            placeholder="e.g., Paris Museums Ltd"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Price per Person (£)*</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Participants*</label>
          <input
            type="number"
            min="1"
            max={maxParticipants}
            value={participantCount}
            onChange={(e) => setParticipantCount(parseInt(e.target.value) || 1)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Total Cost</label>
          <div className="mt-1 py-2 px-3 bg-gray-100 border border-gray-300 rounded-md text-gray-900 font-medium">
            £{totalPrice.toFixed(2)}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleAdd}
          disabled={!excursionName.trim() || participantCount <= 0}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Excursion
        </button>
      </div>
    </div>
  );
}