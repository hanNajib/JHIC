import { IoIosArrowBack } from "react-icons/io";
import { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { Multiselect } from "../../../components/ui";
import { useCategories } from "../../../hooks/api/useCategory";
import { useAnnouncement, useUpdateAnnouncement } from "../../../hooks/api/useAnnouncement";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";

const schema = yup.object().shape({
  title: yup.string().required("Judul Pengumuman wajib diisi"),
  content: yup.string().required("Deskripsi Pengumuman wajib diisi"),
  category_id: yup.string().required("Kategori wajib dipilih"),
});

const EditPengumuman = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: categoryDataRaw = [] } = useCategories({
    type: "announcements",
    limit: 1000,
  });

  const categoryData = categoryDataRaw?.data || [];
  const categoryOptions = categoryData.map((category) => ({
    value: category.id?.toString(),
    label: category.name,
    color: category.color,
  }));

  const { data: announcement, isLoading, isError, error } = useAnnouncement(id);

  const [preview, setPreview] = useState(null);
  const [imageError, setImageError] = useState("");

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

  useEffect(() => {
    if (announcement && categoryData.length > 0) {
      const announcementData = announcement?.data || announcement;
      setValue("title", announcementData.title || "");
      setValue("category_id", announcementData.category_id?.toString() || "");
      setValue("content", announcementData.content || "");
      setPreview(announcementData.image || null);
      setValue("image", null); 
    }
  }, [announcement, categoryData, setValue]);

  const updateData = useUpdateAnnouncement(id, {
    onSuccess: () => {
      Swal.fire({
        title: "Berhasil!",
        text: "Pengumuman berhasil diperbarui",
        icon: "success",
      }).then(() => {
        navigate("/admin/pengumuman");
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Gagal!",
        text: error.response?.data?.message || "Terjadi kesalahan saat memperbarui pengumuman",
        icon: "error",
      });
    }
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category_id", data.category_id);
    formData.append("content", data.content);

  
    const imageFile = watch("image");
    if (imageFile) {
      formData.append("image", imageFile);
    }

    await updateData.mutateAsync(formData);
  };

  const handleReset = () => {
    if (announcement) {
      const announcementData = announcement?.data || announcement;
      setValue("title", announcementData.title || "");
      setValue("category_id", announcementData.category_id?.toString() || "");
      setValue("content", announcementData.content || "");
      setPreview(announcementData.image || null);
      setValue("image", null);
      setImageError("");
    }
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
      setImageError("");
    }
  };

  return (
  <div className="flex flex-col justify-center gap-10 w-full h-fit bg-white rounded-lg p-5">
    {/* Title */}
    <div className="flex items-center gap-3">
      <a
        onClick={() => navigate(-1)}
        className="bg-orange-500 text-3xl lg:text-4xl text-center p-1 rounded-4xl text-white"
      >
        <IoIosArrowBack />
      </a>
      <h1 className="font-bold text-gray-900 text-2xl md:text-3xl lg:text-4xl">Edit Pengumuman</h1>
    </div>

    {isLoading && (
      <div className="flex justify-center items-center py-8">
        <div className="text-lg text-gray-500">Loading...</div>
      </div>
    )}

    {isError && (
      <div className="text-red-500 text-center py-8">
        Error loading data: {error?.message}
      </div>
    )}

    {!announcement && !isLoading && !isError && (
      <div className="text-center py-8 text-gray-500">
        Pengumuman tidak ditemukan
      </div>
    )}

    {(announcement?.data || (announcement && !announcement.data)) && (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* Judul */}
        <div className="flex flex-col">
          <label htmlFor="title" className="font-bold text-gray-800">
            Judul <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("title")}
            placeholder="Masukkan Judul Pengumuman"
            className={`w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <span className="text-red-500 text-sm mt-1">{errors.title.message}</span>
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
        <div className="flex flex-col">
          <label htmlFor="content" className="font-bold text-gray-800">
            Konten <span className="text-red-500">*</span>
          </label>
          <Editor
            apiKey="z1lkqlsk4vjd7irjkvmackpeb4dq8dz0hisyrfb09w6x7c2c"
            value={konten}
            onEditorChange={(content) => setValue("content", content)}
            init={{
              height: 300,
              menubar: false,
              plugins: "lists link image table code",
              toolbar: "undo redo | bold italic | bullist numlist | link image",
              placeholder: "Masukkan konten pengumuman...",
            }}
          />
          {errors.content && (
            <span className="text-red-500 text-sm mt-1">{errors.content.message}</span>
          )}
        </div>

        {/* Upload Gambar */}
        <div className="flex flex-col">
          <label htmlFor="image" className="font-bold text-gray-800">
            Gambar (opsional)
          </label>
          <label
            htmlFor="image"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="max-h-full max-w-full object-contain rounded-lg"
              />
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> atau drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF (MAX. 2MB)</p>
              </div>
            )}
            <input
              id="image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          {imageError && (
            <span className="text-red-500 text-sm mt-1">{imageError}</span>
          )}
        </div>

        {/* Tombol */}
        <div className="flex gap-3 justify-end">
          <button
            type="submit"
            disabled={isSubmitting || updateData.isPending}
            className="bg-orange-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {(isSubmitting || updateData.isPending) ? "Menyimpan..." : "Simpan"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="py-2 px-6 text-orange-500 font-semibold border border-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition duration-300"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
    )}
  </div>
  );
};

export default EditPengumuman;
