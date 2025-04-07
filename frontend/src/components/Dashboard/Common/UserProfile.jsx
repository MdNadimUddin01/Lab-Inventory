import React from 'react';
import { User, Mail, Lock, UserCircle, Phone } from 'lucide-react';

const UserProfile = () => {
  // Sample user data - this would come from your authentication/user state in a real app

  // const userData = {
  //   name: "Jane Doe",
  //   email: "jane.doe@example.com",
  //   password: "••••••••••",
  //   role: "Administrator",
  //   phoneNumber: "555-123-4567"
  // };

  const userData = JSON.parse(localStorage.getItem("user")) ?? null
  if(userData){
    userData.password = "######"
  }
  return (
    <div className="w-4xl mx-auto py-16">
      {
        userData && <div className=" mx-auto bg-white rounded-lg shadow">
        {/* Profile Header */}
        <div className="bg-blue-600 text-white p-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Profile Information</h1>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors font-medium text-sm">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          {/* User Avatar and Name */}
          <div className="flex flex-col sm:flex-row items-center mb-8 gap-4">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              <UserCircle size={64} />
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-gray-800">{userData.name}</h2>
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mt-2">
                {userData.role}
              </span>
            </div>
          </div>

          {/* User Information List */}
          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-md mr-4">
                <Mail className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Email Address</p>
                <p className="text-gray-800">{userData.email}</p>
              </div>
            </div>

            {/* Password */}
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-md mr-4">
                <Lock className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Password</p>
                <p className="text-gray-800 flex items-center">
                  {userData.password}
                  <button className="ml-2 text-blue-600 text-sm underline">Change</button>
                </p>
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-md mr-4">
                <Phone className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Phone Number</p>
                <p className="text-gray-800">{userData.phoneNumber}</p>
              </div>
            </div>

            {/* Role */}
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-md mr-4">
                <User className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">User Role</p>
                <p className="text-gray-800">{userData.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
    </div>
  );
};

export default UserProfile;