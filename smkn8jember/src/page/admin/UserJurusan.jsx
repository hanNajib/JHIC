import React from "react";
import { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { FiFilter } from "react-icons/fi";
import { CiImageOn } from "react-icons/ci";
import ImageModal from "../../components/ui/ImageModal";

const UserJurusan = () => {
  const [mapel, setMapel] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetch("/userjurusan.json")
      .then((res) => res.json())
      .then((data) => setMapel(data));
  }, []);

  return (
    <div className="flex flex-col justify-center gap-5 lg:gap-14 w-full h-fit bg-white rounded-lg p-5">
      {/* Title */}
      <div className="flex justify-between flex-col lg:flex-row">
        <h1 className="font-bold text-gray-900 text-2xl md:text-3xl lg:text-4xl">User Jurusan</h1>

        <a
          href="/userjurusan/tambah"
          className="flex justify-center items-center gap-2 px-3 text-orange-500 text-base font-bold border-[1.9px] border-orange-500 rounded-sm hover:bg-orange-500 hover:text-white transition duration-300 w-fit"
        >
          <FaPlus />
          <h6>Tambah</h6>
        </a>
      </div>

      {/* tabel */}
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white ">
          <thead class="bg-orange-500 border-2 border-gray-200">
            <tr>
              <th class="py-2 px-4 border text-left text-white min-w-full">
                No
              </th>
              <th class="py-2 px-4 border text-left text-white min-w-">Nama</th>
              <th class="py-2 px-4 border text-left text-white min-w-full">
                Email
              </th>
              <th class="py-2 px-4 border text-left text-white min-w-full">
                NoHp
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
            {mapel.map((a, _i) => (
              <tr class="hover:bg-gray-50 text-[14px]">
                <td class="py-2 px-4 border-b border-gray-400">{_i + 1}</td>
                <td class="py-2  border-b border-gray-400 ">{a.nama}</td>
                <td class="py-2 px-4 border-b border-gray-400">{a.email}</td>
                <td class="py-2  border-b border-gray-400 ">{a.noHp}</td>
                <td className="py-2 px-4 border-b border-gray-400">
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
                      href={`/userjurusan/edit/${a.id}`}
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

export default UserJurusan;
