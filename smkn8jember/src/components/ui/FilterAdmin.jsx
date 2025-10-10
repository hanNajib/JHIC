import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdRefresh } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";

const FilterAdmin = ({
  filterKategori,
  setFilterKategori,
  search,
  setSearch,
  handleReset,
  linkTambah,
  titleTambah = "Tambah Data",
  kategoriList = [], //tambahan: daftar kategori dari parent
  showKategori,
}) => {
  return (
    <div className="bg-gray-50 shadow-md rounded-xl p-4 flex flex-wrap lg:flex-nowrap lg:items-end gap-4 w-full">
      {/* Filter Kategori */}
      {showKategori !== false && (
        <div className="block max-w-full">
          <h3 className="font-semibold text-gray-600">Kategori</h3>
          <select
            value={filterKategori}
            onChange={(e) => {
              setFilterKategori(e.target.value);
              setHalamanKe(1);
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-orange-400 focus:outline-none w-full lg:w-auto"
          >
            <option value="Semua">Semua Kategori</option>
            {kategoriList?.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Search Input */}
      <div className="flex-1 min-w-[200px]">
        <label htmlFor="search" className="font-semibold text-gray-600">
          Search
        </label>
        <div className="relative flex items-center w-full">
          <IoSearchOutline className="absolute left-3 text-gray-500" />
          <input
            id="search"
            type="text"
            placeholder="Cari data..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg pl-10 pr-3 py-2 w-full text-gray-700 focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Tombol Tambah Data */}
      {/* <div className="block max-w-full">
        <h3 className="font-semibold text-gray-600">From Tambah</h3> */}
        <a
          href={linkTambah}
          className="flex items-center justify-center gap-2 bg-orange-500 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-orange-600 transition duration-300 w-full sm:w-auto"
        >
          <FaPlus />
          <span>{titleTambah}</span>
        </a>
      {/* </div> */}

      {/* Tombol Reset */}
      <button
        onClick={handleReset}
        className="flex gap-2 justify-center items-center text-gray-800 border border-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition w-full sm:w-auto"
      >
        <IoMdRefresh className="text-xl" />
        Reset
      </button>
    </div>
  );
};

export default FilterAdmin;
