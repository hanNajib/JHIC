import { IoIosArrowBack } from "react-icons/io";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import {
  useExtarculicular,
  useUpdateExtarculicular,
} from "../../../hooks/api/useExtarculicular";

const schema = yup.object().shape({
  name: yup.string().required("Nama wajib diisi"),
  mentor_name: yup.string().required("Pembimbing wajib diisi"),
  description: yup.string().required("Deskripsi wajib diisi"),
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

const EditEkstra = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [preview, setPreview] = useState(null);

  const { data: currentEkstra, isLoading, error } = useExtarculicular(id);
  
  // Debug logging
  console.log("Ekstra ID:", id);
  console.log("Current Ekstra:", currentEkstra);
  console.log("Loading:", isLoading);
  console.log("Error:", error);
  
  const updateExtraculicular = useUpdateExtarculicular(id, {
    onSuccess: () => {
      Swal.fire({
        title: "Berhasil!",
        text: "Ekstrakurikuler berhasil diperbarui",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate('/admin/ekstrakulikuler');
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Gagal!",
        text: error.response?.data?.message || "Terjadi kesalahan saat memperbarui ekstrakurikuler",
        icon: "error",
      });
    }
  });


  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      mentor_name: "",
      description: "",
      image: null,
    },
  });

  useEffect(() => {
    if (currentEkstra) {
      console.log("Setting form values:", currentEkstra); // Debug log
      setValue("name", currentEkstra.name || "");
      setValue("mentor_name", currentEkstra.mentor_name || "");
      setValue("description", currentEkstra.description || "");
      
      // Set preview image
      setPreview(currentEkstra.image_url || currentEkstra.image || null);
    }
  }, [currentEkstra, setValue]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue("image", file);
      
    }
  };
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("mentor_name", data.mentor_name);
      formData.append("description", data.description);
      
      // Handle image - only append if a new image is selected
      if (data.image && data.image instanceof File) {
        formData.append("image", data.image);
      }

      await updateExtraculicular.mutateAsync(formData);
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const handleReset = () => {
    if (currentEkstra) {
      setValue("name", currentEkstra.name || "");
      setValue("mentor_name", currentEkstra.mentor_name || "");
      setValue("description", currentEkstra.description || "");
      setValue("image", null);
      setPreview(currentEkstra.image_url || currentEkstra.image || null);
    }
  };


  if (isLoading) {
    return (
      <div className="text-center text-gray-500 py-10">
        Memuat data ekstrakurikuler...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-lg p-5">
        <div className="text-center text-red-500">
          <h3 className="text-lg font-semibold mb-2">Error Loading Data</h3>
          <p>{error?.message || "Gagal memuat data ekstrakurikuler"}</p>
        </div>
      </div>
    );
  }

  if (!currentEkstra && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-lg p-5">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Data Tidak Ditemukan</h3>
          <p className="text-gray-600">Ekstrakurikuler dengan ID tersebut tidak ditemukan.</p>
        </div>
      </div>
    );
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
          Edit Ekstrakurikuler
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* Nama */}
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

        {/* Pembimbing */}
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
          <textarea
            id="description"
            rows="5"
            placeholder="Tuliskan deskripsi singkat..."
            {...register("description")}
            className="w-full px-3 py-2 text-gray-600 border border-gray-600 rounded-lg focus:ring-1 focus:ring-gray-600"
          ></textarea>
          {errors.description && (
            <span className="text-red-500 text-sm">
              {errors.description.message}
            </span>
          )}
        </div>

        {/* Upload Gambar */}
        <div className="w-full">
          <label className="block font-semibold mb-2 text-gray-800">
            Gambar
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
              <p className="text-gray-600 py-10 font-medium">
                Klik untuk pilih gambar baru
              </p>
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

export default EditEkstra;
