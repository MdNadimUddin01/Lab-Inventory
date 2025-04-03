import React, { useState } from 'react';
import { Search, Filter, Download, Edit, Trash2, PlusCircle, Beaker, Microscope, Monitor, HardDrive, AlertCircle, CheckCircle } from 'lucide-react';

function LabInventoryManagement() {
  // Categories for lab equipment
 

  // Sample inventory data
  const [inventory, setInventory] = useState([
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
      icon: <Microscope size={20} />
    },
    {
      id: 2,
      name: "Dell XPS 15 Laptop",
      itemId: "IT-COMP-054",
      category: "Computer Hardware",
      department: "Computer Science",
      location: "CS Lab 201",
      status: "In Use",
      lastMaintenance: "20 Jan 2025",
      nextMaintenance: "20 Jul 2025",
      purchaseDate: "05 Jun 2024",
      quantity: 25,
      available: 3,
      icon: <Monitor size={20} />
    },
    {
      id: 3,
      name: "Digital Multimeter",
      itemId: "PHYS-ELEC-028",
      category: "Physics Apparatus",
      department: "Physics",
      location: "Physics Lab 305",
      status: "Under Maintenance",
      lastMaintenance: "28 Feb 2025",
      nextMaintenance: "28 Aug 2025",
      purchaseDate: "12 Sep 2023",
      quantity: 15,
      available: 10,
      icon: <HardDrive size={20} />
    },
    {
      id: 4,
      name: "Bunsen Burner",
      itemId: "CHEM-EQUIP-112",
      category: "Chemistry Equipment",
      department: "Chemistry",
      location: "Chem Lab 103",
      status: "Available",
      lastMaintenance: "15 Dec 2024",
      nextMaintenance: "15 Jun 2025",
      purchaseDate: "22 Jul 2022",
      quantity: 30,
      available: 25,
      icon: <Beaker size={20} />
    },
    {
      id: 5,
      name: "Oscilloscope",
      itemId: "PHYS-ELEC-046",
      category: "Physics Apparatus",
      department: "Electrical Engineering",
      location: "EE Lab 204",
      status: "Calibration Required",
      lastMaintenance: "05 Jan 2025",
      nextMaintenance: "05 Jul 2025",
      purchaseDate: "18 Apr 2024",
      quantity: 10,
      available: 7,
      icon: <HardDrive size={20} />
    },
    {
      id: 6,
      name: "Centrifuge Machine",
      itemId: "BIO-CENT-008",
      category: "Biology Equipment",
      department: "Biotechnology",
      location: "Biotech Lab 301",
      status: "Available",
      lastMaintenance: "22 Feb 2025",
      nextMaintenance: "22 Aug 2025",
      purchaseDate: "10 Nov 2023",
      quantity: 5,
      available: 3,
      icon: <Microscope size={20} />
    }
  ]);

  // Filter states
  
  
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filtered inventory
  const filteredInventory = inventory.filter(item => {
    const matchesCategory = selectedCategory === "All Equipment" || item.category === selectedCategory;
    const matchesStatus = selectedStatus === "All Statuses" || item.status === selectedStatus;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.itemId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredInventory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedInventory = filteredInventory.slice(startIndex, startIndex + itemsPerPage);

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'In Use':
        return 'bg-blue-100 text-blue-800';
      case 'Under Maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'Damaged':
        return 'bg-red-100 text-red-800';
      case 'Calibration Required':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get availability indicator
  const getAvailabilityIndicator = (item) => {
    const percentage = (item.available / item.quantity) * 100;
    if (percentage > 60) {
      return <CheckCircle size={18} className="text-green-500" />;
    } else if (percentage > 20) {
      return <AlertCircle size={18} className="text-yellow-500" />;
    } else {
      return <AlertCircle size={18} className="text-red-500" />;
    }
  };
  
  // Page navigation
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full text-black">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Lab Inventory Management</h1>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 border rounded-lg px-4 py-2">
            <Download size={18} />
            <span>Export</span>
          </button>
          <button className="bg-black text-white rounded-lg px-4 py-2 flex items-center gap-2">
            <PlusCircle size={18} />
            <span>Add Equipment</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
          <p className="text-blue-700 font-medium">Total Equipment</p>
          <p className="text-3xl font-bold mt-2">97</p>
          <p className="text-sm text-blue-600 mt-1">6 categories</p>
        </div>
        <div className="bg-green-50 p-5 rounded-xl border border-green-100">
          <p className="text-green-700 font-medium">Available Items</p>
          <p className="text-3xl font-bold mt-2">56</p>
          <p className="text-sm text-green-600 mt-1">57.7% of total</p>
        </div>
        <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-100">
          <p className="text-yellow-700 font-medium">Maintenance Due</p>
          <p className="text-3xl font-bold mt-2">8</p>
          <p className="text-sm text-yellow-600 mt-1">Next 30 days</p>
        </div>
        <div className="bg-red-50 p-5 rounded-xl border border-red-100">
          <p className="text-red-700 font-medium">Out of Stock</p>
          <p className="text-3xl font-bold mt-2">3</p>
          <p className="text-sm text-red-600 mt-1">Request pending</p>
        </div>
      </div>

      {/* Filters */}
      

      {/* Inventory Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipment</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department/Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Maintenance</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedInventory.length > 0 ? (
              paginatedInventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                        {item.icon}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.itemId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.department}</div>
                    <div className="text-sm text-gray-500">{item.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getAvailabilityIndicator(item)}
                      <span className="ml-2 text-sm text-gray-900">{item.available} / {item.quantity}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Last: {item.lastMaintenance}</div>
                    <div className="text-sm text-gray-500">Next: {item.nextMaintenance}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="p-1 rounded hover:bg-gray-100">
                        <Edit size={18} className="text-blue-600" />
                      </button>
                      <button className="p-1 rounded hover:bg-gray-100">
                        <Trash2 size={18} className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No matching equipment found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredInventory.length > 0 && (
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(startIndex + itemsPerPage, filteredInventory.length)}
            </span>{" "}
            of <span className="font-medium">{filteredInventory.length}</span> results
          </div>
          <div className="flex space-x-1">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Add equipment modal would go here */}
      {/* Edit equipment modal would go here */}
      {/* Delete confirmation modal would go here */}
    </div>
  );
}

export default LabInventoryManagement;