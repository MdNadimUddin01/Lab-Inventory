import React from 'react'
import {Outlet} from "react-router-dom"
import Sidebar from '../../components/Dashboard/Common/Sidebar'
import { Boxes, ClipboardList, GraduationCap, Home, PackageCheck , PackagePlus  } from 'lucide-react';


function Admin() {
  const user = JSON.parse(localStorage.getItem("user")) ?? null
  const SidebarData = [
    {
      to: "/",
      icon: <Home size={24} />,
      label: "Home",
      active: "/",
    },
    {
      to: "addInventoryItem",
      icon: <PackagePlus  size={24} />,
      label: "Add Inventory Item",
      active: "/admin-dashboard/addInventoryItem",
    },
    {
      to: "inventory",
      icon: <Boxes size={24} />,
      label: "Inventory",
      active: "/admin-dashboard/inventory",
    },
    {
      to: "requestedInventory",
      icon: <ClipboardList size={24} />,
      label: "Requested Inventory",
      active: "/admin-dashboard/requestedInventory",
    },
    {
      to: "issuedInventory",
      icon: <PackageCheck size={24} />,
      label: "Issued Inventory",
      active: "/admin-dashboard/issuedInventory",
    },
    {
      to: "student",
      icon: <GraduationCap size={24} />,
      label: "Student",
      active: "/admin-dashboard/student",
    },
    
  ];
  return (
   <div>
      {user && <div className="min-h-screen rounded-3xl  flex">
      {/* <div className=" overflow-hidden shadow-xl flex"> */}
        <div className='sm:w-64 rounded-3xl w-0'><Sidebar title="Admin Dashboard" SidebarData={SidebarData} /></div>
        
        
        {/* Main Content - Outlet will render child routes here */}
        <div className="flex overflow-scroll  item-center justify-center p-6 w-full">
          <Outlet />
        </div>
      {/* </div> */}
    </div>}

    </div>
  )
}

export default Admin
