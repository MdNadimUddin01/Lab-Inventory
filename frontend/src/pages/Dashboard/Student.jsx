import { ClipboardList, Home, PackageCheck } from "lucide-react";
import React from "react";
import Sidebar from "../../components/Dashboard/Common/Sidebar";
import { Outlet } from "react-router-dom";

function Student() {

  const SidebarData = [
    {
      to: "/",
      icon: <Home size={24} />,
      label: "Home",
      active: "/",
    },
    {
      to: "requestedInventory",
      icon: <ClipboardList size={24} />,
      label: "Requested Inventory",
      active: "/student-dashboard/requestedInventory",
    },
    {
      to: "issuedInventory",
      icon: <PackageCheck size={24} />,
      label: "Issued Inventory",
      active: "/student-dashboard/issuedInventory",
    },
    
  ];

  return (
    <div>
      <div className="min-h-screen rounded-3xl  flex">
        {/* <div className=" overflow-hidden shadow-xl flex"> */}
        <div className="w-64 rounded-3xl ">
          <Sidebar title="Student Dashboard" SidebarData={SidebarData} />
        </div>

        {/* Main Content - Outlet will render child routes here */}
        <div className="flex  item-center justify-center p-6 w-full">
          <Outlet />
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}

export default Student;
