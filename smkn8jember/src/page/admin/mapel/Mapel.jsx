import { useState } from "react";
import { FaRegEdit, FaSearch } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { BiRefresh } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDebounce } from "../../../hooks/useDebounce";
import { useDeleteSubject, useRestoreSubject, useSubjects } from "../../../hooks/api/useSubject";

const Mapel = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [trashed, setTrashed] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  const { data: subjects, refetch, isFetching, error } = useSubjects({
    s: debouncedSearchTerm,
    trashed: trashed,
  });
  
  const deleteSubject = useDeleteSubject({
    onSuccess: () => Swal.fire("Terhapus!", "Mata Pelajaran telah dihapus.", "success"),
    onError: () => Swal.fire("Error!", "Gagal menghapus mata pelajaran.", "error")
  });
  
  const restoreSubject = useRestoreSubject({
    onSuccess: () => Swal.fire("Diaktifkan!", "Mata Pelajaran telah diaktifkan.", "success"),
    onError: () => Swal.fire("Error!", "Gagal mengaktifkan mata pelajaran.", "error")
  });

  const confirmAction = (title, text, action) => {
    Swal.fire({
      title, text, icon: "warning",
      showCancelButton: true,
      confirmButtonText: title.includes("hapus") ? "Hapus" : "Aktifkan",
      cancelButtonText: "Batal"
    }).then(result => result.isConfirmed && action());
  };

  const handleEdit = (id) => navigate(`/admin/mapel/edit/${id}`);
  const handleDelete = (subject) => confirmAction("Yakin ingin menghapus?", `Mata Pelajaran: ${subject.name}`, () => deleteSubject.mutate(subject.id));
  const handleRestore = (subject) => confirmAction("Yakin ingin mengaktifkan?", `Mata Pelajaran: ${subject.name}`, () => restoreSubject.mutate(subject.id));
  const handleAdd = () => navigate('/admin/mapel/tambah');
  const handleRefresh = () => refetch();

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
          <h1 className="font-bold text-gray-900 text-2xl md:text-3xl lg:text-4xl">Mata Pelajaran Jurusan</h1>
          <p className="text-gray-600 mt-1">Kelola data mata pelajaran jurusan</p>
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
            onClick={handleAdd}
            className="flex justify-center items-center gap-2 px-4 py-2 text-orange-500 text-base font-bold border-2 border-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition duration-300 w-fit"
          >
            <IoMdAdd className="text-lg" />
            <span>Tambah Data</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari berdasarkan Nama atau Deskripsi..."
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
              <th className="py-3 px-4 text-left text-white font-semibold w-48">Deskripsi</th>
              <th className="py-3 px-4 text-left text-white font-semibold w-24">Jurusan</th>
              <th className="py-3 px-4 text-center text-white font-semibold w-24">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {subjects && subjects.length > 0 ? (
              subjects.map((subject, index) => (
                <tr key={subject.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="py-3 px-4 border-b border-gray-200 text-sm font-medium text-gray-900 w-16">
                    {index + 1}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 w-32">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {subject.name}
                    </div>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm text-gray-900 w-48">
                    <div className="truncate" title={subject.email}>
                      {subject.description || '-'}
                    </div>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm text-gray-900 w-48">
                    <div className="truncate" title={subject.email}>
                      {subject.major.name || '-'}
                    </div>
                  </td>

                  <td className="py-3 px-4 border-b border-gray-200 text-center w-24">
                    <div className="flex gap-1 justify-center">
                      {
                        subject.deleted_at === null && (
                          <button
                            onClick={() => handleEdit(subject.id)}
                            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition duration-200"
                            title="Edit Admin"
                          >
                            <FaRegEdit className="text-xs" />
                          </button>
                        )
                      }
                      <button
                        onClick={() => subject.deleted_at === null ? handleDelete(subject) : handleRestore(subject)}
                        className={`${subject.deleted_at === null
                          ? 'bg-red-500 hover:bg-red-600'
                          : 'bg-green-500 hover:bg-green-600'
                          } text-white p-2 rounded transition duration-200`}
                        title={subject.deleted_at === null ? 'Hapus' : 'Aktifkan'}
                      >
                        {subject.deleted_at === null ? <MdDeleteOutline className="text-xs" /> : <BiRefresh className="text-xs" />}
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
                    <p className="text-lg font-medium">Tidak ada data ditemukan</p>
                    <p className="text-sm">Belum ada data yang terdaftar dalam sistem</p>
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

export default Mapel;