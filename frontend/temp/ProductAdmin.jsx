import React, { useEffect, useState } from "react";
import {
  Search,
  ChevronDown,
  Download,
  Edit,
  Filter,
  Microscope,
  Monitor,
  HardDrive,
  Beaker,
  Trash2,
  AlertCircle,
  CheckCircle,
  Package,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast"

function Product() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [inventory, setInventory] = useState([]);

  async function getData() {
    try {
      console.log("HELLO : ")
      const { data } = await axios.get(backendUrl + "get/all/instrument");
      console.log("DATE  : ", data.instrument)
      setInventory(data.instrument);

    } catch (error) {
      console.log(error.message)
    }

  }

  useEffect(() => {
    getData();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Equipment");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");

  const filteredItems = inventory.filter((item) =>
    item.instrumentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.department.toLowerCase().includes(searchQuery.toLowerCase()) 
  
  );

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
      <h1 className="text-3xl font-bold">Products</h1>
      <div className="text-sm">
        Add, view and edit your products all in one place.{" "}
        <span className="text-blue-600">Need help?</span>
      </div>
      <div className="flex space-x-2">
        <Link
          to="/admin-dashboard/addInventoryItem"
          className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:-translate-y-0.5`}
        >
          ADD PRODUCT
        </Link>
      </div>
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

  // setFilterItem(inventory.filter((item) => {
  //   return (
  //     (item.categ)
  //   )
  // }))
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

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800";
      case "In Use":
        return "bg-blue-100 text-blue-800";
      case "Under Maintenance":
        return "bg-yellow-100 text-yellow-800";
      case "Damaged":
        return "bg-red-100 text-red-800";
      case "Calibration Required":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };


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

  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }

  async function handleDelete(id){

    const token = getCookie("token")
    console.log(typeof token)
    try{
      const toastData = toast.loading("deleting");

      const {data} = await axios.delete(backendUrl + "delete/instrument/" + id, {
        data:{token}
      });

      console.log(data);

      toast.remove(toastData);
      toast.success(data.message)

    }catch(error){
      console.log(error);
      toast.remove(toastData);
      toast.error("Deletion failed try again")
    }

  }

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-scroll">
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
              Status
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Quantity
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
              <td className="px-6  text-center py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 font-bold h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                    {(
                      item.instrumentName[0] + item.instrumentName[1]
                    ).toUpperCase()}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {item.instrumentName}
                    </div>
                    <div className="text-sm text-gray-500">{item.itemId}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap">
                <div className="text-sm text-center text-gray-900">
                  {item.department}
                </div>
                <div className="text-sm text-gray-500">{item.location}</div>
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap">
                <span
                  className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap">
                <div className="flex items-center">
                  {getAvailabilityIndicator(item)}
                  <span className="ml-2 text-sm text-gray-900">
                    {item.available} / {item.quantity}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  Last: {item.lastMaintenance.substring(0, 10)}
                </div>
                <div className="text-sm text-gray-500">
                  Next: {item.nextMaintenance.substring(0, 10)}
                </div>
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium">
                <div className="flex justify-end space-x-3  py-2 px-3 rounded-lg shadow-sm">
                  <Link to={"editInventoryItem/" + item._id} className="p-1.5 cursor-pointer rounded-md bg-blue-50 hover:bg-blue-100 transition-colors duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-300">
                    <Edit size={18} className="text-gray-800" />
                  </Link>
                  <button onClick={() => handleDelete(item._id)} className="p-1.5 cursor-pointer rounded-md bg-white hover:bg-red-50 border border-red-200 transition-colors duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-red-300">
                    <Trash2
                      size={18}
                      className="text-red-500 hover:text-red-600"
                    />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {inventory.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow mt-6">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No items found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
    </div>
  );
  
};

export default Product;
