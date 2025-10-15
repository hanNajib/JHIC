import { IoIosArrowBack } from "react-icons/io";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCategories } from "../../../hooks/api/useCategory";
import { useArticle, useUpdateArticle } from "../../../hooks/api/useArticle";
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
    .nullable()
    .test("fileSize", "Ukuran gambar maksimal 2MB", (value) => {
      if (!value) return true; // Allow null for edit
      return value.size <= 2 * 1024 * 1024;
    })
    .test(
      "fileType",
      "Format gambar tidak valid (hanya PNG, JPG, JPEG)",
      (value) => {
        if (!value) return true; // Allow null for edit
        return ["image/png", "image/jpeg", "image/jpg"].includes(value.type);
      }
    ),
});

const EditArtikel = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  
  const { data: categoryDataRaw } = useCategories({ type: ["article", "major"], limit: 1000 });
  const categoryData = categoryDataRaw?.data || [];
  const categoryOptions = categoryData.map((category) => ({
    value: category.id,
    label: category.name,
    color: category.color,
  }));

  const { data: currentArticle, isLoading, error } = useArticle(slug);
  

  const updateArticle = useUpdateArticle(currentArticle?.id, {
    onSuccess: () => {
      Swal.fire({
        title: "Berhasil!",
        text: "Artikel berhasil diperbarui",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate('/admin/artikel');
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Gagal!",
        text: error.response?.data?.message || "Terjadi kesalahan saat memperbarui artikel",
        icon: "error",
      });
    }
  });

  const [preview, setPreview] = useState(null);

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
      title: "",
      content: "",
      categories: [],
      image: null,
    },
  });

  // Watch untuk memantau content editor
  const watchedContent = watch("content");
  const watchedCategories = watch("categories");

  useEffect(() => {
    if (currentArticle) {
      
      setValue("title", currentArticle.title || "");
      setValue("content", currentArticle.content || "");
      
      // Handle categories - make sure to get the IDs correctly
      const categories = currentArticle.categories || [];
      let categoryIds = [];
      
      if (Array.isArray(categories)) {
        categoryIds = categories.map(cat => {
          return typeof cat === 'object' && cat.id ? cat.id : cat;
        });
      }
      
      setValue("categories", categoryIds);
      
      const imageUrl = currentArticle.image_url || currentArticle.image;
      setPreview(imageUrl || null);
    }
  }, [currentArticle, setValue]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      
      // Handle categories
      if (data.categories && data.categories.length > 0) {
        data.categories.forEach((categoryId) => {
          formData.append("category_ids[]", categoryId);
        });
      }
      
      // Handle image - only append if a new image is selected
      if (data.image && data.image instanceof File) {
        formData.append("image", data.image);
      }

      await updateArticle.mutateAsync(formData);
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const onDraft = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("draft", true);
      
      // Handle categories
      if (data.categories && data.categories.length > 0) {
        data.categories.forEach((categoryId) => {
          formData.append("category_ids[]", categoryId);
        });
      }
      
      // Handle image - only append if a new image is selected
      if (data.image && data.image instanceof File) {
        formData.append("image", data.image);
      }

      await updateArticle.mutateAsync(formData);
    } catch (error) {
      console.error("Draft error:", error);
    }
  };

  const handleReset = () => {
    if (currentArticle) {
      setValue("title", currentArticle.title || "");
      setValue("content", currentArticle.content || "");
      
      // Handle categories reset - same logic as useEffect
      const categories = currentArticle.categories || [];
      let categoryIds = [];
      
      if (Array.isArray(categories)) {
        categoryIds = categories.map(cat => {
          return typeof cat === 'object' && cat.id ? cat.id : cat;
        });
      }
      
      setValue("categories", categoryIds);
      setValue("image", null);
      
      // Reset preview to original image
      const imageUrl = currentArticle.image_url || currentArticle.image;
      setPreview(imageUrl || null);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("image", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  if (isLoading) {
    return (
      <div className="text-center text-gray-500 py-10">
        Memuat data artikel...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-lg p-5">
        <div className="text-center text-red-500">
          <h3 className="text-lg font-semibold mb-2">Error Loading Data</h3>
          <p>{error?.message || "Gagal memuat data artikel"}</p>
        </div>
      </div>
    );
  }

  if (!currentArticle && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-lg p-5">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Data Tidak Ditemukan</h3>
          <p className="text-gray-600">Artikel dengan ID tersebut tidak ditemukan.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center gap-10 w-full h-fit bg-white rounded-lg p-5">
      {/* Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="bg-orange-500 cursor-pointer text-3xl lg:text-4xl text-center p-2 rounded-lg text-white hover:bg-orange-600 transition-colors"
        >
          <IoIosArrowBack />
        </button>
        <h1 className="font-bold text-gray-900 text-2xl md:text-3xl lg:text-4xl">
          Edit Artikel
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* Judul */}
        <div className="flex flex-col">
          <label htmlFor="title" className="font-bold text-gray-800">
            Judul
          </label>
          <input
            type="text"
            id="title"
            placeholder="Masukkan Judul Artikel"
            {...register("title")}
            className="w-full px-3 py-1 font-medium text-gray-600 border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Input Kategori */}
        <div className="flex flex-col">
          <label className="font-bold text-gray-800">
            Kategori
          </label>
          <Multiselect
            options={categoryOptions}
            value={watchedCategories || []}
            onChange={(selected) => {
              setValue("categories", selected);
            }}
            placeholder="Pilih Kategori"
            className="w-full"
          />
          {errors.categories && (
            <p className="text-red-500 text-sm mt-1">{errors.categories.message}</p>
          )}
         
        </div>

        {/* Konten */}
        <div>
          <label className="block mb-1 font-bold text-gray-800">
            Konten
          </label>
          <Editor
            apiKey="z1lkqlsk4vjd7irjkvmackpeb4dq8dz0hisyrfb09w6x7c2c"
            value={watchedContent}
            onEditorChange={(newContent) => setValue("content", newContent)}
            init={{
              height: 300,
              menubar: false,
              plugins: "lists link image table code",
              toolbar:
                "undo redo | bold italic underline | fontsizeselect forecolor backcolor | " +
                "alignleft aligncenter alignright justify | bullist numlist | link table | removeformat | code",
              placeholder: "Masukkan Konten Artikel",
            }}
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
          )}
        </div>

        {/* Upload Gambar */}
        <div className="w-full">
          <label className="block font-bold mb-2 text-gray-800">
            Gambar {currentArticle && "(Opsional - biarkan kosong jika tidak ingin mengubah)"}
          </label>
          <label
            htmlFor="upload"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50"
          >
            {preview ? (
              <div className="relative w-full h-full">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-contain rounded-lg"
                />
                <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                  {currentArticle?.image_url && preview === currentArticle.image_url ? 'Gambar Saat Ini' : 'Gambar Baru'}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <IoCloudUploadOutline className="w-10 h-10 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Klik untuk upload</span> atau drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 2MB)</p>
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
            type="button"
            onClick={handleSubmit(onDraft)}
            className="bg-gray-500 text-white font-semibold py-2 px-6 text-base rounded-lg hover:bg-gray-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Menyimpan..." : "Simpan Draft"}
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

export default EditArtikel;
