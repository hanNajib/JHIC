import { IoIosArrowBack } from "react-icons/io";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMajors } from "../../../hooks/api/useMajor";
import { usePartner, useUpdatePartner } from "../../../hooks/api/usePartner";
import Swal from "sweetalert2";

const schema = yup.object().shape({
  name: yup.string().required("Nama partner wajib diisi"),
  major_id: yup.string().required("Jurusan wajib diisi"),
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
        if (!value) return true; // boleh kosong saat edit
        return ["image/png", "image/jpeg", "image/jpg"].includes(value.type);
      }
    ),
});

const EditPartner = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: currentPartner, isLoading } = usePartner(id);
  const updatePartner = useUpdatePartner(id);
  const { data: majorDataRaw = [] } = useMajors();

  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      major_id: "",
      image: null,
    },
  });

  useEffect(() => {
    if (currentPartner) {
      reset({
        name: currentPartner.name || "",
        major_id: currentPartner.major_id?.toString() || "",
        image: null,
      });
      setPreview(currentPartner.image); // menampilkan gambar lama
    }
  }, [currentPartner, reset]);

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
      formData.append("major_id", data.major_id);
      if (data.image) formData.append("image", data.image); // hanya append jika ada file baru

      await updatePartner.mutateAsync(formData);

      await Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Data partner berhasil diperbarui.",
        confirmButtonColor: "#f97316",
        timer: 1800,
        showConfirmButton: false,
      });

      navigate("/admin/partner"); // atau kembali ke halaman list
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text:
          error?.response?.data?.message ||
          "Terjadi kesalahan saat memperbarui data partner.",
        confirmButtonColor: "#f97316",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="text-center text-gray-500 py-10">
        Memuat data partner...
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center gap-10 w-full h-fit bg-white rounded-lg p-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="bg-orange-500 text-4xl text-center p-1 rounded-4xl text-white"
        >
          <IoIosArrowBack />
        </button>
        <h1 className="font-bold text-gray-900 text-2xl md:text-3xl lg:text-4xl">
          Edit Data Partner
        </h1>
      </div>

      {/* Form */}
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        {/* Nama Partner */}
        <div className="flex flex-col">
          <label htmlFor="name" className="font-bold text-gray-800">
            Nama Partner
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            placeholder="Masukkan Nama Partner"
            className="w-full px-3 py-1 text-gray-600 border border-gray-600 rounded-lg"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Jurusan */}
        <div className="flex flex-col">
          <label className="font-bold text-gray-800 mb-2">
            Jurusan <span className="text-red-500">*</span>
          </label>
          {majorDataRaw.map((item) => (
            <label
              key={item.id}
              className="flex items-center gap-2 text-sm font-medium text-gray-600"
            >
              <input
                type="radio"
                value={item.id}
                {...register("major_id")}
                className="accent-orange-500"
                defaultChecked={currentPartner?.major_id === item.id}
              />
              {item.name}
            </label>
          ))}
          {errors.major_id && (
            <span className="text-red-500 text-sm mt-1">
              {errors.major_id.message}
            </span>
          )}
        </div>

        {/* Upload Foto */}
        <div className="w-full">
          <label className="block font-bold mb-2 text-gray-800">Foto Partner</label>
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
              <p className="text-gray-600">Pilih foto Partner</p>
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
        <div className="flex gap-3 justify-end">
          <button
            type="submit"
            className="bg-orange-500 text-white font-semibold py-1 text-sm md:text-base w-24 rounded-4xl hover:bg-orange-600"
            disabled={isSubmitting}
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

export default EditPartner;
