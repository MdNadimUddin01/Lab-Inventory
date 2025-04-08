import React ,{useState} from "react";
import {
  Beaker,
  ClipboardList,
  Bell,
  BarChart2,
  Users,
  Shield,

  Phone,
  Mail,
  MapPin,
  ArrowUp,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
} from "lucide-react";


const LandingPage = () => {
  return (
    <>
      <div className="min-h-screen bg-white text-gray-900">
        {/* Hero Section */}

        <div class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div class="container mx-auto px-6 py-16 md:py-24 md:flex items-center justify-between">
            <div class="md:w-1/2 md:pr-8">
              <h1 class="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Streamline Your Lab Equipment Management
              </h1>
              <p class="text-xl mb-6 text-blue-100">
                A comprehensive solution for tracking, maintaining, and
                optimizing your laboratory inventory with ease.
              </p>
              <div class="flex flex-col sm:flex-row gap-4">
                
                <button class="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-blue-50 transition duration-200 flex items-center justify-center cursor-pointer">
                  Get Started <span class="ml-2">→</span>
                </button>
                
              </div>
            </div>
            <div class=" md:w-1/2 mt-10 md:mt-0">
              <div class="bg-white p-6 rounded-lg shadow-xl transform rotate-1">
                <div class="flex flex-col">
                  <div class="flex justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 850 500"
                    >
                      <rect width="840" height="500" fill="#f8fafc" />

                      <rect
                        x="40"
                        y="40"
                        width="355"
                        height="280"
                        rx="6"
                        fill="#1e293b"
                      />
                      <rect
                        x="40"
                        y="40"
                        width="355"
                        height="30"
                        rx="6"
                        fill="#0f172a"
                      />

                      <circle cx="60" cy="55" r="6" fill="#ef4444" />
                      <circle cx="80" cy="55" r="6" fill="#f59e0b" />
                      <circle cx="100" cy="55" r="6" fill="#10b981" />

                      <text
                        x="60"
                        y="95"
                        font-family="monospace"
                        font-size="12"
                        fill="#94a3b8"
                      >
                        1
                      </text>
                      <text
                        x="80"
                        y="95"
                        font-family="monospace"
                        font-size="12"
                        fill="#38bdf8"
                      >
                        import
                      </text>
                      <text
                        x="125"
                        y="95"
                        font-family="monospace"
                        font-size="12"
                        fill="#e2e8f0"
                      >
                        React, {useState} from 'react';
                      </text>

                      <text
                        x="60"
                        y="115"
                        font-family="monospace"
                        font-size="12"
                        fill="#94a3b8"
                      >
                        2
                      </text>
                      <text
                        x="80"
                        y="115"
                        font-family="monospace"
                        font-size="12"
                        fill="#38bdf8"
                      >
                        import
                      </text>
                      <text
                        x="125"
                        y="115"
                        font-family="monospace"
                        font-size="12"
                        fill="#e2e8f0"
                      >
                        axios from 'axios';
                      </text>

                      <text
                        x="60"
                        y="135"
                        font-family="monospace"
                        font-size="12"
                        fill="#94a3b8"
                      >
                        3
                      </text>

                      <text
                        x="60"
                        y="155"
                        font-family="monospace"
                        font-size="12"
                        fill="#94a3b8"
                      >
                        4
                      </text>
                      <text
                        x="80"
                        y="155"
                        font-family="monospace"
                        font-size="12"
                        fill="#38bdf8"
                      >
                        function
                      </text>
                      <text
                        x="135"
                        y="155"
                        font-family="monospace"
                        font-size="12"
                        fill="#fbbf24"
                      >
                        LabEquipmentManager
                      </text>
                      <text
                        x="260"
                        y="155"
                        font-family="monospace"
                        font-size="12"
                        fill="#e2e8f0"
                      >{`() {`}</text>

                      <text
                        x="60"
                        y="175"
                        font-family="monospace"
                        font-size="12"
                        fill="#94a3b8"
                      >
                        5
                      </text>
                      <text
                        x="85"
                        y="175"
                        font-family="monospace"
                        font-size="12"
                        fill="#38bdf8"
                      >
                        const
                      </text>
                      <text
                        x="118"
                        y="175"
                        font-family="monospace"
                        font-size="12"
                        fill="#e2e8f0"
                      >
                        [equipment, setEquipment] = useState([]);
                      </text>

                      <text
                        x="60"
                        y="195"
                        font-family="monospace"
                        font-size="12"
                        fill="#94a3b8"
                      >
                        6
                      </text>
                      <text
                        x="85"
                        y="195"
                        font-family="monospace"
                        font-size="12"
                        fill="#38bdf8"
                      >
                        const
                      </text>
                      <text
                        x="120"
                        y="195"
                        font-family="monospace"
                        font-size="12"
                        fill="#e2e8f0"
                      >
                        [loading, setLoading] = useState(true);
                      </text>

                      <text
                        x="60"
                        y="215"
                        font-family="monospace"
                        font-size="12"
                        fill="#94a3b8"
                      >
                        7
                      </text>

                      <text
                        x="60"
                        y="235"
                        font-family="monospace"
                        font-size="12"
                        fill="#94a3b8"
                      >
                        8
                      </text>
                      <text
                        x="90"
                        y="235"
                        font-family="monospace"
                        font-size="12"
                        fill="#38bdf8"
                      >
                        useEffect
                      </text>
                      <text
                        x="145"
                        y="235"
                        font-family="monospace"
                        font-size="12"
                        fill="#e2e8f0"
                      >{`(() => {`}</text>

                      <text
                        x="60"
                        y="255"
                        font-family="monospace"
                        font-size="12"
                        fill="#94a3b8"
                      >
                        9
                      </text>
                      <text
                        x="100"
                        y="255"
                        font-family="monospace"
                        font-size="12"
                        fill="#10b981"
                      >
                        fetchLabEquipment
                      </text>
                      <text
                        x="205"
                        y="255"
                        font-family="monospace"
                        font-size="12"
                        fill="#e2e8f0"
                      >
                        ();
                      </text>

                      <text
                        x="60"
                        y="275"
                        font-family="monospace"
                        font-size="12"
                        fill="#94a3b8"
                      >
                        10
                      </text>
                      <text
                        x="90"
                        y="275"
                        font-family="monospace"
                        font-size="12"
                        fill="#e2e8f0"
                      >{`}, []);`}</text>

                      <text
                        x="60"
                        y="295"
                        font-family="monospace"
                        font-size="12"
                        fill="#94a3b8"
                      >
                        11
                      </text>

                      <rect
                        x="420"
                        y="40"
                        width="340"
                        height="280"
                        rx="6"
                        fill="#ffffff"
                        stroke="#e2e8f0"
                        stroke-width="1"
                      />
                      <rect
                        x="420"
                        y="40"
                        width="340"
                        height="40"
                        rx="6"
                        fill="#f1f5f9"
                        stroke="#e2e8f0"
                        stroke-width="1"
                      />
                      <text
                        x="450"
                        y="65"
                        font-family="Arial, sans-serif"
                        font-size="14"
                        font-weight="bold"
                        fill="#334155"
                      >
                        Lab Equipment Dashboard
                      </text>

                      <rect
                        x="440"
                        y="100"
                        width="307"
                        height="200"
                        rx="4"
                        fill="#ffffff"
                        stroke="#e2e8f0"
                        stroke-width="1"
                      />

                      <rect
                        x="440"
                        y="100"
                        width="307"
                        height="30"
                        rx="4"
                        fill="#f8fafc"
                        stroke="#e2e8f0"
                        stroke-width="1"
                      />
                      <text
                        x="455"
                        y="120"
                        font-family="Arial, sans-serif"
                        font-size="12"
                        fill="#64748b"
                      >
                        ID
                      </text>
                      <text
                        x="500"
                        y="120"
                        font-family="Arial, sans-serif"
                        font-size="12"
                        fill="#64748b"
                      >
                        Equipment
                      </text>
                      <text
                        x="600"
                        y="120"
                        font-family="Arial, sans-serif"
                        font-size="12"
                        fill="#64748b"
                      >
                        Status
                      </text>
                      <text
                        x="680"
                        y="120"
                        font-family="Arial, sans-serif"
                        font-size="12"
                        fill="#64748b"
                      >
                        Last Check
                      </text>

                      <line
                        x1="440"
                        y1="130"
                        x2="740"
                        y2="130"
                        stroke="#e2e8f0"
                        stroke-width="1"
                      />
                      <text
                        x="455"
                        y="150"
                        font-family="Arial, sans-serif"
                        font-size="12"
                        fill="#334155"
                      >
                        01
                      </text>
                      <text
                        x="500"
                        y="150"
                        font-family="Arial, sans-serif"
                        font-size="12"
                        fill="#334155"
                      >
                        Microscope XL50
                      </text>
                      <rect
                        x="600"
                        y="140"
                        width="60"
                        height="16"
                        rx="8"
                        fill="#dcfce7"
                      />
                      <text
                        x="615"
                        y="150"
                        font-family="Arial, sans-serif"
                        font-size="10"
                        fill="#166534"
                      >
                        Active
                      </text>
                      <text
                        x="680"
                        y="150"
                        font-family="Arial, sans-serif"
                        font-size="12"
                        fill="#334155"
                      >
                        2025-03-10
                      </text>

                      <line
                        x1="440"
                        y1="160"
                        x2="740"
                        y2="160"
                        stroke="#e2e8f0"
                        stroke-width="1"
                      />
                      <text
                        x="455"
                        y="180"
                        font-family="Arial, sans-serif"
                        font-size="12"
                        fill="#334155"
                      >
                        02
                      </text>
                      <text
                        x="500"
                        y="180"
                        font-family="Arial, sans-serif"
                        font-size="12"
                        fill="#334155"
                      >
                        Centrifuge RT800
                      </text>
                      <rect
                        x="600"
                        y="170"
                        width="80"
                        height="16"
                        rx="8"
                        fill="#fef9c3"
                      />
                      <text
                        x="610"
                        y="180"
                        font-family="Arial, sans-serif"
                        font-size="10"
                        fill="#854d0e"
                      >
                        Maintenance
                      </text>
                      <text
                        x="680"
                        y="180"
                        font-family="Arial, sans-serif"
                        font-size="12"
                        fill="#334155"
                      >
                        2025-03-14
                      </text>

                      <line
                        x1="440"
                        y1="190"
                        x2="740"
                        y2="190"
                        stroke="#e2e8f0"
                        stroke-width="1"
                      />
                      <text
                        x="455"
                        y="210"
                        font-family="Arial, sans-serif"
                        font-size="12"
                        fill="#334155"
                      >
                        03
                      </text>
                      <text
                        x="500"
                        y="210"
                        font-family="Arial, sans-serif"
                        font-size="12"
                        fill="#334155"
                      >
                        Spectrometer V3
                      </text>
                      <rect
                        x="600"
                        y="200"
                        width="60"
                        height="16"
                        rx="8"
                        fill="#dcfce7"
                      />
                      <text
                        x="615"
                        y="210"
                        font-family="Arial, sans-serif"
                        font-size="10"
                        fill="#166534"
                      >
                        Active
                      </text>
                      <text
                        x="680"
                        y="210"
                        font-family="Arial, sans-serif"
                        font-size="12"
                        fill="#334155"
                      >
                        2025-03-15
                      </text>

                      <rect
                        x="40"
                        y="350"
                        width="355"
                        height="110"
                        rx="6"
                        fill="#ffffff"
                        stroke="#e2e8f0"
                        stroke-width="1"
                      />
                      <rect
                        x="40"
                        y="350"
                        width="355"
                        height="30"
                        rx="6"
                        fill="#f1f5f9"
                        stroke="#e2e8f0"
                        stroke-width="1"
                      />
                      <text
                        x="60"
                        y="370"
                        font-family="Arial, sans-serif"
                        font-size="12"
                        font-weight="bold"
                        fill="#334155"
                      >
                        Database Schema
                      </text>

                      <rect
                        x="60"
                        y="390"
                        width="300"
                        height="60"
                        rx="4"
                        fill="#ffffff"
                        stroke="#e2e8f0"
                        stroke-width="1"
                      />
                      <text
                        x="70"
                        y="410"
                        font-family="monospace"
                        font-size="12"
                        fill="#334155"
                      >{`CREATE TABLE equipment (`}</text>
                      <text
                        x="80"
                        y="425"
                        font-family="monospace"
                        font-size="12"
                        fill="#334155"
                      >
                        id VARCHAR(10) PRIMARY KEY,
                      </text>
                      <text
                        x="80"
                        y="440"
                        font-family="monospace"
                        font-size="12"
                        fill="#334155"
                      >
                        name VARCHAR(100) NOT NULL,
                      </text>

                      <rect
                        x="420"
                        y="350"
                        width="340"
                        height="110"
                        rx="6"
                        fill="#ffffff"
                        stroke="#e2e8f0"
                        stroke-width="1"
                      />
                      <rect
                        x="420"
                        y="350"
                        width="340"
                        height="30"
                        rx="6"
                        fill="#f1f5f9"
                        stroke="#e2e8f0"
                        stroke-width="1"
                      />
                      <text
                        x="440"
                        y="370"
                        font-family="Arial, sans-serif"
                        font-size="12"
                        font-weight="bold"
                        fill="#334155"
                      >
                        API Endpoints
                      </text>

                      <rect
                        x="440"
                        y="390"
                        width="60"
                        height="20"
                        rx="4"
                        fill="#dcfce7"
                      />
                      <text
                        x="455"
                        y="404"
                        font-family="Arial, sans-serif"
                        font-size="10"
                        fill="#166534"
                      >
                        GET
                      </text>
                      <text
                        x="510"
                        y="405"
                        font-family="monospace"
                        font-size="12"
                        fill="#334155"
                      >
                        /api/equipment
                      </text>

                      <rect
                        x="440"
                        y="420"
                        width="60"
                        height="20"
                        rx="4"
                        fill="#dbeafe"
                      />
                      <text
                        x="455"
                        y="434"
                        font-family="Arial, sans-serif"
                        font-size="10"
                        fill="#1e40af"
                      >
                        POST
                      </text>
                      <text
                        x="510"
                        y="435"
                        font-family="monospace"
                        font-size="12"
                        fill="#334155"
                      >
                        /api/equipment/register
                      </text>

                      <path
                        d="M380 160 C400 160, 400 160, 420 160"
                        stroke="#94a3b8"
                        stroke-width="2"
                        fill="none"
                        stroke-dasharray="5,5"
                      />
                      <path
                        d="M210 350 C210 330, 210 330, 210 320"
                        stroke="#94a3b8"
                        stroke-width="2"
                        fill="none"
                        stroke-dasharray="5,5"
                      />
                      <path
                        d="M590 350 C590 330, 590 330, 590 320"
                        stroke="#94a3b8"
                        stroke-width="2"
                        fill="none"
                        stroke-dasharray="5,5"
                      />
                    </svg>
                  </div>

                  <div class="border-t border-gray-200 pt-4 mt-2 flex justify-between items-center">
                    <div class="w-1/3">
                      <div class="h-16 w-16 bg-gray-200 mx-auto"></div>
                      <p class="text-xs text-center text-gray-500 mt-1">
                        Scan Equipment
                      </p>
                    </div>
                    <div class="w-1/3">
                      <div class="h-16 w-16 mx-auto flex flex-col justify-center">
                        <div class="h-2 bg-blue-500 mb-1"></div>
                        <div class="h-2 bg-blue-500 mb-1"></div>
                        <div class="h-2 bg-blue-500"></div>
                      </div>
                      <p class="text-xs text-center text-gray-500 mt-1">
                        Track Status
                      </p>
                    </div>
                    <div class="w-1/3">
                      <div class="h-16 w-16 mx-auto flex items-center justify-center">
                        <div class="h-10 w-10 rounded-full border-4 border-blue-500 flex items-center justify-center">
                          <div class="h-5 w-5 bg-blue-500"></div>
                        </div>
                      </div>
                      <p class="text-xs text-center text-gray-500 mt-1">
                        Maintenance
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Contact Section */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                Have questions or ready to get started? Our team is here to help
                you optimize your laboratory operations.
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Phone className="text-blue-600 mr-4" size={20} />
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <p className="text-gray-600">+91 1234567890</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="text-blue-600 mr-4" size={20} />
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-gray-600">infoQuantumRack@amu.ac.in</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="text-blue-600 mr-4" size={20} />
                  <div>
                    <h4 className="font-semibold">Address</h4>
                    <p className="text-gray-600">
                      Computer Engineering Department , ZHCET
                      <br />
                      AMU
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white pt-16 pb-8">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <div>
                <h3 className="text-xl font-semibold mb-4">QuantumRack</h3>
                <p className="text-gray-400">
                  The comprehensive solution for efficient laboratory equipment
                  management.
                </p>
                <div className="flex space-x-4 mt-6">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-200"
                  >
                    <Twitter size={20} />
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-200"
                  >
                    <Twitter size={20} />
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-200"
                  >
                    <Facebook size={20} />
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-200"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-200"
                  >
                    <Instagram size={20} />
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Product</h4>
                <ul className="space-y-2">
                  {[
                    "Features",
                    "Pricing",
                    "Integrations",
                    "Case Studies",
                    "Documentation",
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition duration-200"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                  {["About Us", "Blog", "Careers", "Press", "Contact"].map(
                    (item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="text-gray-400 hover:text-white transition duration-200"
                        >
                          {item}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Resources</h4>
                <ul className="space-y-2">
                  {[
                    "Help Center",
                    "Community",
                    "Webinars",
                    "Partners",
                    "Privacy Policy",
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition duration-200"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-gray-800 text-center md:flex md:items-center md:justify-between">
              <div className="text-gray-400 mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} QuantumRack. All rights
                reserved.
              </div>
              <div className="flex justify-center space-x-6">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  Terms
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  Privacy
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  Security
                </a>
              </div>
            </div>
          </div>

          {/* Back to Top Button */}
          <div className="fixed bottom-8 right-8">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-200 focus:outline-none"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
