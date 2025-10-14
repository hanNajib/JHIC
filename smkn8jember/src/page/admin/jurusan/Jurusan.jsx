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
import { useDeleteMajor, useMajors, useRestoreMajor } from "../../../hooks/api/useMajor";
import { ImageModal, Button } from "../../../components/ui";

const Jurusan = () => {
  const [search, setSearch] = useState("");
  const [cursor, setCursor] = useState(null);
  const [jumlahPage, setJumlahPage] = useState(5);
  const [softDeleteFilter, setSoftDeleteFilter] = useState("active");
  const [currentPage, setCurrentPage] = useState(1);

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
    }).then((result) => {
      if (result.isConfirmed) {
        restoreMajor.mutate(major.id)
        Swal.fire("Diaktifkan!", "Admin telah diaktifkan.", "success");
      }
    });
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



      <div className="overflow-x-auto shadow-lg rounded-lg relative">
        <table className="min-w-full bg-white">
          <thead className="bg-gradient-to-r from-orange-500 to-orange-600">
            <tr>
              <th className="py-2 px-4 text-left text-white">No</th>
              <th className="py-2 px-4 text-left text-white min-w-56">Nama</th>
              <th className="py-2 px-4 text-left text-white">Deskripsi</th>
              <th className="py-2 px-4 text-left text-white">Gambar</th>
              <th className="py-2 px-4 text-left text-white">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {isFetching ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  Memuat data...
                </td>
              </tr>
            ) : majors.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  Tidak ada data ditemukan.
                </td>
              </tr>
            ) : (
              majors.map((major, index) => (
                <tr
                  key={major.id}
                  className="hover:bg-gray-50 text-[14px] border-b border-gray-300"
                >
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2">{major.name}</td>
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

export default Jurusan;