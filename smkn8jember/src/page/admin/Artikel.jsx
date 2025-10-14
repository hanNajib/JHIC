import { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import ImageModal from "../../components/ui/ImageModal";
import PaginationAdmin from "../../components/ui/PaginationAdmin";
import FilterAdmin from "../../components/ui/FilterAdmin";

const Artikel = () => {
  const [artikel, setArtikel] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const [halamanKe, setHalamanKe] = useState(1);
  const [jumlahPage, setJumlahPage] = useState(5);

  const [search, setSearch] = useState("");
  const [filterKategori, setFilterKategori] = useState("Semua");

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setArtikel(data));
  }, []);

  const filteredArtikel = artikel.filter((a) => {
    const matchSearch = a.judul.toLowerCase().includes(search.toLowerCase());
    const matchKategori =
      filterKategori === "Semua" || a.kategori.includes(filterKategori);
    return matchSearch && matchKategori;
  });

  const jumlahHalaman = Math.ceil(filteredArtikel.length / jumlahPage);
  const arrayTerakhir = halamanKe * jumlahPage;
  const arrayAwal = arrayTerakhir - jumlahPage;
  const dataHasil = filteredArtikel.slice(arrayAwal, arrayTerakhir);

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
        titleHalaman="Data Artikel"
        descHalaman="Kelola data artikel"
        linkTambah="/artikel/tambah"
        titleBTN="Tambah Artikel"
        kategoriList={["RPL", "Prestasi", "Karya", "Edukasi"]}
      />

      {/* tebel  */}
      <div className="overflow-x-auto shadow-lg rounded-lg relative">
        <table className="min-w-full bg-white">
          <thead className="bg-gradient-to-r from-orange-500 to-orange-600">
            <tr>
              <th className="py-2 px-4 text-left text-white">No</th>
              <th className="py-2 px-4 text-left text-white min-w-56">Judul</th>
              <th className="py-2 px-4 text-left text-white">Kategori</th>
              <th className="py-2 px-4 text-left text-white">Tanggal</th>
              <th className="py-2 px-4 text-left text-white">Foto</th>
              <th className="py-2 px-4 text-left text-white">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataHasil.map((a, i) => (
              <tr
                key={a.id}
                className="hover:bg-gray-50 text-[14px] border-b border-gray-300"
              >
                <td className="py-2 px-4">{arrayAwal + i + 1}</td>
                <td className="py-2 px-4">{a.judul}</td>
                <td className="py-2 px-4">
                  <div className="grid grid-cols-2 gap-1 items-start w-fit">
                    {a.kategori.map((kate, k) => (
                      <div
                        key={k}
                        className="bg-orange-300/30 border border-orange-500 px-2 py-[1px] w-fit rounded-2xl text-sm text-orange-500"
                      >
                        {kate}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="py-2 px-4">{a.tanggal}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => setSelectedImage(a.image)}
                    className="flex justify-center items-center gap-1 py-1 px-3 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                  >
                    <CiImageOn className="text-xl" />
                    {a.image}
                  </button>
                </td>
                <td className="py-2 px-4 text-white">
                  <div className="flex gap-2 justify-center">
                    <a
                      href={`/artikel/edit/${a.id}`}
                      className="text-center text-3xl bg-green-500 p-2 rounded-2xl shadow-lg"
                    >
                      <FaRegEdit className="text-lg" />
                    </a>
                    <a
                      href="#"
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

      {/* ===================== PAGINATION ===================== */}
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

      {/*modal image*/}
      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
};

export default Artikel;
