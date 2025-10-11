import React, { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import ImageModal from "../../components/ui/ImageModal";
import PaginationAdmin from "../../components/ui/PaginationAdmin";
import FilterAdmin from "../../components/ui/FilterAdmin";

const Jurusan = () => {
  const [jurusan, setJurusan] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // Pagination
  const [halamanKe, setHalamanKe] = useState(1);
  const [jumlahPage, setJumlahPage] = useState(5);

  // Search & Filter
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Active");

  useEffect(() => {
    fetch("/jurusan.json")
      .then((res) => res.json())
      .then((data) => setJurusan(data));
  }, []);

  // Filter dan search
  const filteredJurusan = jurusan.filter((a) => {
    const matchSearch = a.jurusan.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  // Hitung jumlah halaman
  const jumlahHalaman = Math.ceil(jurusan.length / jumlahPage);

  // Tentukan data awal dan akhir untuk halaman aktif
  const arrayTerakhir = halamanKe * jumlahPage;
  const arrayAwal = arrayTerakhir - jumlahPage;
  const dataHasil = filteredJurusan.slice(arrayAwal, arrayTerakhir);

  // Ganti halaman
  const handlePageChange = (page) => {
    setHalamanKe(page);
  };

  const handleReset = () => {
    setSearch("");
    setFilterKategori("Active");
    setHalamanKe(1);
  };

  return (
    <div className="flex flex-col justify-center gap-5 lg:gap-4 w-full h-fit bg-white rounded-lg p-5">
      {/*  filters */}
      <FilterAdmin
        filterKategori={status}
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
        titleHalaman="Data Jurusan"
        descHalaman="Kelola data jurusan sekolah"
        linkTambah="/jurusan/tambah"
        titleBTN="Tambah Jurusan"
        kategoriList={["Active", "Non-Active"]}
      />

      {/* tabel */}
      <div className="overflow-x-auto shadow-lg rounded-lg relative">
        <table className="min-w-full bg-white ">
          <thead className="bg-gradient-to-r from-orange-500 to-orange-600">
            <tr>
              <th className="py-2 px-4 text-left text-white min-w-full">
                No
              </th>
              <th className="py-2 px-4 text-left text-white min-w-28">
                Jurusan
              </th>
              <th className="py-2 px-4 text-left text-white min-w-80">
                Deskripsi
              </th>
              <th className="py-2 px-4 text-left text-white min-w-full">
                Foto
              </th>
              <th className="py-2 px-4 text-left text-white min-w-full">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {dataHasil.map((a, _i) => (
              <tr key={a.id} className="hover:bg-gray-50 text-[14px] border-b border-gray-300">
                <td className="py-2 px-4">
                  {_i + 1 + arrayAwal}
                </td>
                <td className="py-2">{a.jurusan}</td>
                <td className="py-2">{a.deskripsi}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => setSelectedImage(a.foto)}
                    className="flex justify-center items-center gap-1 py-1 px-3 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                  >
                    <CiImageOn className="text-xl" />
                    {a.foto}
                  </button>
                </td>
                <td className="py-2 px-4 text-white">
                  <div className="flex gap-2 justify-center ">
                    <a
                      href={`/jurusan/edit/${a.id}`}
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

      {/* Pagination */}
      <PaginationAdmin
        currentPage={halamanKe}
        totalPages={jumlahHalaman}
        perPage={jumlahPage}
        onPageChange={handlePageChange}
        onPerPageChange={(value) => {
          setJumlahPage(value);
          setHalamanKe(1);
        }}
      />

      {/* Modal Foto */}
      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
};

export default Jurusan;
