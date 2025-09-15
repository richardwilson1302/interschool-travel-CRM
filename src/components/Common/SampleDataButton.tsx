import React, { useState } from 'react';
import { Database, Loader2 } from 'lucide-react';
import { createSampleData } from '../../utils/sampleData';
import { createSupplierData } from '../../utils/supplierData';
import { useData } from '../../contexts/DataContext';

export default function SampleDataButton() {
  const [loading, setLoading] = useState(false);
  const { refreshData } = useData();

  const handleCreateSampleData = async () => {
    setLoading(true);
    try {
      await createSupplierData();
      await createSampleData();
      await refreshData();
    } catch (error) {
      console.error('Error creating sample data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCreateSampleData}
      disabled={loading}
      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <Database className="h-4 w-4 mr-2" />
      )}
      {loading ? 'Creating...' : 'Add Sample Data'}
    </button>
  );
}