import React, { useState } from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import { importEducationalTours } from '../../utils/importTours';
import { useData } from '../../contexts/DataContext';

export default function ImportToursButton() {
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; count?: number; error?: any } | null>(null);
  const { refreshData } = useData();

  const handleImport = async () => {
    setImporting(true);
    setResult(null);
    
    try {
      const importResult = await importEducationalTours();
      setResult(importResult);
      
      if (importResult.success) {
        await refreshData();
      }
    } catch (error) {
      console.error('Import failed:', error);
      setResult({ success: false, error });
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center mb-4">
        <MapPin className="h-6 w-6 text-blue-600 mr-2" />
        <h3 className="text-lg font-medium text-gray-900">Import Educational Tours</h3>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        Import 22 pre-configured educational tours including destinations like Amsterdam, Barcelona, Berlin, Rome, and more.
      </p>
      
      {result && (
        <div className={`mb-4 p-3 rounded-md ${result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          {result.success ? (
            <p className="text-green-800">
              ✅ Successfully imported {result.count} educational tours!
            </p>
          ) : (
            <p className="text-red-800">
              ❌ Import failed. Please check the console for details.
            </p>
          )}
        </div>
      )}
      
      <button
        onClick={handleImport}
        disabled={importing || (result?.success === true)}
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {importing ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <MapPin className="h-4 w-4 mr-2" />
        )}
        {importing ? 'Importing Tours...' : result?.success ? 'Tours Imported' : 'Import Educational Tours'}
      </button>
    </div>
  );
}