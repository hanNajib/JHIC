import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCreateMajor } from "../../../hooks/api/useMajor";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  name: yup.string().required("Nama jurusan wajib diisi"),
  description: yup.string().required("Deskripsi jurusan wajib diisi"),
  image: yup
    .mixed()
    .required("Gambar jurusan wajib diisi")
    .test("fileSize", "Ukuran gambar maksimal 2MB", (value) => {
      if (!value) return false;
      return value.size <= 2 * 1024 * 1024;
    })
    .test("fileType", "Format gambar tidak valid (harus PNG, JPG, atau JPEG)", (value) => {
      if (!value) return false;
      return ["image/png", "image/jpeg", "image/jpg"].includes(value.type);
    }),
});

const TambahJurusan = () => {
  const navigate = useNavigate();
  const createMajor = useCreateMajor({
    onSuccess: () => navigate(-1),
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
      description: "",
      image: null,
    },
  });

  const [preview, setPreview] = useState(null);

  // ambil value description dari TinyMCE
  const descriptionValue = watch("description");

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
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("image", data.image);

    await createMajor.mutateAsync(formData);
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
          Tambah Data Jurusan
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Nama */}
        <div className="flex flex-col">
          <label htmlFor="name" className="font-bold text-gray-800">
            Nama Jurusan <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            placeholder="Masukkan Nama Jurusan"
            className={`w-full px-3 py-2 text-gray-600 border rounded-lg focus:outline-none focus:ring-1 ${
              errors.name
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-orange-500 focus:ring-orange-500"
            }`}
          />
          {errors.name && (
            <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>
          )}
        </div>

        {/* Deskripsi */}
        <div className="flex flex-col">
          <label htmlFor="description" className="font-bold text-gray-800">
            Deskripsi Jurusan <span className="text-red-500">*</span>
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
                "undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist",
              content_style:
                "body { font-family:Inter,Arial,sans-serif; font-size:14px; color:#4B5563; }",
            }}
          />
          {errors.description && (
            <span className="text-red-500 text-sm mt-1">{errors.description.message}</span>
          )}
        </div>

        {/* Upload Gambar */}
        <div className="flex flex-col">
          <label htmlFor="upload" className="font-bold text-gray-800">
            Gambar Jurusan <span className="text-red-500">*</span>
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
                <IoCloudUploadOutline className="text-6xl text-gray-400 mb-2" />
                <p className="text-gray-600 font-medium mb-1">
                  Klik untuk pilih gambar
                </p>
                <p className="text-xs text-gray-400">
                  Format: PNG, JPEG, JPG (Max: 2MB)
                </p>
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
            <span className="text-red-500 text-sm mt-1">{errors.image.message}</span>
          )}
        </div>

        {/* Tombol Aksi */}
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

export default TambahJurusan;
