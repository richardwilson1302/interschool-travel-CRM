import React, { useState } from 'react';
import { FileText, Plus, Search, Calendar, Users, DollarSign } from 'lucide-react';
import QuotationForm from './QuotationForm';

export default function QuotesPage() {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for saved quotes - in a real app this would come from your database
  const savedQuotes = [
    {
      id: '1',
      schoolName: 'Westminster Academy',
      destination: 'Paris, France',
      pax: 25,
      netTotal: 11250,
      status: 'sent',
      createdAt: '2024-02-01',
      validUntil: '2024-02-15'
    },
    {
      id: '2',
      schoolName: 'Oakwood High School',
      destination: 'Berlin, Germany',
      pax: 20,
      netTotal: 10400,
      status: 'draft',
      createdAt: '2024-02-02',
      validUntil: '2024-02-16'
    }
  ];

  const filteredQuotes = savedQuotes.filter(quote =>
    quote.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusColors = {
    draft: 'bg-gray-100 text-gray-800',
    sent: 'bg-blue-100 text-blue-800',
    accepted: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    expired: 'bg-orange-100 text-orange-800'
  };

  if (showForm) {
    return <QuotationForm onClose={() => setShowForm(false)} />;
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quotations</h1>
          <p className="mt-1 text-sm text-gray-500">
            Create and manage tour quotations for schools
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Quote
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search quotes by school name or destination..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {filteredQuotes.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No quotes found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? 'Try adjusting your search terms.' : 'Get started by creating your first quotation.'}
          </p>
          {!searchTerm && (
            <div className="mt-6">
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Quote
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuotes.map((quote) => (
            <div key={quote.id} className="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{quote.schoolName}</h3>
                  <div className="flex items-center mt-1 text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    {quote.destination}
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[quote.status as keyof typeof statusColors]}`}>
                  {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{quote.pax} participants</span>
                  </div>
                  <div className="flex items-center text-gray-900 font-semibold">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span>£{quote.netTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                <span>Created {new Date(quote.createdAt).toLocaleDateString()}</span>
                <span>Valid until {new Date(quote.validUntil).toLocaleDateString()}</span>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => setShowForm(true)}
                  className="flex-1 text-xs bg-blue-600 text-white py-2 px-3 rounded hover:bg-blue-700 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex-1 text-xs bg-gray-600 text-white py-2 px-3 rounded hover:bg-gray-700 transition-colors"
                >
                  Print
                </button>
                <button
                  onClick={() => {
                    // Mock PDF download
                    alert('PDF download would start here');
                  }}
                  className="flex-1 text-xs bg-green-600 text-white py-2 px-3 rounded hover:bg-green-700 transition-colors"
                >
                  PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}