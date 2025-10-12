import React from "react";
import { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { FiFilter } from "react-icons/fi";
import { CiImageOn } from "react-icons/ci";
import ImageModal from "../../../components/ui/ImageModal";
import PaginationAdmin from "../../../components/ui/PaginationAdmin";
import FilterAdmin from "../../../components/ui/FilterAdmin";

const Pengumuman = () => {
  const [pengumuman, setPengumuman] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // Pagiination
  const [halamanKe, setHalamanKe] = useState(1);
  const [jumlahPage, setJumlahPage] = useState(5);

  // Search & Filter
  const [search, setSearch] = useState("");
  const [filterKategori, setFilterKategori] = useState("Semua");

  useEffect(() => {
    fetch("/pengumuman.json")
      .then((res) => res.json())
      .then((data) => setPengumuman(data));
  }, []);

  // Filter dan search
  const filteredPengumuman = pengumuman.filter((a) => {
    const matchSearch = a.judul.toLowerCase().includes(search.toLowerCase());
    const matchKategori =
      filterKategori === "Semua" || a.kategori.includes(filterKategori);
    return matchSearch && matchKategori;
  });

  const jumlahHalaman = Math.ceil(pengumuman.length / jumlahPage);
  const arrayTerakhir = halamanKe * jumlahPage;
  const arrayAwal = arrayTerakhir - jumlahPage;
  const dataHasil = filteredPengumuman.slice(arrayAwal, arrayTerakhir);

  // ganti halaman
  const handlePageChange = (page) => {
    setHalamanKe(page);
  };

  const handleReset = () => {
    setSearch("");
    setFilterKategori("Semua");
    setHalamanKe(1);
  };

  return (
    <div className="flex flex-col justify-center gap-5 lg:gap-4 w-full h-fit bg-white rounded-lg p-5">
      {/*  filters */}
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
        titleHalaman="Data Pengumuman"
        descHalaman="Kelola data pengumuman"
        linkTambah="/pengumuman/tambah"
        titleBTN="Tambah Pengumuman"
        kategoriList={["RPL", "Prestasi", "Karya", "Edukasi"]}
      />

      {/* tabel */}
      <div class="overflow-x-auto shadow-lg rounded-lg relative">
        <table class="min-w-full bg-white ">
          <thead class="bg-gradient-to-r from-orange-500 to-orange-600">
            <tr>
              <th class="py-2 px-4 text-left text-white">No</th>
              <th class="py-2 px-4 text-left text-white min-w-56">
                Judul
              </th>
              <th class="py-2 px-4 text-left text-white">Kategori</th>
              <th class="py-2 px-4 text-left text-white">Tanggal</th>
              <th class="py-2 px-4 text-left text-white">Foto</th>
              <th class="py-2 px-4 text-left text-white">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataHasil.map((a, _i) => (
              <tr class="hover:bg-gray-50 text-[14px] border-b border-gray-300">
                <td class="py-2 px-4">
                  {_i + 1 + arrayAwal}
                </td>
                <td class="py-2">{a.judul}</td>
                <td class="py-2 px-4">
                  <div className="flex gap-2">
                    <div className="bg-orange-300/30 border border-orange-500 px-2 py-[1px] w-fit rounded-2xl text-sm text-orange-500">
                      {a.kategori}
                    </div>
                  </div>
                </td>
                <td class="py-2 px-4">{a.tanggal}</td>
                <td class="py-2 px-4">
                  <button
                    onClick={() => setSelectedImage(a.image)} // buka modal
                    className="flex justify-center items-center gap-1 py-1 px-3 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                  >
                    <CiImageOn className="text-xl" />
                    {a.image}
                  </button>
                </td>
                <td class="py-2 px-text-white ">
                  <div className="flex gap-2 justify-center ">
                    <a
                      href={`/pengumuman/edit/${a.id}`}
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

export default Pengumuman;
