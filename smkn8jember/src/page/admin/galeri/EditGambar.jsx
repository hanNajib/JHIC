import { IoIosArrowBack } from "react-icons/io";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useGallery, useUpdateGallery } from "../../../hooks/api/useGallery";
import { useCategories, useCategory } from "../../../hooks/api/useCategory"; // ✅ ambil hook kategori

const schema = yup.object().shape({
  title: yup.string().required("Judul wajib diisi"),
  description: yup.string().nullable().notRequired(),
  category: yup.string().required("Kategori wajib dipilih"),
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
      "Format gambar tidak valid (harus PNG, JPG, atau JPEG)",
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
  const updateGallery = useUpdateGallery(id);

  const [preview, setPreview] = useState(null);
   const { data: categoryDataRaw = [] } = useCategories();
    const categoryData = categoryDataRaw.filter(
      (item) => item.type === "gallery"
    );
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
      category: "",
      image: null,
    },
  });

  useEffect(() => {
    if (currentGallery) {
      reset({
        title: currentGallery.title || "",
        description: currentGallery.description || "",
        category: currentGallery.category || "",
        image: null,
      });
      setPreview(currentGallery.image);
    }
  }, [currentGallery, reset]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue("image", file);
    }
  };

  const onSubmit = async (data) => {
    console.log("🟠 SUBMIT TERPANGGIL:", data);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      if (data.image) formData.append("image", data.image);

      await updateGallery.mutateAsync(formData);
      navigate(-1);
    } catch (error) {
      console.error("Gagal update gallery:", error);
    }
  };

  if (isLoading ) {
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

        {/* Kategori */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-800">Kategori</label>
          <div className="flex flex-col gap-2">
            {categoryData?.map((item) => (
              <label
                key={item.id}
                className="flex items-center gap-2 text-sm font-medium text-gray-600"
              >
                <input
                  type="radio"
                  value={item.name}
                  checked={watch("category") === item.name}
                  onChange={() => setValue("category", item.name)}
                  className="accent-orange-500"
                />
                {item.name}
              </label>
            ))}
          </div>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Deskripsi */}
        <div>
          <label className="block mb-1 font-semibold text-gray-800">
            Deskripsi
          </label>
          <Editor
            apiKey="z1lkqlsk4vjd7irjkvmackpeb4dq8dz0hisyrfb09w6x7c2c"
            value={watch("description")}
            onEditorChange={(newContent) => setValue("description", newContent)}
            init={{
              height: 300,
              menubar: false,
              plugins: "lists link image table code",
              toolbar:
                "undo redo | bold italic underline | bullist numlist | link table | removeformat | code",
              placeholder: "Masukkan Deskripsi Gambar",
            }}
          />
        </div>

        {/* Upload Gambar */}
        <div className="w-full">
          <label className="block font-semibold mb-2 text-gray-800">
            Masukkan Gambar
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
                <p className="text-gray-600 font-medium">
                  Klik untuk pilih gambar
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
        </div>

        {/* Tombol */}
        <div className="flex gap-3 justify-end">
          <button
            type="submit"
            className="bg-orange-500 text-white font-semibold py-1 text-sm md:text-base w-24 rounded-4xl hover:bg-orange-600"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="py-1 w-24 text-orange-500 text-sm md:text-base font-bold border-[1.9px] border-orange-500 rounded-4xl hover:bg-orange-500 hover:text-white transition duration-300"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditGambar;
