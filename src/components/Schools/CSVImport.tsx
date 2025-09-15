import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Upload, X, Download, AlertCircle, CheckCircle } from 'lucide-react';

interface CSVImportProps {
  onClose: () => void;
}

interface ImportResult {
  success: number;
  errors: string[];
  duplicates: number;
}

export default function CSVImport({ onClose }: CSVImportProps) {
  const { addSchool } = useData();
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);

  const downloadTemplate = () => {
    const headers = [
      'name',
      'address',
      'city',
      'postcode',
      'phone',
      'email',
      'website',
      'contact_person',
      'notes'
    ];

    const sampleData = [
      'Example High School',
      '123 Education Street',
      'London',
      'SW1A 1AA',
      '020 7946 0958',
      'admin@examplehigh.co.uk',
      'www.examplehigh.co.uk',
      'Sarah Johnson',
      'Very active in educational tours'
    ];

    const csvContent = [headers.join(','), sampleData.join(',')].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'schools_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const parseCSV = (text: string): any[] => {
    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const data = [];

    for (let i = 1; i < lines.length; i++) {
      const values = [];
      let current = '';
      let inQuotes = false;

      for (let j = 0; j < lines[i].length; j++) {
        const char = lines[i][j];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      values.push(current.trim());

      if (values.length === headers.length) {
        const row: any = {};
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });
        data.push(row);
      }
    }

    return data;
  };

  const handleImport = async () => {
    if (!file) return;

    setImporting(true);
    const text = await file.text();
    const data = parseCSV(text);
    
    const result: ImportResult = {
      success: 0,
      errors: [],
      duplicates: 0
    };

    for (const row of data) {
      try {
        // Validate required fields
        if (!row.name || !row.email || !row.phone || !row.address || !row.city || !row.postcode) {
          result.errors.push(`Row with name "${row.name || 'Unknown'}" missing required fields (name, email, phone, address, city, postcode)`);
          continue;
        }

        // Map CSV columns to database fields
        const schoolData = {
          name: row.name,
          address: row.address,
          city: row.city,
          postcode: row.postcode,
          phone: row.phone,
          email: row.email,
          website: row.website || '',
          contact_person: row.contact_person || '',
          notes: row.notes || ''
        };

        await addSchool(schoolData);
        result.success++;
      } catch (error: any) {
        if (error.message?.includes('duplicate') || error.code === '23505') {
          result.duplicates++;
        } else {
          result.errors.push(`Error importing "${row.name}": ${error.message}`);
        }
      }
    }

    setResult(result);
    setImporting(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setResult(null);
    } else {
      alert('Please select a CSV file');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Import Schools from CSV</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">How to import schools:</h4>
            <ol className="list-decimal list-inside text-sm text-blue-800 space-y-1">
              <li>Export your Excel spreadsheet as a CSV file</li>
              <li>Download our CSV template to see the required format</li>
              <li>Make sure your CSV has the same column headers as the template</li>
              <li>Required fields: name, email, phone, address, city, postcode</li>
              <li>Upload your CSV file and click Import</li>
            </ol>
          </div>

          {/* Download Template */}
          <div className="flex justify-center">
            <button
              onClick={downloadTemplate}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Download className="h-4 w-4 mr-2" />
              Download CSV Template
            </button>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select CSV File
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <span>Upload a CSV file</span>
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">CSV files only</p>
              </div>
            </div>
            {file && (
              <p className="mt-2 text-sm text-gray-600">
                Selected: {file.name}
              </p>
            )}
          </div>

          {/* Import Results */}
          {result && (
            <div className="space-y-3">
              {result.success > 0 && (
                <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-md">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-green-800">
                    Successfully imported {result.success} schools
                  </span>
                </div>
              )}
              
              {result.duplicates > 0 && (
                <div className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                  <span className="text-yellow-800">
                    Skipped {result.duplicates} duplicate schools
                  </span>
                </div>
              )}

              {result.errors.length > 0 && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <div className="flex items-center mb-2">
                    <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                    <span className="text-red-800 font-medium">
                      {result.errors.length} errors occurred:
                    </span>
                  </div>
                  <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                    {result.errors.slice(0, 5).map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                    {result.errors.length > 5 && (
                      <li>... and {result.errors.length - 5} more errors</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {result ? 'Close' : 'Cancel'}
            </button>
            {!result && (
              <button
                onClick={handleImport}
                disabled={!file || importing}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {importing ? 'Importing...' : 'Import Schools'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}