import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronDown, FaSignOutAlt, FaUser } from "react-icons/fa";
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
    <div className="block md:hidden">
      <button
        className="flex justify-center py-2 px-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5"
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
            className="w-5 h-5"
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
        <div className="absolute left-0 right-0 top-16 z-50 bg-white p-4 shadow-md">
          <nav>
            <ul className="space-y-2">
              {data.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.to}
                    className="block rounded-md px-3 py-2 transition duration-200 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    navigate("/signup");
                    setIsOpen(false);
                  }}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:-translate-y-0.5"
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

const LabFlaskIcon = ({
  size = 24,
  color = "currentColor",
  className = "",
  ...props
}) => {
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
  const user = JSON.parse(localStorage.getItem("user")) ?? null;
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const data = [
    {
      title: "Inventory",
      to: "/inventory",
    },
  ];

  const handleClickOutside = (e) => {
    if (isDropdownOpen && !e.target.closest(".user-dropdown")) {
      setIsDropdownOpen(false);
    }
  };

  // Add event listener for clicking outside dropdown
  useState(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header className="sticky top-0 z-10 w-full bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="mr-2 flex items-center justify-between gap-1 text-lg font-bold text-blue-600 sm:gap-2 sm:text-xl">
              <GiAstrolabe className="h-8 w-8" />
              <span className="hidden sm:inline">QuantumRack</span>
            </div>
          </Link>
          <nav className="hidden md:ml-8 md:block">
            <ul className="flex space-x-6">
              {data.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.to}
                    className="text-gray-600 transition duration-200 hover:text-blue-600"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* If user is not logged in - show on desktop */}
          {!user && (
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/signin"
                className="text-gray-600 transition duration-200 hover:text-blue-600"
              >
                Login
              </Link>
              <button
                onClick={() => navigate("/signup")}
                className="rounded-lg border border-transparent bg-gradient-to-r from-blue-600 to-indigo-700 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:from-blue-700 hover:to-indigo-800 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Get Started
              </button>
            </div>
          )}

          {/* User profile dropdown - for both mobile and desktop */}
          {user && (
            <div className="relative user-dropdown">
              <button
                className="flex items-center space-x-1 rounded px-2 py-1 hover:bg-gray-100 sm:space-x-2"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                  <FaUser className="h-4 w-4 text-white" />
                </div>
                <span className="hidden font-medium text-gray-700 sm:inline">
                  {user.name}
                </span>
                <FaChevronDown className="h-3 w-3 text-gray-500" />
              </button>

              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md border border-gray-200 bg-white py-2 shadow-lg z-10">
                  <Link
                    onClick={() => setIsDropdownOpen(false)}
                    to={user.role === "Admin" ? "admin-dashboard" : "student-dashboard"}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FaUser className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                  <hr className="my-1 border-gray-200" />
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      localStorage.removeItem("user");
                      navigate("/");
                    }}
                    className="flex w-full cursor-pointer items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <FaSignOutAlt className="mr-2 h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile navigation */}
         {!user && <MobileNav />}
        </div>
      </div>
    </header>
  );
};

export default Header;