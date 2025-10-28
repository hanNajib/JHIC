import React, { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { FiFilter, FiCheck, FiX } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, NavLink } from "react-router-dom";
import { CiImageOn } from "react-icons/ci";
import ImageModal from "../../../components/ui/ImageModal";
import PaginationAdmin from "../../../components/ui/PaginationAdmin";

const ArtikelUserVerifikasi = () => {
  const navigate = useNavigate();
  const [artikel, setArtikel] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // Pagination
  const [halamanKe, setHalamanKe] = useState(1);
  const [jumlahPage, setJumlahPage] = useState(5);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setArtikel(data));
  }, []);

  // Hitung total halaman
  const jumlahHalaman = Math.ceil(artikel.length / jumlahPage);

  // Data untuk halaman aktif
  const arrayTerakhir = halamanKe * jumlahPage;
  const arrayAwal = arrayTerakhir - jumlahPage;
  const dataHasil = artikel.slice(arrayAwal, arrayTerakhir);

  // Ganti halaman
  const handlePageChange = (page) => {
    setHalamanKe(page);
  };

  return (
    <div className="flex flex-col justify-center gap-5 lg:gap-7 w-full h-fit bg-white rounded-lg p-5">
      <div className="flex justify-start items-center gap-2">
        <a
          onClick={() => navigate(-1)}
          className="cursor-pointer bg-orange-500 text-3xl lg:text-4xl text-center p-1 rounded-4xl text-white"
        >
          <IoIosArrowBack />
        </a>
        <h1 className="font-bold text-gray-900 text-3xl lg:text-4xl">
          Verifikasi Artikel User
        </h1>
      </div>

      {/* tabel */}
      <div className="overflow-x-auto shadow-lg rounded-lg relative">
        <table className="min-w-full bg-white ">
          <thead className="bg-gradient-to-r from-orange-500 to-orange-600">
            <tr>
              <th className="py-2 px-4 text-left text-white">No</th>
              <th className="py-2 px-4 text-left text-white min-w-56">
                Judul
              </th>
              <th className="py-2 px-4 text-left text-white">
                Kategori
              </th>
              <th className="py-2 px-4 text-left text-white">Tanggal</th>
              <th className="py-2 px-4 text-left text-white">Foto</th>
              <th className="py-2 px-4 text-left text-white">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataHasil.map((a, _i) => (
              <tr
                className="hover:bg-gray-50 text-[14px] border-b border-gray-300"
                key={a.id}
              >
                <td className="py-2 px-4">
                  {_i + 1 + arrayAwal}
                </td>
                <td className="py-2">{a.judul}</td>
                <td className="py-2 px-4">
                  <div className="grid grid-cols-2 gap-2 w-32">
                    {a.kategori.map((kate, index) => (
                      <div
                        key={index}
                        className="bg-orange-300/30 border border-orange-500 px-2 py-[1px] w-fit rounded-2xl text-sm text-orange-500"
                      >
                        {kate}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="py-2 px-4">
                  {a.tanggal}
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => setSelectedImage(a.image)}
                    className="flex justify-center items-center gap-1 py-1 px-3 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                  >
                    <CiImageOn className="text-xl" />
                    {a.image}
                  </button>
                </td>
                <td className="py-2 px-4 text-white ">
                  <div className="flex gap-2 justify-center ">
                    <NavLink
                      to={`/artikelUser/edit/${a.id}`}
                      className="text-center text-3xl bg-yellow-500 p-2 rounded-2xl shadow-lg"
                    >
                      <FaRegEdit className="text-lg" />
                    </NavLink>
                    <a
                      href="#"
                      className="text-center text-3xl bg-green-500 p-2 rounded-2xl shadow-lg"
                    >
                      <FiCheck className="text-lg" />
                    </a>
                    <a
                      href="#"
                      className="text-center text-3xl bg-red-500 p-2 rounded-2xl shadow-lg"
                    >
                      <FiX className="text-lg" />
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

      {/* Modal Gambar */}
      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
};

export default ArtikelUserVerifikasi;
