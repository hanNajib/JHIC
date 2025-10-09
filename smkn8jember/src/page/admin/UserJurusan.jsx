import React, { useState, useMemo } from "react";
import { FaFileDownload, FaRegEdit, FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import { AdminLoading } from "../../components/ui";
import { useAdmins } from "../../hooks/api/useAdmin";
import { BiDownload, BiRefresh } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const UserJurusan = () => {
  const { data: admins, isLoading, error } = useAdmins();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const navigate = useNavigate();
  const filteredAdmins = useMemo(() => {
    if (!admins) return [];
    
    let filtered = admins;
    
    if (filterStatus === "active") {
      filtered = filtered.filter(admin => admin.deleted_at === null);
    } else if (filterStatus === "inactive") {
      filtered = filtered.filter(admin => admin.deleted_at !== null);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(admin =>
        admin.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [admins, searchTerm, filterStatus]);

  const handleEdit = (adminId) => {
    console.log('Edit admin:', adminId);
  };

  const handleDelete = (admin) => {
    if (admin.deleted_at === null) {
      if (window.confirm(`Yakin ingin menghapus admin ${admin.username}?`)) {
        console.log('Delete admin:', admin.id);
      }
    } else {
      if (window.confirm(`Yakin ingin memulihkan admin ${admin.username}?`)) {
        console.log('Restore admin:', admin.id);
      }
    }
  };

  const handleAddAdmin = () => {
    navigate('/admin-jurusan/tambah');
  };

  const handleExportData = () => {
    console.log('Export admin data');
  };

  if (isLoading) {
    return <AdminLoading type="table" message="Memuat data admin..." />;
  }

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
      {/* Title */}
      <div className="flex justify-between flex-col lg:flex-row gap-4">
        <div>
          <h1 className="font-bold text-gray-900 text-2xl md:text-3xl lg:text-4xl">Data Admin</h1>
          <p className="text-gray-600 mt-1">Kelola data administrator</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => window.location.reload()}
            className="flex justify-center items-center gap-2 px-4 py-2 text-gray-600 text-base font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300"
            title="Refresh Data"
          >
            <BiRefresh className="text-lg" />
          </button>
    
          <button
            onClick={() => handleAddAdmin()}
            className="flex justify-center items-center gap-2 px-4 py-2 text-orange-500 text-base font-bold border-2 border-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition duration-300 w-fit"
          >
            <IoMdAdd className="text-lg" />
            <span>Tambah Admin</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari berdasarkan username atau email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        >
          <option value="all">Semua Status</option>
          <option value="active">Admin Aktif</option>
          <option value="inactive">Admin Dihapus</option>
        </select>
      </div>

      

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gradient-to-r from-orange-500 to-orange-600">
            <tr>
              <th className="py-3 px-4 text-left text-white font-semibold">No</th>
              <th className="py-3 px-4 text-left text-white font-semibold">Username</th>
              <th className="py-3 px-4 text-left text-white font-semibold">Email</th>
              <th className="py-3 px-4 text-left text-white font-semibold">Role</th>
              <th className="py-3 px-4 text-left text-white font-semibold">No. HP</th>
              <th className="py-3 px-4 text-left text-white font-semibold">Bio</th>
              <th className="py-3 px-4 text-left text-white font-semibold">Terdaftar</th>
              <th className="py-3 px-4 text-center text-white font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdmins && filteredAdmins.length > 0 ? (
              filteredAdmins.map((admin, index) => (
                <tr key={admin.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="py-3 px-4 border-b border-gray-200 text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{admin.username}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm text-gray-900">
                    {admin.email}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      admin.role === 'superadmin' 
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {admin.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm text-gray-500">
                    {admin.phone_number || '-'}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    <span className={`inline-flex px-2 py-1 text-xs font-normal rounded-full`}>
                      {admin.bio}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm text-gray-500">
                    {admin.created_at ? new Date(admin.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    }) : '-'}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-center">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleEdit(admin.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition duration-200 shadow-sm"
                        title="Edit Admin"
                      >
                        <FaRegEdit className="text-sm" />
                      </button>
                      <button
                        onClick={() => handleDelete(admin)}
                        className={`${
                          admin.deleted_at === null 
                            ? 'bg-red-500 hover:bg-red-600' 
                            : 'bg-green-500 hover:bg-green-600'
                        } text-white p-2 rounded-lg transition duration-200 shadow-sm`}
                        title={admin.deleted_at === null ? 'Hapus Admin' : 'Restore Admin'}
                      >
                        <MdDeleteOutline className="text-sm" />
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
                    <p className="text-lg font-medium">
                      {searchTerm || filterStatus !== 'all' ? 'Tidak ada hasil yang ditemukan' : 'Tidak ada data admin'}
                    </p>
                    <p className="text-sm">
                      {searchTerm || filterStatus !== 'all' 
                        ? 'Coba ubah kata kunci pencarian atau filter' 
                        : 'Belum ada admin yang terdaftar dalam sistem'}
                    </p>
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

export default UserJurusan;
