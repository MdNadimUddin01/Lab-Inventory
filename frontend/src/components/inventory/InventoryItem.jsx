import React from 'react';
import { ClipboardList, Calendar, CheckCircle, AlertCircle, Package, Settings } from 'lucide-react';

const InventoryItem = () => {
  // Sample data from your provided item
  const item = {
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
  };

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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Inventory Item Details</h1>
          <div className="flex space-x-3">
            <button className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Back to List
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header section with name and status */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                <p className="text-gray-500 mt-1">ID: {item.itemId}</p>
              </div>
              <div className={`px-4 py-1 rounded-full font-medium ${getStatusColor(item.status)}`}>
                {item.status}
              </div>
            </div>
          </div>

          {/* Item details */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">BASIC INFORMATION</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-start">
                    <ClipboardList className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <p className="font-medium text-gray-800">{item.category}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Package className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Department</p>
                      <p className="font-medium text-gray-800">{item.department}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Package className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium text-gray-800">{item.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">AVAILABILITY</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Package className="w-5 h-5 text-gray-400 mr-3" />
                      <p className="text-gray-800">Total Quantity</p>
                    </div>
                    <p className="font-semibold text-gray-800">{item.quantity}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <p className="text-gray-800">Available</p>
                    </div>
                    <p className="font-semibold text-green-600">{item.available}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 text-yellow-500 mr-3" />
                      <p className="text-gray-800">In Use</p>
                    </div>
                    <p className="font-semibold text-yellow-600">{item.quantity - item.available}</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${(item.available / item.quantity) * 100}%` }} 
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">MAINTENANCE</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-start">
                    <Settings className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Last Maintenance</p>
                      <p className="font-medium text-gray-800">{item.lastMaintenance}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Next Scheduled Maintenance</p>
                      <p className="font-medium text-gray-800">{item.nextMaintenance}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">PURCHASE INFORMATION</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Purchase Date</p>
                      <p className="font-medium text-gray-800">{item.purchaseDate}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">ACTIONS</h3>
                <div className="flex flex-wrap gap-2">
                  <button className="px-4 py-2 cursor-pointer bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Check Out
                  </button>
                  <button className="px-4 py-2 cursor-pointer bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors flex items-center">
                    <Settings className="w-4 h-4 mr-2" />
                    Schedule Maintenance
                  </button>
                  <button className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Report Issue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryItem;