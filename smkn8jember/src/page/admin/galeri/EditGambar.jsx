import { IoIosArrowBack } from "react-icons/io";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useGallery, useUpdateGallery } from "../../../hooks/api/useGallery";
import { useCategories } from "../../../hooks/api/useCategory";
import Swal from "sweetalert2";
import { Multiselect } from "../../../components/ui";

const schema = yup.object().shape({
  title: yup.string().required("Judul wajib diisi"),
  description: yup.string().required("Deskripsi wajib diisi"),
  category: yup
    .array()
    .min(1, "Pilih minimal 1 kategori")
    .required("Kategori wajib dipilih"),
  image: yup
    .mixed()
    .nullable()
    .notRequired()
    .test("fileSize", "Ukuran gambar maksimal 2MB", (value) => {
      if (!value) return true;
      return value.size <= 2 * 1024 * 1024;
    })
    .test(
      "fileType",
      "Format gambar tidak valid (hanya PNG, JPG, JPEG)",
      (value) => {
        if (!value) return true;
        return ["image/png", "image/jpeg", "image/jpg"].includes(value.type);
      }
    ),
});

const EditGambar = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: currentGallery, isLoading } = useGallery(id);
  const updateGallery = useUpdateGallery(id, {
    onSuccess: () => {
      Swal.fire({
        title: "Berhasil!",
        text: "Gambar berhasil diperbarui",
        icon: "success",
      }).then(() => {
        navigate(-1);
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Gagal!",
        text: error.response?.data?.message || "Terjadi kesalahan saat memperbarui gambar",
        icon: "error",
      });
    }
  });

  const [preview, setPreview] = useState(null);

  const { data: categoryDataRaw = [] } = useCategories();
  const categoryOptions = categoryDataRaw
    .filter((item) => item.type === "gallery")
    .map((category) => ({
      value: category.id,
      label: category.name,
      color: category.color,
    }));
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      category: [],
      image: null,
    },
  });

  const selectedCategories = watch("category");

  useEffect(() => {
  if (!currentGallery) return;
  if (categoryOptions.length === 0) return;

  const categoryIds = currentGallery.categories?.map(cat => cat.id) || [];

  reset({
    title: currentGallery.title || "",
    description: currentGallery.description || "",
    category: categoryIds,
    image: null,
  });

  setPreview(currentGallery.image);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [currentGallery?.id, categoryOptions.length]);


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue("image", file);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);

    data.category.forEach((categoryId) => {
      formData.append("category[]", categoryId);
    });

    if (data.image) {
      formData.append("image", data.image);
    }

    await updateGallery.mutateAsync(formData);
  };

  const handleReset = () => {
    if (currentGallery) {
      const categoryIds = currentGallery.categories?.map(cat => cat.id) || [];

      reset({
        title: currentGallery.title || "",
        description: currentGallery.description || "",
        category: categoryIds,
        image: null,
      });

      // Explicitly set the category value to ensure it's recognized
      setValue("category", categoryIds);
      setPreview(currentGallery.image);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center text-gray-500 py-10">
        Memuat data gallery...
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center gap-10 w-full h-fit bg-white rounded-lg p-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="bg-orange-500 text-3xl lg:text-4xl text-center p-1 rounded-4xl text-white"
        >
          <IoIosArrowBack />
        </button>
        <h1 className="font-bold text-gray-900 text-2xl md:text-3xl lg:text-4xl">
          Edit Gambar
        </h1>
      </div>

      {/* Form */}
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        {/* Judul */}
        <div className="flex flex-col">
          <label htmlFor="title" className="font-bold text-gray-800">
            Judul
          </label>
          <input
            {...register("title")}
            type="text"
            id="title"
            placeholder="Masukkan Judul Gambar"
            className="w-full px-3 py-1 text-gray-600 border border-gray-600 rounded-lg focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Kategori - Multiselect */}
        <Multiselect
          label="Kategori"
          required={true}
          options={categoryOptions}
          value={selectedCategories || []}
          onChange={(values) => setValue("category", values)}
          placeholder="Pilih kategori..."
          error={errors.category?.message}
          multiple={true}
        />

        {/* Deskripsi */}
        <div className="flex flex-col">
          <label htmlFor="description" className="font-bold text-gray-800">
            Deskripsi <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            {...register("description")}
            placeholder="Masukkan deskripsi gambar..."
            rows={6}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors resize-vertical ${errors.description
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-orange-200 focus:border-orange-500"
              }`}
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
            Gambar
          </label>

          <label
            htmlFor="upload"
            className={`flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg cursor-pointer transition-colors ${preview
                ? "border-orange-300 bg-orange-50"
                : "border-gray-300 bg-white hover:bg-gray-50"
              } ${errors.image ? "border-red-500" : ""}`}
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="max-h-64 max-w-full object-contain rounded-lg m-4"
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-10">
                <IoCloudUploadOutline className="text-4xl text-gray-400 mb-2" />
                <p className="text-gray-600 font-medium">
                  Klik untuk pilih gambar
                </p>
                <p className="text-xs text-gray-400">PNG, JPEG, JPG (Max 2MB)</p>
              </div>
            )}
          </label>

          <input
            id="upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {errors.image && (
            <span className="text-red-500 text-sm mt-1">
              {errors.image.message}
            </span>
          )}
        </div>

        {/* Tombol */}
        <div className="flex gap-3 justify-end">
          <button
            type="submit"
            disabled={updateGallery.isPending}
            className={`bg-orange-500 text-white font-semibold py-2 px-6 text-sm md:text-base rounded-lg hover:bg-orange-600 transition-colors ${updateGallery.isPending ? 'opacity-50 cursor-not-allowed' : ''
              }`}
          >
            {updateGallery.isPending ? 'Menyimpan...' : 'Simpan'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            disabled={updateGallery.isPending}
            className="py-2 px-6 text-orange-500 text-sm md:text-base font-bold border-2 border-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition duration-300"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditGambar;
