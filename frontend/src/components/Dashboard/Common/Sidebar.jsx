import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronDown,
  Home,
  ClipboardList,
  PackageCheck,
  Boxes,
  GraduationCap,
  UserCircle,
  ChevronUp,
} from "lucide-react";

function Sidebar({title , SidebarData}) {

  const location = useLocation();

  

  return (
    <div className="shadow-lg fixed text-black w-64 p-6 min-h-screen flex flex-col">
      <div>
        <div className="mb-8">
          <h2 className="font-bold text-sm tracking-wider">
            {title}
          </h2>
        </div>

        <nav>
          {SidebarData.map((data, index) => {
            return (
              <Link to={data.to} key={data.label}>
                <div
                  className={`flex items-center py-3 ${
                    location.pathname === data.active
                      ? "text-blue-600"
                      : "text-gray-600"
                  }`}
                >
                  {data.icon}
                  <span className="ml-3 text-sm">{data.label}</span>
                  {data.active !== location.pathname && (
                    <ChevronDown size={16} className="ml-auto" />
                  )}
                  {data.active === location.pathname && (
                    <ChevronUp size={16} className="ml-auto" />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto py-24">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white">
            <UserCircle size={32} />
          </div>
          <span className="ml-2 text-sm font-medium">Sasha Merkel</span>
          <ChevronDown size={16} className="ml-auto" />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
