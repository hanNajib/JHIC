import { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import PaginationAdmin from "../../../components/ui/PaginationAdmin";
import FilterAdmin from "../../../components/ui/FilterAdmin";

const StrukturOrganisasi = () => {
  const [struktur, setStruktur] = useState([]);

  // Pagination
  const [halamanKe, setHalamanKe] = useState(1);
  const [jumlahPage, setJumlahPage] = useState(5);

  // Search & Filter
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Active");

  useEffect(() => {
    fetch("/guru.json")
      .then((res) => res.json())
      .then((data) => setStruktur(data));
  }, []);

  // Filter dan search
  const filteredStruktur = struktur.filter((a) => {
    const matchSearch = a.jabatan.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  const jumlahHalaman = Math.ceil(struktur.length / jumlahPage);
  const arrayTerakhir = halamanKe * jumlahPage;
  const arrayAwal = arrayTerakhir - jumlahPage;
  const dataHasil = filteredStruktur.slice(arrayAwal, arrayTerakhir);

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
        titleHalaman="Data Struktur Organisasi"
        descHalaman="Kelola data jabatan-jabatan struktur organisasi"
        linkTambah="/strukturorganisasi/tambah"
        titleBTN="Tambah Jabatan"
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
              <th className="py-2 px-4 text-left text-white min-w-38">
                Jabatan
              </th>
              <th className="py-2 px-4 text-left text-white min-w-50">
                Pengisi
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
                <td className="py-2">{a.jabatan}</td>
                <td className="py-2">{a.nama}</td>
                <td className="py-2 px-4 text-white ">
                  <div className="flex gap-2 justify-center ">
                    <a
                      href={`/strukturorganisasi/edit/${a.id}`}
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
    </div>
  );
};

export default StrukturOrganisasi;
