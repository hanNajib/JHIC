import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import ImageModal from "../../../components/ui/ImageModal";
import PaginationAdmin from "../../../components/ui/PaginationAdmin";
import FilterAdmin from "../../../components/ui/FilterAdmin";
import {
  useFacilities,
  useDeleteFacility,
  useRestoreFacility,
} from "../../../hooks/api/useFacility";
import { Button } from "../../../components/ui";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../../hooks/useDebounce";
import Swal from "sweetalert2";
const Fasilitas = () => {
  const [search, setSearch] = useState("");
  const [cursor, setCursor] = useState(null);
  const [jumlahPage, setJumlahPage] = useState(5);
  const [softDeleteFilter, setSoftDeleteFilter] = useState("active");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  const debouncedSearchTerm = useDebounce(search, 500);
  const navigate = useNavigate();

  const {
    data: facilityResponse,
    isFetching,
    refetch,
  } = useFacilities({
    s: debouncedSearchTerm,
    trashed: softDeleteFilter === "deleted",
    limit: jumlahPage,
    cursor: cursor,
  });

  const facilities = facilityResponse?.data || [];
  const meta = facilityResponse?.meta || {};
  const deleteFacility = useDeleteFacility();
  const restoreFacility = useRestoreFacility();
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
        deleteFacility.mutate(id, {
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
    navigate(`/admin/fasilitas/edit/${id}`);
  };

  const handleRestore = (facility) => {
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
        restoreFacility.mutate(facility.id, {
          onSuccess: () => {
            refetch();
            Swal.fire("Diaktifkan!", "Fasilitas telah diaktifkan.", "success");
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
        titleHalaman="Data Fasilitas"
        descHalaman="Kelola data fasilitas"
        linkTambah="/admin/fasilitas/tambah"
        titleBTN="Tambah Fasilitas"
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
              <th className="py-2 px-4 text-left text-white">Total</th>
              <th className="py-2 px-4 text-left text-white min-w-72">Deskripsi</th>
              <th className="py-2 px-4 text-left text-white">Foto</th>
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
            ) : facilities.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  Tidak ada data ditemukan.
                </td>
              </tr>
            ) : (
              facilities.map((facility, index) => (
                <tr key={facility.id} className="hover:bg-gray-50 text-[14px] border-b border-gray-300">
                  <td className="py-2 px-4">{(currentPage - 1) * jumlahPage + index + 1}</td>
                  <td className="py-2 px-4 font-medium">{facility.name}</td>
                  <td className="py-2 px-4">{facility.room_total}</td>
                  <td className="py-2 px-4">{facility.description}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => setSelectedImage(facility.image)}
                      className="flex justify-center items-center gap-1 py-1 px-3 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                    >
                      <CiImageOn className="text-xl" />
                      Lihat
                    </button>
                  </td>
                  <td className="py-2 px-4">
                    <div className="flex gap-2 justify-center">
                      {softDeleteFilter === "deleted" ? (
                        <Button
                          onClick={() => handleRestore(facility)}
                          className="text-center bg-blue-500 hover:bg-blue-600 p-2 rounded-lg shadow-lg"
                        >
                          <span className="text-xs font-medium">Pulihkan</span>
                        </Button>
                      ) : (
                        <>
                          <Button
                            onClick={() => handleEdit(facility.id)}
                            className="text-center bg-green-500 hover:bg-green-600 p-2 rounded-lg shadow-lg"
                          >
                            <FaRegEdit className="text-lg" />
                          </Button>
                          <Button
                            onClick={() => handleDelete(facility.id)}
                            className="text-center bg-red-500 hover:bg-red-600 p-2 rounded-lg shadow-lg"
                          >
                            <MdDeleteOutline className="text-lg" />
                          </Button>
                        </>
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
        currentPage={currentPage}
        hasNextPage={!!meta.next_cursor}
        hasPrevPage={!!meta.previous_cursor}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
        onFirstPage={handleFirstPage}
        perPage={jumlahPage}
        onPerPageChange={(value) => {
          setJumlahPage(value);
          setCursor(null);
          setCurrentPage(1);
        }}
        showingFrom={(currentPage - 1) * jumlahPage + 1}
        showingTo={Math.min(currentPage * jumlahPage, (currentPage - 1) * jumlahPage + facilities.length)}
        totalData={facilities.length}
      />

      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
};

export default Fasilitas;
