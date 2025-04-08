import React, { useEffect, useState } from "react";
import {
  ClipboardList,
  Calendar,
  CheckCircle,
  AlertCircle,
  Package,
  Settings,
  X,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const InventoryItem = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const [checkoutData, setCheckoutData] = useState({
    dateOfReturn: "",
    costPaid: "",
  });

  async function getData() {
    const { data } = await axios.get(backendUrl + `get/instrument/${id}`);
    console.log("DATA", data.instrument);
    setItem(data.instrument);
  }

  useEffect(() => {
    getData();
  }, []);

  // Function to determine status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "available":
        return "text-green-600 bg-green-100";
      case "in use":
        return "text-blue-600 bg-blue-100";
      case "maintenance":
        return "text-yellow-600 bg-yellow-100";
      case "out of stock":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCheckoutData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function getCookie(name) {
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );
    return match ? match[2] : null;
  }

  const handleCheckout = async () => {
    const toastId = toast.loading(item.available > 0 ? "Issuing" : "Requesting");

    try {
      console.log(checkoutData);
      const token = getCookie("token");
      console.log(token);

      const { data } = await axios.post(
        backendUrl + "issue/instrument/" + id,
        {
          dateOfReturn: checkoutData.dateOfReturn,
          costPaid: parseFloat(checkoutData.costPaid),
          token: token,
        }
      );

      toast.remove(toastId);
      toast.success(data.message);

      console.log(data);
      getData();
      setShowCheckoutModal(false);
      navigate("/student-dashboard");
    } catch (error) {
      toast.remove(toastId);
      toast.error(error.response.data.message);
    }
  };

  // Calculate today's date to set min attribute for date input
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
      {item && (
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-0">
              Inventory Item Details
            </h1>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  navigate(-1);
                }}
                className="px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base cursor-pointer bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Back to List
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Header section with name and status */}
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div className="mb-2 sm:mb-0">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                    {item.instrumentName}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">ID: {item.itemId}</p>
                </div>
                <div
                  className={`px-3 py-1 rounded-full font-medium text-sm mt-2 sm:mt-0 inline-block ${getStatusColor(
                    item.status
                  )}`}
                >
                  {item.status}
                </div>
              </div>
            </div>

            {/* Item details */}
            <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-xs sm:text-sm font-medium text-gray-500 mb-2">
                    BASIC INFORMATION
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
                    <div className="flex items-start">
                      <ClipboardList className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2 sm:mr-3 mt-0.5" />
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">Category</p>
                        <p className="text-sm sm:font-medium text-gray-800">
                          {item.category}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Package className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2 sm:mr-3 mt-0.5" />
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">Department</p>
                        <p className="text-sm sm:font-medium text-gray-800">
                          {item.department}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Package className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2 sm:mr-3 mt-0.5" />
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">Location</p>
                        <p className="text-sm sm:font-medium text-gray-800">
                          {item.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs sm:text-sm font-medium text-gray-500 mb-2">
                    AVAILABILITY
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Package className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2 sm:mr-3" />
                        <p className="text-sm text-gray-800">Total Quantity</p>
                      </div>
                      <p className="font-semibold text-sm sm:text-base text-gray-800">
                        {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3" />
                        <p className="text-sm text-gray-800">Available</p>
                      </div>
                      <p className="font-semibold text-sm sm:text-base text-green-600">
                        {item.available}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mr-2 sm:mr-3" />
                        <p className="text-sm text-gray-800">In Use</p>
                      </div>
                      <p className="font-semibold text-sm sm:text-base text-yellow-600">
                        {item.quantity - item.available}
                      </p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{
                          width: `${(item.available / item.quantity) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-xs sm:text-sm font-medium text-gray-500 mb-2">
                    MAINTENANCE
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
                    <div className="flex items-start">
                      <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2 sm:mr-3 mt-0.5" />
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Last Maintenance
                        </p>
                        <p className="text-sm sm:font-medium text-gray-800">
                          {item.lastMaintenance.substring(0, 10)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2 sm:mr-3 mt-0.5" />
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Next Scheduled Maintenance
                        </p>
                        <p className="text-sm sm:font-medium text-gray-800">
                          {item.nextMaintenance.substring(0, 10)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs sm:text-sm font-medium text-gray-500 mb-2">
                    PURCHASE INFORMATION
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
                    <div className="flex items-start">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2 sm:mr-3 mt-0.5" />
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">Purchase Date</p>
                        <p className="text-sm sm:font-medium text-gray-800">
                          {item.purchaseDate.substring(0, 10)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs sm:text-sm font-medium text-gray-500 mb-2">
                    ACTIONS
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      className="px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm cursor-pointer bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
                      onClick={() => setShowCheckoutModal(true)}
                    >
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      {item.available <= 0 ? "Request" : "Checkout"}
                    </button>
                    <button className="px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm cursor-pointer bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors flex items-center">
                      <Settings className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      Schedule Maintenance
                    </button>
                    <button className="px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm cursor-pointer bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center">
                      <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      Report Issue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Modal */}
          {showCheckoutModal && (
            <div className="fixed inset-0 backdrop-blur-xs bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-4 sm:p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                    Check Out {item.instrumentName}
                  </h3>
                  <button
                    onClick={() => setShowCheckoutModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Return Date
                    </label>
                    <input
                      type="date"
                      name="dateOfReturn"
                      value={checkoutData.dateOfReturn}
                      onChange={handleInputChange}
                      min={today}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Cost Paid
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">₹</span>
                      </div>
                      <input
                        type="number"
                        name="costPaid"
                        value={checkoutData.costPaid}
                        onChange={handleInputChange}
                        step="0.01"
                        min="0"
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="0.00"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 sm:gap-3 pt-4">
                    <button
                      onClick={() => setShowCheckoutModal(false)}
                      className="px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCheckout}
                      className="px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                      disabled={
                        !checkoutData.dateOfReturn || !checkoutData.costPaid
                      }
                    >
                      Confirm Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InventoryItem;









// import React, { useEffect, useState } from "react";
// import {
//   ClipboardList,
//   Calendar,
//   CheckCircle,
//   AlertCircle,
//   Package,
//   Settings,
//   X,
// } from "lucide-react";
// import { useParams, useNavigate, data } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";

// const InventoryItem = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [item, setItem] = useState(null);
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;
//   const [showCheckoutModal, setShowCheckoutModal] = useState(false);

//   const [checkoutData, setCheckoutData] = useState({
//     dateOfReturn: "",
//     costPaid: "",
//   });

//   async function getData() {
//     const { data } = await axios.get(backendUrl + `get/instrument/${id}`);
//     console.log("DATA" ,data.instrument)
//     setItem(data.instrument);
//   }

//   useEffect(() => {
//     getData();
//   }, []);

//   // Function to determine status color
//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case "available":
//         return "text-green-600 bg-green-100";
//       case "in use":
//         return "text-blue-600 bg-blue-100";
//       case "maintenance":
//         return "text-yellow-600 bg-yellow-100";
//       case "out of stock":
//         return "text-red-600 bg-red-100";
//       default:
//         return "text-gray-600 bg-gray-100";
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCheckoutData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   function getCookie(name) {
//     const match = document.cookie.match(
//       new RegExp("(^| )" + name + "=([^;]+)")
//     );
//     return match ? match[2] : null;
//   }

//   const handleCheckout = async () => {
//     const toastId = toast.loading(item.available > 0 ? "Issuing" : "Requesting" )
    
//     try {
//       console.log(checkoutData);
//       const token = getCookie("token");
//       console.log(token)

//       const { data } = await axios.post(
//         backendUrl + "issue/instrument/" + id,
//         {
//           dateOfReturn: checkoutData.dateOfReturn,
//           costPaid: parseFloat(checkoutData.costPaid),
//           token: token,
//         }
//       );

//       toast.remove(toastId)
//       toast.success(data.message);
      
//       console.log(data);
//       getData();
//       setShowCheckoutModal(false);
//       navigate("/student-dashboard")

//     } catch (error) {
//       toast.remove(toastId)
//       toast.error(error.response.data.message);
//       // You might want to show an error message here
//     }

    
//   };

//   // Calculate today's date to set min attribute for date input
//   const today = new Date().toISOString().split("T")[0];

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       {item && (
//         <div className="max-w-4xl mx-auto">
//           <div className="flex items-center justify-between mb-6">
//             <h1 className="text-2xl font-bold text-gray-800">
//               Inventory Item Details
//             </h1>
//             <div className="flex space-x-3">
//               <button
//                 onClick={() => {
//                   navigate(-1);
//                 }}
//                 className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//               >
//                 Back to List
//               </button>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-md overflow-hidden">
//             {/* Header section with name and status */}
//             <div className="p-6 border-b border-gray-200">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <h2 className="text-xl font-semibold text-gray-800">
//                     {item.instrumentName}
//                   </h2>
//                   <p className="text-gray-500 mt-1">ID: {item.itemId}</p>
//                 </div>
//                 <div
//                   className={`px-4 py-1 rounded-full font-medium ${getStatusColor(
//                     item.status
//                   )}`}
//                 >
//                   {item.status}
//                 </div>
//               </div>
//             </div>

//             {/* Item details */}
//             <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-6">
//                 <div>
//                   <h3 className="text-sm font-medium text-gray-500 mb-2">
//                     BASIC INFORMATION
//                   </h3>
//                   <div className="bg-gray-50 rounded-lg p-4 space-y-3">
//                     <div className="flex items-start">
//                       <ClipboardList className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
//                       <div>
//                         <p className="text-sm text-gray-500">Category</p>
//                         <p className="font-medium text-gray-800">
//                           {item.category}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex items-start">
//                       <Package className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
//                       <div>
//                         <p className="text-sm text-gray-500">Department</p>
//                         <p className="font-medium text-gray-800">
//                           {item.department}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex items-start">
//                       <Package className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
//                       <div>
//                         <p className="text-sm text-gray-500">Location</p>
//                         <p className="font-medium text-gray-800">
//                           {item.location}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-sm font-medium text-gray-500 mb-2">
//                     AVAILABILITY
//                   </h3>
//                   <div className="bg-gray-50 rounded-lg p-4 space-y-3">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center">
//                         <Package className="w-5 h-5 text-gray-400 mr-3" />
//                         <p className="text-gray-800">Total Quantity</p>
//                       </div>
//                       <p className="font-semibold text-gray-800">
//                         {item.quantity}
//                       </p>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center">
//                         <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
//                         <p className="text-gray-800">Available</p>
//                       </div>
//                       <p className="font-semibold text-green-600">
//                         {item.available}
//                       </p>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center">
//                         <AlertCircle className="w-5 h-5 text-yellow-500 mr-3" />
//                         <p className="text-gray-800">In Use</p>
//                       </div>
//                       <p className="font-semibold text-yellow-600">
//                         {item.quantity - item.available}
//                       </p>
//                     </div>
//                     <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
//                       <div
//                         className="bg-green-500 h-2 rounded-full"
//                         style={{
//                           width: `${(item.available / item.quantity) * 100}%`,
//                         }}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-6">
//                 <div>
//                   <h3 className="text-sm font-medium text-gray-500 mb-2">
//                     MAINTENANCE
//                   </h3>
//                   <div className="bg-gray-50 rounded-lg p-4 space-y-3">
//                     <div className="flex items-start">
//                       <Settings className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
//                       <div>
//                         <p className="text-sm text-gray-500">
//                           Last Maintenance
//                         </p>
//                         <p className="font-medium text-gray-800">
//                           {item.lastMaintenance.substring(0, 10)}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex items-start">
//                       <Calendar className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
//                       <div>
//                         <p className="text-sm text-gray-500">
//                           Next Scheduled Maintenance
//                         </p>
//                         <p className="font-medium text-gray-800">
//                           {item.nextMaintenance.substring(0, 10)}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-sm font-medium text-gray-500 mb-2">
//                     PURCHASE INFORMATION
//                   </h3>
//                   <div className="bg-gray-50 rounded-lg p-4 space-y-3">
//                     <div className="flex items-start">
//                       <Calendar className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
//                       <div>
//                         <p className="text-sm text-gray-500">Purchase Date</p>
//                         <p className="font-medium text-gray-800">
//                           {item.purchaseDate.substring(0, 10)}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-sm font-medium text-gray-500 mb-2">
//                     ACTIONS
//                   </h3>
//                   <div className="flex flex-wrap gap-2">
//                     <button
//                       className="px-4 py-2 cursor-pointer bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
//                       onClick={() => setShowCheckoutModal(true)}
//                     >
//                       <CheckCircle className="w-4 h-4 mr-2" />
//                       {item.available <= 0 ? "Request" : "Checkout"}
//                     </button>
//                     <button className="px-4 py-2 cursor-pointer bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors flex items-center">
//                       <Settings className="w-4 h-4 mr-2" />
//                       Schedule Maintenance
//                     </button>
//                     <button className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center">
//                       <AlertCircle className="w-4 h-4 mr-2" />
//                       Report Issue
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Checkout Modal */}
//           {showCheckoutModal && (
//             <div className="fixed inset-0 backdrop-blur-xs  bg-opacity-50 flex items-center justify-center z-50">
//               <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="text-lg font-semibold text-gray-800">
//                     Check Out {item.instrumentName}
//                   </h3>
//                   <button
//                     onClick={() => setShowCheckoutModal(false)}
//                     className="text-gray-500 hover:text-gray-700"
//                   >
//                     <X className="w-5 h-5" />
//                   </button>
//                 </div>

//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Return Date
//                     </label>
//                     <input
//                       type="date"
//                       name="dateOfReturn"
//                       value={checkoutData.dateOfReturn}
//                       onChange={handleInputChange}
//                       min={today}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       costPaid
//                     </label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <span className="text-gray-500">₹</span>
//                       </div>
//                       <input
//                         type="number"
//                         name="costPaid"
//                         value={checkoutData.costPaid}
//                         onChange={handleInputChange}
//                         step="0.01"
//                         min="0"
//                         className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="0.00"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="flex justify-end gap-3 pt-4">
//                     <button
//                       onClick={() => setShowCheckoutModal(false)}
//                       className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={handleCheckout}
//                       className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
//                       disabled={
//                         !checkoutData.dateOfReturn || !checkoutData.costPaid
//                       }
//                     >
//                       Confirm Checkout
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default InventoryItem;
