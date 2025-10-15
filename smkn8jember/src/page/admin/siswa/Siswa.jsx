import { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useStudentData, useUpdateStudentData } from "../../../hooks/api/useStudentData";
import { Loading } from "../../../components/ui";

const Siswa = () => {
  const navigate = useNavigate();
  const { data: studentResponseHook, isLoading } = useStudentData();
  const studentResponse = studentResponseHook?.data || [];
  const updateStudentData = useUpdateStudentData();
  
  const [formData, setFormData] = useState({});
  const [originalData, setOriginalData] = useState({});

  useEffect(() => {
    if (studentResponse) {
      const initialData = {};
      studentResponse.forEach((item) => {
        initialData[item.name] = item.value;
      });
      setFormData(initialData);
      setOriginalData(initialData);
    }
  }, [studentResponse]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const hasChanges = () => {
    return Object.entries(formData).some(
      ([key, value]) => value !== originalData[key]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const changedFields = Object.entries(formData).filter(
        ([key, value]) => value !== originalData[key]
      );

      if (changedFields.length === 0) {
        Swal.fire({
          icon: "info",
          title: "Tidak Ada Perubahan",
          text: "Tidak ada data yang diubah",
        });
        return;
      }

      const updatePromises = changedFields.map(([name, value]) =>
        updateStudentData.mutateAsync({ name, data: { value } })
      );

      await Promise.all(updatePromises);
      setOriginalData({ ...formData });

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: `${changedFields.length} data siswa berhasil diperbarui.`,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text:
          error?.response?.data?.message ||
          "Terjadi kesalahan saat memperbarui data siswa",
      });
    }
  };

  if (isLoading) {
    return <Loading variant="spinner" size="large" />;
  }

  return (
    <div className="flex flex-col justify-center gap-10 w-full h-fit bg-white rounded-lg p-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="bg-orange-500 cursor-pointer text-3xl lg:text-4xl text-center p-2 rounded-lg text-white hover:bg-orange-600 transition-colors"
        >
          <IoIosArrowBack />
        </button>
        <h1 className="font-bold text-gray-900 text-2xl md:text-3xl lg:text-4xl">
          Pengaturan Data Siswa
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-orange-500 pb-2">
          Jumlah Siswa per Kategori
        </h2>

        {/* Kelas 10 */}
        <div className="flex flex-col">
          <label htmlFor="kelas10" className="font-bold text-gray-800 mb-1">
            Jumlah Siswa Kelas 10
          </label>
          <input
            type="number"
            id="kelas10"
            value={formData.Kelas10 || ""}
            onChange={(e) => handleInputChange("Kelas10", e.target.value)}
            placeholder="Masukkan jumlah siswa kelas 10"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
        </div>

        {/* Kelas 11 */}
        <div className="flex flex-col">
          <label htmlFor="kelas11" className="font-bold text-gray-800 mb-1">
            Jumlah Siswa Kelas 11
          </label>
          <input
            type="number"
            id="kelas11"
            value={formData.Kelas11 || ""}
            onChange={(e) => handleInputChange("Kelas11", e.target.value)}
            placeholder="Masukkan jumlah siswa kelas 11"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
        </div>

        {/* Kelas 12 */}
        <div className="flex flex-col">
          <label htmlFor="kelas12" className="font-bold text-gray-800 mb-1">
            Jumlah Siswa Kelas 12
          </label>
          <input
            type="number"
            id="kelas12"
            value={formData.Kelas12 || ""}
            onChange={(e) => handleInputChange("Kelas12", e.target.value)}
            placeholder="Masukkan jumlah siswa kelas 12"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
        </div>

        {/* Laki-laki */}
        <div className="flex flex-col">
          <label htmlFor="laki_laki" className="font-bold text-gray-800 mb-1">
            Jumlah Siswa Laki-laki
          </label>
          <input
            type="number"
            id="laki_laki"
            value={formData.JumlahSiswa || ""}
            onChange={(e) => handleInputChange("JumlahSiswa", e.target.value)}
            placeholder="Masukkan jumlah siswa laki-laki"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
        </div>

        {/* Perempuan */}
        <div className="flex flex-col">
          <label htmlFor="perempuan" className="font-bold text-gray-800 mb-1">
            Jumlah Siswa Perempuan
          </label>
          <input
            type="number"
            id="perempuan"
            value={formData.JumlahSiswi || ""}
            onChange={(e) => handleInputChange("JumlahSiswi", e.target.value)}
            placeholder="Masukkan jumlah siswa perempuan"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
        </div>

        {/* Rombel */}
        <div className="flex flex-col">
          <label htmlFor="rombel" className="font-bold text-gray-800 mb-1">
            Jumlah Rombel Kelas
          </label>
          <input
            type="number"
            id="rombel"
            value={formData.JumlahRombelKelas || ""}
            onChange={(e) => handleInputChange("JumlahRombelKelas", e.target.value)}
            placeholder="Masukkan jumlah rombel kelas"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
        </div>

        {/* Tombol Simpan */}
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            disabled={!hasChanges()}
            className={`${
              hasChanges()
                ? "bg-orange-500 hover:bg-orange-600"
                : "bg-gray-400 cursor-not-allowed"
            } text-white font-semibold py-2 px-6 rounded-lg transition-colors`}
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default Siswa;
