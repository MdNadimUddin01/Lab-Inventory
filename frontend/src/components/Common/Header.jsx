import {useState} from "react"
import { Link, useNavigate } from "react-router-dom";

const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const data = [
      {
        "title" : "Features",
        "to" :"#"
      },
      {
        "title" : "Pricing",
        "to" : "#"
      },
      {
        "title" : "Resources",
        "to" : "#"
      },
      {
        "title" : "Support",
        "to" : "#"
      },
      {
        "title" : "Login",
        "to" : "signin"
      }

    ]

    return (
      <div className="md:hidden">
        <button 
          className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:-translate-y-0.5`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
        
        {isOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white shadow-md p-4 z-50">
            <nav>
              <ul className="space-y-2">
                {data.map(item => (
                  <li key={item}>
                    <a 
                      href={item.to} 
                      className="block px-3 py-2 rounded-md hover:bg-gray-100 transition duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
                <li>
                  <button onClick={() => navigate("signup")} className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:-translate-y-0.5`}>
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


const Header = () => {
  const navigate = useNavigate();
  const data = [
    {
      "title" : "Features",
      "to" :"#"
    },
    {
      "title" : "Pricing",
      "to" : "#"
    },
    {
      "title" : "Resources",
      "to" : "#"
    },
    {
      "title" : "Support",
      "to" : "#"
    },
    {
      "title" : "Login",
      "to" : "signin"
    }

  ]

    return (
      <header className="bg-white w-screen shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-xl font-bold text-blue-600 mr-8">LabInventory</div>
            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                {data.map(item => (
                  <li key={item}>
                    <Link to={item.to} className="text-gray-600 hover:text-blue-600 transition duration-200">{item.title}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="signin" className="text-gray-600 hover:text-blue-600 transition duration-200">Login</Link>
            <button onClick={() => {navigate("signup")}} 
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:-translate-y-0.5`}
              >
                Get Started
              </button>
          </div>
          <MobileNav />
        </div>
      </header>
    );
};

  export default Header