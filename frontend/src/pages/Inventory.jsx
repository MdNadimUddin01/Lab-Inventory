import React, { useState } from 'react';
import { Package, Search, Filter, CheckCircle, AlertCircle, Settings, Calendar } from 'lucide-react';

const Inventory = () => {
  // Sample inventory data
  const inventoryItems = [
    {
      id: 1,
      name: "Compound Microscope",
      itemId: "BIO-MICRO-001",
      category: "Biology Equipment",
      department: "Life Sciences",
      location: "Bio Lab 102",
      status: "Available",
      lastMaintenance: "10 Feb 2025",
      nextMaintenance: "10 Aug 2025",
      purchaseDate: "15 Mar 2023",
      quantity: 12,
      available: 8,
    },
    {
      id: 2,
      name: "Digital Oscilloscope",
      itemId: "PHYS-OSC-002",
      category: "Physics Equipment",
      department: "Physical Sciences",
      location: "Physics Lab 201",
      status: "In Use",
      lastMaintenance: "05 Jan 2025",
      nextMaintenance: "05 Jul 2025",
      purchaseDate: "20 Sep 2023",
      quantity: 8,
      available: 3,
    },
    {
      id: 3,
      name: "Mass Spectrometer",
      itemId: "CHEM-SPEC-003",
      category: "Chemistry Equipment",
      department: "Chemical Sciences",
      location: "Chem Lab 305",
      status: "Maintenance",
      lastMaintenance: "15 Mar 2025",
      nextMaintenance: "15 Sep 2025",
      purchaseDate: "10 Apr 2023",
      quantity: 4,
      available: 0,
    },
    {
      id: 4,
      name: "3D Printer",
      itemId: "ENG-3DP-004",
      category: "Engineering Equipment",
      department: "Engineering",
      location: "Eng Workshop 405",
      status: "Available",
      lastMaintenance: "20 Dec 2024",
      nextMaintenance: "20 Jun 2025",
      purchaseDate: "05 May 2023",
      quantity: 6,
      available: 4,
    },
    {
      id: 5,
      name: "DNA Sequencer",
      itemId: "BIO-SEQ-005",
      category: "Biology Equipment",
      department: "Life Sciences",
      location: "Bio Lab 104",
      status: "Available",
      lastMaintenance: "25 Feb 2025",
      nextMaintenance: "25 Aug 2025",
      purchaseDate: "12 Jun 2023",
      quantity: 2,
      available: 1,
    },
    {
      id: 6,
      name: "Gas Chromatograph",
      itemId: "CHEM-GC-006",
      category: "Chemistry Equipment",
      department: "Chemical Sciences",
      location: "Chem Lab 302",
      status: "In Use",
      lastMaintenance: "15 Jan 2025",
      nextMaintenance: "15 Jul 2025",
      purchaseDate: "08 Aug 2023",
      quantity: 3,
      available: 0,
    }
  ];

  // State for search functionality
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter items based on search term
  const filteredItems = inventoryItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.itemId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to determine status color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'text-green-600 bg-green-100';
      case 'in use':
        return 'text-blue-600 bg-blue-100';
      case 'maintenance':
        return 'text-yellow-600 bg-yellow-100';
      case 'out of stock':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  // Function to determine status icon
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'available':
        return <CheckCircle className="w-4 h-4" />;
      case 'in use':
        return <Package className="w-4 h-4" />;
      case 'maintenance':
        return <Settings className="w-4 h-4" />;
      case 'out of stock':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header and search */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Inventory Management</h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search items by name, ID, category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2">
              <button className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
            </div>
          </div>
        </div>
        
        {/* Items grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
              {/* Card header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-semibold text-gray-800 text-lg">{item.name}</h2>
                    <p className="text-sm text-gray-500 mt-1">{item.itemId}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getStatusColor(item.status)}`}>
                    {getStatusIcon(item.status)}
                    <span>{item.status}</span>
                  </div>
                </div>
              </div>
              
              {/* Card body */}
              <div className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Category:</span>
                    <span className="text-gray-800 font-medium">{item.category}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Department:</span>
                    <span className="text-gray-800 font-medium">{item.department}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Location:</span>
                    <span className="text-gray-800 font-medium">{item.location}</span>
                  </div>
                  
                  <div className="pt-2 pb-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Available:</span>
                      <span className="text-gray-800 font-medium">{item.available}/{item.quantity}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(item.available / item.quantity) * 100}%` }} 
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-gray-500">Next Maintenance:</span>
                    </div>
                    <span className="text-gray-800 font-medium">{item.nextMaintenance}</span>
                  </div>
                </div>
              </div>
              
              {/* Card footer */}
              <div className="p-4 bg-gray-50 border-t border-gray-100">
                <div className="flex justify-between">
                  <button className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors">
                    Quick View
                  </button>
                  <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow mt-6">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No items found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;