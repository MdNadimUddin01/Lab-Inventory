import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiAstrolabe } from "react-icons/gi";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const data = [
    {
      title: "Inventory",
      to: "/inventory",
    },
    {
      title: "Equipment",
      to: "/equipment",
    },
    {
      title: "Chemicals",
      to: "/chemicals",
    },
    {
      title: "Reports",
      to: "/reports",
    },
    {
      title: "Support",
      to: "/support",
    },
    {
      title: "Login",
      to: "/signin",
    },
  ];

  return (
    <div className="md:hidden">
      <button
        className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:-translate-y-0.5`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-md p-4 z-50">
          <nav>
            <ul className="space-y-2">
              {data.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.to}
                    className="block px-3 py-2 rounded-md hover:bg-gray-100 transition duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={() => navigate("/signup")}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:-translate-y-0.5`}
                >
                  Get Started
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

const LabFlaskIcon = ({ size = 24, color = "currentColor", className = "", ...props }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      width={size} 
      height={size} 
      fill="none" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Flask body */}
      <path d="M8 3h8v3.5c0 .8-.3 1.5-.8 2l-3.2 3.2V17l4 4H8l4-4v-5.3l-3.2-3.2c-.5-.5-.8-1.2-.8-2V3z" />
      
      {/* Flask liquid */}
      <path d="M8 17c0-2 1-3 3-3h2c2 0 3 1 3 3" strokeDasharray="1,1" />
      
      {/* Flask neck */}
      <line x1="8" y1="3" x2="16" y2="3" />
      
      {/* Bubbles */}
      <circle cx="12" cy="14" r="0.5" />
      <circle cx="14" cy="15" r="0.5" />
      <circle cx="13" cy="12" r="0.5" />
    </svg>
  );
};


const Header = () => {
  const navigate = useNavigate();
  const data = [
    {
      title: "Inventory",
      to: "/inventory",
    },
    {
      title: "Reports",
      to: "/reports",
    },
    {
      title: "Support",
      to: "/support",
    },
    {
      title: "Login",
      to: "/signin",
    },
  ];

  return (
    <header className="bg-white w-screen shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link to="/">
            <div className="text-xl font-bold text-blue-600 mr-8 flex items-center justify-between gap-2">
              <GiAstrolabe className="w-10 h-10"/>
              <span>LabInventory</span>
            </div>
          </Link>
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {data.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.to}
                    className="text-gray-600 hover:text-blue-600 transition duration-200"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/signin"
            className="text-gray-600 hover:text-blue-600 transition duration-200"
          >
            Login
          </Link>
          <button
            onClick={() => {
              navigate("/signup");
            }}
            className={`flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:-translate-y-0.5 cursor-pointer`}
          >
            Get Started
          </button>
        </div>
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
