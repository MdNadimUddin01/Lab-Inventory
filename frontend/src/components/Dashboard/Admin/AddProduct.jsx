import React, { useState } from 'react';
import { PlusIcon, XIcon } from 'lucide-react';

const ProductFormModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [product, setProduct] = useState({
    id: '',
    name: '',
    itemId: '',
    category: '',
    department: '',
    location: '',
    status: '',
    lastMaintenance: '',
    nextMaintenance: '',
    purchaseDate: '',
    quantity: '',
    available: '',
    icon: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product submitted:', product);
    // Here you would typically send the data to an API
    setIsModalOpen(false);
  };

  const resetForm = () => {
    setProduct({
      id: '',
      name: '',
      itemId: '',
      category: '',
      department: '',
      location: '',
      status: '',
      lastMaintenance: '',
      nextMaintenance: '',
      purchaseDate: '',
      quantity: '',
      available: '',
      icon: ''
    });
  };

  return (
    <div className="p-4">
      {/* Button to open modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
      >
        <PlusIcon size={20} />
        <span>Add New Product</span>
      </button>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          {/* Modal Content */}
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl transform transition-all animate-fadeIn">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Add New Product
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <XIcon size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* ID Field */}
                  <div className="group">
                    <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors">
                      ID
                    </label>
                    <input
                      type="text"
                      id="id"
                      name="id"
                      value={product.id}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-blue-400"
                    />
                  </div>
                  
                  {/* Name Field */}
                  <div className="group">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={product.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-blue-400"
                    />
                  </div>
                  
                  {/* Item ID Field */}
                  <div className="group">
                    <label htmlFor="itemId" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors">
                      Item ID
                    </label>
                    <input
                      type="text"
                      id="itemId"
                      name="itemId"
                      value={product.itemId}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-blue-400"
                    />
                  </div>
                  
                  {/* Category Field */}
                  <div className="group">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors">
                      Category
                    </label>
                    <input
                      type="text"
                      id="category"
                      name="category"
                      value={product.category}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-blue-400"
                    />
                  </div>
                  
                  {/* Department Field */}
                  <div className="group">
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors">
                      Department
                    </label>
                    <input
                      type="text"
                      id="department"
                      name="department"
                      value={product.department}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-blue-400"
                    />
                  </div>
                  
                  {/* Location Field */}
                  <div className="group">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={product.location}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-blue-400"
                    />
                  </div>
                  
                  {/* Status Field */}
                  <div className="group">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors">
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={product.status}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-blue-400"
                    >
                      <option value="">Select Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="maintenance">Maintenance</option>
                    </select>
                  </div>
                  
                  {/* Last Maintenance Field */}
                  <div className="group">
                    <label htmlFor="lastMaintenance" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors">
                      Last Maintenance
                    </label>
                    <input
                      type="date"
                      id="lastMaintenance"
                      name="lastMaintenance"
                      value={product.lastMaintenance}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-blue-400"
                    />
                  </div>
                  
                  {/* Next Maintenance Field */}
                  <div className="group">
                    <label htmlFor="nextMaintenance" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors">
                      Next Maintenance
                    </label>
                    <input
                      type="date"
                      id="nextMaintenance"
                      name="nextMaintenance"
                      value={product.nextMaintenance}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-blue-400"
                    />
                  </div>
                  
                  {/* Purchase Date Field */}
                  <div className="group">
                    <label htmlFor="purchaseDate" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors">
                      Purchase Date
                    </label>
                    <input
                      type="date"
                      id="purchaseDate"
                      name="purchaseDate"
                      value={product.purchaseDate}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-blue-400"
                    />
                  </div>
                  
                  {/* Quantity Field */}
                  <div className="group">
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors">
                      Quantity
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      value={product.quantity}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-blue-400"
                    />
                  </div>
                  
                  {/* Available Field */}
                  <div className="group">
                    <label htmlFor="available" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors">
                      Available
                    </label>
                    <input
                      type="number"
                      id="available"
                      name="available"
                      value={product.available}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-blue-400"
                    />
                  </div>
                  
                  {/* Icon Field */}
                  <div className="group">
                    <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors">
                      Icon
                    </label>
                    <input
                      type="text"
                      id="icon"
                      name="icon"
                      value={product.icon}
                      onChange={handleChange}
                      placeholder="Icon name or URL"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-blue-400"
                    />
                  </div>
                </div>
                
                {/* Form Actions */}
                <div className="flex justify-end space-x-4 pt-4 border-t">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md hover:shadow-lg transition-all"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFormModal;