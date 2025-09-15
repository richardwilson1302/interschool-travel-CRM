import React from 'react';
import { Info } from 'lucide-react';

export default function DemoNotice() {
  return (
    <div className="bg-blue-600 text-white px-4 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2">
        <Info className="h-4 w-4" />
        <span className="text-sm font-medium">
          🚀 Demo Mode: This is a demonstration with sample data. All changes are temporary and not saved to a real database.
        </span>
      </div>
    </div>
  );
}