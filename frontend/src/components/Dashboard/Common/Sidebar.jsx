import React, { useState, useEffect } from "react";
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
  Menu,
  X
} from "lucide-react";

function Sidebar({ title, SidebarData }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile size
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set on first render
    checkIsMobile();
    
    // Add resize listener
    window.addEventListener("resize", checkIsMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  // Close sidebar when navigating on mobile
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [location.pathname, isMobile]);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`shadow-lg fixed text-black bg-white z-40 w-64 p-6 min-h-screen flex flex-col transition-transform duration-300 ease-in-out ${
          isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'
        }`}
      >
        <div>
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-bold text-sm tracking-wider">
              {title}
            </h2>
            {isMobile && (
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close sidebar"
              >
                <X size={20} />
              </button>
            )}
          </div>

          <nav>
            {SidebarData.map((data) => {
              const isActive = location.pathname === data.active;
              return (
                <Link 
                  to={data.to} 
                  key={data.label}
                  onClick={() => isMobile && setIsOpen(false)}
                >
                  <div
                    className={`flex items-center py-3 px-2 rounded-md hover:bg-gray-100 ${
                      isActive ? "text-blue-600 bg-blue-50" : "text-gray-600"
                    }`}
                  >
                    {data.icon}
                    <span className="ml-3 text-sm font-medium">{data.label}</span>
                    {!isActive && <ChevronDown size={16} className="ml-auto" />}
                    {isActive && <ChevronUp size={16} className="ml-auto" />}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Mobile close button at bottom */}
        {isMobile && (
          <div className="mt-auto pt-6">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200"
            >
              Close Menu
            </button>
          </div>
        )}
      </div>

      {/* Content margin compensation for non-mobile */}
      <div className="hidden md:block w-64"></div>
    </>
  );
}

export default Sidebar;