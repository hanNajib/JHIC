import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCreateCategory } from "../../../hooks/api/useCategory";
import Swal from "sweetalert2";

const schema = yup.object().shape({
  name: yup.string().required("Nama kategori wajib diisi"),
  type: yup.string().required("Tipe kategori wajib dipilih"),
  color: yup.string().required("Warna kategori wajib diisi"),
});

const TambahKategori = () => {
  const navigate = useNavigate();
  const createCategory = useCreateCategory({
    onSuccess: () => {
      Swal.fire({
        title: "Berhasil!",
        text: "Kategori berhasil ditambahkan",
        icon: "success",
      }).then(() => {
        navigate(-1);
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Gagal!",
        text: error.response?.data?.message || "Terjadi kesalahan saat menambahkan Kategori",
        icon: "error",
      });
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      type: "",
      color: "",
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("type", data.type);
    formData.append("color", data.color);

    await createCategory.mutateAsync(formData);
    reset();
  };

  const handleReset = () => {
    reset();
  };

  const kategoriOptions = [
    { value: "article", label: "Artikel" },
    { value: "announcement", label: "Pengumuman" },
    { value: "gallery", label: "Galeri" },
    { value: "major", label: "Jurusan" },
  ];

  return (
    <div className="flex flex-col justify-center gap-10 w-full h-fit bg-white rounded-lg p-5">
      <div className="flex items-center gap-3">
        <a
          onClick={() => navigate(-1)}
          className="bg-orange-500 cursor-pointer text-3xl lg:text-4xl text-center p-1 rounded-4xl text-white"
        >
          <IoIosArrowBack />
        </a>
        <h1 className="font-bold text-gray-900 text-2xl md:text-3xl lg:text-4xl">
          Tambah Kategori
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
        <div className="flex gap-3 justify-end mt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-orange-500 text-white font-semibold py-1 text-base w-24 rounded-4xl hover:bg-orange-600 disabled:opacity-50"
          >
            {isSubmitting ? "Menyimpan..." : "Save"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="py-1 w-24 text-orange-500 text-base font-bold border-[1.9px] border-orange-500 rounded-4xl hover:bg-orange-500 hover:text-white transition duration-300"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default TambahKategori;
