import { IoIosArrowBack } from "react-icons/io";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateExtarculicular } from "../../../hooks/api/useExtarculicular";
import Swal from "sweetalert2";
import MyEditor from "../../../components/ui/MyEditor";

const schema = yup.object().shape({
  name: yup.string().required("Nama wajib diisi"),
  mentor_name: yup.string().required("Pembimbing wajib diisi"),
  description: yup.string().required("Deskripsi wajib diisi"),
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

const TambahEkstra = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const createExtarculicular = useCreateExtarculicular({
    onSuccess: () => {
      Swal.fire({
        title: "Berhasil!",
        text: "Ekstrakurikuler berhasil ditambahkan",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate('/admin/ekstrakulikuler');
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Gagal!",
        text: error.response?.data?.message || "Terjadi kesalahan saat menambahkan ekstrakurikuler",
        icon: "error",
      });
    }
  });

  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      mentor_name: "",
      description: "",
      image: null,
    },
  });
  
  const watchedContent = watch("description");

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("mentor_name", data.mentor_name);
      formData.append("description", data.description);
      formData.append("image", data.image);

      await createExtarculicular.mutateAsync(formData);
      reset();
      setPreview(null);
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("image", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleReset = () => {
    reset();
    setPreview(null);
  }
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
          Tambah Ekstrakurikuler
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col">
          <label htmlFor="name" className="font-bold text-gray-800">
            Nama
          </label>
          <input
            type="text"
            id="name"
            placeholder="Masukkan Nama Ekstrakurikuler"
            {...register("name")}
            className="w-full px-3 py-1 text-gray-600 border border-gray-600 rounded-lg focus:ring-1 focus:ring-gray-600"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="mentor_name" className="font-bold text-gray-800">
            Pembimbing
          </label>
          <input
            type="text"
            id="mentor_name"
            placeholder="Masukkan Nama Pembimbing"
            {...register("mentor_name")}
            className="w-full px-3 py-1 text-gray-600 border border-gray-600 rounded-lg focus:ring-1 focus:ring-gray-600"
          />
          {errors.mentor_name && (
            <span className="text-red-500 text-sm">
              {errors.mentor_name.message}
            </span>
          )}
        </div>

        {/* Deskripsi */}
        <div className="flex flex-col">
          <label htmlFor="description" className="font-bold text-gray-800">
            Deskripsi Singkat
          </label>
          <MyEditor
            value={watchedContent}
            onEditorChange={(newContent) => setValue("description", newContent)}
            initialValue={""}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Upload Gambar */}
        <div className="w-full">
          <label className="block font-semibold mb-2 text-gray-800">
            Masukkan Gambar
          </label>

          <label
            htmlFor="upload"
            className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50"
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="h-52 object-contain rounded-lg"
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

          {errors.image && (
            <span className="text-red-500 text-sm">{errors.image.message}</span>
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

export default TambahEkstra;
