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

      {/* Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar Mini */}
        <div className="flex justify-between px-6 items-center bg-white h-16">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <FaBars className="text-gray-600" />
          </button>
          <div>search</div>
          <img src="/icon/logoDKV.png" className="w-10 h-fit" alt="logo" />
        </div>

        {/* isi konten */}
        <div className="p-6 bg-gray-100 h-full overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Index;
