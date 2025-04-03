import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Search,
  ChevronDown,
  Download,
  Edit,
  Home,
  DollarSign,
  BarChart2,
  Package,
  Users,
  Settings,
} from "lucide-react";

function Sidebar() {
  const location = useLocation();

  const SidebarData = [
    {
      to: "/",
      icon: <Home size={20} />,
      label: "Home",
      active: `${location.pathname === "/"}`,
    },
    {
      to: "request",
      icon: <Home size={20} />,
      label: "Request",
      active: `${location.pathname === "/request"}`,
    },
    {
      to: "catalog",
      icon: <Home size={20} />,
      label: "Catalog",
      active: `${location.pathname === "/catalog"}`,
    },
    {
      to: "inventory",
      icon: <Home size={20} />,
      label: "inventory",
      active: `${location.pathname === "/inventory"}`,
    },
    {
      to: "student",
      icon: <Home size={20} />,
      label: "Student",
      active: `${location.pathname === "/student"}`,
    },
  ];
  return (
    <div className="bg-gray-100  text-black w-64 p-6 min-h-screen flex flex-col">
      <div>
        <div className="mb-8">
          <h2 className="font-bold text-sm tracking-wider">
            SUPPLIERS & VENDORS
          </h2>
        </div>

        <nav>
          {SidebarData.map((data) => {
            return (
              <Link to={data.to}>
                <div
                  className={`flex items-center py-3 ${
                    data.active ? "text-gray-600" : "text-black"
                  }`}
                >
                  {data.icon}
                  <span className="ml-3 text-sm">{data.label}</span>
                  {data.active && <ChevronDown size={16} className="ml-auto" />}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="mt-auto py-24">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white">
            S
          </div>
          <span className="ml-2 text-sm font-medium">Sasha Merkel</span>
          <ChevronDown size={16} className="ml-auto" />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
