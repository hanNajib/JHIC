import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCategory, useUpdateCategory } from "../../../hooks/api/useCategory";
import Swal from "sweetalert2";

const schema = yup.object().shape({
  name: yup.string().required("Nama kategori wajib diisi"),
  type: yup.string().required("Tipe kategori wajib dipilih"),
  color: yup.string().required("Warna kategori wajib diisi"),
});

const EditKategori = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: currentCategory, isLoading, error } = useCategory(id);
  

  const updateCategory = useUpdateCategory(id, {
    onSuccess: () => {
      Swal.fire({
        title: "Berhasil!",
        text: "Kategori berhasil diperbarui",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate('/admin/kategori');
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Gagal!",
        text: error.response?.data?.message || "Terjadi kesalahan saat memperbarui kategori",
        icon: "error",
      });
    }
  });

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
      type: "",
      color: "",
    },
  });

  // Watch untuk memantau value type
  const watchedType = watch("type");

  useEffect(() => {
    if (currentCategory) {
      console.log("Setting form values:", currentCategory); // Debug log
      setValue("name", currentCategory.name || "");
      setValue("type", currentCategory.type || "");
      setValue("color", currentCategory.color || "");
    }
  }, [currentCategory, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("type", data.type);
    formData.append("color", data.color);

    await updateCategory.mutateAsync(formData);
  };

  const handleReset = () => {
    if (currentCategory) {
      setValue("name", currentCategory.name || "");
      setValue("type", currentCategory.type || "");
      setValue("color", currentCategory.color || "");
    }
  };

  const kategoriOptions = [
    { value: "major", label: "Jurusan" },
    { value: "article", label: "Artikel" },
    { value: "announcement", label: "Pengumuman" },
    { value: "gallery", label: "Galeri" },
  ];

  if (isLoading) {
    return (
      <div className="text-center text-gray-500 py-10">
        Memuat data kategori...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-lg p-5">
        <div className="text-center text-red-500">
          <h3 className="text-lg font-semibold mb-2">Error Loading Data</h3>
          <p>{error?.message || "Gagal memuat data kategori"}</p>
        </div>
      </div>
    );
  }

  if (!currentCategory && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-lg p-5">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Data Tidak Ditemukan</h3>
          <p className="text-gray-600">Kategori dengan ID tersebut tidak ditemukan.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center gap-10 w-full h-fit bg-white rounded-lg p-5">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="bg-orange-500 cursor-pointer text-3xl lg:text-4xl text-center p-2 rounded-lg text-white hover:bg-orange-600 transition-colors"
        >
          <IoIosArrowBack />
        </button>
        <h1 className="font-bold text-gray-900 text-2xl md:text-3xl lg:text-4xl">
          Edit Kategori
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* Nama Kategori */}
        <div className="flex flex-col">
          <label htmlFor="name" className="font-bold text-gray-800">
            Nama Kategori
          </label>
          <input
            type="text"
            id="name"
            placeholder="Masukkan Nama Kategori"
            {...register("name")}
            className="w-full px-3 py-1 text-gray-600 border border-gray-600 rounded-lg focus:ring-1 focus:ring-gray-600 focus:outline-none"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Dropdown Type */}
        <div className="flex flex-col">
          <label htmlFor="type" className="font-bold text-gray-800">
            Tipe Kategori
          </label>
          <select
            id="type"
            {...register("type")}
            value={watchedType || ""}
            className="w-full px-3 py-2 text-gray-600 border border-gray-600 rounded-lg focus:ring-1 focus:ring-gray-600 focus:outline-none"
          >
            <option value="">Pilih Tipe Kategori</option>
            {kategoriOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          {errors.type && (
            <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
          )}
        </div>

        {/* Warna (input teks biasa) */}
        <div className="flex flex-col">
          <label htmlFor="color" className="font-bold text-gray-800">
            Warna (contoh: #FF6600)
          </label>
          <input
            type="text"
            id="color"
            placeholder="#FF6600"
            {...register("color")}
            className="w-full px-3 py-1 text-gray-600 border border-gray-600 rounded-lg focus:ring-1 focus:ring-gray-600 focus:outline-none"
          />
          {errors.color && (
            <p className="text-red-500 text-sm mt-1">{errors.color.message}</p>
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

export default EditKategori;
