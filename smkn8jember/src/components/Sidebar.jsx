/* eslint-disable no-unused-vars */
// components/Sidebar/index.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaRegUser, FaChevronDown, FaRegListAlt, FaRegHandshake } from "react-icons/fa";
import {
  MdOutlineDashboard,
  MdOutlineSettings,
  MdOutlineCategory,
  MdOutlineSportsVolleyball,
} from "react-icons/md";
import { GrArticle } from "react-icons/gr";
import { IoImagesOutline } from "react-icons/io5";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import {
  PiArticleMedium,
  PiArticleNyTimes,
  PiTreeStructureBold,
} from "react-icons/pi";
import {
  LuDatabase,
  LuUserPlus,
  LuUserRoundCog,
  LuUserRoundPen,
} from "react-icons/lu";
import { LiaUserTieSolid } from "react-icons/lia";
import { RiBriefcaseLine, RiBuilding2Line } from "react-icons/ri";

const NavItem = ({ to, icon: Icon, label, isOpen }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <NavLink
      to={to}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      className={({ isActive }) =>
        `flex relative items-center justify-start text-sm gap-2 py-2.5 pl-2.5 rounded-lg font-medium transition-all duration-300
        ${
          isActive
            ? "bg-orange-500 text-white"
            : "text-zinc-600 hover:bg-gray-100"
        }`
      }
    >
      <Icon className="text-xl absolute" />

      {/* Tooltip hanya muncul jika sidebar tertutup dan dihover */}
      {!isOpen && (
        <div
          className={`absolute left-full top-1/2 -translate-y-1/2 ml-3 transition-all duration-200 ease-out z-50 ${
            showTooltip
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-2 pointer-events-none"
          }`}
        >
          <div className="relative bg-white text-gray-800 text-xs font-medium py-1.5 px-3 rounded-md shadow-lg backdrop-blur-sm">
            {label}
            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-white"></div>
          </div>
        </div>
      )}

      {/* Label teks (muncul saat sidebar terbuka) */}
      <span
        className={`transition-all ml-8 duration-200 whitespace-nowrap ${
          isOpen ? "opacity-100" : "opacity-0 -translate-x-20"
        }`}
      >
        {label}
      </span>
    </NavLink>
  );
};

