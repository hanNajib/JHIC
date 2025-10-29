import React, { useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { GrArticle, GrGallery } from "react-icons/gr";
import { RiMegaphoneFill } from "react-icons/ri";
import { MdExtension } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../../hooks/useDebounce";
import { useArticles } from "../../../hooks/api/useArticle";
import { useAnnouncements } from "../../../hooks/api/useAnnouncement";
import { useGalleries } from "../../../hooks/api/useGallery";
import { useMajors } from "../../../hooks/api/useMajor";
import { useAuth } from "../../../hooks/useAuth";
import { getCategoryStyle } from "../../../utils/helpers";
const Dashboard = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [search, setSearch] = useState("");
  const [cursor, setCursor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [jumlahPage, setJumlahPage] = useState(5);
  const [softDeleteFilter, setSoftDeleteFilter] = useState("active");

  const navigate = useNavigate();
  const debouncedSearchTerm = useDebounce(search, 500);

  const { user } = useAuth();
  const { data: articleResponse, isFetching } = useArticles({
    s: debouncedSearchTerm,
    trashed: softDeleteFilter === "deleted",
    cursor: cursor,
    limit: jumlahPage,
    author_id: user?.id,
  });

  const { data: announcementRes, isFetching: loadingAnnouncement } =
    useAnnouncements();
  const { data: galleryRes, isFetching: loadingGallery } = useGalleries();
  const { data: majorRes, isFetching: loadingMajor } = useMajors();

  const articles = articleResponse?.data || [];
  const meta = articleResponse?.meta || {};
  const jumlahArtikel = meta?.total || articles.length;
  const jumlahPengumuman =
    announcementRes?.meta?.total || announcementRes?.data?.length || 0;
  const jumlahGallery =
    galleryRes?.meta?.total || galleryRes?.data?.length || 0;
  const jumlahJurusan = majorRes?.meta?.total || majorRes?.data?.length || 0;

  const LoadingDots = () => (
    <span className="inline-block animate-pulse text-orange-500">...</span>
  );

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-2xl md:text-4xl font-poppins text-gray-900">
          {user?.username || "Eskalaber Jaya"} Eskalaber Jaya
        </h1>
        <h4 className="text-gray-500 font-medium text-sm md:text-base">
          Web Site merupakan salah satu wujud dari kemajuan teknologi di dunia
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="flex justify-between items-center p-6 md:p-8 w-full rounded-lg bg-white text-gray-900 shadow-md">
          <div className="flex flex-col gap-1">
            <h4 className="font-bold text-base">Artikel Terbit</h4>
            <h3 className="font-bold text-2xl md:text-3xl">
              {isFetching ? <LoadingDots /> : jumlahArtikel}
            </h3>
          </div>
          <div className="flex items-center justify-center p-3 bg-orange-500/25 text-orange-500 rounded-full text-3xl">
            <GrArticle />
          </div>
        </div>

        {user?.role !== "admin" && (
          <>
            <div className="flex justify-between items-center p-6 md:p-8 w-full rounded-lg bg-white text-gray-900 shadow-md">
              <div className="flex flex-col gap-1">
                <h4 className="font-bold text-base">Pengumuman</h4>
                <h3 className="font-bold text-2xl md:text-3xl">
                  {loadingAnnouncement ? <LoadingDots /> : jumlahPengumuman}
                </h3>
              </div>
              <div className="flex items-center justify-center p-3 bg-orange-500/25 text-orange-500 rounded-full text-3xl">
                <RiMegaphoneFill />
              </div>
            </div>

            <div className="flex justify-between items-center p-6 md:p-8 w-full rounded-lg bg-white text-gray-900 shadow-md">
              <div className="flex flex-col gap-1">
                <h4 className="font-bold text-base">Gallery Terbit</h4>
                <h3 className="font-bold text-2xl md:text-3xl">
                  {loadingGallery ? <LoadingDots /> : jumlahGallery}
                </h3>
              </div>
              <div className="flex items-center justify-center p-3 bg-orange-500/25 text-orange-500 rounded-full text-3xl">
                <GrGallery />
              </div>
            </div>

            <div className="flex justify-between items-center p-6 md:p-8 w-full rounded-lg bg-white text-gray-900 shadow-md">
              <div className="flex flex-col gap-1">
                <h4 className="font-bold text-base">Jurusan</h4>
                <h3 className="font-bold text-2xl md:text-3xl">
                  {loadingMajor ? <LoadingDots /> : jumlahJurusan}
                </h3>
              </div>
              <div className="flex items-center justify-center p-3 bg-orange-500/25 text-orange-500 rounded-full text-3xl">
                <MdExtension />
              </div>
            </div>
          </>
        )}
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg relative">
        <table className="min-w-full bg-white">
          <thead className="bg-gradient-to-r from-orange-500 to-orange-600">
            <tr>
              <th className="py-2 px-4 text-left text-white">No</th>
              <th className="py-2 px-4 text-left text-white min-w-56">Judul</th>
              <th className="py-2 px-4 text-left text-white">Kategori</th>
              <th className="py-2 px-4 text-left text-white">Tanggal</th>
              <th className="py-2 px-4 text-left text-white">Foto</th>
              <th className="py-2 px-4 text-left text-white">View</th>
            </tr>
          </thead>
          <tbody>
            {isFetching ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  Memuat data...
                </td>
              </tr>
            ) : articles.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  Tidak ada data ditemukan.
                </td>
              </tr>
            ) : (
              articles.map((article, i) => (
                <tr
                  key={article.id}
                  className="hover:bg-gray-50 text-[14px] border-b border-gray-300"
                >
                  <td className="py-2 px-4">
                    {(currentPage - 1) * jumlahPage + i + 1}
                  </td>
                  <td className="py-2">{article.title}</td>
                  <td className="py-2 px-4">
                    {article.categories.map((cat, idx) => (
                      <span
                        key={idx}
                        style={getCategoryStyle(cat.color)}
                        className={`border px-2 py-[1px] w-fit rounded-2xl text-sm ${
                          cat.color
                            ? ``
                            : "bg-orange-100 text-orange-700 border-orange-300"
                        } mr-1 mb-1 inline-block font-medium`}
                      >
                        {cat.name}
                      </span>
                    ))}
                  </td>
                  <td className="py-2 px-4">
                    {article.created_at
                      ? new Date(article.created_at).toLocaleDateString(
                          "id-ID",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : "-"}
                  </td>
                  <td className="py-2 px-4">
                    {article.image ? (
                      <button
                        onClick={() => setSelectedImage(article.image)}
                        className="flex justify-center items-center gap-1 py-1 px-3 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                      >
                        <CiImageOn className="text-xl" />
                        Lihat
                      </button>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="py-2 px-4">{article.views || 0}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
