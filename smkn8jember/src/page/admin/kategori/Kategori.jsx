import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import PaginationAdmin from "../../../components/ui/PaginationAdmin";
import FilterAdmin from "../../../components/ui/FilterAdmin";
import ImageModal from "../../../components/ui/ImageModal";
import { useDebounce } from "../../../hooks/useDebounce";
import { useCategories, useDeleteCategory } from "../../../hooks/api/useCategory";
import Swal from "sweetalert2";
import { Button } from "../../../components/ui";
import { useNavigate } from "react-router-dom";

const Kategori = () => {
  const [search, setSearch] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [cursor, setCursor] = useState(null);
  const [jumlahPage, setJumlahPage] = useState(5);
  const [softDeleteFilter, setSoftDeleteFilter] = useState("active");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearchTerm = useDebounce(search, 500);
  const navigate = useNavigate();

  const {
    data: categoryResponse,
    isFetching,
    refetch,
  } = useCategories({
    s: debouncedSearchTerm,
    trashed: softDeleteFilter === "deleted",
    limit: jumlahPage,
    cursor: cursor,
  });

  const category = categoryResponse?.data || [];
  const meta = categoryResponse?.meta || {};

  const deleteCategory = useDeleteCategory();

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
        deleteCategory.mutate(id, {
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
    navigate(`/admin/kategori/edit/${id}`);
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
        titleHalaman="Data Kategori"
        descHalaman="Kelola data kategori"
        linkTambah="/admin/kategori/tambah"
        titleBTN="Tambah Kategori"
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
              <th className="py-2 px-4 text-left text-white">Tipe</th>
              <th className="py-2 px-4 text-left text-white">Warna</th>
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
            ) : category.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  Tidak ada data ditemukan.
                </td>
              </tr>
            ) : (
              category.map((cat, i) => (
                <tr
                  key={cat.id}
                  className="hover:bg-gray-50 text-[14px] border-b border-gray-300"
                >
                  <td className="py-2 px-4">{i + 1}</td>
                  <td className="py-2">{cat.name}</td>
                  <td className="py-2 px-4">{cat.type}</td>
                  <td className="py-2 px-4">
                    <span 
                      className={`inline-block w-6 h-6 rounded-full border border-gray-300`}
                      style={{backgroundColor: cat.color}}
                    ></span>
                  </td>
                  <td className="py-2 px-4">
                    <div className="flex gap-2 justify-center">
                      <Button
                        onClick={() => handleEdit(cat.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition duration-200"
                      >
                        <FaRegEdit className="text-lg" />
                      </Button>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="bg-red-500 text-white p-2 rounded-2xl shadow-lg hover:bg-red-600 transition"
                      >
                        <MdDeleteOutline className="text-lg" />
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

export default Kategori;