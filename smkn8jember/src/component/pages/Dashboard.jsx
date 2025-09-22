import React from "react";
import { GrArticle } from "react-icons/gr";
import { PiPencilLineDuotone } from "react-icons/pi";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-10">
      {/* title halaman */}
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-4xl font-poppins text-gray-900">
          Selamat Data di Admin, Eskalaber Jaya
        </h1>
        <h4 className="text-gray-500 font-medium text-sm">
          Web Site merupakan salah satu wujud dari kemajuan teknologi di dunia{" "}
        </h4>
      </div>

      {/* card */}
      <div className="flex justify-between items-center">
        {/* Artikel */}
        <div className="flex justify-between p-8 items-center w-56 rounded-lg bg-white text-gray-900 shadow-md">
          <div>
            <h4 className="font-bold text-base">Artikel Terbit</h4>
            <h3 className="font-bold text-3xl">255</h3>
          </div>
          <div className="rounded-4xl p-3 bg-orange-500/25 text-orange-500 text-3xl">
            <GrArticle />
          </div>
        </div>
        {/* Artikel */}
        <div className="flex justify-between p-8 items-center w-56 rounded-lg bg-white text-gray-900 shadow-md">
          <div>
            <h4 className="font-bold text-base">Artikel Terbit</h4>
            <h3 className="font-bold text-3xl">255</h3>
          </div>
          <div className="rounded-4xl p-3 bg-orange-500/25 text-orange-500 text-3xl">
            <GrArticle />
          </div>
        </div>
        {/* Artikel */}
        <div className="flex justify-between p-8 items-center w-56 rounded-lg bg-white text-gray-900 shadow-md">
          <div>
            <h4 className="font-bold text-base">Artikel Terbit</h4>
            <h3 className="font-bold text-3xl">255</h3>
          </div>
          <div className="rounded-4xl p-3 bg-orange-500/25 text-orange-500 text-3xl">
            <GrArticle />
          </div>
        </div>
        {/* Artikel */}
        <div className="flex justify-between p-8 items-center w-56 rounded-lg bg-white text-gray-900 shadow-md">
          <div>
            <h4 className="font-bold text-base">Penulis</h4>
            <h3 className="font-bold text-3xl">255</h3>
          </div>
          <div className="rounded-4xl p-3 bg-orange-500/25 text-orange-500 text-3xl">
            <PiPencilLineDuotone />
          </div>
        </div>
      </div>

      {/* artikel populer */}
      <div className="bg-white rounded-lg p-5">
        <h2 className="font-bold text-2xl mb-4">Artikel Populer</h2>

        <div className="rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-orange-200">
                <th className="px-4 py-2 text-center font-extrabold">No</th>
                <th className="px-4 py-2 text-start font-extrabold">Gambar</th>
                <th className="px-4 py-2 text-start font-extrabold">Judul</th>
                <th className="px-4 py-2 w-24 text-start font-extrabold">Dilihat</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-600 text-gray-800">
                <td className="px-4 py-2 text-center font-semibold">1</td>
                <td className="px-4 py-2 w-36 ">
                  <img
                    src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/d9/fa/1b/lost-valley.jpg?w=900&h=500&s=1"
                    alt="Artikel"
                    className="w-20 h-14 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 font-semibold ">
                  Juara 1 Lomba Kreasi Tingkat Kabupaten Jember
                </td>
                <td className="px-4 py-2 text-start font-semibold">157</td>
              </tr>
              <tr className="border-t border-gray-600 text-gray-800">
                <td className="px-4 py-2 text-center font-semibold">2</td>
                <td className="px-4 py-2 w-36 ">
                  <img
                    src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/d9/fa/1b/lost-valley.jpg?w=900&h=500&s=1"
                    alt="Artikel"
                    className="w-20 h-14 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 font-semibold ">
                  Juara 1 Lomba Kreasi Tingkat Kabupaten Jember
                </td>
                <td className="px-4 py-2 text-start font-semibold">157</td>
              </tr>
              <tr className="border-t border-gray-600 text-gray-800">
                <td className="px-4 py-2 text-center font-semibold">3</td>
                <td className="px-4 py-2 w-36 ">
                  <img
                    src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/d9/fa/1b/lost-valley.jpg?w=900&h=500&s=1"
                    alt="Artikel"
                    className="w-20 h-14 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 font-semibold ">
                  Juara 1 Lomba Kreasi Tingkat Kabupaten Jember
                </td>
                <td className="px-4 py-2 text-start font-semibold">157</td>
              </tr>
              <tr className="border-t border-gray-600 text-gray-800">
                <td className="px-4 py-2 text-center font-semibold">4</td>
                <td className="px-4 py-2 w-36 ">
                  <img
                    src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/d9/fa/1b/lost-valley.jpg?w=900&h=500&s=1"
                    alt="Artikel"
                    className="w-20 h-14 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 font-semibold ">
                  Juara 1 Lomba Kreasi Tingkat Kabupaten Jember
                </td>
                <td className="px-4 py-2 text-start font-semibold">157</td>
              </tr>
              <tr className="border-t border-gray-600 text-gray-800">
                <td className="px-4 py-2 text-center font-semibold">5</td>
                <td className="px-4 py-2 w-36 ">
                  <img
                    src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/d9/fa/1b/lost-valley.jpg?w=900&h=500&s=1"
                    alt="Artikel"
                    className="w-20 h-14 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 font-semibold ">
                  Juara 1 Lomba Kreasi Tingkat Kabupaten Jember
                </td>
                <td className="px-4 py-2 text-start font-semibold">157</td>
              </tr>
              <tr className="border-t border-gray-600 text-gray-800">
                <td className="px-4 py-2 text-center font-semibold">6</td>
                <td className="px-4 py-2 w-36 ">
                  <img
                    src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/d9/fa/1b/lost-valley.jpg?w=900&h=500&s=1"
                    alt="Artikel"
                    className="w-20 h-14 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 font-semibold ">
                  Juara 1 Lomba Kreasi Tingkat Kabupaten Jember
                </td>
                <td className="px-4 py-2 text-start font-semibold">157</td>
              </tr>
              <tr className="border-t border-gray-600 text-gray-800">
                <td className="px-4 py-2 text-center font-semibold">7</td>
                <td className="px-4 py-2 w-36 ">
                  <img
                    src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/d9/fa/1b/lost-valley.jpg?w=900&h=500&s=1"
                    alt="Artikel"
                    className="w-20 h-14 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 font-semibold ">
                  Juara 1 Lomba Kreasi Tingkat Kabupaten Jember
                </td>
                <td className="px-4 py-2 text-start font-semibold">157</td>
              </tr>
              <tr className="border-t border-gray-600 text-gray-800">
                <td className="px-4 py-2 text-center font-semibold">8</td>
                <td className="px-4 py-2 w-36 ">
                  <img
                    src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/d9/fa/1b/lost-valley.jpg?w=900&h=500&s=1"
                    alt="Artikel"
                    className="w-20 h-14 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 font-semibold ">
                  Juara 1 Lomba Kreasi Tingkat Kabupaten Jember
                </td>
                <td className="px-4 py-2 text-start font-semibold">157</td>
              </tr>
              <tr className="border-t border-gray-600 text-gray-800">
                <td className="px-4 py-2 text-center font-semibold">9</td>
                <td className="px-4 py-2 w-36 ">
                  <img
                    src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/d9/fa/1b/lost-valley.jpg?w=900&h=500&s=1"
                    alt="Artikel"
                    className="w-20 h-14 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 font-semibold ">
                  Juara 1 Lomba Kreasi Tingkat Kabupaten Jember
                </td>
                <td className="px-4 py-2 text-start font-semibold">157</td>
              </tr>
              <tr className="border-t border-gray-600 text-gray-800">
                <td className="px-4 py-2 text-center font-semibold">10</td>
                <td className="px-4 py-2 w-36 ">
                  <img
                    src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/d9/fa/1b/lost-valley.jpg?w=900&h=500&s=1"
                    alt="Artikel"
                    className="w-20 h-14 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 font-semibold ">
                  Juara 1 Lomba Kreasi Tingkat Kabupaten Jember
                </td>
                <td className="px-4 py-2 text-start font-semibold">157</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
