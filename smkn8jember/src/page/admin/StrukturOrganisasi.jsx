import { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import PaginationAdmin from "../../components/ui/PaginationAdmin";
import FilterAdmin from "../../components/ui/FilterAdmin";

const StrukturOrganisasi = () => {
  const [struktur, setStruktur] = useState([]);

  // Pagination
  const [halamanKe, setHalamanKe] = useState(1);
  const [jumlahPage, setJumlahPage] = useState(5);

  // Search & Filter
  const [search, setSearch] = useState("");

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

  // Hitung total halaman
  const jumlahHalaman = Math.ceil(struktur.length / jumlahPage);
  // Tentukan data awal & akhir per halaman
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
    <div className="flex flex-col justify-center gap-5 lg:gap-7 w-full h-fit bg-white rounded-lg p-5">
      {/* Title */}
      <h1 className="font-bold text-gray-900 text-2xl md:text-3xl lg:text-4xl">
        Struktur Organisasi
      </h1>

      {/*  FILTER SECTION  */}
      <FilterAdmin
        showKategori={false} //ini menandakan kategori disembunyikan
        search={search}
        setSearch={(value) => {
          setSearch(value);
          setHalamanKe(1);
        }}
        handleReset={handleReset}
        linkTambah="/dataguru/tambah"
        titleTambah="Tambah Guru"
      />

      {/* tabel */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white ">
          <thead className="bg-orange-500 border-2 border-gray-200">
            <tr>
              <th className="py-2 px-4 border text-left text-white min-w-full">
                No
              </th>
              <th className="py-2 px-4 border text-left text-white min-w-38">
                Jabatan
              </th>
              <th className="py-2 px-4 border text-left text-white min-w-50">
                Pengisi
              </th>
              <th className="py-2 px-4 border text-left text-white min-w-full">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {dataHasil.map((a, _i) => (
              <tr key={a.id} className="hover:bg-gray-50 text-[14px]">
                <td className="py-2 px-4 border-b border-gray-400">
                  {_i + 1 + arrayAwal}
                </td>
                <td className="py-2 border-b border-gray-400">{a.jabatan}</td>
                <td className="py-2 border-b border-gray-400">{a.nama}</td>
                <td className="py-2 px-4 border-b border-gray-400 text-white ">
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
