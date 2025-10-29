import { IoIosArrowBack } from "react-icons/io";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFacility, useUpdateFacility } from "../../../hooks/api/useFacility";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Swal from "sweetalert2";
import MyEditor from "../../../components/ui/MyEditor";

const schema = yup.object().shape({
  name: yup.string().required("Nama wajib diisi"),
  room_total: yup.string().required("Total  wajib diisi"),
  description: yup.string().required("Deskripsi wajib diisi"),
  image: yup
    .mixed()
    .test("fileSize", "Ukuran gambar maksimal 2MB", (value) => {
      if (!value) return true; 
      return value.size <= 2 * 1024 * 1024;
    })
    .test("fileType", "Format gambar tidak valid", (value) => {
      if (!value) return true;
      return ["image/png", "image/jpeg", "image/jpg"].includes(value.type);
    }),
});

const EditFasilitas = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [preview, setPreview] = useState(null);

  const { data: facility, isLoading, error } = useFacility(id);
  
  const updateFacility = useUpdateFacility(
    id,
    {
      onSuccess: () => {
      },
      onError: (error) => {
      },
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const watchedContent = watch("description");

  useEffect(() => {
    if (facility) {
      setValue("name", facility.name || "");
      setValue("room_total", facility.room_total || "");
      setValue("description", facility.description || "");
      setPreview(facility.image || null);
    }
  }, [facility, setValue]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue("image", file);
    }
  };

  const handleReset = () => {
    if (facility) {
      setValue("name", facility.name || "");
      setValue("room_total", facility.room_total || "");
      setValue("description", facility.description || "");
      setPreview(facility.image || null);
    }
  };

  const onSubmit = async (data) => {
    try {
      
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("room_total", data.room_total);
      formData.append("description", data.description);
      if (data.image) {
        formData.append("image", data.image);
      }

      await updateFacility.mutateAsync(formData);

      await Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Data fasilitas berhasil diperbarui.",
        confirmButtonColor: "#f97316",
        timer: 1800,
        showConfirmButton: false,
      });

      navigate("/admin/fasilitas");
    } catch (error) {

      await Swal.fire({
        icon: "error",
        title: "Gagal!",
        text:
          error?.response?.data?.message ||
          "Terjadi kesalahan saat memperbarui data.",
        confirmButtonColor: "#f97316",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              <div className="h-10 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              <div className="h-10 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              <div className="h-32 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="text-center py-8">
            <div className="text-red-500 text-xl mb-2">❌</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Terjadi Kesalahan
            </h3>
            <p className="text-gray-500 mb-4">
              {error?.message || "Gagal memuat data fasilitas"}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!facility) {
    return (
      <div className="p-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="text-center py-8">
            <div className="text-gray-400 text-xl mb-2">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Data Tidak Ditemukan
            </h3>
            <p className="text-gray-500 mb-4">
              Fasilitas dengan ID {id} tidak ditemukan
            </p>
            <button
              onClick={() => navigate("/admin/fasilitas")}
              className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600"
            >
              Kembali ke Daftar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center gap-10 w-full h-fit bg-white rounded-lg p-5">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="bg-orange-500 text-4xl text-center p-1 rounded-lg text-white hover:bg-orange-600 transition duration-300"
        >
          <IoIosArrowBack />
        </button>
        <h1 className="font-bold text-gray-900 text-2xl md:text-3xl lg:text-4xl">
          Edit Data Fasilitas
        </h1>
      </div>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        {/* Nama */}
        <div className="flex flex-col">
          <label htmlFor="name" className="font-bold text-gray-800">
            Nama
          </label>
          <input
            type="text"
            id="name"
            placeholder="Masukkan Nama Fasilitas"
            {...register("name")}
            className="w-full px-3 py-1 text-gray-600 border border-gray-600 rounded-lg"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Total  */}
        <div className="flex flex-col">
          <label htmlFor="room_total" className="font-bold text-gray-800">
            Total 
          </label>
          <input
            type="text"
            id="room_total"
            placeholder="Masukkan total "
            {...register("room_total")}
            className="w-full px-3 py-1 text-gray-600 border border-gray-600 rounded-lg"
          />
          {errors.room_total && <p className="text-red-500 text-sm">{errors.room_total.message}</p>}
        </div>

        {/* Deskripsi */}
        <div className="flex flex-col">
          <label htmlFor="description" className="font-bold text-gray-800">
            Deskripsi
          </label>
          <MyEditor
            value={watchedContent}
            onEditorChange={(newContent) => setValue("description", newContent)}
            initialValue={""}
          />
          
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        {/* Upload Foto */}
        <div className="w-full">
          <label className="block font-bold mb-2 text-gray-800">Foto</label>
          <label
            htmlFor="upload"
            className="flex flex-col items-center justify-center w-full h-fit border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50"
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="h-fit object-contain rounded-lg"
              />
            ) : (
              <p className="text-gray-600">Pilih foto </p>
            )}
            <input
              id="upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
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

export default EditFasilitas;
