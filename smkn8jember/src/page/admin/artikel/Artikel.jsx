import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { BiRefresh } from "react-icons/bi";
import { CiImageOn } from "react-icons/ci";
import ImageModal from "../../../components/ui/ImageModal";
import PaginationAdmin from "../../../components/ui/PaginationAdmin";
import FilterAdmin from "../../../components/ui/FilterAdmin";
import { Button } from "../../../components/ui";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../../hooks/useDebounce";
import { useArticles, useDeleteArticle, useRestoreArticle, useForceDeleteArticle, useBulkRestoreArticle, useBulkForceDeleteArticle } from "../../../hooks/api/useArticle";
import Swal from "sweetalert2";
import { getCategoryStyle } from "../../../utils/helpers";
import { useCategories } from "../../../hooks/api/useCategory";
import { useAuth } from "../../../hooks/useAuth";

const Artikel = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [search, setSearch] = useState("");
  const [cursor, setCursor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [jumlahPage, setJumlahPage] = useState(5);
  const [softDeleteFilter, setSoftDeleteFilter] = useState("active");
  const [categoryName, setCategoryName] = useState(null);
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [selectedIds, setSelectedIds] = useState([]);
  const { user } = useAuth();

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
    status: filterStatus === "Semua" ? undefined : filterStatus,
    author_id: user?.id
  });

  const articles = articleResponse?.data || [];
  const meta = articleResponse?.meta || {};

  const {data: categoriesResponse} = useCategories({ type: ['major', 'article'] });
  const categoryData =  categoriesResponse?.data || [];
  const categoryOptions = categoryData.map(cat => ({
    value: cat.name,
    label: cat.name,
  }));

  const deleteArticle = useDeleteArticle();
  const restoreArticle = useRestoreArticle();
  const forceDeleteArticle = useForceDeleteArticle();
  const bulkRestoreArticle = useBulkRestoreArticle();
  const bulkForceDeleteArticle = useBulkForceDeleteArticle();

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

  const handleForceDelete = (id) => {
    Swal.fire({
      title: "Yakin ingin menghapus permanent?",
      text: "Data akan dihapus secara permanen dan tidak dapat dikembalikan!",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus permanent!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        forceDeleteArticle.mutate(id, {
          onSuccess: () => {
            refetch();
            Swal.fire({
              title: "Terhapus!",
              text: "Data berhasil dihapus secara permanent.",
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

  const handleBulkRestore = () => {
    if (selectedIds.length === 0) {
      Swal.fire("Peringatan", "Pilih minimal satu data untuk diaktifkan", "warning");
      return;
    }

    Swal.fire({
      title: "Apakah Anda yakin?",
      text: `${selectedIds.length} data akan diaktifkan kembali!`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, aktifkan!",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        bulkRestoreArticle.mutate({ ids: selectedIds }, {
          onSuccess: () => {
            setSelectedIds([]);
            refetch();
            Swal.fire({
              title: "Berhasil!",
              text: `${selectedIds.length} data berhasil diaktifkan kembali.`,
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          },
          onError: () => {
            Swal.fire({
              title: "Gagal!",
              text: "Terjadi kesalahan saat mengaktifkan data.",
              icon: "error",
              confirmButtonColor: "#d33",
            });
          },
        });
      }
    });
  };

  const handleBulkForceDelete = () => {
    if (selectedIds.length === 0) {
      Swal.fire("Peringatan", "Pilih minimal satu data untuk dihapus", "warning");
      return;
    }

    Swal.fire({
      title: "Yakin ingin menghapus permanent?",
      text: `${selectedIds.length} data akan dihapus secara permanen dan tidak dapat dikembalikan!`,
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus permanent!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        bulkForceDeleteArticle.mutate({ ids: selectedIds }, {
          onSuccess: () => {
            setSelectedIds([]);
            refetch();
            Swal.fire({
              title: "Terhapus!",
              text: `${selectedIds.length} data berhasil dihapus secara permanent.`,
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

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedIds(articles.map(a => a.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
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
    setSelectedIds([]);
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
        titleHalaman="Data Artikel"
        descHalaman="Kelola data artikel"
        linkTambah="/admin/artikel/tambah"
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
          filterStatus: [ { value: 'published', label: 'Published' }, { value: 'draft', label: 'Draft' }, { value: 'pending', label: 'Pending' }, { value: 'rejected', label: 'Rejected' }]
        }}
      />

      {selectedIds.length > 0 && (
        <div className="flex gap-3 items-center bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 rounded-lg p-4 shadow-md">
          <div className="flex-1">
            <span className="text-sm font-semibold text-blue-900">
              ✓ {selectedIds.length} data dipilih
            </span>
          </div>
          <div className="flex gap-2">
            {softDeleteFilter === "deleted" && (
              <button
                onClick={handleBulkRestore}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg font-medium transition shadow-md flex items-center gap-2"
              >
                <BiRefresh className="text-lg" /> Aktifkan Terpilih
              </button>
            )}
            <button
              onClick={handleBulkForceDelete}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-lg font-medium transition shadow-md flex items-center gap-2"
            >
              <MdDeleteOutline className="text-lg" /> Hapus Permanent
            </button>
            <button
              onClick={() => setSelectedIds([])}
              className="bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white px-4 py-2 rounded-lg font-medium transition shadow-md"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto shadow-lg rounded-lg relative">
        <table className="min-w-full bg-white">
          <thead className="bg-gradient-to-r from-orange-500 to-orange-600">
            <tr>
              <th className="py-2 px-4 text-left text-white">
                <input
                  type="checkbox"
                  checked={selectedIds.length === articles.length && articles.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="cursor-pointer"
                />
              </th>
              <th className="py-2 px-4 text-left text-white">No</th>
              <th className="py-2 px-4 text-left text-white min-w-56">Judul</th>
              <th className="py-2 px-4 text-left text-white">Kategori</th>
              <th className="py-2 px-4 text-left text-white">Tanggal</th>
              <th className="py-2 px-4 text-left text-white">Foto</th>
              <th className="py-2 px-4 text-left text-white">Status</th>
              <th className="py-2 px-4 text-left text-white">Aksi</th>
            </tr>
          </thead>
            <tbody>
            {isFetching ? (
              <tr>
              <td colSpan={8} className="text-center py-4 text-gray-500">
                Memuat data...
              </td>
              </tr>
            ) : articles.length === 0 ? (
              <tr>
              <td colSpan={8} className="text-center py-4 text-gray-500">
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
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(article.id)}
                    onChange={() => handleSelectRow(article.id)}
                    className="cursor-pointer"
                  />
                </td>
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
                <div className="flex gap-2 justify-center">
                  {article.deleted_at === null && (
                  <Button
                    onClick={() => handleEdit(article.slug)}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition duration-200"
                  >
                    <FaRegEdit className="text-lg" />
                  </Button>
                  )}
                  <button
                  onClick={() => article.deleted_at === null ? handleDelete(article.id) : handleRestore(article)}
                  className={`${article.deleted_at === null
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-green-500 hover:bg-green-600'
                    } text-white p-2 rounded-2xl shadow-lg transition`}
                  >
                  {article.deleted_at === null ? <MdDeleteOutline className="text-lg" /> : <BiRefresh className="text-lg" />}
                  </button>
                  {article.deleted_at !== null && (
                    <button
                      onClick={() => handleForceDelete(article.id)}
                      className="bg-red-700 hover:bg-red-800 text-white p-2 rounded-2xl shadow-lg transition"
                      title="Hapus Permanent"
                    >
                      <MdDeleteOutline className="text-lg" />
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

export default Artikel;
