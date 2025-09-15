import React from 'react';
import { Menu, Bell, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export default function Header({ setSidebarOpen }: HeaderProps) {
  const { signOut, user } = useAuth();

  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
      <button
        type="button"
        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </button>
      <div className="flex-1 px-4 flex justify-between items-center">
        <div className="flex-1 flex">
          <h1 className="text-lg font-semibold text-gray-900">
            Interschool Travel CRM
          </h1>
        </div>
        <div className="ml-4 flex items-center space-x-4">
          <button
            type="button"
            className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Bell className="h-6 w-6" />
          </button>
          
          <div className="relative">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="hidden md:block">
                <div className="text-sm font-medium text-gray-900">{user?.email}</div>
              </div>
              <button
                onClick={signOut}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}