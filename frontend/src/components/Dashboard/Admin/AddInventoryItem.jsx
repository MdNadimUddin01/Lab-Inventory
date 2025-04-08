import React, { useEffect, useState } from "react";
import {
  AlertCircle,
  Check,
  ChevronDown,
  Calendar,
  Package,
  Clipboard,
  MapPin,
  Tag,
  Briefcase,
  Settings,
} from "lucide-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AddInventoryItem = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { id } = useParams() ?? null;
  // console.log("ID : ", id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    instrumentName: "",
    companyType: "",
    category: "",
    department: "",
    location: "",
    status: "Available",
    lastMaintenance: "",
    nextMaintenance: "",
    purchaseDate: "",
    quantity: 0,
    available: 0,
  });

  async function getInstrumentData() {
    const { data } = await axios.get(backendUrl + "get/instrument/" + id);
    console.log("data : " , data)
    setFormData(data.instrument);
  }

  useEffect(() => {
    if (id) {
      getInstrumentData();
    }
  }, []);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === "quantity" || name === "available"
          ? parseInt(value) || 0
          : value,
    });
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.instrumentName.trim())
      newErrors.instrumentName = "Name is required";
    if (!formData.companyType.trim())
      newErrors.companyType = "Company type is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.department.trim())
      newErrors.department = "Department is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (formData.quantity < 0)
      newErrors.quantity = "Quantity cannot be negative";
    if (formData.available < 0)
      newErrors.available = "Available count cannot be negative";
    if (formData.available > formData.quantity)
      newErrors.available = "Available count cannot exceed total quantity";

    return newErrors;
  };

  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      const token = getCookie("token");

      if (id) {
        try {

          console.log("Editing inventory item:", formData);
          

          const instrument = formData
          const { data } = await axios.put(
            backendUrl + "update/instrument/" + id,
            { instrument ,token:token}
          );
          console.log(data);
          navigate("/admin-dashboard/inventory");
        } catch (error) {
          console.error("Error editing item:", error);
        }

        setIsSubmitting(false);

      } else {
        try {
          // Simulate API call

          console.log("Adding new inventory item:", formData);

          // console.log("instrument : " , )
          const instrument = formData
          console.log("instrument Date : " , instrument)
          const { data } = await axios.post(backendUrl + "create/instrument", {
            instrument,
            token:token
          });

          console.log(data);

          // Add ID automatically in a real implementation
          // const newItem = { ...formData, id: Date.now() };

          // Show success state
          setIsSuccess(true);

          // Reset form after 2 seconds
          setTimeout(() => {
            // setFormData({
            //   instrumentName: '',
            //   companyType: '',
            //   category: '',
            //   department: '',
            //   location: '',
            //   status: 'Available',
            //   lastMaintenance: '',
            //   nextMaintenance: '',
            //   purchaseDate: '',
            //   quantity: 0,
            //   available: 0,
            // });
            setIsSuccess(false);
          }, 2000);

          navigate("/admin-dashboard/inventory");
        } catch (error) {
          console.error("Error adding item:", error);
        } finally {
          setIsSubmitting(false);
        }
      }

      

    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6">
        <h1 className="text-2xl font-bold text-white flex items-center">
          <Package className="mr-2" size={24} />
          Add New Inventory Item
        </h1>
        <p className="text-blue-100 mt-1">
          Complete the form below to add a new item to your inventory
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-8">
        {/* Success message */}
        {isSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center text-green-700">
            <Check size={20} className="mr-2 text-green-500" />
            <span>Item has been successfully added to inventory!</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Basic Information */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2 flex items-center">
              <Clipboard className="mr-2 text-blue-600" size={18} />
              Basic Information
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Item Name*
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="instrumentName"
                  value={formData.instrumentName}
                  onChange={handleChange}
                  className={`w-full p-3 pl-10 border rounded-lg bg-gray-50 focus:bg-white transition ${
                    errors.name
                      ? "border-red-300 ring-1 ring-red-300"
                      : "border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                  }`}
                  placeholder="Enter item name"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Tag className="h-5 w-5 text-gray-400" />
                </div>
                {errors.instrumentName && (
                  <div className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.instrumentName}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Type*
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="companyType"
                  value={formData.companyType}
                  onChange={handleChange}
                  placeholder="e.g., HP , ASUS"
                  className={`w-full p-3 pl-10 border rounded-lg bg-gray-50 focus:bg-white transition ${
                    errors.itemId
                      ? "border-red-300 ring-1 ring-red-300"
                      : "border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                  }`}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Clipboard className="h-5 w-5 text-gray-400" />
                </div>
                {errors.companyType && (
                  <div className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.companyType}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category*
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Enter category"
                  className={`w-full p-3 pl-10 border rounded-lg bg-gray-50 focus:bg-white transition ${
                    errors.category
                      ? "border-red-300 ring-1 ring-red-300"
                      : "border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                  }`}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Tag className="h-5 w-5 text-gray-400" />
                </div>
                {errors.category && (
                  <div className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.category}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department*
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="Enter department"
                  className={`w-full p-3 pl-10 border rounded-lg bg-gray-50 focus:bg-white transition ${
                    errors.department
                      ? "border-red-300 ring-1 ring-red-300"
                      : "border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                  }`}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Briefcase className="h-5 w-5 text-gray-400" />
                </div>
                {errors.department && (
                  <div className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.department}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Location and Status */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2 flex items-center">
              <Settings className="mr-2 text-blue-600" size={18} />
              Location & Status
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location*
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter location"
                  className={`w-full p-3 pl-10 border rounded-lg bg-gray-50 focus:bg-white transition ${
                    errors.location
                      ? "border-red-300 ring-1 ring-red-300"
                      : "border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                  }`}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                {errors.location && (
                  <div className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.location}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <div className="relative">
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full p-3 pl-10 pr-10 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400 appearance-none"
                >
                  <option value="Available">Available</option>
                  <option value="In Use">In Use</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Out of Order">Out of Order</option>
                  <option value="Retired">Retired</option>
                </select>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Settings className="h-5 w-5 text-gray-400" />
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Purchase Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="purchaseDate"
                  value={formData.purchaseDate}
                  onChange={handleChange}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Maintenance
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="lastMaintenance"
                    value={formData.lastMaintenance}
                    onChange={handleChange}
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Next Maintenance
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="nextMaintenance"
                    value={formData.nextMaintenance}
                    onChange={handleChange}
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quantity Information */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2 mb-6 flex items-center">
            <Package className="mr-2 text-blue-600" size={18} />
            Quantity Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="0"
                className={`w-full p-3 border rounded-lg bg-gray-50 focus:bg-white transition ${
                  errors.quantity
                    ? "border-red-300 ring-1 ring-red-300"
                    : "border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                }`}
              />
              {errors.quantity && (
                <div className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.quantity}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Available Units
              </label>
              <input
                type="number"
                name="available"
                value={formData.available}
                onChange={handleChange}
                min="0"
                max={formData.quantity}
                className={`w-full p-3 border rounded-lg bg-gray-50 focus:bg-white transition ${
                  errors.available
                    ? "border-red-300 ring-1 ring-red-300"
                    : "border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                }`}
              />
              {errors.available && (
                <div className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.available}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="mt-10 flex justify-end space-x-4 border-t border-gray-100 pt-6">
          <button
            type="button"
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
            onClick={() => {
              setFormData({
                name: "",
                itemId: "",
                category: "",
                department: "",
                location: "",
                status: "Available",
                lastMaintenance: "",
                nextMaintenance: "",
                purchaseDate: "",
                quantity: 0,
                available: 0,
              });
              setErrors({});
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || isSuccess}
            className={`px-6 py-3 rounded-lg flex items-center ${
              isSuccess
                ? "bg-green-500 text-white"
                : "bg-blue-600 text-white hover:bg-blue-700"
            } transition-colors ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting
              ? (id ? "Updating..." : "Adding...")
              : isSuccess
              ? (id ? "Updated Successfully" :"Added Successfully")
              : (id ? "Update Item" :"Add Item")}
            {isSuccess && <Check className="ml-2" size={18} />}

          </button>
        </div>
      </form>
    </div>
  );
};

export default AddInventoryItem;
