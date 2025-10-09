import React, { useState, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";
import ImageModal from "../../components/ui/ImageModal";
import PaginationAdmin from "../../components/ui/PaginationAdmin";

const JurusanTrash = () => {
  const [jurusan, setJurusan] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // Pagination
  const [halamanKe, setHalamanKe] = useState(1);
  const [jumlahPage, setJumlahPage] = useState(5);

  useEffect(() => {
    fetch("/jurusan.json")
      .then((res) => res.json())
      .then((data) => setJurusan(data));
  }, []);

  const jumlahHalaman = Math.ceil(jurusan.length / jumlahPage);

  const arrayTerakhir = halamanKe * jumlahPage;
  const arrayAwal = arrayTerakhir - jumlahPage;
  const dataHasil = jurusan.slice(arrayAwal, arrayTerakhir);

  const handlePageChange = (page) => {
    setHalamanKe(page);
  };

  return (
    <div className="flex flex-col justify-center gap-14 w-full h-fit bg-white rounded-lg p-5">
      {/* Title */}
      <div className="flex items-center gap-3">
        <a
          href="/jurusan"
          className="bg-orange-500 cursor-pointer text-4xl text-center p-1 rounded-4xl text-white"
        >
          <IoIosArrowBack />
        </a>
        <h1 className="font-bold text-gray-900 text-2xl md:text-3xl lg:text-4xl">
          Jurusan Trash
        </h1>
      </div>

      {/* tabel */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-orange-500 border-2 border-gray-200">
            <tr>
              <th className="py-2 px-4 border text-left text-white">No</th>
              <th className="py-2 px-4 border text-left text-white min-w-56">
                Jurusan
              </th>
              <th className="py-2 px-4 border text-left text-white">Deskripsi</th>
              <th className="py-2 px-4 border text-left text-white">Foto</th>
              <th className="py-2 px-4 border text-left text-white">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataHasil.map((a, _i) => (
              <tr key={a.id} className="hover:bg-gray-50 text-[14px]">
                <td className="py-2 px-4 border-b border-gray-400">
                  {_i + 1 + arrayAwal}
                </td>
                <td className="py-2 border-b border-gray-400">{a.jurusan}</td>
                <td className="py-2 border-b border-gray-400">{a.deskripsi}</td>
                <td className="py-2 px-4 border-b border-gray-400">
                  <button
                    onClick={() => setSelectedImage(a.foto)}
                    className="flex justify-center items-center gap-1 py-1 px-3 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                  >
                    <CiImageOn className="text-xl" />
                    {a.foto}
                  </button>
                </td>
                <td className="py-2 px-4 border-b border-gray-400 text-white">
                  <div className="flex gap-2 justify-center">
                    <a
                      href=""
                      className="text-center text-3xl bg-green-500 p-2 rounded-2xl shadow-lg"
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

      {/* Modal Gambar */}
      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
};

export default JurusanTrash;
