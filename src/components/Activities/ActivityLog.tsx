import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  Calendar, 
  FileText, 
  CreditCard,
  Plus,
  Clock,
  User
} from 'lucide-react';
import type { Activity, ActivityType } from '../../types';

interface ActivityLogProps {
  bookingId: string;
}

const activityIcons = {
  note: MessageSquare,
  email: Mail,
  call: Phone,
  meeting: Calendar,
  quote_sent: FileText,
  payment_received: CreditCard,
};

const activityColors = {
  note: 'text-blue-600 bg-blue-50',
  email: 'text-green-600 bg-green-50',
  call: 'text-purple-600 bg-purple-50',
  meeting: 'text-orange-600 bg-orange-50',
  quote_sent: 'text-indigo-600 bg-indigo-50',
  payment_received: 'text-emerald-600 bg-emerald-50',
};

export default function ActivityLog({ bookingId }: ActivityLogProps) {
  const { activities, addActivity } = useData();
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newActivity, setNewActivity] = useState({
    type: 'note' as ActivityType,
    description: ''
  });

  const bookingActivities = activities
    .filter(activity => activity.booking_id === bookingId)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!newActivity.description.trim() || !user) return;

    setLoading(true);
    try {
      await addActivity({
        booking_id: bookingId,
        type: newActivity.type,
        description: newActivity.description.trim(),
        user_id: user.id
      });
      
      setNewActivity({ type: 'note', description: '' });
      setShowForm(false);
    } catch (error) {
      console.error('Error adding activity:', error);
      alert('Error adding activity. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowForm(false);
    setNewActivity({ type: 'note', description: '' });
  };

  const handleAddActivityClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowForm(!showForm);
  };
  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">Activity Log</h3>
        <button
          type="button"
          onClick={handleAddActivityClick}
          className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-blue-600 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-3 w-3 mr-1" />
          Add Activity
        </button>
      </div>

      {showForm && (
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
          <div className="space-y-3">
            <div>
              <select
                value={newActivity.type}
                onChange={(e) => setNewActivity(prev => ({ ...prev, type: e.target.value as ActivityType }))}
                className="block w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="note">Note</option>
                <option value="email">Email</option>
                <option value="call">Phone Call</option>
                <option value="meeting">Meeting</option>
                <option value="quote_sent">Quote Sent</option>
                <option value="payment_received">Payment Received</option>
              </select>
            </div>
            <div>
              <textarea
                value={newActivity.description}
                onChange={(e) => setNewActivity(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter activity details..."
                rows={3}
                className="block w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={handleCancel}
                className="px-3 py-1 text-xs text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading || !newActivity.description.trim()}
                className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {loading ? 'Adding...' : 'Add Activity'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-h-96 overflow-y-auto">
        {bookingActivities.length === 0 ? (
          <div className="px-4 py-6 text-center text-sm text-gray-500">
            No activities recorded yet
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {bookingActivities.map((activity) => {
              const Icon = activityIcons[activity.type];
              const colorClass = activityColors[activity.type];
              
              return (
                <div key={activity.id} className="px-4 py-3">
                  <div className="flex items-start space-x-3">
                    <div className={`flex-shrink-0 p-1 rounded-full ${colorClass}`}>
                      <Icon className="h-3 w-3" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-medium text-gray-900 capitalize">
                          {activity.type.replace('_', ' ')}
                        </p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {new Date(activity.created_at).toLocaleDateString()} {new Date(activity.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        {activity.description}
                      </p>
                      <div className="flex items-center mt-1 text-xs text-gray-400">
                        <User className="h-3 w-3 mr-1" />
                        {user?.email === activity.user_id ? 'You' : 'Team member'}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}