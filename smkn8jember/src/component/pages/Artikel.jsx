import React from "react";
import { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { FiFilter } from "react-icons/fi";
import { CiImageOn } from "react-icons/ci";

const Artikel = () => {
  const [artikel, setArtikel] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setArtikel(data));
  }, []);

  return (
    <div className="flex flex-col justify-center gap-5 lg:gap-14 w-full h-fit bg-white rounded-lg p-5">
      {/* Title dan Btn Halaman Artikel */}
      <div className="flex justify-between flex-col gap-2 lg:flex-row">
        <h1 className="font-bold text-gray-900 text-4xl">Artikel</h1>

        <div className="flex gap-2">
          <div className="flex justify-center items-center gap-2 px-3 text-orange-500 text-base font-bold border-[1.9px] border-orange-500 rounded-sm hover:bg-orange-500 hover:text-white transition duration-300">
            <FiFilter />
            <h6>Kategori</h6>
          </div>

          <a
            href="/artikel/tambah"
            className="flex justify-center items-center gap-2 px-3 text-orange-500 text-base font-bold border-[1.9px] border-orange-500 rounded-sm hover:bg-orange-500 hover:text-white transition duration-300"
          >
            <FaPlus />
            <h6>Tambah</h6>
          </a>
        </div>
      </div>

      {/* tabel-tabel */}
      <div class="overflow-x-auto">
        <table class="min-w-fit lg:min-w-full bg-white ">
          <thead class="bg-orange-500 border-2 border-gray-200">
            <tr>
              <th class="py-2 px-4 border text-left text-white">No</th>
              <th class="py-2 px-4 border text-left text-white min-w-56">
                Judul
              </th>
              <th class="py-2 px-4 border text-left text-white">Kategori</th>
              <th class="py-2 px-4 border text-left text-white">Tanggal</th>
              <th class="py-2 px-4 border text-left text-white">Foto</th>
              <th class="py-2 px-4 border text-left text-white">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {artikel.map((a, _i) => (
              <tr class="hover:bg-gray-50 text-[14px]">
                <td class="py-2 px-4 border-b border-gray-400">{_i + 1}</td>
                <td class="py-2  border-b border-gray-400 ">{a.judul}</td>
                <td class="py-2 px-4 border-b border-gray-400">
                  <div className="grid grid-cols-2 gap-2 w-32">
                    {a.kategori.map((kate) => (
                      <div className="bg-orange-500 px-2.5 w-fit rounded-2xl text-sm text-white">
                        {kate}
                      </div>
                    ))}
                  </div>
                </td>
                <td class="py-2 px-4 border-b border-gray-400">{a.tanggal}</td>
                <td class="py-2 px-4 border-b border-gray-400">
                  <button className="flex justify-center items-center gap-1 py-1 px-3 rounded-lg bg-gray-200">
                    <CiImageOn className="text-xl" />
                    {a.image}
                  </button>
                </td>
                <td class="py-2 px-4 border-b border-gray-400 text-white ">
                  <div className="flex gap-2 justify-center ">
                    {/* Btn Edit */}
                    <a
                      href={`/artikel/edit/${a.id}`}
                      className="text-center text-3xl bg-green-500 p-2 rounded-2xl shadow-lg"
                    >
                      <FaRegEdit className="text-lg" />
                    </a>
                    {/* hapus */}
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
    </div>
  );
};

export default Artikel;
