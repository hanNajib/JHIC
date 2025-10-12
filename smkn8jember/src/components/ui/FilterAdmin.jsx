import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { BiRefresh } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdOutlineVerified } from "react-icons/md";

const FilterAdmin = ({
  filterKategori,
  setFilterKategori,
  search,
  setSearch,
  handleReset,
  linkTambah,
  descHalaman,
  titleHalaman,
  titleBTN,
  kategoriList = [],
}) => {
  const [isRotating, setIsRotating] = useState(false);

  const handleClickRefresh = () => {
    setIsRotating(true);
    handleReset();
    setTimeout(() => setIsRotating(false), 1000); // hentikan animasi setelah 1 detik
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-between flex-col lg:flex-row gap-4">
        <div>
          <h1 className="font-bold text-gray-900 text-2xl md:text-3xl lg:text-4xl">
            {titleHalaman}
          </h1>
          <p className="text-gray-600 mt-1">{descHalaman}</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleClickRefresh}
            className="flex justify-center items-center gap-2 px-4 py-2 text-gray-600 text-base font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300"
            title="Refresh Data"
          >
            <BiRefresh
              className={`text-lg  transition-transform duration-500 ${
                isRotating ? "animate-spin-reverse" : ""
              }`}
            />
          </button>

          <Link
            to={linkTambah}
            className="flex justify-center items-center gap-2 px-4 py-2 text-orange-500 text-base font-bold border-2 border-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition duration-300 w-fit"
          >
            {titleBTN === "Verifikasi" ? (
              <MdOutlineVerified className="text-lg" />
            ) : (
              <IoMdAdd className="text-lg" />
            )}
            <span>{titleBTN}</span>
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-2 mb-6 mt-4">
        {/* Input Search */}
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari berdasarkan judul..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        {/* Dropdown Kategori */}
        <select
          value={filterKategori}
          onChange={(e) => setFilterKategori(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        >
          <option value="Semua">Semua</option>
          {kategoriList.map((kategori, i) => (
            <option key={i} value={kategori}>
              {kategori}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterAdmin;
