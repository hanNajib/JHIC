import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { BiRefresh } from "react-icons/bi";
import { CiImageOn } from "react-icons/ci";
import ImageModal from "../../../components/ui/ImageModal";
import PaginationAdmin from "../../../components/ui/PaginationAdmin";
import FilterAdmin from "../../../components/ui/FilterAdmin";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../../hooks/useDebounce";
import {
  useExtarculiculars,
  useDeleteExtarculicular,
  useRestoreExtarculicular,
} from "../../../hooks/api/useExtarculicular";
import { Button } from "../../../components/ui";
import Swal from "sweetalert2";

const Ekstra = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [search, setSearch] = useState("");
  const [cursor, setCursor] = useState(null);
  const [jumlahPage, setJumlahPage] = useState(5);
  const [softDeleteFilter, setSoftDeleteFilter] = useState("active");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearchTerm = useDebounce(search, 500);
  const navigate = useNavigate();

  const {
    data: extraResponse,
    isFetching,
    refetch,
  } = useExtarculiculars({
    s: debouncedSearchTerm,
    trashed: softDeleteFilter === "deleted",
    limit: jumlahPage,
    cursor: cursor,
  });
  
  const extra = extraResponse?.data || [];
  const meta = extraResponse?.meta || {};
  
  const deleteExtraculicular = useDeleteExtarculicular();
  const restoreExtraculicular = useRestoreExtarculicular();
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
          deleteExtraculicular.mutate(id, {
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
    navigate(`/admin/ekstrakulikuler/edit/${id}`);
  };

  const handleRestore = (ekstra) => {
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
        restoreExtraculicular.mutateAsync(ekstra.id);
        refetch();
        Swal.fire("Diaktifkan!", "Data telah diaktifkan.", "success");
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
        titleHalaman="Data Ekstrakurikuler"
        descHalaman="Kelola data ekstrakurikuler"
        linkTambah="/admin/ekstrakulikuler/tambah"
        titleBTN="Tambah Ekstrakurikuler"
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
              <th className="py-2 px-4 text-left text-white">Nama</th>
              <th className="py-2 px-4 text-left text-white">Pembimbing</th>
              <th className="py-2 px-4 text-left text-white">Deskripsi</th>
              <th className="py-2 px-4 text-left text-white">Foto</th>
              <th className="py-2 px-4 text-left text-white">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {isFetching ? (
              <tr>
                <td colSpan="6" className="text-center py-5">
                  Memuat data...
                </td>
              </tr>
            ) : extra.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-5">
                  Tidak ada data ekstrakurikuler.
                </td>
              </tr>
            ) : (
              extra.map((a, _i) => (
                <tr
                  key={a.id}
                  className="hover:bg-gray-50 text-[14px] border-b border-gray-300"
                >
                  <td className="py-2 px-4">{_i + 1}</td>
                  <td className="py-2 px-4">{a.name}</td>
                  <td className="py-2 px-4">{a.mentor_name}</td>
                  <td className="py-2 px-4">{a.description}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => setSelectedImage(a.image)}
                      className="flex justify-center items-center gap-1 py-1 px-3 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                    >
                      <CiImageOn className="text-xl" />
                      Lihat
                    </button>
                  </td>
                  <td className="py-2 px-4">
                    <div className="flex gap-2 justify-center">
                      {a.deleted_at === null && (
                        <Button
                          onClick={() => handleEdit(a.id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition duration-200"
                        >
                          <FaRegEdit className="text-lg" />
                        </Button>
                      )}
                      <button
                        onClick={() => a.deleted_at === null ? handleDelete(a.id) : handleRestore(a)}
                        className={`${a.deleted_at === null
                          ? 'bg-red-500 hover:bg-red-600'
                          : 'bg-green-500 hover:bg-green-600'
                          } text-white p-2 rounded transition duration-200`}
                      >
                        {a.deleted_at === null ? <MdDeleteOutline className="text-lg" /> : <BiRefresh className="text-lg" />}
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

      {/* Modal Gambar */}
      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
};

export default Ekstra;
