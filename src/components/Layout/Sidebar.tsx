import React from 'react';
import { 
  Home, 
  School, 
  MapPin, 
  Calendar, 
  Users, 
  Activity,
  Building2,
  X,
  GraduationCap,
  FileText
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  currentView: string;
  setCurrentView: (view: string) => void;
}

const navigation = [
  { name: 'Dashboard', icon: Home, key: 'dashboard' },
  { name: 'Schools', icon: School, key: 'schools' },
  { name: 'Tours', icon: MapPin, key: 'trips' },
  { name: 'Bookings', icon: Calendar, key: 'bookings' },
  { name: 'Quotes', icon: FileText, key: 'quotes' },
  { name: 'Suppliers', icon: Building2, key: 'suppliers' },
  { name: 'Contacts', icon: Users, key: 'contacts' },
  { name: 'Activities', icon: Activity, key: 'activities' },
];

export default function Sidebar({ open, setOpen, currentView, setCurrentView }: SidebarProps) {
  return (
    <>
      {/* Mobile sidebar overlay */}
      {open && (
        <div className="fixed inset-0 flex z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setOpen(false)} />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setOpen(false)}
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <SidebarContent currentView={currentView} setCurrentView={setCurrentView} />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <SidebarContent currentView={currentView} setCurrentView={setCurrentView} />
        </div>
      </div>
    </>
  );
}

function SidebarContent({ currentView, setCurrentView }: { currentView: string; setCurrentView: (view: string) => void }) {
  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <span className="ml-2 text-lg font-semibold text-gray-900">IST CRM</span>
        </div>
        <nav className="mt-8 flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.key;
            return (
              <button
                key={item.name}
                onClick={() => setCurrentView(item.key)}
                className={`${
                  isActive
                    ? 'bg-blue-50 border-r-4 border-blue-600 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150 w-full text-left`}
              >
                <Icon
                  className={`${
                    isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                  } mr-3 flex-shrink-0 h-5 w-5`}
                />
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}