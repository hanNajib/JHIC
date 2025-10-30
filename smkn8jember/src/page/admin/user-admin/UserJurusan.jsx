import { useState } from "react";
import { FaRegEdit, FaSearch } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import { AdminLoading, Loading, Button } from "../../../components/ui";
import { useAdmins, useDeleteUser, useRestoreUser, useForceDeleteUser, useBulkRestoreUser, useBulkForceDeleteUser } from "../../../hooks/api/useAdmin";
import { BiRefresh } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDebounce } from "../../../hooks/useDebounce";
import FilterAdmin from "../../../components/ui/FilterAdmin";
import PaginationAdmin from "../../../components/ui/PaginationAdmin";

const UserJurusan = () => {
  const [search, setSearch] = useState("");
  const [cursor, setCursor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [jumlahPage, setJumlahPage] = useState(5);
  const [softDeleteFilter, setSoftDeleteFilter] = useState("active");
  const [selectedIds, setSelectedIds] = useState([]);

  const debouncedSearchTerm = useDebounce(search, 500);
  
  const {
    data: adminResponse,
    refetch,
    isFetching,
    error
  } = useAdmins({
    s: debouncedSearchTerm,
    trashed: softDeleteFilter === "deleted",
    cursor: cursor,
    limit: jumlahPage,
  });

  const admins = adminResponse?.data || []; 
  const meta = adminResponse?.meta || {};
  
  const deleteUser = useDeleteUser();
  const restoreUser = useRestoreUser();
  const forceDeleteUser = useForceDeleteUser();
  const bulkRestoreUser = useBulkRestoreUser();
  const bulkForceDeleteUser = useBulkForceDeleteUser();
  const navigate = useNavigate();

  const handleEdit = (adminId) => {
    navigate(`/admin/data-user/edit/${adminId}`);
  };

  const handleDelete = (admin) => {
    Swal.fire({
      title: "Yakin ingin menghapus?",
      text: `Admin: ${admin.username}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser.mutate(admin.id);
        Swal.fire("Terhapus!", "Admin telah dihapus.", "success");
      }
    });
  };

  const handleRestore = (admin) => {
    Swal.fire({
      title: "Yakin ingin mengaktifkan?",
      text: `Admin: ${admin.username}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Aktifkan",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        restoreUser.mutate(admin.id, {
          onSuccess: () => {
            refetch();
            Swal.fire("Diaktifkan!", "Admin telah diaktifkan.", "success");
          }
        });
      }
    });
  };

  const handleForceDelete = (admin) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: `Admin "${admin.username}" akan dihapus permanen!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus permanen!",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        forceDeleteUser.mutate(admin.id, {
          onSuccess: () => {
            refetch();
            Swal.fire("Terhapus!", "Admin berhasil dihapus permanen.", "success");
          }
        });
      }
    });
  };

  const handleBulkRestore = () => {
    if (selectedIds.length === 0) return;
    Swal.fire({
      title: "Pulihkan data terpilih?",
      text: `${selectedIds.length} admin akan dipulihkan`,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Ya, pulihkan!",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        bulkRestoreUser.mutate(selectedIds, {
          onSuccess: () => {
            setSelectedIds([]);
            refetch();
            Swal.fire("Berhasil!", "Data berhasil dipulihkan.", "success");
          }
        });
      }
    });
  };

  const handleBulkForceDelete = () => {
    if (selectedIds.length === 0) return;
    Swal.fire({
      title: "Hapus permanen data terpilih?",
      text: `${selectedIds.length} admin akan dihapus permanen!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        bulkForceDeleteUser.mutate(selectedIds, {
          onSuccess: () => {
            setSelectedIds([]);
            refetch();
            Swal.fire("Terhapus!", "Data berhasil dihapus permanen.", "success");
          }
        });
      }
    });
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    Swal.fire({
      title: "Hapus data terpilih?",
      text: `${selectedIds.length} admin akan dihapus`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        Promise.all(selectedIds.map(id => deleteUser.mutateAsync(id)))
          .then(() => {
            setSelectedIds([]);
            refetch();
            Swal.fire("Terhapus!", "Data berhasil dihapus.", "success");
          });
      }
    });
  };

  const handleSelectAll = () => {
    setSelectedIds(selectedIds.length === admins.length ? [] : admins.map(a => a.id));
  };

  const handleSelectRow = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const handleAddAdmin = () => {
    navigate('/admin/data-user/tambah');
  };

  const handleRefresh = async () => {
    refetch();
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
        titleHalaman="Data User"
        descHalaman="Kelola data administrator"
        linkTambah="/admin/data-user/tambah"
        titleBTN="Tambah Admin"
        handleRefresh={() => refetch()}
        
        hasSoftDelete={true}
        softDeleteFilter={softDeleteFilter}
        setSoftDeleteFilter={(val) => {
          setSoftDeleteFilter(val);
          setCursor(null);
          setCurrentPage(1);
        }}
      />

      {selectedIds.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 p-4 rounded-lg flex items-center justify-between">
          <span className="text-sm font-semibold text-blue-700">{selectedIds.length} item dipilih</span>
          <div className="flex gap-2">
            {softDeleteFilter === 'active' && (
              <button onClick={handleBulkDelete} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition">
                <MdDeleteOutline className="text-lg" />Hapus
              </button>
            )}
            {softDeleteFilter === 'deleted' && (
              <>
                <button onClick={handleBulkRestore} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition">
                  <BiRefresh className="text-lg" />Pulihkan
                </button>
                <button onClick={handleBulkForceDelete} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition">
                  <MdDeleteOutline className="text-lg" />Hapus Permanen
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <div className="overflow-x-auto shadow-lg rounded-lg relative">
        <table className="min-w-full bg-white">
          <thead className="bg-gradient-to-r from-orange-500 to-orange-600">
            <tr>
              <th className="py-2 px-4 text-center text-white w-12">
                <input type="checkbox" checked={selectedIds.length === admins.length && admins.length > 0} onChange={handleSelectAll} className="w-4 h-4 cursor-pointer" />
              </th>
              <th className="py-2 px-4 text-left text-white">No</th>
              <th className="py-2 px-4 text-left text-white min-w-56">Username</th>
              <th className="py-2 px-4 text-left text-white">Email</th>
              <th className="py-2 px-4 text-left text-white">Role</th>
              <th className="py-2 px-4 text-left text-white">No. HP</th>
              <th className="py-2 px-4 text-left text-white">Bio</th>
              <th className="py-2 px-4 text-left text-white">Terdaftar</th>
              <th className="py-2 px-4 text-left text-white">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {isFetching ? (
              <tr>
                <td colSpan={9} className="text-center py-4 text-gray-500">
                  Memuat data...
                </td>
              </tr>
            ) : admins.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-4 text-gray-500">
                  Tidak ada data ditemukan.
                </td>
              </tr>
            ) : (
              admins.map((admin, i) => (
                <tr
                  key={admin.id}
                  className="hover:bg-gray-50 text-[14px] border-b border-gray-300"
                >
                  <td className="py-2 px-4 text-center">
                    <input type="checkbox" checked={selectedIds.includes(admin.id)} onChange={() => handleSelectRow(admin.id)} className="w-4 h-4 cursor-pointer" />
                  </td>
                  <td className="py-2 px-4">{(currentPage - 1) * jumlahPage + i + 1}</td>
                  <td className="py-2">{admin.username}</td>
                  <td className="py-2 px-4">{admin.email}</td>
                  <td className="py-2 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${admin.role === 'superadmin'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-blue-100 text-blue-800'
                      }`}>
                      {admin.role}
                    </span>
                  </td>
                  <td className="py-2 px-4">{admin.phone_number || '-'}</td>
                  <td className="py-2 px-4">{admin.bio || '-'}</td>
                  <td className="py-2 px-4">
                    {admin.created_at ? new Date(admin.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    }) : '-'}
                  </td>
                  <td className="py-2 px-4">
                    <div className="flex gap-2 justify-center">
                      {admin.deleted_at === null && (
                        <Button
                          onClick={() => handleEdit(admin.id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition duration-200"
                        >
                          <FaRegEdit className="text-lg" />
                        </Button>
                      )}
                      <button
                        onClick={() => admin.deleted_at === null ? handleDelete(admin) : handleRestore(admin)}
                        className={`${admin.deleted_at === null
                          ? 'bg-red-500 hover:bg-red-600'
                          : 'bg-green-500 hover:bg-green-600'
                        } text-white p-2 rounded-2xl shadow-lg transition`}
                      >
                        {admin.deleted_at === null ? <MdDeleteOutline className="text-lg" /> : <BiRefresh className="text-lg" />}
                      </button>
                      {admin.deleted_at !== null && (
                        <button
                          onClick={() => handleForceDelete(admin)}
                          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-2xl shadow-lg transition"
                          title="Hapus Permanen"
                        >
                          <MdDeleteOutline className="text-lg" />
                        </button>
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
    </div>
  );
};

export default UserJurusan;