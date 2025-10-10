import React from "react";
import { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { FiFilter } from "react-icons/fi";
import ImageModal from "../../../components/ui/ImageModal";
import { CiImageOn } from "react-icons/ci";
import PaginationAdmin from "../../../components/ui/PaginationAdmin";
import FilterAdmin from "../../../components/ui/FilterAdmin";

const Gambar = () => {
  const [gambar, setGambar] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // pagantion
  const [halamanKe, setHalamanKe] = useState(1);
  const [jumlahPage, setJumlahPage] = useState(5);

  // Search & Filter
  const [search, setSearch] = useState("");
  const [filterKategori, setFilterKategori] = useState("Semua");

  useEffect(() => {
    fetch("/gambar.json")
      .then((res) => res.json())
      .then((data) => setGambar(data));
  }, []);

  // Filter dan search
  const filteredGambar = gambar.filter((a) => {
    const matchSearch = a.judul.toLowerCase().includes(search.toLowerCase());
    const matchKategori =
      filterKategori === "Semua" || a.kategori.includes(filterKategori);
    return matchSearch && matchKategori;
  });

  const jumlahHalaman = Math.ceil(filteredGambar.length / jumlahPage);

  const arrayTerakhir = halamanKe * jumlahPage;
  const arrayAwal = arrayTerakhir - jumlahPage;
  const dataHasil = filteredGambar.slice(arrayAwal, arrayTerakhir);

  const handlePageChange = (page) => {
    setHalamanKe(page);
  };

  const handleReset = () => {
    setSearch("");
    setFilterKategori("Semua");
    setHalamanKe(1);
  };

  return (
    <div className="flex flex-col justify-center gap-5 lg:gap-7 w-full h-fit bg-white rounded-lg p-5">
      {/* Title */}
      <h1 className="font-bold text-gray-900 text-2xl md:text-3xl lg:text-4xl">
        Gambar
      </h1>

      <FilterAdmin
        filterKategori={filterKategori}
        setFilterKategori={(value) => {
          setFilterKategori(value);
          setHalamanKe(1);
        }}
        search={search}
        setSearch={(value) => {
          setSearch(value);
          setHalamanKe(1);
        }}
        handleReset={handleReset}
        linkTambah="/gambar/tambah"
        titleTambah="Tambah Gambar"
        kategoriList={["RPL", "Prestasi", "Karya", "Edukasi"]} //custom kategori
      />

      {/* tabel */}
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white ">
          <thead class="bg-orange-500 border-2 border-gray-200">
            <tr>
              <th class="py-2 px-4 border text-left text-white">No</th>
              <th class="py-2 px-4 border text-left text-white min-w-56">
                Judul
              </th>
              <th class="py-2 px-4 border text-left text-white">Kategori</th>
              <th class="py-2 px-4 border text-left text-white">Tanggal</th>
              <th class="py-2 px-4 border text-left text-white">Foto</th>
              <th class="py-2 px-4 border text-left text-white">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataHasil.map((a, _i) => (
              <tr class="hover:bg-gray-50 text-[14px]">
                <td class="py-2 px-4 border-b border-gray-400">
                  {_i + 1 + arrayAwal}
                </td>
                <td class="py-2  border-b border-gray-400 ">{a.judul}</td>
                <td class="py-2 px-4 border-b border-gray-400">
                  <div className="flex gap-2">
                    <div className="bg-orange-500 px-2 rounded-2xl text-white">
                      {a.kategori}
                    </div>
                  </div>
                </td>
                <td class="py-2 px-4 border-b border-gray-400">{a.tanggal}</td>
                <td class="py-2 px-4 border-b border-gray-400">
                  <button
                    onClick={() => setSelectedImage(a.image)} // buka modal
                    className="flex justify-center items-center gap-1 py-1 px-3 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                  >
                    <CiImageOn className="text-xl" />
                    {a.image}
                  </button>
                </td>
                <td class="py-2 px-4 border-b border-gray-400 text-white ">
                  <div className="flex gap-2 justify-center ">
                    <a
                      href={`/gambar/edit/${a.id}`}
                      className="text-center text-3xl bg-green-500 p-2 rounded-2xl shadow-lg"
                    >
                      <FaRegEdit className="text-lg" />
                    </a>
                    <a
                      href=""
                      className="text-center text-3xl bg-red-500 p-2 rounded-2xl shadow-lg"
                    >
                      <MdDeleteOutline className="text-lg" />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PaginationAdmin
        currentPage={halamanKe}
        totalPages={jumlahHalaman}
        perPage={jumlahPage}
        onPageChange={(value) => {
          setHalamanKe(value);
        }}
        onPerPageChange={(value) => {
          setJumlahPage(value);
          setHalamanKe(1);
        }}
      />

      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
};

export default Gambar;
