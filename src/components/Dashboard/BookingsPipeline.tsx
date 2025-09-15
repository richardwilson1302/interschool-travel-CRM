import React from 'react';
import { useData } from '../../contexts/DataContext';
import { pipelineStatusConfig } from '../../utils/constants';
import type { BookingStatus } from '../../types';

export default function BookingsPipeline() {
  const { bookings } = useData();

  const statusCounts = Object.keys(pipelineStatusConfig).reduce((acc, status) => {
    acc[status as BookingStatus] = bookings.filter(b => b.status === status).length;
    return acc;
  }, {} as Record<BookingStatus, number>);

  const totalBookings = bookings.length;

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Bookings Pipeline</h3>
        <p className="mt-1 text-sm text-gray-500">Track booking progress through each stage</p>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {Object.entries(pipelineStatusConfig).map(([status, config]) => {
            const count = statusCounts[status as BookingStatus];
            const percentage = totalBookings > 0 ? (count / totalBookings) * 100 : 0;
            
            return (
              <div key={status} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${config.color}`}></div>
                  <span className="text-sm font-medium text-gray-900">{config.label}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${config.color}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-8 text-right">
                    {count}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}