import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Calendar, MapPin, Users, DollarSign, Phone, FileText } from 'lucide-react';
import type { BookingExcursion } from '../../types';

interface ExcursionStatusProps {
  bookingExcursion: BookingExcursion;
}

const statusOptions = [
  { value: 'not_contacted', label: 'Not Contacted', color: 'bg-gray-100 text-gray-800' },
  { value: 'contacted', label: 'Contacted', color: 'bg-blue-100 text-blue-800' },
  { value: 'booked', label: 'Booked', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'paid', label: 'Paid', color: 'bg-green-100 text-green-800' },
];

export default function ExcursionStatus({ bookingExcursion }: ExcursionStatusProps) {
  const { updateBookingExcursion } = useData();
  const [isUpdating, setIsUpdating] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState(bookingExcursion.provider_notes || '');

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true);
    try {
      const updates: Partial<BookingExcursion> = {
        provider_status: newStatus as any,
        provider_contact_date: newStatus !== 'not_contacted' ? new Date().toISOString() : undefined
      };
      await updateBookingExcursion(bookingExcursion.id, updates);
    } catch (error) {
      console.error('Error updating excursion status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleNotesUpdate = async () => {
    setIsUpdating(true);
    try {
      await updateBookingExcursion(bookingExcursion.id, {
        provider_notes: notes
      });
      setShowNotes(false);
    } catch (error) {
      console.error('Error updating excursion notes:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const currentStatus = statusOptions.find(s => s.value === bookingExcursion.provider_status);

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-4 mb-2">
            <h5 className="text-sm font-semibold text-gray-900">
              {bookingExcursion.excursion?.name || 'Unknown Excursion'}
            </h5>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${currentStatus?.color}`}>
              {currentStatus?.label}
            </span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-600 mb-3">
            {bookingExcursion.excursion?.description && (
              <div className="flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {bookingExcursion.excursion.description}
              </div>
            )}
            <div className="flex items-center">
              <Users className="h-3 w-3 mr-1" />
              {bookingExcursion.participant_count} participants
            </div>
            <div className="flex items-center">
              <DollarSign className="h-3 w-3 mr-1" />
              £{bookingExcursion.total_price}
            </div>
            {bookingExcursion.provider_contact_date && (
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                Last contact: {new Date(bookingExcursion.provider_contact_date).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={bookingExcursion.provider_status}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={isUpdating}
            className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          <button
            onClick={() => setShowNotes(!showNotes)}
            className="text-gray-400 hover:text-gray-600 p-1"
            title="Add notes"
          >
            <FileText className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {showNotes && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes about provider communication..."
            className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            rows={2}
          />
          <div className="flex justify-end space-x-2 mt-2">
            <button
              onClick={() => setShowNotes(false)}
              className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1"
            >
              Cancel
            </button>
            <button
              onClick={handleNotesUpdate}
              disabled={isUpdating}
              className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isUpdating ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}