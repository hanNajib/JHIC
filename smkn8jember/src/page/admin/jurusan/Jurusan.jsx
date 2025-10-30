import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import { BiRefresh } from "react-icons/bi";
import PaginationAdmin from "../../../components/ui/PaginationAdmin";
import FilterAdmin from "../../../components/ui/FilterAdmin";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDebounce } from "../../../hooks/useDebounce";
import { useDeleteMajor, useMajors, useRestoreMajor, useForceDeleteMajor, useBulkRestoreMajor, useBulkForceDeleteMajor } from "../../../hooks/api/useMajor";
import { ImageModal, Button } from "../../../components/ui";
import { RenderIcon } from "../../../components/ui/RenderIcon";

const Jurusan = () => {
  const [search, setSearch] = useState("");
  const [cursor, setCursor] = useState(null);
  const [jumlahPage, setJumlahPage] = useState(5);
  const [softDeleteFilter, setSoftDeleteFilter] = useState("active");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);

  const debouncedSearchTerm = useDebounce(search, 500);
  const navigate = useNavigate();

  const {
    data: majorsResponse,
    isFetching,
    refetch,
    error
  } = useMajors({
    s: debouncedSearchTerm,
    trashed: softDeleteFilter === "deleted",
    limit: jumlahPage,
    cursor: cursor,
  });

  const majors = majorsResponse?.data || [];
  const meta = majorsResponse?.meta || {};

  const deleteMajor = useDeleteMajor();
  const restoreMajor = useRestoreMajor();
  const forceDeleteMajor = useForceDeleteMajor();
  const bulkRestoreMajor = useBulkRestoreMajor();
  const bulkForceDeleteMajor = useBulkForceDeleteMajor();
  const [selectedImage, setSelectedImage] = useState(null)

  const handleEdit = (majorId) => {
    navigate(`/admin/jurusan/edit/${majorId}`);
  };

  const handleDelete = (major) => {
    Swal.fire({
      title: "Yakin ingin menghapus?",
      text: `Jurusan: ${major.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMajor.mutate(major.id);
        Swal.fire("Terhapus!", "Jurusan telah dihapus.", "success");
      }
    });
  };

  const handleRestore = (major) => {
    Swal.fire({
      title: "Yakin ingin mengaktifkan?",
      text: `Jurusan: ${major.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, aktifkan!",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        restoreMajor.mutate(major.id, {
          onSuccess: () => {
            refetch();
            Swal.fire("Diaktifkan!", "Jurusan telah diaktifkan.", "success");
          }
        })
      }
    });
  };

  const handleForceDelete = (major) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: `Jurusan "${major.name}" akan dihapus permanen!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus permanen!",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        forceDeleteMajor.mutate(major.id, {
          onSuccess: () => {
            refetch();
            Swal.fire("Terhapus!", "Jurusan berhasil dihapus permanen.", "success");
          }
        });
      }
    });
  };

  const handleBulkRestore = () => {
    if (selectedIds.length === 0) return;
    Swal.fire({
      title: "Pulihkan data terpilih?",
      text: `${selectedIds.length} jurusan akan dipulihkan`,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Ya, pulihkan!",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        bulkRestoreMajor.mutate(selectedIds, {
          onSuccess: () => {
            setSelectedIds([]);
            refetch();
            Swal.fire("Berhasil!", "Data berhasil dipulihkan.", "success");
          }
        });
      }
    });
  };

  const handleBulkForceDelete = () => {
    if (selectedIds.length === 0) return;
    Swal.fire({
      title: "Hapus permanen data terpilih?",
      text: `${selectedIds.length} jurusan akan dihapus permanen!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        bulkForceDeleteMajor.mutate(selectedIds, {
          onSuccess: () => {
            setSelectedIds([]);
            refetch();
            Swal.fire("Terhapus!", "Data berhasil dihapus permanen.", "success");
          }
        });
      }
    });
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    Swal.fire({
      title: "Hapus data terpilih?",
      text: `${selectedIds.length} jurusan akan dihapus`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        Promise.all(selectedIds.map(id => deleteMajor.mutateAsync(id)))
          .then(() => {
            setSelectedIds([]);
            refetch();
            Swal.fire("Terhapus!", "Data berhasil dihapus.", "success");
          });
      }
    });
  };

  const handleSelectAll = () => {
    setSelectedIds(selectedIds.length === majors.length ? [] : majors.map(m => m.id));
  };

  const handleSelectRow = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const handleReset = () => {
    setSearch("");
    setSoftDeleteFilter("active");
    setCursor(null);
    setCurrentPage(1);
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

  const handleAddMajor = () => {
    navigate('/admin/jurusan/tambah');
  };

  const handleRefresh = async () => {
    refetch();
  };

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 w-full h-96 bg-white rounded-lg p-5">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Gagal Memuat Data</h3>
          <p className="text-gray-600 mb-4">{error.message || 'Terjadi kesalahan saat memuat data admin'}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-300"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

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
        titleHalaman="Data Jurusan"
        descHalaman="Kelola data jurusan"
        linkTambah="/admin/jurusan/tambah"
        titleBTN="Tambah Jurusan"
        handleRefresh={() => refetch()}

        hasSoftDelete={true}
        softDeleteFilter={softDeleteFilter}
        setSoftDeleteFilter={(val) => {
          setSoftDeleteFilter(val);
          setCursor(null);
          setCurrentPage(1);
        }}
      />

      {selectedIds.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 p-4 rounded-lg flex items-center justify-between">
          <span className="text-sm font-semibold text-blue-700">{selectedIds.length} item dipilih</span>
          <div className="flex gap-2">
            {softDeleteFilter === 'active' && (
              <button onClick={handleBulkDelete} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition">
                <MdDeleteOutline className="text-lg" />Hapus
              </button>
            )}
            {softDeleteFilter === 'deleted' && (
              <>
                <button onClick={handleBulkRestore} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition">
                  <BiRefresh className="text-lg" />Pulihkan
                </button>
                <button onClick={handleBulkForceDelete} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition">
                  <MdDeleteOutline className="text-lg" />Hapus Permanen
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
                <input type="checkbox" checked={selectedIds.length === majors.length && majors.length > 0} onChange={handleSelectAll} className="w-4 h-4 cursor-pointer" />
              </th>
              <th className="py-2 px-4 text-left text-white">No</th>
              <th className="py-2 px-4 text-left text-white min-w-56">Nama</th>
              <th className="py-2 px-4 text-left text-white">Deskripsi</th>
              <th className="py-2 px-4 text-left text-white">Gambar</th>
              <th className="py-2 px-4 text-left text-white">Icon</th>
              <th className="py-2 px-4 text-left text-white">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {isFetching ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  Memuat data...
                </td>
              </tr>
            ) : majors.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  Tidak ada data ditemukan.
                </td>
              </tr>
            ) : (
              majors.map((major, index) => (
                <tr
                  key={major.id}
                  className="hover:bg-gray-50 text-[14px] border-b border-gray-300"
                >
                  <td className="py-2 px-4 text-center">
                    <input type="checkbox" checked={selectedIds.includes(major.id)} onChange={() => handleSelectRow(major.id)} className="w-4 h-4 cursor-pointer" />
                  </td>
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2">({major.short_name}) {major.name}</td>
                  <td className="py-2 px-4">
                    <div
                      className="line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: major.description }}
                    />
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => setSelectedImage(major.image)}
                      className="flex justify-center items-center gap-1 py-1 px-3 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                    >
                      <CiImageOn className="text-lg" />
                      Lihat
                    </button>
                  </td>
                  <td className="py-2 px-4">
                    {major.icon && (
                      <RenderIcon iconName={major.icon} />
                    )}
                  </td>
                  <td className="py-2 px-4">
                    <div className="flex gap-2 justify-center">
                      {major.deleted_at === null && (
                        <Button
                          onClick={() => handleEdit(major.id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition duration-200"
                        >
                          <FaRegEdit className="text-lg" />
                        </Button>
                      )}
                      <button
                        onClick={() => major.deleted_at === null ? handleDelete(major) : handleRestore(major)}
                        className={`${major.deleted_at === null
                          ? 'bg-red-500 hover:bg-red-600'
                          : 'bg-green-500 hover:bg-green-600'
                          } text-white p-2 rounded-2xl shadow-lg transition`}
                      >
                        {major.deleted_at === null ? <MdDeleteOutline className="text-lg" /> : <BiRefresh className="text-lg" />}
                      </button>
                      {major.deleted_at !== null && (
                        <button
                          onClick={() => handleForceDelete(major)}
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

export default Jurusan;