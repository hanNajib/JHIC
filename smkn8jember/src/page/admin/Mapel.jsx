import React, { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import PaginationAdmin from "../../components/ui/PaginationAdmin";
import FilterAdmin from "../../components/ui/FilterAdmin";

const Mapel = () => {
  const [mapel, setMapel] = useState([]);

  // Pagination state
  const [halamanKe, setHalamanKe] = useState(1);
  const [jumlahPage, setJumlahPage] = useState(5);

  // Search & Filter
  const [search, setSearch] = useState("");
  const [filterKategori, setFilterKategori] = useState("Semua");

  useEffect(() => {
    fetch("/mapel.json")
      .then((res) => res.json())
      .then((data) => setMapel(data));
  }, []);

  // Filter dan search
  const filteredMapel = mapel.filter((a) => {
    const matchSearch = a.mapel.toLowerCase().includes(search.toLowerCase());
    const matchKategori =
      filterKategori === "Semua" || a.jurusan.includes(filterKategori);
    return matchSearch && matchKategori;
  });

  // Hitung total halaman
  const jumlahHalaman = Math.ceil(mapel.length / jumlahPage);
  // Tentukan data yang akan ditampilkan
  const arrayTerakhir = halamanKe * jumlahPage;
  const arrayAwal = arrayTerakhir - jumlahPage;
  const dataHasil = filteredMapel.slice(arrayAwal, arrayTerakhir);

  // Ganti halaman
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
        titleHalaman="Data Mapel"
        descHalaman="Kelola data mata pelajaran umum setiap jurusan"
        linkTambah="/mapel/tambah"
        titleBTN="Tambah Mapel"
        kategoriList={["Rekayasa Perangkat Lunak", "Teknik Komputer dan Jaringan"]}
      />

      {/* tabel */}
      <div className="overflow-x-auto shadow-lg rounded-lg relative">
        <table className="min-w-full bg-white">
          <thead className="bg-gradient-to-r from-orange-500 to-orange-600">
            <tr>
              <th className="py-2 px-4 text-left text-white">No</th>
              <th className="py-2 px-4 text-left text-white">
                Mata Pelajaran
              </th>
              <th className="py-2 px-4 text-left text-white">Jurusan</th>
              <th className="py-2 px-4 text-left text-white">
                Deskripsi
              </th>
              <th className="py-2 px-4 text-left text-white">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataHasil.map((a, _i) => (
              <tr key={a.id} className="hover:bg-gray-50 text-[14px] border-b border-gray-300">
                <td className="py-2 px-4">
                  {_i + 1 + arrayAwal}
                </td>
                <td className="py-2">{a.mapel}</td>
                <td className="py-2 px-4">
                  {a.jurusan}
                </td>
                <td className="py-2">{a.deskripsi}</td>
                <td className="py-2 px-4 text-white">
                  <div className="flex gap-2 justify-center">
                    <a
                      href={`/mapel/edit/${a.id}`}
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

      {/* pagination */}
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
    </div>
  );
};

export default Mapel;
