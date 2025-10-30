import React from "react";
import { useState } from "react";
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
import { useAnnouncements, useDeleteAnnouncement, useRestoreAnnouncement, useForceDeleteAnnouncement, useBulkRestoreAnnouncement, useBulkForceDeleteAnnouncement } from "../../../hooks/api/useAnnouncement";
import Swal from "sweetalert2";
import { useCategories } from "../../../hooks/api/useCategory";
import { getCategoryStyle } from "../../../utils/helpers";

const Pengumuman = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [search, setSearch] = useState("");
  const [cursor, setCursor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [jumlahPage, setJumlahPage] = useState(5);
  const [softDeleteFilter, setSoftDeleteFilter] = useState("active");
  const [filterKategori, setFilterKategori] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  const navigate = useNavigate();
  const debouncedSearchTerm = useDebounce(search, 500);

  const {
    data: announcementResponse,
    refetch,
    isFetching,
    error
  } = useAnnouncements({
    s: debouncedSearchTerm,
    trashed: softDeleteFilter === "deleted",
    cursor: cursor,
    limit: jumlahPage,
    category_name: filterKategori === null ? undefined : filterKategori,
  });

  const announcements = announcementResponse?.data || [];
  const meta = announcementResponse?.meta || {};
  const { data: kategoriesResponse } = useCategories({ type: "announcements", limit: 1000 });
  const kategori = kategoriesResponse?.data || [];


  const deleteAnnouncement = useDeleteAnnouncement();
  const restoreData = useRestoreAnnouncement();
  const forceDeleteAnnouncement = useForceDeleteAnnouncement();
  const bulkRestoreAnnouncement = useBulkRestoreAnnouncement();
  const bulkForceDeleteAnnouncement = useBulkForceDeleteAnnouncement();

  const handleEdit = (id) => {
    navigate(`/admin/pengumuman/edit/${id}`);
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
        deleteAnnouncement.mutate(id, {
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

  const handleRestore = (announcement) => {
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
        restoreData.mutate(announcement.id, {
          onSuccess: () => {
            refetch();
            Swal.fire({
              title: "Berhasil!",
              text: "Data berhasil diaktifkan kembali.",
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

  const handleForceDelete = (announcement) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data akan dihapus permanen dan tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus permanen!",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        forceDeleteAnnouncement.mutate(announcement.id, {
          onSuccess: () => {
            refetch();
            Swal.fire({
              title: "Berhasil!",
              text: "Data berhasil dihapus permanen.",
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
      Swal.fire({
        title: "Perhatian!",
        text: "Pilih minimal satu data untuk diaktifkan kembali.",
        icon: "info",
        confirmButtonColor: "#3085d6",
      });
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
        bulkRestoreAnnouncement.mutate(selectedIds, {
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
      Swal.fire({
        title: "Perhatian!",
        text: "Pilih minimal satu data untuk dihapus permanen.",
        icon: "info",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    Swal.fire({
      title: "Apakah Anda yakin?",
      text: `${selectedIds.length} data akan dihapus permanen dan tidak dapat dikembalikan!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus permanen!",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        bulkForceDeleteAnnouncement.mutate(selectedIds, {
          onSuccess: () => {
            setSelectedIds([]);
            refetch();
            Swal.fire({
              title: "Berhasil!",
              text: `${selectedIds.length} data berhasil dihapus permanen.`,
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

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;

    Swal.fire({
      title: "Hapus data terpilih?",
      text: `${selectedIds.length} pengumuman akan dihapus`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        Promise.all(selectedIds.map(id => deleteAnnouncement.mutateAsync(id)))
          .then(() => {
            setSelectedIds([]);
            refetch();
            Swal.fire("Terhapus!", "Data berhasil dihapus.", "success");
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: "Terjadi kesalahan saat menghapus data.",
              icon: "error",
              confirmButtonColor: "#d33",
            });
          });
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedIds.length === announcements.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(announcements.map(a => a.id));
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleReset = () => {
    setSearch("");
    setSoftDeleteFilter("active");
    setCursor(null);
    setCurrentPage(1);
    setSelectedIds([]);
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

  return (
    <div className="flex flex-col justify-center gap-5 lg:gap-4 w-full h-fit bg-white rounded-lg p-5">
      <FilterAdmin
        search={search}
        setSearch={(val) => {
          setSearch(val);
          setCursor(null);
          setCurrentPage(1);
        }}
        handleReset={handleReset}
        titleHalaman="Data Pengumuman"
        descHalaman="Kelola data pengumuman"
        linkTambah="/admin/pengumuman/tambah"
        titleBTN="Tambah Pengumuman"
        handleRefresh={() => refetch()}

        hasSoftDelete={true}
        softDeleteFilter={softDeleteFilter}
        setSoftDeleteFilter={(val) => {
          setSoftDeleteFilter(val);
          setCursor(null);
          setCurrentPage(1);
          setSelectedIds([]);
        }}

        filterKategori={filterKategori}
        setFilterKategori={(val) => {
          setFilterKategori(val);
          setCursor(null);
            setCurrentPage(1);
          }}

          filterOptions={{
            filterKategori: [...(kategori ? kategori.map((cat) => cat.name) : [])]
          }}
          />

          {selectedIds.length > 0 && (
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 p-4 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-blue-700">{selectedIds.length} item dipilih</span>
              </div>
              <div className="flex gap-2">
                {softDeleteFilter === 'active' && (
                  <button
                    onClick={handleBulkDelete}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition"
                  >
                    <MdDeleteOutline className="text-lg" />
                    Hapus
                  </button>
                )}
                {softDeleteFilter === 'deleted' && (
                  <>
                    <button
                      onClick={handleBulkRestore}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition duration-200 font-medium"
                    >
                      <BiRefresh className="text-lg" />
                      Pulihkan
                    </button>
                    <button
                      onClick={handleBulkForceDelete}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition duration-200 font-medium"
                    >
                      <MdDeleteOutline className="text-lg" />
                      Hapus Permanen
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          <div className="overflow-x-auto shadow-lg rounded-lg relative">
          <table className="min-w-full bg-white">
            <thead className="bg-gradient-to-r from-orange-500 to-orange-600">
            <tr>
              <th className="py-2 px-4 text-center text-white w-12">
                <input
                  type="checkbox"
                  checked={selectedIds.length === announcements.length && announcements.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 cursor-pointer"
                />
              </th>
              <th className="py-2 px-4 text-left text-white">No</th>
              <th className="py-2 px-4 text-left text-white min-w-56">Judul</th>
              <th className="py-2 px-4 text-left text-white">Kategori</th>
              <th className="py-2 px-4 text-left text-white">Tanggal</th>
              <th className="py-2 px-4 text-left text-white">Foto</th>
              <th className="py-2 px-4 text-center text-white">Aksi</th>
            </tr>
            </thead>
            <tbody>
            {isFetching ? (
              <tr>
              <td colSpan={7} className="text-center py-4 text-gray-500">
                Memuat data...
              </td>
              </tr>
            ) : announcements.length === 0 ? (
              <tr>
              <td colSpan={7} className="text-center py-4 text-gray-500">
                Tidak ada data ditemukan.
              </td>
              </tr>
            ) : (
              announcements.map((announcement, i) => (
              <tr
                key={announcement.id}
                className="hover:bg-gray-50 text-[14px] border-b border-gray-300"
              >
                <td className="py-2 px-4 text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(announcement.id)}
                    onChange={() => handleSelectRow(announcement.id)}
                    className="w-4 h-4 cursor-pointer"
                  />
                </td>
                <td className="py-2 px-4">{(currentPage - 1) * jumlahPage + i + 1}</td>
                <td className="py-2">{announcement.title}</td>
                <td className="py-2 px-4">
                {announcement?.category && (
                  <span
                  style={getCategoryStyle(announcement.category.color)}
                  className={`border px-2 py-[1px] w-fit rounded-2xl text-sm ${announcement.category.color ? `` : 'bg-orange-100 text-orange-700 border-orange-300'} mr-1 mb-1 inline-block font-medium`}
                  >
                  {announcement.category.name}
                  </span>
                )}
                </td>
                <td className="py-2 px-4">
                {announcement.created_at ? new Date(announcement.created_at).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                }) : '-'}
                </td>
                <td className="py-2 px-4">
                {announcement.image ? (
                  <button
                  onClick={() => setSelectedImage(announcement.image)}
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
                <div className="flex gap-2 justify-center">
                  {announcement.deleted_at === null && (
                  <Button
                    onClick={() => handleEdit(announcement.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition duration-200"
                  >
                    <FaRegEdit className="text-lg" />
                  </Button>
                  )}
                  <button
                  onClick={() => announcement.deleted_at === null ? handleDelete(announcement.id) : handleRestore(announcement)}
                  className={`${announcement.deleted_at === null
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-green-500 hover:bg-green-600'
                    } text-white p-2 rounded-2xl shadow-lg transition`}
                  >
                  {announcement.deleted_at === null ? <MdDeleteOutline className="text-lg" /> : <BiRefresh className="text-lg" />}
                  </button>
                  {announcement.deleted_at !== null && (
                    <button
                      onClick={() => handleForceDelete(announcement)}
                      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-2xl shadow-lg transition"
                      title="Hapus Permanen"
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

      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
};

export default Pengumuman;
