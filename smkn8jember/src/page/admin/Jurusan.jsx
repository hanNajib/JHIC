import React from "react";
import { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { FiFilter } from "react-icons/fi";
import { CiImageOn } from "react-icons/ci";
import ImageModal from "../../components/ui/ImageModal";

const Jurusan = () => {
  const [jurusan, setJurusan] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetch("/jurusan.json")
      .then((res) => res.json())
      .then((data) => setJurusan(data));
  }, []);

  return (
    <div className="flex flex-col justify-center gap-5 lg:gap-14 w-full h-fit bg-white rounded-lg p-5">
      {/* Title */}
      <div className="flex justify-between flex-col lg:flex-row gap-2">
        <h1 className="font-bold text-gray-900 text-2xl md:text-3xl lg:text-4xl">Jurusan</h1>

        <div className="flex gap-4">
          <a
            href="/jurusantrash"
            className="flex justify-center items-center gap-2 px-3 text-orange-500 text-base font-bold border-[1.9px] border-orange-500 rounded-sm hover:bg-orange-500 hover:text-white transition duration-300"
          >
            <FaPlus />
            <h6>Trash</h6>
          </a>
          <a
            href="/jurusan/tambah"
            className="flex justify-center items-center gap-2 px-3 text-orange-500 text-base font-bold border-[1.9px] border-orange-500 rounded-sm hover:bg-orange-500 hover:text-white transition duration-300"
          >
            <FaPlus />
            <h6>Tambah</h6>
          </a>
        </div>
      </div>

      {/* tabel */}
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white ">
          <thead class="bg-orange-500 border-2 border-gray-200">
            <tr>
              <th class="py-2 px-4 border text-left text-white min-w-full">
                No
              </th>
              <th class="py-2 px-4 border text-left text-white min-w-28">
                Jurusan
              </th>
              <th class="py-2 px-4 border text-left text-white min-w-80">
                Deskripsi
              </th>
              <th class="py-2 px-4 border text-left text-white min-w-full">
                Foto
              </th>
              <th class="py-2 px-4 border text-left text-white min-w-full">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {jurusan.map((a, _i) => (
              <tr class="hover:bg-gray-50 text-[14px]">
                <td class="py-2 px-4 border-b border-gray-400">{_i + 1}</td>
                <td class="py-2  border-b border-gray-400 ">{a.jurusan}</td>
                <td class="py-2  border-b border-gray-400 ">{a.deskripsi}</td>
                <td class="py-2 px-4 border-b border-gray-400">
                  <button
                    onClick={() => setSelectedImage(a.foto)} // buka modal
                    className="flex justify-center items-center gap-1 py-1 px-3 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                  >
                    <CiImageOn className="text-xl" />
                    {a.foto}
                  </button>
                </td>
                <td class="py-2 px-4 border-b border-gray-400 text-white ">
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
      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
};

export default Jurusan;
