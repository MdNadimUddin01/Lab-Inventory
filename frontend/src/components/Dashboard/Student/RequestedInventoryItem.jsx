import React, { useState } from "react";
import {
  Search,
  Filter,
  Microscope,
  Monitor,
  HardDrive,
  Beaker,
  View,
} from "lucide-react";
import { Link } from "react-router-dom";

function RequestedInventoryItem() {
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
      icon: <Microscope size={20} />,
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
      icon: <Monitor size={20} />,
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
      icon: <HardDrive size={20} />,
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
      icon: <Beaker size={20} />,
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
      icon: <HardDrive size={20} />,
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
      icon: <Microscope size={20} />,
    },
  ]);
  return (
    <div className="text-black p-10">
      <ProductsHeader />
      <SearchFilters />
      <ProductsList inventory={inventory} />
    </div>
  );
}

const ProductsHeader = () => {
  return (
    <div className="container flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Requested Inventory</h1>
    </div>
  );
};

const SearchFilters = () => {
  const categories = [
    "All Equipment",
    "Chemistry Equipment",
    "Biology Equipment",
    "Computer Hardware",
    "Electronics",
    "Physics Apparatus",
    "General Tools",
  ];

  const statuses = [
    "All Statuses",
    "Available",
    "In Use",
    "Under Maintenance",
    "Damaged",
    "Calibration Required",
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Equipment");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");

  return (
    <div className="bg-gray-50 p-5 rounded-xl mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium mb-1 block">
            Search Equipment
          </label>
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by name, ID, or department..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full md:w-64">
          <label className="text-sm font-medium mb-1 block">Category</label>
          <div className="relative">
            <select
              className="w-full border rounded-lg p-2 appearance-none pl-4 pr-8"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <Filter
              size={16}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        <div className="w-full md:w-64">
          <label className="text-sm font-medium mb-1 block">Status</label>
          <div className="relative">
            <select
              className="w-full border rounded-lg p-2 appearance-none pl-4 pr-8"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <Filter
              size={16}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductsList = ({ inventory }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Equipment
            </th>

            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Department/Location
            </th>

            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Maintenance
            </th>

            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {inventory.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-center whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                    {item.icon}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {item.name}
                    </div>
                    <div className="text-sm text-gray-500">{item.itemId}</div>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4 text-center whitespace-nowrap">
                <div className="text-sm text-gray-900">{item.department}</div>
                <div className="text-sm text-gray-500">{item.location}</div>
              </td>

              <td className="px-6 py-4 text-center whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  Last: {item.lastMaintenance}
                </div>
                <div className="text-sm text-gray-500">
                  Next: {item.nextMaintenance}
                </div>
              </td>

              <td className="px-6 py-4 text-center bg-white whitespace-nowrap text-sm font-medium ">
                <div className="flex justify-end space-x-3  py-2 px-3 rounded-lg cursor-pointer">
                  <Link
                    to={"student/123"}
                    className="flex gap-2 items-center justify-center p-1.5 rounded-md bg-white hover:bg-red-50 border border-red-200 transition-colors duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 cursor-pointer focus:ring-red-300"
                  >
                    <View size={24} color="#000000" />
                    <span>View Student</span>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestedInventoryItem;
