import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import { BiRefresh } from "react-icons/bi";
import ImageModal from "../../../components/ui/ImageModal";
import PaginationAdmin from "../../../components/ui/PaginationAdmin";
import FilterAdmin from "../../../components/ui/FilterAdmin";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../../hooks/useDebounce";
import { useStaff, useDeleteStaff, useRestoreStaff } from "../../../hooks/api/useStaff";
import { Button } from "../../../components/ui";
import Swal from "sweetalert2";

const Karyawan = () => {
  const [search, setSearch] = useState("");
  const [cursor, setCursor] = useState(null);
  const [jumlahPage, setJumlahPage] = useState(5);
  const [softDeleteFilter, setSoftDeleteFilter] = useState("active");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [roleFilter, setRoleFilter] = useState(null);

  // Helper function to convert category value to readable label
  const getCategoryLabel = (category) => {
    const categoryLabels = {
      kepala_sekolah: "Kepala Sekolah",
      waka: "Wakil Kepala Sekolah",
      koordinator: "Koordinator",
      koordinator_jurusan: "Koordinator Jurusan",
      komite: "Komite",
      lainnya: "Lainnya"
    };
    return categoryLabels[category] || category;
  };

  const debouncedSearchTerm = useDebounce(search, 500);
  const navigate = useNavigate();

  // Prepare API parameters with proper validation
  const apiParams = {
    s: debouncedSearchTerm,
    trashed: softDeleteFilter === "deleted",
    limit: jumlahPage,
    cursor: cursor,
  };

  if (roleFilter && roleFilter !== "Semua" && ["teacher", "employee"].includes(roleFilter)) {
    apiParams.role = roleFilter;
  }

  const {
    data: staffResponse,
    isFetching,
    refetch,
  } = useStaff(apiParams);

  

  const staff = staffResponse?.data || [];
  const meta = staffResponse?.meta || {};

  const deleteStaff = useDeleteStaff();
  const restoreStaff = useRestoreStaff();

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
        deleteStaff.mutate(id, {
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
    navigate(`/admin/datakaryawan/edit/${id}`);
  };

  const handleRestore = (staffMember) => {
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
        restoreStaff.mutate(staffMember.id, {
          onSuccess: () => {
            refetch();
            Swal.fire("Diaktifkan!", "Data karyawan telah diaktifkan.", "success");
          }
        });
      }
    });
  };

  const handleReset = () => {
    setSearch("");
    setSoftDeleteFilter("active");
    setCursor(null);
    setCurrentPage(1);
    setRoleFilter(null);
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
        titleHalaman="Data Karyawan"
        descHalaman="Kelola data karyawan"
        linkTambah="/admin/datakaryawan/tambah"
        titleBTN="Tambah Karyawan"
        handleRefresh={() => refetch()}
        
        hasSoftDelete={true}
        softDeleteFilter={softDeleteFilter}
        setSoftDeleteFilter={(val) => {
          setSoftDeleteFilter(val);
          setCursor(null);
          setCurrentPage(1);
        }}

        setFilterJurusan={(val) => {
          setRoleFilter(val);
          setCursor(null);
          setCurrentPage(1);
        }}
        filterJurusan={roleFilter}
        
        filterOptions={{
          filterJurusan: [
            {value: "teacher", label: "Guru"},
            {value: "employee", label: "Karyawan"}
          ]
        }}
      />

      <div className="overflow-x-auto shadow-lg rounded-lg relative">
        <table className="min-w-full bg-white">
          <thead className="bg-gradient-to-r from-orange-500 to-orange-600">
            <tr>
              <th className="py-2 px-4 text-left text-white">No</th>
              <th className="py-2 px-4 text-left text-white min-w-56">Nama</th>
              <th className="py-2 px-4 text-left text-white">Role</th>
              <th className="py-2 px-4 text-left text-white">Jabatan</th>
              <th className="py-2 px-4 text-left text-white">Kategori</th>
              <th className="py-2 px-4 text-left text-white">Mata Pelajaran</th>
              <th className="py-2 px-4 text-left text-white">Foto</th>
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
            ) : staff.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500">
                  Tidak ada data ditemukan.
                </td>
              </tr>
            ) : (
              staff.map((staffMember, index) => (
                <tr key={staffMember.id} className="hover:bg-gray-50 text-[14px] border-b border-gray-300">
                  <td className="py-2 px-4">{(currentPage - 1) * jumlahPage + index + 1}</td>
                  <td className="py-2 px-4 font-medium">{staffMember.name}</td>
                  <td className="py-2 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      staffMember.role === 'teacher' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {staffMember.role === 'teacher' ? 'Guru' : 'Karyawan'}
                    </span>
                  </td>
                  <td className="py-2 px-4">{staffMember.position || '-'}</td>
                  <td className="py-2 px-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                      {staffMember.category ? getCategoryLabel(staffMember.category) : '-'}
                    </span>
                  </td>
                  <td className="py-2 px-4">{staffMember.subjects || '-'}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => setSelectedImage(staffMember.image)}
                      className="flex justify-center items-center gap-1 py-1 px-3 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                    >
                      <CiImageOn className="text-xl" />
                      Lihat
                    </button>
                  </td>
                  <td className="py-2 px-4">
                    <div className="flex gap-2 justify-center">
                      {staffMember.deleted_at === null && (
                        <Button
                          onClick={() => handleEdit(staffMember.id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition duration-200"
                        >
                          <FaRegEdit className="text-lg" />
                        </Button>
                      )}
                      <button
                        onClick={() => staffMember.deleted_at === null ? handleDelete(staffMember.id) : handleRestore(staffMember)}
                        className={`${staffMember.deleted_at === null
                          ? 'bg-red-500 hover:bg-red-600'
                          : 'bg-green-500 hover:bg-green-600'
                        } text-white p-2 rounded-2xl shadow-lg transition`}
                      >
                        {staffMember.deleted_at === null ? <MdDeleteOutline className="text-lg" /> : <BiRefresh className="text-lg" />}
                      </button>
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

      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
};

export default Karyawan;
