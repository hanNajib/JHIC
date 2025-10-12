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

const Guru = () => {
  const [guru, setGuru] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // Pagiination
  const [halamanKe, setHalamanKe] = useState(1);
  const [jumlahPage, setJumlahPage] = useState(5);

  // Search & Filter
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Semua");

  useEffect(() => {
    fetch("/guru.json")
      .then((res) => res.json())
      .then((data) => setGuru(data));
  }, []);

  // Filter dan search
  const filteredGuru = guru.filter((a) => {
    const matchSearch = a.nama.toLowerCase().includes(search.toLowerCase());
    // const matchStatus =
    //   status === "Semua" || a.kategori.includes(status);
    return matchSearch;
  });

  const jumlahHalaman = Math.ceil(guru.length / jumlahPage);
  const arrayTerakhir = halamanKe * jumlahPage;
  const arrayAwal = arrayTerakhir - jumlahPage;
  const dataHasil = filteredGuru.slice(arrayAwal, arrayTerakhir);

  const handleReset = () => {
    setSearch("");
    setStatus("Semua");
    setHalamanKe(1);
  };

  return (
    <div className="flex flex-col justify-center gap-5 lg:gap-4 w-full h-fit bg-white rounded-lg p-5">
      {/*  filters */}
      <FilterAdmin
        filterKategori={status}
        setFilterKategori={(value) => {
          setStatus(value);
          setHalamanKe(1);
        }}
        search={search}
        setSearch={(value) => {
          setSearch(value);
          setHalamanKe(1);
        }}
        handleReset={handleReset}
        titleHalaman="Data Guru"
        descHalaman="Kelola data guru"
        linkTambah="/dataguru/tambah"
        titleBTN="Tambah Guru"
        kategoriList={["Active", "Nonactive"]}
      />

      {/* tabel */}
      <div className="overflow-x-auto shadow-lg rounded-lg relative">
        <table className="min-w-full bg-white ">
          <thead className="bg-gradient-to-r from-orange-500 to-orange-600">
            <tr>
              <th className="py-2 px-4 text-left text-white min-w-full">
                No
              </th>
              <th className="py-2 px-4 text-left text-white min-w-full">
                Nama
              </th>
              <th className="py-2 px-4 text-left text-white min-w-full">
                Jabatan
              </th>
              <th className="py-2 px-4 text-left text-white min-w-full">
                Mapel
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
              <tr className="hover:bg-gray-50 text-[14px] border-b border-gray-300">
                <td className="py-2 px-4">
                  {_i + 1 + arrayAwal}
                </td>
                <td className="py-2  ">{a.nama}</td>
                <td className="py-2 px-4">
                  {a.jabatan}
                </td>
                <td className="py-2  ">{a.mapel}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => setSelectedImage(a.foto)} // buka modal
                    className="flex justify-center items-center gap-1 py-1 px-3 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                  >
                    <CiImageOn className="text-xl" />
                    {a.foto}
                  </button>
                </td>
                <td className="py-2 px-4 text-white ">
                  <div className="flex gap-2 justify-center ">
                    <a
                      href={`/dataguru/edit/${a.id}`}
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

export default Guru;
