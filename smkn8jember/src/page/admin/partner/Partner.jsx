import React from "react";
import { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { FiFilter } from "react-icons/fi";
import { CiImageOn } from "react-icons/ci";
import ImageModal from "../../../components/ui/ImageModal";
import PaginationAdmin from "../../../components/ui/PaginationAdmin";
import FilterAdmin from "../../../components/ui/FilterAdmin";
import { useDeletePartner, usePartners } from "../../../hooks/api/usePartner";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../../hooks/useDebounce";
import { useMajors } from "../../../hooks/api/useMajor";
import { Button } from "../../../components/ui";
import Swal from "sweetalert2";

const Partner = () => {
  const [guru, setGuru] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [filterKategori, setFilterKategori] = useState("Semua");
  const [halamanKe, setHalamanKe] = useState(1);
  const [jumlahPage, setJumlahPage] = useState(5);
  const [trashed, setTrashed] = useState(false);
  // Search & Filter
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Semua");
  const debouncedSearchTerm = useDebounce(search, 500);
  const navigate = useNavigate();
  const {
    data: partner = [],
    isFetching,
    refetch,
  } = usePartners({
    s: debouncedSearchTerm,
    trashed,
  });
  const { data: majorDataRaw = [] } = useMajors();
  const majorMap = {};
  majorDataRaw.forEach((major) => {
    majorMap[major.id] = major.name;
  });

  // Filter dan search
  const filteredData = partner.filter((a) => {
    const matchKategori =
      filterKategori === "Semua" || a.kategori === filterKategori;
    return matchKategori;
  });

  const jumlahHalaman = Math.ceil(partner.length / jumlahPage);
  const arrayTerakhir = halamanKe * jumlahPage;
  const arrayAwal = arrayTerakhir - jumlahPage;
  const dataHasil = filteredData.slice(arrayAwal, arrayTerakhir);

  const handleReset = () => {
    setSearch("");
    setStatus("Semua");
    setHalamanKe(1);
  };
  const handleEdit = (id) => {
    navigate(`/admin/partner/edit/${id}`);
  };
   const deletePartner = useDeletePartner();
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
            deletePartner.mutate(id, {
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


  return (
    <div className="flex flex-col justify-center gap-5 lg:gap-4 w-full h-fit bg-white rounded-lg p-5">
      {/*  filters */}
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
        titleHalaman="Data Partner"
        descHalaman="Kelola data partner"
        linkTambah="/admin/partner/tambah"
        titleBTN="Tambah Partner"
        kategoriList={["Active", "Nonactive"]}
      />

      {/* tabel */}
      <div className="overflow-x-auto shadow-lg rounded-lg relative">
        <table className="min-w-full bg-white ">
          <thead className="bg-gradient-to-r from-orange-500 to-orange-600">
            <tr>
              <th className="py-2 px-4 text-left text-white min-w-full">No</th>
              <th className="py-2 px-4 text-left text-white min-w-full">
                Nama
              </th>
              <th className="py-2 px-4 text-left text-white min-w-full">
                Jurusan
              </th>
              <th className="py-2 px-4 text-left text-white min-w-full">
                Foto
              </th>
              <th className="py-2 px-4 text-left text-white min-w-full">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {dataHasil.map((a, _i) => (
              <tr className="hover:bg-gray-50 text-[14px] border-b border-gray-300">
                <td className="py-2 px-4">{_i + 1 + arrayAwal}</td>
                <td className="py-2  ">{a.name}</td>
                <td className="py-2 px-4">{majorMap[a.major_id] || "-"}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => setSelectedImage(a.image)}
                    className="flex justify-center items-center gap-1 py-1 px-3 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                  >
                    <CiImageOn className="text-xl" />
                    Lihat
                  </button>
                </td>
                <td className="py-2 px-4 text-white ">
                  <div className="flex gap-2 justify-center ">
                    <Button
                      onClick={() => handleEdit(a.id)}
                      className="text-center text-3xl bg-green-500 p-2 rounded-2xl shadow-lg"
                    >
                      <FaRegEdit className="text-lg" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(a.id)}
                      className="text-center text-3xl bg-red-500 p-2 rounded-2xl shadow-lg"
                    >
                      <MdDeleteOutline className="text-lg" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PaginationAdmin
        currentPage={halamanKe}
        totalPages={jumlahHalaman}
        perPage={jumlahPage}
        onPageChange={(value) => {
          setHalamanKe(value);
        }}
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

export default Partner;
