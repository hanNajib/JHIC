import React, { useState, useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FiUser, FiLogOut, FiChevronDown } from "react-icons/fi";
import Sidebar from "../Sidebar";
import { useAuth } from "../../hooks/useAuth";
import Swal from "sweetalert2";

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(() => {
    return localStorage.getItem("sidebarOpen") === "false" ? false : true;
  });
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  useEffect(() => {
    localStorage.setItem("sidebarOpen", isOpen);
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Yakin ingin keluar?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire({
          title: "Berhasil keluar",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        })
      }
    });
  };

  const handleViewProfile = () => {
    navigate("/admin/profilesetting");
    setIsProfileDropdownOpen(false);
  };

  return (
    <div className="flex h-screen overflow-y-hidden ">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
      <div
    className={`pl-14 lg:pl-0 flex-1 flex flex-col transition-all duration-300`}
  >
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/25 bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
        
        <div className="bg-white shadow-sm p-4 flex items-center justify-between w-full z-10">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 md:hidden"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div className="hidden md:block">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            
            
            {/* User Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user?.profile_image ? (
                      <img src={user.profile_image} alt="Profile" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <span>{user?.username.charAt(0).toUpperCase() || user?.username.charAt(0).toUpperCase() || "A"}</span>
                    )}
                  </div>
                  
                  {/* User Info - Hidden on mobile */}
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-medium text-gray-900">
                      {user?.name || user?.username || "Admin"}
                    </div>
                    <div className="text-xs text-gray-500">
                      {user?.role.charAt(0).toUpperCase() + user?.role.slice(1) || "Administrator"}
                    </div>
                  </div>
                </div>
                
                {/* Dropdown Arrow */}
                <FiChevronDown 
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                    isProfileDropdownOpen ? "rotate-180" : ""
                  }`} 
                />
              </button>

              {/* Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  {/* Profile Option */}
                  <button
                    onClick={handleViewProfile}
                    className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <FiUser className="w-4 h-4" />
                    Lihat Profil
                  </button>
                  
                  {/* Divider */}
                  <hr className="border-gray-200 my-1" />
                  
                  {/* Logout Option */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    <FiLogOut className="w-4 h-4" />
                    Keluar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden lg:p-6 w-[85vw] lg:w-full pl-4 pr-2 pt-2">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;