import { useEffect, useState } from "react";
import { GrArticle } from "react-icons/gr";
import {
  FaBuilding,
  FaChevronDown,
  FaRegListAlt,
  FaRegUser,
} from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import EditArtikel from "../component/pages/EditArtikel";
import Sidebar from "../component/molekul/SideBar";

const Index = () => {
  const [isOpen, setIsOpen] = useState(() => {
    // baca dari localStorage kalau ada, kalau nggak default true
    return localStorage.getItem("sidebarOpen") === "false" ? false : true;
  });

  // setiap kali isOpen berubah → simpan ke localStorage
  useEffect(() => {
    localStorage.setItem("sidebarOpen", isOpen);
  }, [isOpen]);
  return (
    <div className="flex fixed w-full h-screen">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 bg-opacity-50 md:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Content Area */}
      <div className="flex-1 flex flex-col w-4/5">
        {/* Navbar Mini */}
        <div className="flex justify-between pl-16 items-center bg-white h-16 w-full , lg:px-6">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <FaBars className="text-gray-600" />
          </button>
          <img src="/icon/logoDKV.png" className="w-10 h-fit" alt="logo" />
        </div>

        {/* isi konten */}
        <div className={`p-6 bg-gray-100 h-full overflow-y-scroll pl-18 pt-2 pr-2  overflow-x-hidden lg:p-5`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Index;
