import React, { useState } from "react";
import {
  Calendar,
  ArrowLeft,
  User,
  Search,
  Filter,
  ChevronDown,
  Download,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const StudentIssuedTable = () => {
  const [showBackButton, setShowBackButton] = useState(true);
  const { id } = useParams();
  const [search, setSearch] = useState("");

  const issuedInstrument =
    JSON.parse(localStorage.getItem("issuedInventory"))[id] ?? [];

  console.log(issuedInstrument);
  const [activeEquipment, setActiveEquipment] = useState(
    issuedInstrument.instrumentDetails ?? {}
  );

  // Sample student requests data
  const studentRequests =
    issuedInstrument.students.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    }) ?? [];
  console.log(search);
  // Function to format dates
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Returned":
        return "bg-green-100 text-green-800 border border-green-200";
      case "Active":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      case "Requested":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "Scheduled":
        return "bg-purple-100 text-purple-800 border border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-100">
      {/* Header section with gradient */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-lg p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">
              {activeEquipment.instrumentName}
            </h2>
            <p className="mt-1 opacity-80">
              Company Type: {activeEquipment.companyType}
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
            <p className="text-sm">
              <span className="font-medium">Department:</span>{" "}
              {activeEquipment.department}
            </p>
            <p className="text-sm">
              <span className="font-medium">Location:</span>{" "}
              {activeEquipment.location}
            </p>
          </div>
        </div>
      </div>

      {/* Controls section */}
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <button
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors bg-white px-3 py-2 rounded-md shadow-sm border border-gray-200"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Inventory
          </button>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                onChange={(e) => {
                  e.preventDefault();
                  console.log(e.target.value)
                  setSearch(e.target.value);
                }}
                value={search}
                placeholder="Search students..."
                className="pl-9 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
              <Search
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>

            <button className="flex items-center justify-center bg-white border border-gray-200 rounded-md px-4 py-2 text-gray-600 hover:bg-gray-50">
              <Filter size={16} className="mr-2" />
              Filter
              <ChevronDown size={16} className="ml-2" />
            </button>

            {/* <button className="flex items-center justify-center bg-blue-50 border border-blue-200 rounded-md px-4 py-2 text-blue-600 hover:bg-blue-100">
              <Download size={16} className="mr-2" />
              Export
            </button> */}
          </div>
        </div>
      </div>

      {/* Table section */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Issued Student
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm">
                <th className="py-3 px-6 text-left font-semibold border-b">
                  Student
                </th>
                <th className="py-3 px-4 text-left font-semibold border-b">
                  Email
                </th>
                <th className="py-3 px-4 text-left font-semibold border-b">
                  Issued Date
                </th>
                <th className="py-3 px-4 text-left font-semibold border-b">
                  Return Date
                </th>
                <th className="py-3 px-4 text-left font-semibold border-b">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700 divide-y divide-gray-200">
              {studentRequests.map((request) => (
                <tr
                  key={request._id}
                  className="hover:bg-blue-50 transition-colors duration-150"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white mr-3">
                        <User size={20} />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">
                          {request.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {request.email}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <Calendar size={16} className="text-blue-500 mr-2" />
                      {formatDate(request.requestDate)}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <Calendar size={16} className="text-blue-500 mr-2" />
                      {formatDate(request.returnDate)}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        "Active"
                      )}`}
                    >
                      In Use
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
          <span>
            Showing {studentRequests.length} of {studentRequests.length}{" "}
            requests
          </span>
          <div className="flex space-x-1">
            <button className="px-3 py-1 border rounded-md hover:bg-gray-50 text-gray-500">
              Previous
            </button>
            <button className="px-3 py-1 border rounded-md bg-blue-600 text-white border-blue-600">
              1
            </button>
            <button className="px-3 py-1 border rounded-md hover:bg-gray-50 text-gray-500">
              Next
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default StudentIssuedTable;
