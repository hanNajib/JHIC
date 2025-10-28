import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import MyEditor from "../../../components/ui/MyEditor";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Multiselect } from "../../../components/ui";
import { useCategories } from "../../../hooks/api/useCategory";
import { useCreateAnnouncement } from "../../../hooks/api/useAnnouncement";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";

const schema = yup.object().shape({
  title: yup.string().required("Judul Pengumuman wajib diisi"),
  content: yup.string().required("Deskripsi Pengumuman wajib diisi"),
  category_id: yup.string().required("Kategori wajib dipilih"),
  image: yup
    .mixed()
    .required("Gambar wajib diunggah")
    .test("fileSize", "Ukuran gambar maksimal 2MB", (value) => {
      if (!value) return false;
      return value.size <= 2 * 1024 * 1024;
    })
    .test(
      "fileType",
      "Format gambar tidak valid (hanya PNG, JPG, JPEG)",
      (value) => {
        if (!value) return false;
        return ["image/png", "image/jpeg", "image/jpg"].includes(value.type);
      }
    ),
});

const TambahPengumuman = () => {
  const navigate = useNavigate();
  const { data: categoryDataRaw = [] } = useCategories({
    type: "announcements",
    limit: 1000,
  });

  const categoryData = categoryDataRaw?.data || [];
  const categoryOptions = categoryData.map((category) => ({
    value: category.id,
    label: category.name,
    color: category.color,
  }));

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      category_id: "",
      content: "",
    },
  });

  const selectedCategory = watch("category_id");
  const konten = watch("content") || "";
  const [preview, setPreview] = useState(null);
  const [imageError, setImageError] = useState("");

  const createData = useCreateAnnouncement({
    onSuccess: () => {
      Swal.fire({
        title: "Berhasil!",
        text: "Pengumuman berhasil ditambahkan",
        icon: "success",
      }).then(() => {
        navigate(-1);
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Gagal!",
        text: error.response?.data?.message || "Terjadi kesalahan saat menambahkan pengumuman",
        icon: "error",
      });
    }
  });

  const onSubmit = async (data) => {
    // Validasi manual untuk image karena tidak menggunakan register
    const imageFile = watch("image");
    if (!imageFile) {
      setImageError("Gambar wajib diunggah");
      return;
    }

    // Clear error jika ada file
    setImageError("");

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category_id", data.category_id);
    formData.append("content", data.content);
    formData.append("image", imageFile);

    await createData.mutateAsync(formData);
    reset();
    setPreview(null);
    setValue("image", null);
  };

  const handleReset = () => {
    reset();
    setPreview(null);
    setValue("image", null);
    setImageError("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validasi ukuran file (maks 2MB)
      if (file.size > 2 * 1024 * 1024) {
        Swal.fire({
          title: "Error!",
          text: "Ukuran file maksimal 2MB",
          icon: "error",
        });
        return;
      }

      // Validasi tipe file
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        Swal.fire({
          title: "Error!",
          text: "Format file tidak valid. Hanya PNG, JPG, JPEG yang diperbolehkan",
          icon: "error",
        });
        return;
      }

      setPreview(URL.createObjectURL(file));
      setValue("image", file);
    }
  };

  return (
    <div className="flex flex-col justify-center gap-10 w-full h-fit bg-white rounded-lg p-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <a
          href="/pengumuman"
          className="bg-orange-500 cursor-pointer text-3xl lg:text-4xl text-center p-1 rounded-4xl text-white"
        >
          <IoIosArrowBack />
        </a>
        <h1 className="font-bold text-gray-900 text-2xl md:text-3xl lg:text-4xl">
          Tambah Pengumuman
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* Judul */}
        <div className="flex flex-col">
          <label htmlFor="title" className="font-bold text-gray-800">
            Judul <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            placeholder="Masukkan Judul Pengumuman"
            {...register("title")}
            className={`w-full px-3 py-2 text-gray-600 border rounded-lg focus:outline-none focus:ring-1 ${errors.title
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-orange-500"
              }`}
          />
          {errors.title && (
            <span className="text-red-500 text-sm mt-1">
              {errors.title.message}
            </span>
          )}
        </div>

        {/* Kategori */}
        <div className="flex flex-col">
          <Multiselect
            label="Kategori"
            required={true}
            options={categoryOptions}
            value={selectedCategory}
            onChange={(value) => setValue("category_id", value)}
            placeholder="Pilih kategori..."
            error={errors.category_id?.message}
            multiple={false}
          />
        </div>

        {/* Konten */}
        <div>
          <label className="block mb-1 font-semibold text-gray-800">
            Deskripsi
          </label>
          <MyEditor
            value={konten}
            onEditorChange={(value) => setValue("content", value)}
            initialValue={""}
          />
          {errors.content && (
            <span className="text-red-500 text-sm mt-1">
              {errors.content.message}
            </span>
          )}
        </div>

        {/* Gambar */}
        <div className="w-full">
          <label className="block font-semibold mb-2 text-gray-800">
            Gambar
          </label>
          <label
            htmlFor="upload"
            className="flex flex-col items-center justify-center w-full h-fit border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50"
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="max-h-64 object-contain rounded-lg"
              />
            ) : (
              <div className="py-10 flex flex-col items-center justify-center">
                <IoCloudUploadOutline className="text-6xl text-gray-600" />
                <p className="text-gray-600 font-medium">
                  Klik Untuk Pilih Gambar
                </p>
                <p className="text-xs text-gray-400">PNG, JPEG, JPG</p>
              </div>
            )}

            <input
              id="upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          {imageError && (
            <span className="text-red-500 text-sm mt-1">
              {imageError}
            </span>
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

export default TambahPengumuman;
