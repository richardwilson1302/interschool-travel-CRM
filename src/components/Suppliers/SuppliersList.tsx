import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Building2, Mail, Phone, Globe, MapPin, Plus, Search, Edit, Upload } from 'lucide-react';
import SupplierForm from '../Forms/SupplierForm';
import EditSupplierForm from '../Forms/EditSupplierForm';
import CSVImport from './CSVImport';
import type { Supplier } from '../../types';

export default function SuppliersList() {
  const { suppliers, loading } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [showImport, setShowImport] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSuppliers = suppliers.filter(supplier =>
    {
      const search = searchTerm.toLowerCase();
      
      // Check for combined searches like "accommodation berlin" or "restaurant bruges"
      const searchWords = search.split(' ').filter(word => word.length > 0);
      
      if (searchWords.length > 1) {
        // Multi-word search - check if all words match across different fields
        return searchWords.every(word => 
          supplier.name.toLowerCase().includes(word) ||
          supplier.category?.toLowerCase().includes(word) ||
          supplier.focus?.toLowerCase().includes(word) ||
          supplier.specialties?.toLowerCase().includes(word) ||
          supplier.city?.toLowerCase().includes(word) ||
          supplier.approx_price?.toLowerCase().includes(word) ||
          supplier.address?.toLowerCase().includes(word) ||
          supplier.notes_for_groups?.toLowerCase().includes(word)
        );
      } else {
        // Single word search - original behavior
        return supplier.name.toLowerCase().includes(search) ||
          supplier.category?.toLowerCase().includes(search) ||
          supplier.focus?.toLowerCase().includes(search) ||
          supplier.specialties?.toLowerCase().includes(search) ||
          supplier.city?.toLowerCase().includes(search) ||
          supplier.approx_price?.toLowerCase().includes(search) ||
          supplier.address?.toLowerCase().includes(search) ||
          supplier.notes_for_groups?.toLowerCase().includes(search);
      }
    }
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Suppliers</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your excursion and activity providers
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowImport(true)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Upload className="h-4 w-4 mr-2" />
            Import CSV
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Supplier
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search suppliers by name, category, city, or try combinations like 'accommodation Berlin' or 'restaurant Bruges'..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {filteredSuppliers.length === 0 ? (
        <div className="text-center py-12">
          <Building2 className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No suppliers found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first supplier.'}
          </p>
          {!searchTerm && (
            <div className="mt-6">
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Supplier
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSuppliers.map((supplier) => (
            <div key={supplier.id} className="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center">
                    <Building2 className="h-5 w-5 text-blue-600 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">{supplier.name}</h3>
                  </div>
                  
                  {supplier.contact_person && (
                    <p className="mt-1 text-sm text-gray-600">{supplier.contact_person}</p>
                  )}
                  
                  {supplier.category && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-2">
                      {supplier.category}
                    </span>
                  )}
                  
                  {supplier.focus && (
                    <p className="mt-2 text-sm text-gray-600 font-medium">{supplier.focus}</p>
                  )}
                  
                  {supplier.approx_price && (
                    <p className="mt-1 text-sm text-green-600 font-semibold">{supplier.approx_price}</p>
                  )}
                </div>
                <button
                  onClick={() => setEditingSupplier(supplier)}
                  className="text-gray-400 hover:text-blue-600 p-1"
                  title="Edit supplier"
                >
                  <Edit className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  <a href={`mailto:${supplier.email}`} className="hover:text-blue-600">
                    {supplier.email}
                  </a>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                  <a href={`tel:${supplier.phone}`} className="hover:text-blue-600">
                    {supplier.phone}
                  </a>
                </div>

                {supplier.website && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Globe className="h-4 w-4 mr-2 text-gray-400" />
                    <a 
                      href={supplier.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 truncate"
                    >
                      {supplier.website.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}

                {(supplier.city || supplier.address) && (
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    <span>
                      {supplier.address && `${supplier.address}, `}
                      {supplier.city}
                      {supplier.postcode && ` ${supplier.postcode}`}
                    </span>
                  </div>
                )}
              </div>

              {supplier.specialties && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">Specialties</h4>
                  <p className="text-sm text-gray-600">{supplier.specialties}</p>
                </div>
              )}

              {supplier.notes_for_groups && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">Notes for School Groups</h4>
                  <p className="text-sm text-gray-600">{supplier.notes_for_groups}</p>
                </div>
              )}

              {supplier.notes && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">General Notes</h4>
                  <p className="text-sm text-gray-600">{supplier.notes}</p>
                </div>
              )}

              <div className="mt-4 text-xs text-gray-400">
                Added {new Date(supplier.created_at).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && <SupplierForm onClose={() => setShowForm(false)} />}
      {showImport && <CSVImport onClose={() => setShowImport(false)} />}
      {editingSupplier && (
        <EditSupplierForm 
          supplier={editingSupplier} 
          onClose={() => setEditingSupplier(null)} 
        />
      )}
    </div>
  );
}