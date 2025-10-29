import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { BiRefresh } from "react-icons/bi";
import { CiImageOn } from "react-icons/ci";
import { FaCheck, FaTimes } from "react-icons/fa";
import { MdCheckCircle, MdCancel } from "react-icons/md";
import ImageModal from "../../../components/ui/ImageModal";
import PaginationAdmin from "../../../components/ui/PaginationAdmin";
import FilterAdmin from "../../../components/ui/FilterAdmin";
import { Button } from "../../../components/ui";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../../hooks/useDebounce";
import { useArticles, useDeleteArticle, useRestoreArticle, useUpdateArticle, useUpdateArticleStatus } from "../../../hooks/api/useArticle";
import Swal from "sweetalert2";
import { getCategoryStyle } from "../../../utils/helpers";
import { useCategories } from "../../../hooks/api/useCategory";
import { useAuth } from "../../../hooks/useAuth";

const ArtikelUser = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [search, setSearch] = useState("");
  const [cursor, setCursor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [jumlahPage, setJumlahPage] = useState(5);
  const [softDeleteFilter, setSoftDeleteFilter] = useState("active");
  const [categoryName, setCategoryName] = useState(null);
  const [filterStatus, setFilterStatus] = useState("pending");

  const navigate = useNavigate();
  const debouncedSearchTerm = useDebounce(search, 500);

  const {
    data: articleResponse,
    refetch,
    isFetching,
    error
  } = useArticles({
    s: debouncedSearchTerm,
    trashed: softDeleteFilter === "deleted",
    cursor: cursor,
    limit: jumlahPage,
    category_name: categoryName === "Semua" ? undefined : categoryName,
    status: filterStatus === "Semua" ? ['pending', 'published', 'rejected'] : filterStatus,
  });

  const articles = articleResponse?.data || [];
  const meta = articleResponse?.meta || {};
console.log(articles);

  const {data: categoriesResponse} = useCategories({ type: ['major', 'article'] });
  const categoryData =  categoriesResponse?.data || [];
  const categoryOptions = categoryData.map(cat => ({
    value: cat.name,
    label: cat.name,
  }));

  const deleteArticle = useDeleteArticle();
  const restoreArticle = useRestoreArticle();
  const updateArticleStatus = useUpdateArticleStatus();

  const handleEdit = (id) => {
    navigate(`/admin/artikel/edit/${id}`);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Yakin ingin menghapus?",
      text: "Data akan dinonaktifkan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, nonaktifkan!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteArticle.mutate(id, {
          onSuccess: () => {
            refetch();
            Swal.fire({
              title: "Terhapus!",
              text: "Data berhasil dihapus.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          },
          onError: () => {
            Swal.fire({
              title: "Gagal!",
              text: "Terjadi kesalahan saat menghapus data.",
              icon: "error",
              confirmButtonColor: "#d33",
            });
          },
        });
      }
    });
  };

  const handleRestore = (article) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data akan diaktifkan kembali!",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, aktifkan!",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        restoreArticle.mutateAsync(article.id);
        refetch();
        Swal.fire("Diaktifkan!", "Data telah diaktifkan.", "success");
      }
    });
  };

  const handleNextPage = () => {
    if (meta.next_cursor) {
      setCursor(meta.next_cursor);
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (meta.previous_cursor) {
      setCursor(meta.previous_cursor);
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleFirstPage = () => {
    setCursor(null);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearch("");
    setSoftDeleteFilter("active");
    setCursor(null);
    setCurrentPage(1);
  };

  const handleApprove = (id) => {
    Swal.fire({
      title: "Yakin ingin menyetujui?",
      text: "Artikel akan dipublikasikan.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, setujui!",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        updateArticleStatus.mutate({ id, status: 'published' }, {
          onSuccess: () => {
            refetch();
            Swal.fire({
              title: "Disetujui!",
              text: "Artikel telah berhasil dipublikasikan.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          },
          onError: (error) => {
            Swal.fire({
              title: "Gagal!",
              text: error.response?.data?.message || "Terjadi kesalahan saat menyetujui artikel.",
              icon: "error",
              confirmButtonColor: "#d33",
            });
          },
        });
      }
    });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Yakin ingin menolak?",
      text: "Artikel akan ditolak dan tidak dipublikasikan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, tolak!",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        updateArticleStatus.mutate({ id, status: 'rejected' }, {
          onSuccess: () => {
            refetch();
            Swal.fire({
              title: "Ditolak!",
              text: "Artikel telah berhasil ditolak.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          },
          onError: (error) => {
            Swal.fire({
              title: "Gagal!",
              text: error.response?.data?.message || "Terjadi kesalahan saat menolak artikel.",
              icon: "error",
              confirmButtonColor: "#d33",
            });
          },
        });
      }
    });
  };

  return (
    <div className="flex flex-col justify-center gap-5 lg:gap-7 w-full h-fit bg-white rounded-lg p-5">
      <FilterAdmin
        search={search}
        setSearch={(val) => {
          setSearch(val);
          setCursor(null);
          setCurrentPage(1);
        }}
        handleReset={handleReset}
        titleHalaman="Review Artikel"
        descHalaman="Kelola Artikel User"
        titleBTN="Tambah Artikel"
        handleRefresh={() => refetch()}

        hasSoftDelete={true}
        softDeleteFilter={softDeleteFilter}
        setSoftDeleteFilter={(val) => {
          setSoftDeleteFilter(val);
          setCursor(null);
            setCurrentPage(1);
          }}

        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}

        filterKategori={categoryName}
        setFilterKategori={setCategoryName}
        filterOptions={{
          filterKategori: [...(categoryOptions || [])],
          filterStatus: [ { value: 'published', label: 'Published' }, { value: 'pending', label: 'Pending' }, { value: 'rejected', label: 'Rejected' }]
        }}
          />

          <div className="overflow-x-auto shadow-lg rounded-lg relative">
          <table className="min-w-full bg-white">
            <thead className="bg-gradient-to-r from-orange-500 to-orange-600">
            <tr>
              <th className="py-2 px-4 text-left text-white">No</th>
              <th className="py-2 px-4 text-left text-white min-w-56">Judul</th>
              <th className="py-2 px-4 text-left text-white">Kategori</th>
              <th className="py-2 px-4 text-left text-white">Tanggal</th>
              <th className="py-2 px-4 text-left text-white">Foto</th>
              <th className="py-2 px-4 text-left text-white">Status</th>
              <th className="py-2 px-4 text-left text-white">Penulis</th>
              <th className="py-2 px-4 text-center text-white">Aksi</th>
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
                <td className="py-2 px-4">{(currentPage - 1) * jumlahPage + i + 1}</td>
                <td className="py-2">{article.title}</td>
                <td className="py-2 px-4">
                {article.categories.map((cat, idx) => (
                  <span
                  key={idx}
                  style={getCategoryStyle(cat.color)}
                  className={`border px-2 py-[1px] w-fit rounded-2xl text-sm ${cat.color ? `` : 'bg-orange-100 text-orange-700 border-orange-300'} mr-1 mb-1 inline-block font-medium`}
                  >
                  {cat.name}
                  </span>
                ))}
                </td>
                <td className="py-2 px-4">
                {article.created_at ? new Date(article.created_at).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                }) : '-'}
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
                <td className="py-2 px-4">
                {article.status === 'published' ? (
                  <span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">Published</span>
                ) : article.status === 'draft' ? (
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">Draft</span>
                ) : article.status === 'pending' ? (
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">Pending</span>
                ) : article.status === 'rejected' ? (
                  <span className="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">Rejected</span>
                ) : (
                  <span className="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">Archived</span>
                )}
                </td>
                <td className="py-2 px-4">
                  {article.author ? article.author.username : '-'}
                </td>
                <td className="py-2 px-4">
                <div className="flex gap-2 justify-center">
                  {article.deleted_at === null ? (
                    <>
                      {/* Edit Button */}
                      <Button
                        onClick={() => handleEdit(article.slug)}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                        title="Edit Artikel"
                      >
                        <FaRegEdit className="text-lg" />
                      </Button>

                      {/* Approval Buttons - hanya tampil jika status pending */}
                      {article.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(article.id)}
                            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                            title="Setujui Artikel"
                          >
                            <MdCheckCircle className="text-lg" />
                          </button>
                          <button
                            onClick={() => handleReject(article.id)}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                            title="Tolak Artikel"
                          >
                            <MdCancel className="text-lg" />
                          </button>
                        </>
                      )}

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                        title="Hapus Artikel"
                      >
                        <MdDeleteOutline className="text-lg" />
                      </button>
                    </>
                  ) : (
                    /* Restore Button untuk artikel yang terhapus */
                    <button
                      onClick={() => handleRestore(article)}
                      className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                      title="Pulihkan Artikel"
                    >
                      <BiRefresh className="text-lg" />
                    </button>
                  )}
                </div>
                </td>
              </tr>
              ))
            )}
            </tbody>
          </table>
          </div>

          <PaginationAdmin
          currentPage={1}
          totalPages={1}
          perPage={jumlahPage}
          onPageChange={() => { }}
          onPerPageChange={(value) => {
          setJumlahPage(value);
          setCursor(null);
          setCurrentPage(1);
        }}
        hasNextPage={meta.has_more_pages}
        hasPrevPage={!!meta.previous_cursor}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
        onFirstPage={handleFirstPage}
        currentCursorPage={currentPage}
      />

      {/*modal image*/}
      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
};

export default ArtikelUser;
