import { useState } from "react";
import { FaRegEdit, FaSearch } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import { BiRefresh } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDebounce } from "../../../hooks/useDebounce";
import { ImageModal } from "../../../components/ui";
import { useCategories, useDeleteCategory } from "../../../hooks/api/useCategory";

const Kategori = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [trashed, setTrashed] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data: category, error, refetch, isFetching } = useCategories({
    s: debouncedSearchTerm,
    trashed: trashed,
  });
  const deleteCategory = useDeleteCategory();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null)

  const handleEdit = (majorId) => {
    navigate(`/admin/jurusan/edit/${majorId}`);
  };

  const handleDelete = (category) => {
    Swal.fire({
      title: "Yakin ingin menghapus?",
      text: `Jurusan: ${category.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCategory.mutate(category.id);
        Swal.fire("Terhapus!", "Jurusan telah dihapus.", "success");
      }
    });
  };

  const handleRestore = (category) => {
    Swal.fire({
      title: "Yakin ingin mengaktifkan?",
      text: `Jurusan: ${category.name}`,
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        restoreMajor.mutate(category.id)
        Swal.fire("Diaktifkan!", "Admin telah diaktifkan.", "success");
      }
    });
  };

  const handleAddCategory = () => {
    navigate('/admin/kategori/tambah');
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
      <div className="flex justify-between flex-col lg:flex-row gap-4">
        <div>
          <h1 className="font-bold text-gray-900 text-2xl md:text-3xl lg:text-4xl">Data Kategori</h1>
          <p className="text-gray-600 mt-1">Kelola data kategory</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleRefresh}
            className="flex justify-center items-center gap-2 px-4 py-2 text-gray-600 text-base font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300"
            title="Refresh Data"
          >
            <BiRefresh className="text-lg" />
          </button>

          <button
            onClick={() => handleAddCategory()}
            className="flex justify-center items-center gap-2 px-4 py-2 text-orange-500 text-base font-bold border-2 border-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition duration-300 w-fit"
          >
            <IoMdAdd className="text-lg" />
            <span>Tambah Kategori</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari berdasarkan nama atau deskripsi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        <select
          value={trashed}
          onChange={(e) => setTrashed(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        >
          <option value="false">Semua</option>
          <option value="true">Nonaktif</option>
        </select>
      </div>



      <div className="overflow-x-auto shadow-lg rounded-lg relative">
        {isFetching && (
          <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl p-6 flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-700 font-medium">Memuat data...</span>
            </div>
          </div>
        )}
        <table className="min-w-full bg-white">
          <thead className="bg-gradient-to-r from-orange-500 to-orange-600">
            <tr>
              <th className="py-3 px-4 text-left text-white font-semibold w-16">No</th>
              <th className="py-3 px-4 text-left text-white font-semibold w-32">Nama</th>
              <th className="py-3 px-4 text-left text-white font-semibold w-48">Tipe</th>
              <th className="py-3 px-4 text-left text-white font-semibold w-48">Warna</th>
              <th className="py-3 px-4 text-center text-white font-semibold w-24">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {category && category.length > 0 ? (
              category.map((category, index) => (
                <tr key={category.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="py-3 px-4 border-b border-gray-200 text-sm font-medium text-gray-900 w-16">
                    {index + 1}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 w-32">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {category.name}
                    </div>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 w-96 max-w-96">
                    <div className="text-sm text-gray-900 prose prose-sm max-w-none overflow-ellipsis line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: category.type }}
                    />
                  </td>
                  <td className="py-2 px-4 border-b border-gray-400">
                    <div className="text-sm text-gray-900 prose prose-sm max-w-none overflow-ellipsis line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: category.color }}
                    />
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-center w-24">
                    <div className="flex gap-1 justify-center">
                      {
                        category.deleted_at === null && (
                          <button
                            onClick={() => handleEdit(category.id)}
                            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition duration-200"
                            title="Edit Data"
                          >
                            <FaRegEdit className="text-xs" />
                          </button>
                        )
                      }
                      <button
                        onClick={() => category.deleted_at === null ? handleDelete(category) : handleRestore(category)}
                        className={`${category.deleted_at === null
                          ? 'bg-red-500 hover:bg-red-600'
                          : 'bg-green-500 hover:bg-green-600'
                          } text-white p-2 rounded transition duration-200`}
                        title={category.deleted_at === null ? 'Hapus' : 'Aktifkan'}
                      >
                        {category.deleted_at === null ? <MdDeleteOutline className="text-xs" /> : <BiRefresh className="text-xs" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="py-8 px-4 text-center text-gray-500">
                  <div className="flex flex-col items-center">
                    <CiImageOn className="text-4xl text-gray-300 mb-2" />
                    <p className="text-lg font-medium">Tidak ada data Jurusan</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    
    </div>
  );
};

export default Kategori;