const Dropdown = ({ isOpen, open, setOpen, icon: Icon, title, items }) => (
  <div className="relative">
    <button
      onClick={() => setOpen(!open)}
      className="flex items-center text-start text-sm text-zinc-600 justify-between w-full py-2.5 px-2.5 rounded-lg font-medium transition-all group"
    >
      <div className="flex items-center gap-2">
        <Icon className="text-xl absolute" />
        <span
          className={`transition-all ml-8 duration-200 whitespace-nowrap ${
            isOpen ? "opacity-100" : "opacity-0 -translate-x-10"
          }`}
        >
          {title}
        </span>
      </div>
      {isOpen && (
        <FaChevronDown
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      )}
      <div
        className={`bg-white absolute left-full top-0 ml-2 w-40 py-2 rounded-lg shadow-lg z-50 ${
          !open ? "block md:hidden" : "hidden"
        } md:group-hover:block`}
      >
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `block px-4 py-2 ${
                isActive
                  ? "bg-orange-500 text-white"
                  : "text-zinc-600 hover:bg-gray-100"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </button>

    <div
      className={`ml-8 mt-1 flex-col gap-1 overflow-hidden transition-all duration-200 ${
        !isOpen
          ? "hidden"
          : open
          ? "max-h-0 opacity-0 ease-out"
          : "max-h-96 opacity-100 ease-in"
      }`}
    >
      {items.map((item) => (
        <NavItem
          key={item.to}
          to={item.to}
          icon={item.icon}
          label={item.label}
          isOpen={isOpen}
        />
      ))}
    </div>
  </div>
);

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [openArtikel, setOpenArtikel] = useState(true);
  const [openManajemen, setOpenManajemen] = useState(true);

  const artikelItems = [
    { to: "/admin/artikel", icon: PiArticleMedium, label: "Artikel Saya" },
    { to: "/admin/artikelUser", icon: PiArticleNyTimes, label: "Artikel Review" },
  ];

  const manajemenItems = [
    { to: "/admin/dataguru", icon: LiaUserTieSolid, label: "Data Guru" },
    { to: "/admin/datakaryawan", icon: LuUserRoundCog, label: "Data Karyawan" },
    { to: "/admin/siswa", icon: LuUserRoundPen, label: "Data Siswa" },
    { to: "/admin/fasilitas", icon: RiBuilding2Line, label: "Data Fasilitas" },
    {
      to: "/admin/ekstrakulikuler",
      icon: MdOutlineSportsVolleyball,
      label: "Data Ekstra",
    },
  ];

  return (
    <div
      className={`bg-white flex flex-col justify-between h-full shadow-md transition-all duration-300
        ${
          isOpen ? "w-64 px-6" : "w-16 px-2"
        } fixed md:static top-0 left-0 z-50 `}
    >
      <div>
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <img src="/image/logosmk.png" className="w-10" alt="logo" />
            {isOpen && (
              <h1 className="font-bold text-lg tracking-wide boderTeks">
                SMKN 8 JEMBER
              </h1>
            )}
          </div>
          {isOpen && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer lg:hidden"
            >
              <FaBars className="text-zinc-600" />
            </button>
          )}
        </div>

        {/* Menu List */}
        <ul
          className={`ScorllBar flex flex-col gap-4 pt-5 pb-5 ${
            isOpen ? "overflow-y-auto" : ""
          } max-h-[calc(100vh-71px)] pr-2`}
        >
          <NavItem
            to="/admin/dashboard"
            icon={MdOutlineDashboard}
            label="Dashboard"
            isOpen={isOpen}
          />

          {/* Berita dan Content */}
          <div className="">
            <h2 className="font-semibold text-zinc-600 pl-2.5 pb-1 pt-3 border-t-[1.5px] border-zinc-400">
              <span
                className={`transition-all duration-200 whitespace-nowrap ${
                  isOpen ? "opacity-100" : "opacity-0 -translate-x-10 hidden"
                } text-zinc-600 `}
              >
                BERITA DAN KONTEN
              </span>
            </h2>
            <Dropdown
              isOpen={isOpen}
              open={openArtikel}
              setOpen={setOpenArtikel}
              icon={GrArticle}
              title="Artikel"
              items={artikelItems}
            />
            <NavItem
              to="/admin/gambar"
              icon={IoImagesOutline}
              label="Galeri"
              isOpen={isOpen}
            />
            <NavItem
              to="/admin/pengumuman"
              icon={HiOutlineSpeakerphone}
              label="Pengumuman"
              isOpen={isOpen}
            />
            <NavItem
              to="/admin/kategori"
              icon={MdOutlineCategory}
              label="Kategori"
              isOpen={isOpen}
            />
          </div>

          {/* Profil Sekolah */}
          <div className="pb-2 pt-3 border-b-[1.5px] border-zinc-400">
            <h2 className="font-semibold text-zinc-600 pl-2.5 pb-1 pt-3 border-t-[1.5px] border-zinc-400">
              <span
                className={`transition-all duration-200 whitespace-nowrap ${
                  isOpen ? "opacity-100" : "opacity-0 -translate-x-10 hidden"
                } text-zinc-600`}
              >
                PROFIL SEKOLAH
              </span>
            </h2>
            <Dropdown
              isOpen={isOpen}
              open={openManajemen}
              setOpen={setOpenManajemen}
              icon={LuDatabase}
              title="Manajemen Data"
              items={manajemenItems}
            />
            <NavItem
              to="/admin/mapel"
              icon={FaRegListAlt}
              label="Mata Pelajaran"
              isOpen={isOpen}
            />
            <NavItem
              to="/admin/data-user"
              icon={LuUserPlus}
              label="Data User"
              isOpen={isOpen}
            />
            <NavItem
              to="/admin/jurusan"
              icon={MdOutlineCategory}
              label="Jurusan"
              isOpen={isOpen}
            />
            <NavItem
              to="/admin/partner"
              icon={FaRegHandshake}
              label="Partner"
              isOpen={isOpen}
            />
            <NavItem
              to="/admin/carrier"
              icon={RiBriefcaseLine}
              label="Carrier"
              isOpen={isOpen}
            />
            <NavItem
              to="/admin/strukturorganisasi"
              icon={PiTreeStructureBold}
              label="Struktur Organisasi"
              isOpen={isOpen}
            />
          </div>

          <NavItem
            to="/admin/websetting"
            icon={MdOutlineSettings}
            label="Web Setting"
            isOpen={isOpen}
          />
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
