import { IoIosArrowBack } from "react-icons/io";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFacility, useUpdateFacility } from "../../../hooks/api/useFacility";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const schema = yup.object().shape({
  name: yup.string().required("Nama wajib diisi"),
  room_total: yup.string().required("Total Ruangan wajib diisi"),
  description: yup.string().required("Deskripsi wajib diisi"),
  image: yup
    .mixed()
    .test("fileSize", "Ukuran gambar maksimal 2MB", (value) => {
      if (!value) return true; // biar edit tanpa ganti gambar tidak error
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

  const { data: facility, isLoading } = useFacility(id);
  const updateFacility = useUpdateFacility(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (facility) {
      reset({
        name: facility.name || "",
        room_total: facility.room_total || "",
        description: facility.description || "",
      });
      setPreview(facility.image);
    }
  }, [facility, reset]);

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
      formData.append("room_total", data.room_total);
      formData.append("description", data.description);
      if (data.image) formData.append("image", data.image);

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
      console.error("Gagal update facilitas:", error);

      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text:
          error?.response?.data?.message ||
          "Terjadi kesalahan saat memperbarui data.",
        confirmButtonColor: "#f97316",
      });
    }
  };

  return (
    <div className="flex flex-col justify-center gap-10 w-full h-fit bg-white rounded-lg p-5">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="bg-orange-500 text-4xl text-center p-1 rounded-4xl text-white"
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

        {/* Total Ruangan */}
        <div className="flex flex-col">
          <label htmlFor="room_total" className="font-bold text-gray-800">
            Total Ruangan
          </label>
          <input
            type="text"
            id="room_total"
            placeholder="Masukkan total ruangan"
            {...register("room_total")}
            className="w-full px-3 py-1 text-gray-600 border border-gray-600 rounded-lg"
          />
          {errors.room_total && <p className="text-red-500 text-sm">{errors.room_total.message}</p>}
        </div>

        {/* Deskripsi */}
        <div className="flex flex-col">
          <label htmlFor="description" className="font-bold text-gray-800">
            Deskripsi Singkat
          </label>
          <input
            type="text"
            id="description"
            placeholder="Masukkan deskripsi singkat"
            {...register("description")}
            className="w-full px-3 py-1 text-gray-600 border border-gray-600 rounded-lg"
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
              <p className="text-gray-600">Pilih foto Ruangan</p>
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

export default EditFasilitas;
