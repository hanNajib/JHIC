import React, { useState, useEffect, useMemo } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import ImageModal from "../../../components/ui/ImageModal";
import PaginationAdmin from "../../../components/ui/PaginationAdmin";
import FilterAdmin from "../../../components/ui/FilterAdmin";
import {
  useExtarculiculars,
  useDeleteExtarculicular,
} from "../../../hooks/api/useExtarculicular";
import { Button } from "../../../components/ui";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Ekstra = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [halamanKe, setHalamanKe] = useState(1);
  const [jumlahPage, setJumlahPage] = useState(5);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Semua");

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(search);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearchTerm(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  const {
    data: extra = [],
    isFetching,
    refetch,
  } = useExtarculiculars({
    s: debouncedSearchTerm,
  });
  const deleteExtraculicular = useDeleteExtarculicular();
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

  const filteredEkstra = extra.filter((item) => {
    const matchStatus =
      status === "Semua" || item.status?.toLowerCase() === status.toLowerCase();
    const matchSearch =
      !search || item.name.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const jumlahHalaman = Math.ceil(filteredEkstra.length / jumlahPage);
  const arrayTerakhir = halamanKe * jumlahPage;
  const arrayAwal = arrayTerakhir - jumlahPage;
  const dataHasil = filteredEkstra.slice(arrayAwal, arrayTerakhir);
  const navigate = useNavigate();
  const handleEdit = (id) => {
    navigate(`/admin/ekstrakulikuler/edit/${id}`);
  };
  const handleReset = () => {
    setSearch("");
    setStatus("Semua");
    setHalamanKe(1);
  };

  return (
    <div className="flex flex-col justify-center gap-5 lg:gap-4 w-auto h-fit bg-white rounded-lg p-5">
      {/* Filter */}
      <FilterAdmin
        filterKategori={status}
        setFilterKategori={(value) => {
          setStatus(value);
          setHalamanKe(1);
        }}
        search={search}
        setSearch={(value) => {
          setSearch(value);
          setHalamanKe(1);
        }}
        handleReset={handleReset}
        titleHalaman="Data Ekstrakurikuler"
        descHalaman="Kelola data ekstrakurikuler"
        linkTambah="admin/ekstrakulikuler/tambah"
        titleBTN="Tambah Ekstrakurikuler"
        kategoriList={["Active", "Nonactive"]}
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
            ) : dataHasil.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-5">
                  Tidak ada data ekstrakurikuler.
                </td>
              </tr>
            ) : (
              dataHasil.map((a, _i) => (
                <tr
                  key={a.id}
                  className="hover:bg-gray-50 text-[14px] border-b border-gray-300"
                >
                  <td className="py-2 px-4">{_i + 1 + arrayAwal}</td>
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
                      <Button
                        onClick={() => handleEdit(a.id)}
                        className="text-center text-3xl bg-green-500 p-2 rounded-2xl shadow-lg text-white hover:bg-green-600"
                      >
                        <FaRegEdit className="text-lg" />
                      </Button>
                      <Button onClick={() => handleDelete(a.id)}  className="text-center text-3xl bg-red-500 p-2 rounded-2xl shadow-lg text-white hover:bg-red-600">
                        <MdDeleteOutline className="text-lg" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <PaginationAdmin
        currentPage={halamanKe}
        totalPages={jumlahHalaman}
        perPage={jumlahPage}
        onPageChange={(page) => setHalamanKe(page)}
        onPerPageChange={(value) => {
          setJumlahPage(value);
          setHalamanKe(1);
        }}
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
