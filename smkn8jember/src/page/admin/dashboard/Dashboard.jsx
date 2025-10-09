import React from "react";
import { GrArticle } from "react-icons/gr";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-10 ">
      {/* title halaman */}
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-2xl md:text-4xl font-poppins text-gray-900">
          Selamat Datang di Admin, Eskalaber Jaya
        </h1>
        <h4 className="text-gray-500 font-medium text-sm md:text-base">
          Web Site merupakan salah satu wujud dari kemajuan teknologi di dunia
        </h4>
      </div>

      {/* cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex justify-between p-6 md:p-8 items-center w-full rounded-lg bg-white text-gray-900 shadow-md"
          >
            <div>
              <h4 className="font-bold text-base">Artikel Terbit</h4>
              <h3 className="font-bold text-2xl md:text-3xl">255</h3>
            </div>
            <div className="rounded-4xl p-3 bg-orange-500/25 text-orange-500 text-2xl md:text-3xl">
              <GrArticle />
            </div>
          </div>
        ))}
      </div>

      {/* artikel populer */}
      <div className="bg-white rounded-lg p-5">
        <h2 className="font-bold text-xl md:text-2xl mb-4">Artikel Populer</h2>

        <div className="rounded-2xl overflow-hidden overflow-x-auto">
          <table className="w-full text-sm min-w-[500px]">
            <thead>
              <tr className="bg-orange-200">
                <th className="px-4 py-2 text-center font-extrabold">No</th>
                <th className="px-4 py-2 text-start font-extrabold">Gambar</th>
                <th className="px-4 py-2 text-start font-extrabold">Judul</th>
                <th className="px-4 py-2 w-24 text-start font-extrabold">
                  Dilihat
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }).map((_, i) => (
                <tr
                  key={i}
                  className="border-t border-gray-300 text-gray-800"
                >
                  <td className="px-4 py-2 text-center font-semibold">
                    {i + 1}
                  </td>
                  <td className="px-4 py-2 w-36">
                    <img
                      src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/d9/fa/1b/lost-valley.jpg?w=900&h=500&s=1"
                      alt="Artikel"
                      className="w-20 h-14 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2 font-semibold">
                    Juara 1 Lomba Kreasi Tingkat Kabupaten Jember
                  </td>
                  <td className="px-4 py-2 text-start font-semibold">157</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
