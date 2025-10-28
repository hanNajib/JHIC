import { IoIosArrowBack } from "react-icons/io";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MyEditor from "../../../components/ui/MyEditor";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCategories } from "../../../hooks/api/useCategory";
import { useCreateArticle } from "../../../hooks/api/useArticle";
import Swal from "sweetalert2";
import { Multiselect } from "../../../components/ui";

const schema = yup.object().shape({
  title: yup.string().required("Judul wajib diisi"),
  content: yup.string().required("Konten wajib diisi"),
  categories: yup
    .array()
    .min(1, "Pilih minimal 1 kategori")
    .required("Kategori wajib dipilih"),
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

const TambahArtikel = () => {
  const navigate = useNavigate();

  const { data: categoryDataRaw } = useCategories({ type: ["article", "major"], limit: 1000 });
  const categoryData = categoryDataRaw?.data || [];
  const categoryOptions = categoryData
    .map((category) => ({
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
      content: "",
      categories: [],
      image: null,
    },
  });

  const [preview, setPreview] = useState(null);
  const selectedCategories = watch("categories");
  const contentValue = watch("content");

  const createArticle = useCreateArticle({
    onSuccess: () => {
      Swal.fire({
        title: "Berhasil!",
        text: "Artikel berhasil ditambahkan",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate('/admin/artikel');
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Gagal!",
        text: error.response?.data?.message || "Terjadi kesalahan saat menambahkan artikel",
        icon: "error",
      });
    }
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setValue("image", file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);

    data.categories.forEach((categoryId) => {
      formData.append("categories[]", categoryId);
    });

    formData.append("image", data.image);

    await createArticle.mutateAsync(formData);
    reset();
    setPreview(null);
  };

  const onDraft = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("draft", "1");

    data.categories.forEach((categoryId) => {
      formData.append("categories[]", categoryId);
    });

    formData.append("image", data.image);

    await createArticle.mutateAsync(formData);
    reset();
    setPreview(null);
  };

  const handleReset = () => {
    reset();
    setPreview(null);
  };

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
          Tambah Artikel
        </h1>
      </div>

      <form className="flex flex-col gap-6">
        {/* Judul */}
        <div className="flex flex-col">
          <label htmlFor="title" className="font-bold text-gray-800">
            Judul <span className="text-red-500">*</span>
          </label>
          <input
            {...register("title")}
            type="text"
            id="title"
            placeholder="Masukkan Judul Artikel"
            className={`w-full px-3 py-2 text-gray-600 border rounded-lg focus:outline-none focus:ring-1 ${
              errors.title
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-orange-500 focus:ring-orange-500"
            }`}
          />
          {errors.title && (
            <span className="text-red-500 text-sm mt-1">{errors.title.message}</span>
          )}
        </div>

        {/* Kategori */}
        <div className="flex flex-col">
          <label className="font-bold text-gray-800 mb-2">
            Kategori <span className="text-red-500">*</span>
          </label>
          <Multiselect
            options={categoryOptions}
            value={selectedCategories}
            onChange={(value) => setValue("categories", value)}
            placeholder="Pilih kategori artikel"
            isSearchable
          />
          {errors.categories && (
            <span className="text-red-500 text-sm mt-1">{errors.categories.message}</span>
          )}
        </div>

        {/* Konten */}
        <div className="flex flex-col">
          <label className="font-bold text-gray-800 mb-2">
            Konten <span className="text-red-500">*</span>
          </label>
          <MyEditor
            value={contentValue}
            onEditorChange={(content) => setValue("content", content)}
            initialValue={""}
          />
          {errors.content && (
            <span className="text-red-500 text-sm mt-1">{errors.content.message}</span>
          )}
        </div>

        {/* Gambar */}
        <div className="w-full">
          <label className="block font-bold mb-2 text-gray-800">
            Gambar <span className="text-red-500">*</span>
          </label>
          <label
            htmlFor="upload"
            className="flex flex-col items-center justify-center w-full h-fit border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50"
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="h-64 object-contain rounded-lg"
              />
            ) : (
              <div className="py-10 flex flex-col items-center justify-center">
                <IoCloudUploadOutline className="text-6xl text-gray-400" />
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
          {errors.image && (
            <span className="text-red-500 text-sm mt-1">{errors.image.message}</span>
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
            className="bg-gray-500 text-white font-semibold py-2 px-6 text-base rounded-lg hover:bg-gray-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
            onClick={handleSubmit(onDraft)}
          >
            {isSubmitting ? "Menyimpan..." : "Simpan Draft"}
          </button>
          <button
            type="submit"
            className="bg-orange-500 text-white font-semibold py-2 px-6 text-base rounded-lg hover:bg-orange-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
          >
            {isSubmitting ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TambahArtikel;
