import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import { useAuth } from "../../hooks/useAuth";

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(() => {
    return localStorage.getItem("sidebarOpen") === "false" ? false : true;
  });
const { user } = useAuth();
  useEffect(() => {
    localStorage.setItem("sidebarOpen", isOpen);
  }, [isOpen]);

  return (
    <div className="flex h-screen overflow-x-hidden ">
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
            <div className="text-sm text-gray-600">
              {user?.username || "Admin"} Dashboard
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