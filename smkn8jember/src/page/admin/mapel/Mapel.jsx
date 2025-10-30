import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { BiRefresh } from "react-icons/bi";
import PaginationAdmin from "../../../components/ui/PaginationAdmin";
import FilterAdmin from "../../../components/ui/FilterAdmin";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../../hooks/useDebounce";
import { useDeleteSubject, useRestoreSubject, useSubjects, useForceDeleteSubject, useBulkRestoreSubject, useBulkForceDeleteSubject } from "../../../hooks/api/useSubject";
import Swal from "sweetalert2";
import { Button } from "../../../components/ui";
import { useMajors } from "../../../hooks/api/useMajor";
import parse from "html-react-parser";  

const Mapel = () => {
  const [search, setSearch] = useState("");
  const [cursor, setCursor] = useState(null);
  const [jumlahPage, setJumlahPage] = useState(5);
  const [softDeleteFilter, setSoftDeleteFilter] = useState("active");
  const [currentPage, setCurrentPage] = useState(1);
  const [majorId, setMajorId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  const debouncedSearchTerm = useDebounce(search, 500);
  const navigate = useNavigate();

  const {
    data: subjectResponse,
    isFetching,
    refetch,
  } = useSubjects({
    s: debouncedSearchTerm,
    trashed: softDeleteFilter === "deleted",
    limit: jumlahPage,
    cursor: cursor,
    major_id: majorId === "Semua" ? undefined : majorId
  });
  const { data: majorResponse} = useMajors({ all: true });
  const majors = majorResponse?.data || [];

  const subjects = subjectResponse?.data || [];
  const meta = subjectResponse?.meta || {};

  const deleteSubject = useDeleteSubject();
  const restoreSubject = useRestoreSubject();
  const forceDeleteSubject = useForceDeleteSubject();
  const bulkRestoreSubject = useBulkRestoreSubject();
  const bulkForceDeleteSubject = useBulkForceDeleteSubject();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Yakin ingin menghapus?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSubject.mutate(id, {
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

  const handleEdit = (id) => {
    navigate(`/admin/mapel/edit/${id}`);
  };

  const handleRestore = (subject) => {
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
        restoreSubject.mutate(subject.id, {
          onSuccess: () => {
            refetch();
            Swal.fire("Diaktifkan!", "Mata pelajaran telah diaktifkan.", "success");
          }
        });
      }
    });
  };

  const handleForceDelete = (subject) => {
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
        forceDeleteSubject.mutate(subject.id, {
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
        bulkRestoreSubject.mutate(selectedIds, {
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
        bulkForceDeleteSubject.mutate(selectedIds, {
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
      text: `${selectedIds.length} mata pelajaran akan dihapus`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        Promise.all(selectedIds.map(id => deleteSubject.mutateAsync(id)))
          .then(() => {
            setSelectedIds([]);
            refetch();
            Swal.fire("Terhapus!", "Data berhasil dihapus.", "success");
          });
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedIds.length === subjects.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(subjects.map(s => s.id));
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
        titleHalaman="Mata Pelajaran"
        descHalaman="Kelola data mata pelajaran"
        linkTambah="/admin/mapel/tambah"
        titleBTN="Tambah Mata Pelajaran"
        handleRefresh={() => refetch()}
        
        hasSoftDelete={true}
        softDeleteFilter={softDeleteFilter}
        setSoftDeleteFilter={(val) => {
          setSoftDeleteFilter(val);
          setCursor(null);
          setCurrentPage(1);
        }}

        setFilterJurusan={(val) => {
          setMajorId(val);
          setCursor(null);
          setCurrentPage(1);
        }}
        filterJurusan={majorId}
        
        filterOptions={{
          filterJurusan: [...(majors ? majors.map((major) => ({value: major.id, label: major.short_name})) : [] )]
        }}
      />

      {selectedIds.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 p-4 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-blue-700">{selectedIds.length} item dipilih</span>
          </div>
          <div className="flex gap-2">
            {softDeleteFilter === 'active' && (
              <button onClick={handleBulkDelete} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition">
                <MdDeleteOutline className="text-lg" />Hapus
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
                  checked={selectedIds.length === subjects.length && subjects.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 cursor-pointer"
                />
              </th>
              <th className="py-2 px-4 text-left text-white">No</th>
              <th className="py-2 px-4 text-left text-white min-w-56">Nama</th>
              <th className="py-2 px-4 text-left text-white">Deskripsi</th>
              <th className="py-2 px-4 text-left text-white">Jurusan</th>
              <th className="py-2 px-4 text-left text-white">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {isFetching ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  Memuat data...
                </td>
              </tr>
            ) : subjects.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  Tidak ada data ditemukan.
                </td>
              </tr>
            ) : (
              subjects.map((subject, i) => (
                <tr
                  key={subject.id}
                  className="hover:bg-gray-50 text-[14px] border-b border-gray-300"
                >
                  <td className="py-2 px-4 text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(subject.id)}
                      onChange={() => handleSelectRow(subject.id)}
                      className="w-4 h-4 cursor-pointer"
                    />
                  </td>
                  <td className="py-2 px-4">{(currentPage - 1) * jumlahPage + i + 1}</td>
                  <td className="py-2">{subject.name}</td>
                  <td className="py-2 px-4">{parse(subject.description)}</td>
                  <td className="py-2 px-4">{subject.major?.name || '-'}</td>
                  <td className="py-2 px-4">
                    <div className="flex gap-2 justify-center">
                      {subject.deleted_at === null && (
                        <Button
                          onClick={() => handleEdit(subject.id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition duration-200"
                        >
                          <FaRegEdit className="text-lg" />
                        </Button>
                      )}
                      <button
                        onClick={() => subject.deleted_at === null ? handleDelete(subject.id) : handleRestore(subject)}
                        className={`${subject.deleted_at === null
                          ? 'bg-red-500 hover:bg-red-600'
                          : 'bg-green-500 hover:bg-green-600'
                        } text-white p-2 rounded-2xl shadow-lg transition`}
                      >
                        {subject.deleted_at === null ? <MdDeleteOutline className="text-lg" /> : <BiRefresh className="text-lg" />}
                      </button>
                      {subject.deleted_at !== null && (
                        <button
                          onClick={() => handleForceDelete(subject)}
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
        onPageChange={() => {}}
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
    </div>
  );
};

export default Mapel;