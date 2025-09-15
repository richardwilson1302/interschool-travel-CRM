import React from 'react';
import { useData } from '../../contexts/DataContext';
import { 
  School, 
  MapPin, 
  Calendar, 
  TrendingUp,
  Users,
  DollarSign
} from 'lucide-react';

export default function StatsCards() {
  const { schools, trips, bookings } = useData();

  const activeBookings = bookings.filter(b => 
    ['enquiry', 'quoted', 'confirmed', 'paid'].includes(b.status)
  );

  const totalRevenue = bookings
    .filter(b => b.status === 'paid' || b.status === 'completed')
    .reduce((sum, booking) => sum + booking.total_price, 0);

  const totalParticipants = bookings
    .filter(b => b.status === 'paid' || b.status === 'completed')
    .reduce((sum, booking) => sum + booking.participant_count, 0);

  const stats = [
    {
      name: 'Total Schools',
      value: schools.length,
      icon: School,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      name: 'Available Tours',
      value: trips.length,
      icon: MapPin,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      name: 'Active Bookings',
      value: activeBookings.length,
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      name: 'Total Revenue',
      value: `£${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      name: 'Students Served',
      value: totalParticipants,
      icon: Users,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      name: 'Conversion Rate',
      value: schools.length > 0 ? `${Math.round((bookings.length / schools.length) * 100)}%` : '0%',
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.name}
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`${stat.bgColor} p-3 rounded-md`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="text-lg font-semibold text-gray-900">
                      {stat.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}