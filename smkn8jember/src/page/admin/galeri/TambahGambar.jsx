import { IoIosArrowBack } from "react-icons/io";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCategories } from "../../../hooks/api/useCategory";
import { useCreateGallery } from "../../../hooks/api/useGallery"; // ← pastikan ada hook ini

// ✅ Validasi input
const schema = yup.object().shape({
  title: yup.string().required("Judul wajib diisi"),
  description: yup.string().required("Deskripsi wajib diisi"),
  category: yup.string().required("Kategori wajib dipilih"),
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

const TambahGambar = () => {
  const navigate = useNavigate();

  const { data: categoryDataRaw = [] } = useCategories();
  const categoryData = categoryDataRaw.filter(
    (item) => item.type === "gallery"
  );

  // Hook form
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
      description: "",
      category: "",
      image: null,
    },
  });

  const [preview, setPreview] = useState(null);
  const descriptionValue = watch("description");

  const createGallery = useCreateGallery({
    onSuccess: () => navigate(-1),
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setValue("image", file);
    if (file) setPreview(URL.createObjectURL(file));
    else setPreview(null);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("image", data.image);

    await createGallery.mutateAsync(formData);
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
          Tambah Gambar
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col">
          <label htmlFor="title" className="font-bold text-gray-800">
            Judul <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            placeholder="Masukkan Judul Gambar"
            {...register("title")}
            className={`w-full px-3 py-2 text-gray-600 border rounded-lg focus:outline-none focus:ring-1 ${
              errors.title
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
          <label className="font-bold text-gray-800">
            Kategori <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-col gap-2">
            {categoryData.map((item) => (
              <label
                key={item.id}
                className="flex items-center gap-2 text-sm font-medium text-gray-600"
              >
                <input
                  type="radio"
                  value={item.name}
                  {...register("category")}
                  className="accent-orange-500"
                />
                {item.name}
              </label>
            ))}
          </div>
          {errors.category && (
            <span className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </span>
          )}
        </div>

        {/* Deskripsi */}
        <div className="flex flex-col">
          <label className="font-bold text-gray-800">
            Deskripsi <span className="text-red-500">*</span>
          </label>
          <Editor
            apiKey="z1lkqlsk4vjd7irjkvmackpeb4dq8dz0hisyrfb09w6x7c2c"
            value={descriptionValue}
            onEditorChange={(content) => setValue("description", content)}
            init={{
              height: 300,
              menubar: false,
              plugins: "lists link table code",
              toolbar:
                "undo redo | bold italic underline | bullist numlist | link table | removeformat | code",
              placeholder: "Masukkan Deskripsi Gambar",
            }}
          />
          {errors.description && (
            <span className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </span>
          )}
        </div>

        {/* Upload Gambar */}
        <div className="flex flex-col">
          <label htmlFor="upload" className="font-bold text-gray-800">
            Gambar <span className="text-red-500">*</span>
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
                  Klik untuk pilih gambar
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
            <span className="text-red-500 text-sm mt-1">
              {errors.image.message}
            </span>
          )}
        </div>

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

export default TambahGambar;
