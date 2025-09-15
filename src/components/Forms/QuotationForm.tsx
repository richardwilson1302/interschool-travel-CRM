import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Calculator, Plus, Trash2, FileText, CheckCircle, Plane } from 'lucide-react';

interface CostItem {
  id: string;
  description: string;
  pricePerUnit: number;
  unit: string;
  quantityStudents: number;
  quantityAdults: number;
  daysRequired: number;
  subtotal: number;
  isFixed?: boolean;
  manualSubtotal?: number;
}

interface FormData {
  // Tour Details
  schoolName: string;
  partyLeader: string;
  destination: string;
  accommodation: string;
  board: string;
  dateOutUK: string;
  dateBackUK: string;
  pax: number;
  freePlaces: number;
  exchangeRate: number;
  markup: number;
  
  // Cost breakdown
  costItems: CostItem[];
  
  // Calculations
  totalCost: number;
  netTotal: number;
  profit: number;
  pricePerPerson: number;
  profitPerHead: number;
  
  // Currency converter
  euroAmount: number;
  gbpAmount: number;
  
  // Free place calculation
  freePlaceRatio: string;
  calculatedFreePlaces: number;
}

const QuotationForm: React.FC = () => {
  // Predefined cost items that are always present
  const predefinedCostItems: CostItem[] = [
    {
      id: 'fixed-1',
      description: 'Flights',
      pricePerUnit: 0,
      unit: 'Per Person',
      quantityStudents: 0,
      quantityAdults: 0,
      daysRequired: 1,
      subtotal: 0,
      isFixed: true
    },
    {
      id: 'fixed-2',
      description: 'Coach Costs',
      pricePerUnit: 0,
      unit: 'Per Person',
      quantityStudents: 0,
      quantityAdults: 0,
      daysRequired: 1,
      subtotal: 0,
      isFixed: true
    },
    {
      id: 'fixed-3',
      description: 'Train Cost Students',
      pricePerUnit: 0,
      unit: 'Per Person Per Day',
      quantityStudents: 0,
      quantityAdults: 0,
      daysRequired: 1,
      subtotal: 0,
      isFixed: true
    },
    {
      id: 'fixed-4',
      description: 'Train Cost Adults',
      pricePerUnit: 0,
      unit: 'Per Person Per Day',
      quantityStudents: 0,
      quantityAdults: 0,
      daysRequired: 1,
      subtotal: 0,
      isFixed: true
    },
    {
      id: 'fixed-5',
      description: 'UK Airport Transfers',
      pricePerUnit: 0,
      unit: 'Per Person Per Day',
      quantityStudents: 0,
      quantityAdults: 0,
      daysRequired: 1,
      subtotal: 0,
      isFixed: true
    },
    {
      id: 'fixed-6',
      description: 'Ferry Per Crossing',
      pricePerUnit: 0,
      unit: 'Per Person Per Day',
      quantityStudents: 0,
      quantityAdults: 0,
      daysRequired: 1,
      subtotal: 0,
      isFixed: true
    },
    {
      id: 'fixed-7',
      description: 'TOMS',
      pricePerUnit: 0,
      unit: 'Per Group',
      quantityStudents: 0,
      quantityAdults: 0,
      daysRequired: 1,
      subtotal: 0,
      isFixed: true
    },
    {
      id: 'fixed-8',
      description: 'Insurance Students',
      pricePerUnit: 0,
      unit: 'Per Person',
      quantityStudents: 0,
      quantityAdults: 0,
      daysRequired: 1,
      subtotal: 0,
      isFixed: true
    },
    {
      id: 'fixed-9',
      description: 'Insurance Adults',
      pricePerUnit: 0,
      unit: 'Per Person',
      quantityStudents: 0,
      quantityAdults: 0,
      daysRequired: 1,
      subtotal: 0,
      isFixed: true
    },
    {
      id: 'fixed-10',
      description: 'Rep Flight',
      pricePerUnit: 0,
      unit: 'Per Person',
      quantityStudents: 0,
      quantityAdults: 0,
      daysRequired: 1,
      subtotal: 0,
      isFixed: true
    },
    {
      id: 'fixed-11',
      description: 'Rep Wages',
      pricePerUnit: 0,
      unit: 'Per Person',
      quantityStudents: 0,
      quantityAdults: 0,
      daysRequired: 1,
      subtotal: 0,
      isFixed: true
    },
    {
      id: 'fixed-12',
      description: 'Accomodation',
      pricePerUnit: 0,
      unit: 'Per Person',
      quantityStudents: 0,
      quantityAdults: 0,
      daysRequired: 1,
      subtotal: 0,
      isFixed: true
    },
    {
      id: 'fixed-13',
      description: 'Breakfast',
      pricePerUnit: 0,
      unit: 'Per Person',
      quantityStudents: 0,
      quantityAdults: 0,
      daysRequired: 1,
      subtotal: 0,
      isFixed: true
    },
    {
      id: 'fixed-14',
      description: 'Lunch',
      pricePerUnit: 0,
      unit: 'Per Person',
      quantityStudents: 0,
      quantityAdults: 0,
      daysRequired: 1,
      subtotal: 0,
      isFixed: true 
    },
    {
      id: 'fixed-15',
      description: 'Dinner',
      pricePerUnit: 0,
      unit: 'Per Person',
      quantityStudents: 0,
      quantityAdults: 0,
      daysRequired: 1,
      subtotal: 0,
      isFixed: true
    },
    {
      id: 'fixed-16',
      description: 'Tourist Tax Student',
      pricePerUnit: 0,
      unit: 'Per Person',
      quantityStudents: 0,
      quantityAdults: 0,
      daysRequired: 1,
      subtotal: 0,
      isFixed: true
    },
    {
      id: 'fixed-17',
      description: 'Toursit Tax Adult',
      pricePerUnit: 0,
      unit: 'Per Person',
      quantityStudents: 0,
      quantityAdults: 0,
      daysRequired: 1,
      subtotal: 0,
      isFixed: true
    },
    {
      id: 'fixed-18',
      description: 'Local Coach',
      pricePerUnit: 0,
      unit: 'Per Person',
      quantityStudents: 0,
      quantityAdults: 0,
      daysRequired: 1,
      subtotal: 0,
      isFixed: true
     },
     {
      id: 'fixed-19',
      description: 'Public Transport',
      pricePerUnit: 0,
      unit: 'Per Person',
      quantityStudents: 0,
      quantityAdults: 0,
      daysRequired: 1,
      subtotal: 0,
      isFixed: true
     },
     {
      id: 'fixed-20',
      description: 'Airport Transfer',
      pricePerUnit: 0,
      unit: 'Per Person',
      quantityStudents: 0,
      quantityAdults: 0,
      daysRequired: 1,
      subtotal: 0,
      isFixed: true
     },
     {
      id: 'fixed-21',
      description: 'Rep Accomodation',
      pricePerUnit: 0,
      unit: 'Per Person',
      quantityStudents: 0,
      quantityAdults: 0,
      daysRequired: 1,
      subtotal: 0,
      isFixed: true
     },
     {
      id: 'fixed-22',
      description: 'UK Driver Accomodation',
      pricePerUnit: 0,
      unit: 'Per Person',
      quantityStudents: 0,
      quantityAdults: 0,
      daysRequired: 1,
      subtotal: 0,
      isFixed: true
     },
     {
      id: 'fixed-23',
      description: 'Local Guide',
      pricePerUnit: 0,
      unit: 'Per Person',
      quantityStudents: 0,
      quantityAdults: 0,
      daysRequired: 1,
      subtotal: 0,
      isFixed: true
    }
  ];

  const [formData, setFormData] = useState<FormData>({
    schoolName: '',
    partyLeader: '',
    destination: '',
    accommodation: '',
    board: '',
    dateOutUK: '',
    dateBackUK: '',
    pax: 0,
    freePlaces: 0,
    exchangeRate: 0.85,
    markup: 0,
    costItems: predefinedCostItems,
    totalCost: 0,
    netTotal: 0,
    profit: 0,
    pricePerPerson: 0,
    profitPerHead: 0,
    euroAmount: 0,
    gbpAmount: 0,
    freePlaceRatio: '1:10',
    calculatedFreePlaces: 0
  });

  const unitOptions = [
    'Per Person',
    'Per Person Per Day',
    'Per Crossing',
    'Per Day',
    'Per Group',
    'Single Unit'
  ];

  // Calculate subtotal for each cost item
  const calculateSubtotal = (item: CostItem): number => {
    // For Accommodation item, use manual subtotal if set
    if (item.id === 'fixed-12' && item.manualSubtotal !== undefined) {
      return item.manualSubtotal;
    }
    return item.pricePerUnit * (item.quantityStudents + item.quantityAdults) * item.daysRequired;
  };

  // Update cost item
  const updateCostItem = (id: string, field: keyof CostItem, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      costItems: prev.costItems.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          
          // Handle manual subtotal for Accommodation item
          if (id === 'fixed-12') {
            if (field === 'subtotal') {
              updatedItem.manualSubtotal = typeof value === 'number' ? value : parseFloat(value as string) || 0;
            } else if (field === 'pricePerUnit' || field === 'quantityStudents' || field === 'quantityAdults' || field === 'daysRequired') {
              // Reset manual subtotal when other fields are changed
              updatedItem.manualSubtotal = undefined;
            }
          }
          
          updatedItem.subtotal = calculateSubtotal(updatedItem);
          return updatedItem;
        }
        return item;
      })
    }));
  };

  // Add new cost item
  const addCostItem = () => {
    const newItem: CostItem = {
      id: Date.now().toString(),
      description: '',
      pricePerUnit: 0,
      unit: 'Per Person',
      quantityStudents: 0,
      quantityAdults: 0,
      daysRequired: 1,
      subtotal: 0
    };
    
    setFormData(prev => ({
      ...prev,
      costItems: [...prev.costItems, newItem]
    }));
  };

  // Remove cost item
  const removeCostItem = (id: string) => {
    // Only allow removal of non-fixed items
    const item = formData.costItems.find(item => item.id === id);
    if (item && !item.isFixed) {
      setFormData(prev => ({
        ...prev,
        costItems: prev.costItems.filter(item => item.id !== id)
      }));
    }
  };

  // Calculate totals
  useEffect(() => {
    const totalCost = formData.costItems.reduce((sum, item) => sum + item.subtotal, 0);
    const netTotal = totalCost * (1 + formData.markup / 100);
    const profit = netTotal - totalCost;
    const pricePerPerson = formData.pax > 0 ? netTotal / formData.pax : 0;
    const fullPayingPax = formData.pax - formData.calculatedFreePlaces;
    const profitPerHead = fullPayingPax > 0 ? profit / fullPayingPax : 0;

    setFormData(prev => ({
      ...prev,
      totalCost,
      netTotal,
      profit,
      pricePerPerson,
      profitPerHead
    }));
  }, [formData.costItems, formData.markup, formData.pax, formData.calculatedFreePlaces]);

  // Calculate GBP amount from EUR
  useEffect(() => {
    const gbpAmount = formData.euroAmount * formData.exchangeRate;
    setFormData(prev => ({
      ...prev,
      gbpAmount: Math.round(gbpAmount * 100) / 100
    }));
  }, [formData.euroAmount, formData.exchangeRate]);

  // Calculate free places
  useEffect(() => {
    if (formData.freePlaceRatio && formData.pax > 0) {
      const ratio = formData.freePlaceRatio.split(':');
      if (ratio.length === 2) {
        const freePlaceNum = parseInt(ratio[0]);
        const studentNum = parseInt(ratio[1]);
        const calculatedFreePlaces = Math.floor(formData.pax / studentNum) * freePlaceNum;
        setFormData(prev => ({
          ...prev,
          calculatedFreePlaces
        }));
      }
    }
  }, [formData.freePlaceRatio, formData.pax]);

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Quotation submitted:', formData);
    alert('Quotation saved successfully!');
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <Plane className="mr-3 text-blue-600" size={32} />
          Educational Tour Quotation
        </h1>
        <p className="text-gray-600">Complete this form to generate a comprehensive tour quotation with detailed cost breakdown</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Your Tour Details Section */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-900 mb-6 flex items-center">
            <Users className="mr-2" size={24} />
            Your Tour Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">School Name</label>
              <input
                type="text"
                value={formData.schoolName}
                onChange={(e) => handleInputChange('schoolName', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter school name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Party Leader</label>
              <input
                type="text"
                value={formData.partyLeader}
                onChange={(e) => handleInputChange('partyLeader', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter party leader name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <MapPin className="mr-1" size={16} />
                Destination
              </label>
              <input
                type="text"
                value={formData.destination}
                onChange={(e) => handleInputChange('destination', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Paris, France"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Accommodation</label>
              <input
                type="text"
                value={formData.accommodation}
                onChange={(e) => handleInputChange('accommodation', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Hotel Europa"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Board</label>
              <input
                type="text"
                value={formData.board}
                onChange={(e) => handleInputChange('board', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Half Board"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pax</label>
              <input
                type="number"
                value={formData.pax}
                onChange={(e) => handleInputChange('pax', parseInt(e.target.value) || 0)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                placeholder="Total students + teachers"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Calendar className="mr-1" size={16} />
                Date Out of UK
              </label>
              <input
                type="date"
                value={formData.dateOutUK}
                onChange={(e) => handleInputChange('dateOutUK', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Calendar className="mr-1" size={16} />
                Date Back into UK
              </label>
              <input
                type="date"
                value={formData.dateBackUK}
                onChange={(e) => handleInputChange('dateBackUK', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Free Places</label>
              <input
                type="number"
                value={formData.freePlaces}
                onChange={(e) => handleInputChange('freePlaces', parseInt(e.target.value) || 0)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">X/R (EUR to GBP)</label>
              <input
                type="number"
                value={formData.exchangeRate}
                onChange={(e) => handleInputChange('exchangeRate', parseFloat(e.target.value) || 0)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                step="0.01"
                min="0"
                placeholder="0.85"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Markup (%)</label>
              <input
                type="number"
                value={formData.markup}
                onChange={(e) => handleInputChange('markup', parseFloat(e.target.value) || 0)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                step="0.1"
                min="0"
                placeholder="15"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Free Place Ratio</label>
              <input
                type="text"
                value={formData.freePlaceRatio}
                onChange={(e) => handleInputChange('freePlaceRatio', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="1:10"
              />
            </div>
          </div>
        </div>

        {/* Cost Breakdown Section */}
        <div className="bg-green-50 rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-green-900 flex items-center">
              <Calculator className="mr-2" size={24} />
              Cost Breakdown
            </h2>
            <button
              type="button"
              onClick={addCostItem}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center transition-colors duration-200"
            >
              <Plus className="mr-1" size={16} />
              Add Item
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Item Description</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Price Per Unit (£)</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Unit</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Qty Students</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Qty Adults</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Days Required</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Subtotal (£)</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {formData.costItems.map((item, index) => (
                  <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 border-b">
                      {item.isFixed ? (
                        <div className="p-2 font-medium text-gray-700 bg-gray-50 rounded">
                          {item.description}
                        </div>
                      ) : (
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => updateCostItem(item.id, 'description', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="e.g., Flight, Coach, Entrance"
                        />
                      )}
                    </td>
                    <td className="px-4 py-3 border-b">
                      <input
                        type="number"
                        value={item.pricePerUnit}
                        onChange={(e) => updateCostItem(item.id, 'pricePerUnit', parseFloat(e.target.value) || 0)}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        step="0.01"
                        min="0"
                      />
                    </td>
                    <td className="px-4 py-3 border-b">
                      {item.isFixed ? (
                        <div className="p-2 text-gray-700 bg-gray-50 rounded">
                          {item.unit}
                        </div>
                      ) : (
                        <select
                          value={item.unit}
                          onChange={(e) => updateCostItem(item.id, 'unit', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          {unitOptions.map(unit => (
                            <option key={unit} value={unit}>{unit}</option>
                          ))}
                        </select>
                      )}
                    </td>
                    <td className="px-4 py-3 border-b">
                      <input
                        type="number"
                        value={item.quantityStudents}
                        onChange={(e) => updateCostItem(item.id, 'quantityStudents', parseInt(e.target.value) || 0)}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        min="0"
                      />
                    </td>
                    <td className="px-4 py-3 border-b">
                      <input
                        type="number"
                        value={item.quantityAdults}
                        onChange={(e) => updateCostItem(item.id, 'quantityAdults', parseInt(e.target.value) || 0)}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        min="0"
                      />
                    </td>
                    <td className="px-4 py-3 border-b">
                      <input
                        type="number"
                        value={item.daysRequired}
                        onChange={(e) => updateCostItem(item.id, 'daysRequired', parseInt(e.target.value) || 1)}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        min="1"
                      />
                    </td>
                    <td className="px-4 py-3 border-b">
                      {item.id === 'fixed-12' ? (
                        <input
                          type="number"
                          value={item.manualSubtotal !== undefined ? item.manualSubtotal : item.subtotal}
                          onChange={(e) => updateCostItem(item.id, 'subtotal', parseFloat(e.target.value) || 0)}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent font-semibold text-green-600"
                          step="0.01"
                          min="0"
                        />
                      ) : (
                        <div className="font-semibold text-green-600">
                          £{item.subtotal.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 border-b text-center">
                      {!item.isFixed && (
                        <button
                          type="button"
                          onClick={() => removeCostItem(item.id)}
                          className="text-red-600 hover:text-red-800 transition-colors duration-200"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Calculations Section */}
        <div className="bg-yellow-50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-yellow-900 mb-6 flex items-center">
            <Calculator className="mr-2" size={24} />
            Calculations
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-4 rounded-lg border border-yellow-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Cost</label>
              <div className="text-2xl font-bold text-gray-900">
                £{formData.totalCost.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-yellow-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">Net Total (with markup)</label>
              <div className="text-2xl font-bold text-blue-600">
                £{formData.netTotal.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-yellow-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">Profit</label>
              <div className="text-2xl font-bold text-emerald-600">
                £{formData.profit.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-yellow-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Per Person</label>
              <div className="text-2xl font-bold text-green-600">
                £{formData.pricePerPerson.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <div className="bg-white p-4 rounded-lg border border-yellow-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">Calculated Free Places</label>
              <div className="text-2xl font-bold text-purple-600">
                {formData.calculatedFreePlaces}
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-yellow-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">Profit Per Head</label>
              <div className="text-2xl font-bold text-orange-600">
                £{formData.profitPerHead.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        </div>

        {/* Currency Converter Section */}
        <div className="bg-purple-50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-purple-900 mb-6 flex items-center">
            <Calculator className="mr-2" size={24} />
            Currency Converter
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg border border-purple-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount in Euros (€)</label>
              <input
                type="number"
                value={formData.euroAmount}
                onChange={(e) => handleInputChange('euroAmount', parseFloat(e.target.value) || 0)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                step="0.01"
                min="0"
                placeholder="0.00"
              />
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-purple-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">Exchange Rate (EUR to GBP)</label>
              <div className="text-lg font-semibold text-gray-900 p-3 bg-gray-50 rounded-md">
                {formData.exchangeRate}
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-purple-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount in Pounds (£)</label>
              <div className="text-lg font-semibold text-purple-600 p-3 bg-gray-50 rounded-md">
                £{formData.gbpAmount.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        </div>

        {/* Summary and Actions */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <FileText className="mr-2" size={24} />
            Quotation Summary
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-sm text-gray-600">Total Participants</div>
              <div className="text-xl font-bold text-gray-900">{formData.pax}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Free Places</div>
              <div className="text-xl font-bold text-green-600">{formData.calculatedFreePlaces}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Net Total</div>
              <div className="text-xl font-bold text-blue-600">£{formData.netTotal.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Price Per Person</div>
              <div className="text-xl font-bold text-purple-600">£{formData.pricePerPerson.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200 flex items-center justify-center"
            >
              <CheckCircle className="mr-2" size={20} />
              Save Quotation
            </button>
            
            <button
              type="button"
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200"
              onClick={() => window.print()}
            >
              Print Quotation
            </button>
            
            <button
              type="button"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200"
              onClick={() => {
                const dataStr = JSON.stringify(formData, null, 2);
                const dataBlob = new Blob([dataStr], { type: 'application/json' });
                const url = URL.createObjectURL(dataBlob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `quotation-${formData.schoolName || 'unnamed'}-${new Date().toISOString().split('T')[0]}.json`;
                link.click();
                URL.revokeObjectURL(url);
              }}
            >
              Export Data
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default QuotationForm;