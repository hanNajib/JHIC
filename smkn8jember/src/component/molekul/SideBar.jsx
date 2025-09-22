import React, { useState } from "react";
import { FaHome, FaBars } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { GrArticle } from "react-icons/gr";
import { TfiAnnouncement } from "react-icons/tfi";
import { IoImagesOutline } from "react-icons/io5";
import { FaUserTie } from "react-icons/fa6";
import { RiUserSettingsFill } from "react-icons/ri";
import { FaUserEdit, FaUserPlus, FaListAlt } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { RiBuilding2Fill } from "react-icons/ri";
import { PiTreeStructureFill } from "react-icons/pi";
import { MdSportsVolleyball } from "react-icons/md";
import Dashboard from "../pages/Dashboard";
import Artikel from "../pages/Artikel";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex flex-col">
      {/* Navbar */}
      <div className="flex justify-between items-center border-b-[1px] border-gray-200 bg-white w-screen px-5 py-3">
        {/* Logo & Toggle */}
        <div className="flex items-center gap-3">
          <img src="/image/logosmk.png" className="w-11" alt="" />
          <h4 className="text-gray-500 font-bold text-3xl">Eskalaber</h4>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md hover:bg-gray-200"
          >
            <FaBars className="text-gray-500 text-xl" />
          </button>
        </div>
        {/* Profil */}
        <FaRegCircleUser className="text-gray-500 text-3xl " />
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`${
            isOpen ? "w-[270px] px-5" : "w-16 px-0"
          } flex flex-col bg-white h-screen overflow-y-scroll py-5  transition-all duration-300`}
        >
          <a
            href="#"
            className="flex items-center gap-2 text-2xl py-2 pl-3 bg-orange-500 text-white rounded-lg transition hover:bg-gray-100 no-underline"
          >
            <FaHome />
            {isOpen && (
              <span className="text-sm font-semibold">
                Dashboard
              </span>
            )}
          </a>

          <a
            href="#"
            className="flex items-center gap-2 text-2xl py-2 pl-3 rounded-lg transition hover:bg-gray-100 no-underline"
          >
            <GrArticle className="text-gray-500" />
            {isOpen && (
              <span className="text-gray-500 text-sm font-semibold">
                Artikel
              </span>
            )}
          </a>

          <a
            href="#"
            className="flex items-center gap-2 text-2xl py-2 pl-3 rounded-lg transition hover:bg-gray-100 no-underline"
          >
            <GrArticle className="text-gray-500" />
            {isOpen && (
              <span className="text-gray-500 text-sm font-semibold">
                Artikel User
              </span>
            )}
          </a>

          <a
            href="#"
            className="flex items-center gap-2 text-2xl py-2 pl-3 rounded-lg transition hover:bg-gray-100 no-underline"
          >
            <TfiAnnouncement className="text-gray-500" />
            {isOpen && (
              <span className="text-gray-500 text-sm font-semibold">
                Pengumuman
              </span>
            )}
          </a>

          <a
            href="#"
            className="flex items-center gap-2 text-2xl py-2 pl-3 rounded-lg transition hover:bg-gray-100 no-underline"
          >
            <IoImagesOutline className="text-gray-500" />
            {isOpen && (
              <span className="text-gray-500 text-sm font-semibold">
                Gambar
              </span>
            )}
          </a>

          <a
            href="#"
            className="flex items-center gap-2 text-2xl py-2 pl-3 rounded-lg transition hover:bg-gray-100 no-underline"
          >
            <FaUserTie className="text-gray-500" />
            {isOpen && (
              <span className="text-gray-500 text-sm font-semibold">
                Data Guru
              </span>
            )}
          </a>

          <a
            href="#"
            className="flex items-center gap-2 text-2xl py-2 pl-3 rounded-lg transition hover:bg-gray-100 no-underline"
          >
            <RiUserSettingsFill className="text-gray-500" />
            {isOpen && (
              <span className="text-gray-500 text-sm font-semibold">
                Data Karyawan
              </span>
            )}
          </a>

          <a
            href="#"
            className="flex items-center gap-2 text-2xl py-2 pl-3 rounded-lg transition hover:bg-gray-100 no-underline"
          >
            <FaUserEdit className="text-gray-500" />
            {isOpen && (
              <span className="text-gray-500 text-sm font-semibold">
                Data Siswa Setting
              </span>
            )}
          </a>

          <a
            href="#"
            className="flex items-center gap-2 text-2xl py-2 pl-3 rounded-lg transition hover:bg-gray-100 no-underline"
          >
            <FaUserPlus className="text-gray-500" />
            {isOpen && (
              <span className="text-gray-500 text-sm font-semibold">
                User Jurusan
              </span>
            )}
          </a>

          <a
            href="#"
            className="flex items-center gap-2 text-2xl py-2 pl-3 rounded-lg transition hover:bg-gray-100 no-underline"
          >
            <FaListAlt className="text-gray-500" />
            {isOpen && (
              <span className="text-gray-500 text-sm font-semibold">Mapel</span>
            )}
          </a>

          <a
            href="#"
            className="flex items-center gap-2 text-2xl py-2 pl-3 rounded-lg transition hover:bg-gray-100 no-underline"
          >
            <AiFillProduct className="text-gray-500" />
            {isOpen && (
              <span className="text-gray-500 text-sm font-semibold">
                Jurusan
              </span>
            )}
          </a>

          <a
            href="#"
            className="flex items-center gap-2 text-2xl py-2 pl-3 rounded-lg transition hover:bg-gray-100 no-underline"
          >
            <RiBuilding2Fill className="text-gray-500" />
            {isOpen && (
              <span className="text-gray-500 text-sm font-semibold">
                Data Fasilitas
              </span>
            )}
          </a>

          <a
            href="#"
            className="flex items-center gap-2 text-2xl py-2 pl-3 rounded-lg transition hover:bg-gray-100 no-underline"
          >
            <PiTreeStructureFill className="text-gray-500" />
            {isOpen && (
              <span className="text-gray-500 text-sm font-semibold">
                Struktur Organisasi
              </span>
            )}
          </a>

          <a
            href="#"
            className="flex items-center gap-2 text-2xl py-2 pl-3 rounded-lg transition hover:bg-gray-100 no-underline"
          >
            <MdSportsVolleyball className="text-gray-500" />
            {isOpen && (
              <span className="text-gray-500 text-sm font-semibold">
                Ekstrakulikuler
              </span>
            )}
          </a>

          <a
            href="#"
            className="flex items-center gap-2 text-2xl py-2 pl-3 rounded-lg transition hover:bg-gray-100 no-underline"
          >
            <FaHome className="text-gray-500" />
            {isOpen && (
              <span className="text-gray-500 text-sm font-semibold">
                Web Setting
              </span>
            )}
          </a>
        </div>

        {/* Konten Utama */}
        <div className="flex-1 pl-5 py-5 pr-10 bg-gray-100 min-h-screen">
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
