import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Microscope,
  Monitor,
  HardDrive,
  Beaker,
  View,
  Package,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

function IssuedInventory() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [inventory, setInventory] = useState([]);

  async function getData() {
    try {
      const { data } = await axios.get(
        backendUrl + "get/all/issued/instrument"
      );

      const groupedData = {};
      const instruments = data.issuedInstrument;
      let issuedInventory = [];

      for (const entry of instruments) {
        const instrumentId = entry.instrumentDetails._id;

        if (!groupedData[instrumentId]) {
          groupedData[instrumentId] = {
            instrumentDetails: entry.instrumentDetails,
            students: [],
          };
          issuedInventory.push(entry.instrumentDetails);
        }

        groupedData[instrumentId].students.push({...entry.studentDetails , returnDate:entry.dateOfReturn , requestDate:entry.dateOfIssue});
      }
      console.log(groupedData)
      localStorage.setItem("issuedInventory", JSON.stringify(groupedData));
      setInventory(issuedInventory);

    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    getData();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Equipment");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");

  const filteredItems =
    inventory.length > 0
      ? inventory.filter(
          (item) =>
            item.instrumentName
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            item.department.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];

  return (
    <div className="text-black p-10">
      <ProductsHeader />
      <SearchFilters
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        selectedStatus={selectedStatus}
        setSearchQuery={setSearchQuery}
        setSelectedCategory={setSelectedCategory}
        setSelectedStatus={setSelectedStatus}
      />
      <ProductsList inventory={filteredItems} />
    </div>
  );
}

const ProductsHeader = () => {
  return (
    <div className="container flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Issued Inventory</h1>
    </div>
  );
};

const SearchFilters = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
}) => {
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

        {/* <div className="w-full md:w-64">
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
        </div> */}

        {/* <div className="w-full md:w-64">
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
        </div> */}
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
            <tr key={item._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-center whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                    {(
                      item.instrumentName[0] + item.instrumentName[1]
                    ).toUpperCase()}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {item.instrumentName}
                    </div>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4 text-center whitespace-nowrap">
                <div className="text-sm text-gray-900">{item.department}</div>
                <div className="text-sm text-gray-500">{item.location}</div>
              </td>

              <td className="px-6 py-4 text-center whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  Last: {(new Date(item.lastMaintenance)).toDateString()}
                </div>
                <div className="text-sm text-gray-500">
                  Next: {new Date(item.nextMaintenance).toDateString()}
                </div>
              </td>

              <td className="px-6 py-4 text-center bg-white whitespace-nowrap text-sm font-medium ">
                <div className="flex justify-end space-x-3  py-2 px-3 rounded-lg cursor-pointer">
                  <Link
                    to={item._id}
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

      {inventory.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow mt-6">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No items found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      )}

    </div>
  );
};

export default IssuedInventory;
