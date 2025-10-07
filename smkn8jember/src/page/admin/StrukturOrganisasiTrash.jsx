import React from "react";
import { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { FiFilter } from "react-icons/fi";
import { CiImageOn } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";

const StrukturOrganisasiTrash = () => {
  const [jurusan, setJurusan] = useState([]);

  useEffect(() => {
    fetch("/guru.json")
      .then((res) => res.json())
      .then((data) => setJurusan(data));
  }, []);

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
        <h1 className="font-bold text-gray-900 text-2xl md:text-3xl lg:text-4xl">Struktur Organisasi</h1>
      </div>

      {/* tabel */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white ">
          <thead className="bg-orange-500 border-2 border-gray-200">
            <tr>
              <th className="py-2 px-4 border text-left text-white">No</th>
              <th className="py-2 px-4 border text-left text-white min-w-56">
                Jabatan
              </th>
              <th className="py-2 px-4 border text-left text-white">Pengisi</th>
              <th className="py-2 px-4 border text-left text-white">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {jurusan.map((a, _i) => (
              <tr className="hover:bg-gray-50 text-[14px]">
                <td className="py-2 px-4 border-b border-gray-400">{_i + 1}</td>
                <td className="py-2  border-b border-gray-400 ">{a.jabatan}</td>
                <td className="py-2  border-b border-gray-400 ">{a.nama}</td>
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
    </div>
  );
};

export default StrukturOrganisasiTrash;
