import { useState } from "react";
import {
  MdOutlineCategory,
  MdOutlineDashboard,
  MdOutlineSettings,
  MdOutlineSportsVolleyball,
} from "react-icons/md";
import { GrArticle } from "react-icons/gr";
import {
  FaBuilding,
  FaChevronDown,
  FaRegListAlt,
  FaRegUser,
} from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { IoImagesOutline } from "react-icons/io5";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { PiArticleMedium, PiTreeStructureBold } from "react-icons/pi";
import { PiArticleNyTimes } from "react-icons/pi";
import {
  LuDatabase,
  LuUserPlus,
  LuUserRoundCog,
  LuUserRoundPen,
} from "react-icons/lu";
import { LiaUserTieSolid } from "react-icons/lia";
import { RiBuilding2Line } from "react-icons/ri";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openDropdown2, setOpenDropdown2] = useState(false);

  return (
    <div
      className={`bg-white flex flex-col justify-between h-full shadow-md transition-all duration-300
          ${isOpen ? "w-64 px-6" : "w-16 px-2"}`}
    >
      <div>
        {/* Logo & Toggle */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <img src="/image/logosmk.png" className="w-10" alt="logo" />
            {isOpen && (
              <h1 className="font-bold text-2xl tracking-wide boderTeks">
                Eskalaber
              </h1>
            )}
          </div>
        </div>

        {/* Menu */}
        <ul
          className={`ScorllBar flex flex-col gap-4 pt-5 ${
            isOpen ? "overflow-y-auto" : ""
          } max-h-[calc(100vh-120px)] pr-2`}
        >
          {/* Menu Dashboard ya kak */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-2 py-2.5 pl-2.5 rounded-lg font-medium transition-all duration-300 
                ${
                  isActive
                    ? "bg-amber-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`
            }
          >
            <MdOutlineDashboard className="text-xl" />
            {isOpen && <span>Dashboard</span>}
          </NavLink>

          {/* Menu Menu Untuk Kontn */}
          <div>
            <h2 className="font-bold text-gray-600 text-sm pl-2.5">
              {isOpen && <span>Berita dan Contant</span>}
            </h2>
            {/* Drop Artikel */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(!openDropdown)}
                className={`flex items-center text-gray-600 justify-between w-full py-2.5 px-2.5 rounded-lg font-medium transition-all duration-300 `}
              >
                <div className="flex items-center gap-2">
                  <GrArticle className="text-xl" />
                  {isOpen && <span>Artikel</span>}
                </div>
                {isOpen && (
                  <FaChevronDown
                    className={`transition-transform duration-300 ${
                      openDropdown ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              {/* Dropdown */}
              {openDropdown && !isOpen && (
                <div className="absolute left-full top-0 ml-2 bg-white shadow-lg rounded-lg w-40 py-2 z-50">
                  <NavLink
                    to="/artikel"
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-600"
                  >
                    Artikel Admin
                  </NavLink>
                  <NavLink
                    to="/artikelUser"
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-600"
                  >
                    Artikel User
                  </NavLink>
                </div>
              )}

              {/* Kalau sidebar terbuka, tetap pakai cara lama */}
              {isOpen && openDropdown && (
                <div className="ml-8 mt-1 flex flex-col gap-1">
                  <NavLink
                    to="/artikel"
                    className={({ isActive }) =>
                      `flex items-center gap-2 py-2.5 pl-2.5 rounded-lg font-medium transition-all duration-300 
                ${
                  isActive
                    ? "bg-amber-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`
                    }
                  >
                    <PiArticleMedium className="text-xl" />
                    {isOpen && <span>Artikel Admin</span>}
                  </NavLink>
                  <NavLink
                    to="/artikelUser"
                    className={({ isActive }) =>
                      `flex items-center gap-2 py-2.5 pl-2.5 rounded-lg font-medium transition-all duration-300 
                ${
                  isActive
                    ? "bg-amber-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`
                    }
                  >
                    <PiArticleNyTimes className="text-xl" />
                    {isOpen && <span>Artikel User</span>}
                  </NavLink>
                </div>
              )}
            </div>

            {/* Menu Gambar */}
            <NavLink
              to="/Gambar"
              className={({ isActive }) =>
                `flex items-center gap-2 py-2.5 pl-2.5 rounded-lg font-medium transition-all duration-300 
                ${
                  isActive
                    ? "bg-amber-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <IoImagesOutline className="text-xl" />
              {isOpen && <span>Gambar</span>}
            </NavLink>
            {/* Menu Pengumuman */}
            <NavLink
              to="/pengumuman"
              className={({ isActive }) =>
                `flex items-center gap-2 py-2.5 pl-2.5 rounded-lg font-medium transition-all duration-300 
                ${
                  isActive
                    ? "bg-amber-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <HiOutlineSpeakerphone className="text-xl" />
              {isOpen && <span>Pengumuman</span>}
            </NavLink>
          </div>

          {/* Menu Menu Untuk Kontn */}
          <div>
            <h2 className="font-bold text-gray-600 text-sm pl-2.5">
              {isOpen && <span>Profil Sekolah</span>}
            </h2>
            {/* Drop Artikel */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown2(!openDropdown2)}
                className={`flex items-center justify-between w-full py-2.5 px-2.5 rounded-lg font-medium transition-all duration-300 
          ${
            openDropdown2
              ? "bg-amber-500 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }
        `}
              >
                <div className="flex items-center gap-2">
                  <LuDatabase className="text-xl" />
                  {isOpen && <span>Menejemen Data</span>}
                </div>
                {isOpen && (
                  <FaChevronDown
                    className={`transition-transform duration-300 ${
                      openDropdown2 ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              {/* Dropdown */}
              {openDropdown2 && !isOpen && (
                <div className="absolute left-full top-0 ml-2 bg-white shadow-lg rounded-lg w-40 py-2 z-50">
                  <NavLink
                    to="/Dt"
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-600"
                  >
                    Data Guru
                  </NavLink>
                  <NavLink
                    to="/De"
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-600"
                  >
                    Data Karyawan
                  </NavLink>
                  <NavLink
                    to="/De"
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-600"
                  >
                    Data Siswa
                  </NavLink>
                  <NavLink
                    to="/De"
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-600"
                  >
                    Data Fasilitas
                  </NavLink>
                  <NavLink
                    to="/De"
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-600"
                  >
                    Data Ekstrakulikuler
                  </NavLink>
                </div>
              )}

              {/* Kalau sidebar terbuka, tetap pakai cara lama */}
              {isOpen && openDropdown2 && (
                <div className="ml-8 mt-1 flex flex-col gap-1">
                  <NavLink
                    to="/Da"
                    className={({ isActive }) =>
                      `flex items-center gap-2 py-2.5 pl-2.5 rounded-lg font-medium transition-all duration-300 
                ${
                  isActive
                    ? "bg-amber-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`
                    }
                  >
                    <LiaUserTieSolid className="text-xl" />
                    {isOpen && <span>Data Guru</span>}
                  </NavLink>
                  <NavLink
                    to="/D"
                    className={({ isActive }) =>
                      `flex items-center gap-2 py-2.5 pl-2.5 rounded-lg font-medium transition-all duration-300 
                ${
                  isActive
                    ? "bg-amber-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`
                    }
                  >
                    <LuUserRoundCog className="text-xl" />
                    {isOpen && <span>Data Karyawan</span>}
                  </NavLink>
                  <NavLink
                    to="/D"
                    className={({ isActive }) =>
                      `flex items-center gap-2 py-2.5 pl-2.5 rounded-lg font-medium transition-all duration-300 
                ${
                  isActive
                    ? "bg-amber-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`
                    }
                  >
                    <LuUserRoundPen className="text-xl" />
                    {isOpen && <span>Data Siswa</span>}
                  </NavLink>
                  <NavLink
                    to="/D"
                    className={({ isActive }) =>
                      `flex items-center gap-2 py-2.5 pl-2.5 rounded-lg font-medium transition-all duration-300 
                ${
                  isActive
                    ? "bg-amber-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`
                    }
                  >
                    <RiBuilding2Line className="text-xl" />
                    {isOpen && <span>Data Fasilitas</span>}
                  </NavLink>
                  <NavLink
                    to="/D"
                    className={({ isActive }) =>
                      `flex items-center gap-2 py-2.5 pl-2.5 rounded-lg font-medium transition-all duration-300 
                ${
                  isActive
                    ? "bg-amber-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`
                    }
                  >
                    <MdOutlineSportsVolleyball className="text-xl" />
                    {isOpen && <span>Data Ekstra</span>}
                  </NavLink>
                </div>
              )}
            </div>

            {/* Menu Gambar */}
            <NavLink
              to="/ok"
              className={({ isActive }) =>
                `flex items-center gap-2 py-2.5 pl-2.5 rounded-lg font-medium transition-all duration-300 
                ${
                  isActive
                    ? "bg-amber-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <FaRegListAlt className="text-xl" />
              {isOpen && <span>Mapel</span>}
            </NavLink>
            {/* Menu Pengumuman */}
            <NavLink
              to="/ok"
              className={({ isActive }) =>
                `flex items-center gap-2 py-2.5 pl-2.5 rounded-lg font-medium transition-all duration-300 
                ${
                  isActive
                    ? "bg-amber-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <LuUserPlus className="text-xl" />
              {isOpen && <span>User Jurusan</span>}
            </NavLink>
            <NavLink
              to="/ok"
              className={({ isActive }) =>
                `flex items-center gap-2 py-2.5 pl-2.5 rounded-lg font-medium transition-all duration-300 
                ${
                  isActive
                    ? "bg-amber-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <MdOutlineCategory className="text-xl" />
              {isOpen && <span>Jurusan</span>}
            </NavLink>
            <NavLink
              to="/ok"
              className={({ isActive }) =>
                `flex items-center gap-2 py-2.5 pl-2.5 rounded-lg font-medium transition-all duration-300 
                ${
                  isActive
                    ? "bg-amber-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <PiTreeStructureBold className="text-xl" />
              {isOpen && <span>Struktur Organisasi</span>}
            </NavLink>
          </div>

          <NavLink
            to="/Dashboard/ArtikelUser"
            className={({ isActive }) =>
              `flex items-center gap-2 py-2.5 pl-2.5 rounded-lg font-medium transition-all duration-300 
                ${
                  isActive
                    ? "bg-amber-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`
            }
          >
            <MdOutlineSettings className="text-xl" />
            {isOpen && <span>Web Setting</span>}
          </NavLink>
        </ul>
      </div>

      {/* Logout */}
      <NavLink
        to="/logout"
        className="flex items-center gap-2 py-2.5 pl-2.5 mb-5 rounded-lg text-gray-600 font-medium transition-all duration-300 hover:bg-gray-100"
      >
        <FaRegUser className="text-xl" />
        {isOpen && <span>Log Out</span>}
      </NavLink>
    </div>
  );
};

export default Sidebar;
