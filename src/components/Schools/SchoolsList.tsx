import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { School, Mail, Phone, Globe, MapPin, Plus, Search, Edit, Upload } from 'lucide-react';
import SchoolForm from '../Forms/SchoolForm';
import EditSchoolForm from '../Forms/EditSchoolForm';
import CSVImport from './CSVImport';
import type { School as SchoolType } from '../../types';

export default function SchoolsList() {
  const { schools, loading } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingSchool, setEditingSchool] = useState<SchoolType | null>(null);
  const [showImport, setShowImport] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.contact_person?.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-2xl font-bold text-gray-900">Schools</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your school contacts and information
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
            Add School
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search schools by name, city, or contact person..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {filteredSchools.length === 0 ? (
        <div className="text-center py-12">
          <School className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No schools found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first school.'}
          </p>
          {!searchTerm && (
            <div className="mt-6">
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add School
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchools.map((school) => (
            <div key={school.id} className="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center">
                    <School className="h-5 w-5 text-blue-600 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">{school.name}</h3>
                  </div>
                  
                  {school.contact_person && (
                    <p className="mt-1 text-sm text-gray-600">{school.contact_person}</p>
                  )}
                </div>
                <button
                  onClick={() => setEditingSchool(school)}
                  className="text-gray-400 hover:text-blue-600 p-1"
                  title="Edit school"
                >
                  <Edit className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  <a href={`mailto:${school.email}`} className="hover:text-blue-600">
                    {school.email}
                  </a>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                  <a href={`tel:${school.phone}`} className="hover:text-blue-600">
                    {school.phone}
                  </a>
                </div>

                {school.website && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Globe className="h-4 w-4 mr-2 text-gray-400" />
                    <a 
                      href={school.website.startsWith('http') ? school.website : `https://${school.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 truncate"
                    >
                      {school.website.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}

                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                  <span>
                    {school.address}, {school.city} {school.postcode}
                  </span>
                </div>
              </div>

              {school.notes && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">{school.notes}</p>
                </div>
              )}

              <div className="mt-4 text-xs text-gray-400">
                Added {new Date(school.created_at).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && <SchoolForm onClose={() => setShowForm(false)} />}
      {showImport && <CSVImport onClose={() => setShowImport(false)} />}
      {editingSchool && (
        <EditSchoolForm 
          school={editingSchool} 
          onClose={() => setEditingSchool(null)} 
        />
      )}
    </div>
  );
}