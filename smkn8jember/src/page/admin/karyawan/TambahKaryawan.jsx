import { IoIosArrowBack } from "react-icons/io";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Multiselect } from "../../../components/ui";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateStaff } from "../../../hooks/api/useStaff";
import Swal from "sweetalert2";

const schema = yup.object().shape({
  name: yup.string().required("Nama wajib diisi"),
  position: yup.string().nullable(),
  category: yup.string().required("Kategori wajib diisi"),
  image: yup
    .mixed()
    .nullable()
    .test("fileSize", "Ukuran gambar maksimal 2MB", (value) => {
      if (!value) return true;
      return value.size <= 2 * 1024 * 1024;
    })
    .test("fileType", "Format gambar tidak valid", (value) => {
      if (!value) return true;
      return ["image/png", "image/jpeg", "image/jpg"].includes(value.type);
    }),
});

const TambahKaryawan = () => {
  const navigate = useNavigate();
  
  const createStaff = useCreateStaff({
    onSuccess: () => {
      console.log("✅ Staff berhasil ditambahkan");
    },
    onError: (error) => {
      console.error("❌ Error tambah staff:", error);
    },
  });

  const categoryOptions = [
    { value: "kepala_sekolah", label: "Kepala Sekolah" },
    { value: "waka", label: "Wakil Kepala Sekolah" },
    { value: "koordinator", label: "Koordinator" },
    { value: "koordinator_jurusan", label: "Koordinator Jurusan" },
    { value: "komite", label: "Komite" },
    { value: "lainnya", label: "Lainnya" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      position: "",
      category: "lainnya",
    },
  });

  const [preview, setPreview] = useState(null);
  const selectedCategory = watch("category");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setValue("image", file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleReset = () => {
    reset();
    setPreview(null);
  };

  const onSubmit = async (data) => {
    try {
      console.log("📤 Submitting staff data:", data);
      
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("role", "employee");
      if (data.position) formData.append("position", data.position);
      formData.append("category", data.category);
      if (data.image) {
        formData.append("image", data.image);
        console.log("🖼️ Image file included:", data.image.name);
      }

      await createStaff.mutateAsync(formData);

      await Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Data karyawan berhasil ditambahkan.",
        confirmButtonColor: "#f97316",
        timer: 1800,
        showConfirmButton: false,
      });

      navigate("/admin/karyawan");
    } catch (error) {
      console.error("❌ Gagal tambah karyawan:", error);

      await Swal.fire({
        icon: "error",
        title: "Gagal!",
        text:
          error?.response?.data?.message ||
          "Terjadi kesalahan saat menambahkan data.",
        confirmButtonColor: "#f97316",
      });
    }
  };

  return (
    <div className="flex flex-col justify-center gap-10 w-full h-fit bg-white rounded-lg p-5">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="bg-orange-500 text-4xl text-center p-1 rounded-lg text-white hover:bg-orange-600 transition duration-300"
        >
          <IoIosArrowBack />
        </button>
        <h1 className="font-bold text-gray-900 text-2xl md:text-3xl lg:text-4xl">
          Tambah Data Karyawan
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Nama */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nama <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("name")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Masukkan nama karyawan"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Jabatan */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Jabatan
          </label>
          <input
            type="text"
            {...register("position")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Masukkan jabatan (opsional)"
          />
          {errors.position && (
            <p className="text-red-500 text-sm mt-1">{errors.position.message}</p>
          )}
        </div>

        {/* Kategori */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kategori <span className="text-red-500">*</span>
          </label>
          <Multiselect
            options={categoryOptions}
            value={selectedCategory}
            onChange={(value) => setValue("category", value)}
            placeholder="Pilih kategori karyawan"
            multiple={false}
          />
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
          )}
        </div>

        {/* Upload Foto */}
        <div>
          <label htmlFor="upload" className="block text-sm font-medium text-gray-700 mb-2">
            Foto Karyawan
          </label>

          <label
            htmlFor="upload"
            className={`flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
              preview
                ? "border-orange-300 bg-orange-50"
                : "border-gray-300 bg-white hover:bg-gray-50"
            }`}
          >
            {preview ? (
              <div className="relative p-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="h-48 w-48 object-cover rounded-lg shadow-md"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setPreview(null);
                    setValue("image", null);
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="py-10 flex flex-col items-center justify-center">
                <IoCloudUploadOutline className="text-6xl text-gray-600" />
                <p className="text-gray-600 font-medium">
                  Klik untuk pilih foto karyawan
                </p>
                <p className="text-xs text-gray-600">PNG, JPEG, JPG (Max 2MB)</p>
              </div>
            )}

            <input
              id="upload"
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        {/* Tombol */}
        <div className="flex gap-3 justify-end mt-6">
          <button
            type="button"
            onClick={handleReset}
            className="py-2 px-6 text-orange-500 text-base font-bold border-2 border-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition duration-300"
            disabled={isSubmitting}
          >
            Reset
          </button>
          <button
            type="submit"
            className="bg-orange-500 text-white font-semibold py-2 px-6 text-base rounded-lg hover:bg-orange-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TambahKaryawan;
