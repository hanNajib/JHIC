import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import PaginationAdmin from "../../../components/ui/PaginationAdmin";
import FilterAdmin from "../../../components/ui/FilterAdmin";
import ImageModal from "../../../components/ui/ImageModal";
import { useDebounce } from "../../../hooks/useDebounce";
import { useDeleteGallery, useGalleries } from "../../../hooks/api/useGallery";
import Swal from "sweetalert2";
import { Button } from "../../../components/ui";
import { useNavigate } from "react-router-dom";

const Gambar = () => {
  const [search, setSearch] = useState("");
  const [filterKategori, setFilterKategori] = useState("Semua");
  const [selectedImage, setSelectedImage] = useState(null);
  const [halamanKe, setHalamanKe] = useState(1);
  const [jumlahPage, setJumlahPage] = useState(5);
  const [trashed, setTrashed] = useState(false);

  const debouncedSearchTerm = useDebounce(search, 500);
  const navigate = useNavigate();

  const {
    data: gallery = [],
    isFetching,
    refetch,
  } = useGalleries({
    s: debouncedSearchTerm,
    trashed,
  });

  const deleteGallery = useDeleteGallery();

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
        deleteGallery.mutate(id, {
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
    navigate(`/admin/gambar/edit/${id}`);
  };

  const filteredData = gallery.filter((a) => {
    const matchKategori =
      filterKategori === "Semua" || a.kategori === filterKategori;
    return matchKategori;
  });

  const jumlahHalaman = Math.ceil(filteredData.length / jumlahPage);
  const indexAwal = (halamanKe - 1) * jumlahPage;
  const dataTampil = filteredData.slice(indexAwal, indexAwal + jumlahPage);

  const handleReset = () => {
    setSearch("");
    setFilterKategori("Semua");
    setHalamanKe(1);
  };

  return (
    <div className="flex flex-col justify-center gap-5 lg:gap-4 w-full h-fit bg-white rounded-lg p-5">
      <FilterAdmin
        filterKategori={filterKategori}
        setFilterKategori={(val) => {
          setFilterKategori(val);
          setHalamanKe(1);
        }}
        search={search}
        setSearch={(val) => {
          setSearch(val);
          setHalamanKe(1);
        }}
        handleReset={handleReset}
        titleHalaman="Data Gambar"
        descHalaman="Kelola data gambar"
        linkTambah="/admin/gambar/tambah"
        titleBTN="Tambah Gambar"
        kategoriList={["RPL", "Prestasi", "Karya", "Edukasi"]}
      />

      <div className="overflow-x-auto shadow-lg rounded-lg relative">
        <table className="min-w-full bg-white">
          <thead className="bg-gradient-to-r from-orange-500 to-orange-600">
            <tr>
              <th className="py-2 px-4 text-left text-white">No</th>
              <th className="py-2 px-4 text-left text-white min-w-56">Judul</th>
              <th className="py-2 px-4 text-left text-white">Kategori</th>
              <th className="py-2 px-4 text-left text-white">Tanggal</th>
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
            ) : dataTampil.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  Tidak ada data ditemukan.
                </td>
              </tr>
            ) : (
              dataTampil.map((a, i) => (
                <tr
                  key={a.id}
                  className="hover:bg-gray-50 text-[14px] border-b border-gray-300"
                >
                  <td className="py-2 px-4">{i + 1 + indexAwal}</td>
                  <td className="py-2">{a.title}</td>
                  <td className="py-2 px-4">
                    <div className="bg-orange-300/30 border border-orange-500 px-2 py-[1px] w-fit rounded-2xl text-sm text-orange-500">
                      {a.category}
                    </div>
                  </td>
                  <td className="py-2 px-4">{a.created_at}</td>
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
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition duration-200"
                      >
                        <FaRegEdit className="text-lg" />
                      </Button>
                      <button
                        onClick={() => handleDelete(a.id)}
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
        currentPage={halamanKe}
        totalPages={jumlahHalaman}
        perPage={jumlahPage}
        onPageChange={setHalamanKe}
        onPerPageChange={(value) => {
          setJumlahPage(value);
          setHalamanKe(1);
        }}
      />

      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
};

export default Gambar;
