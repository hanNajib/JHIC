import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useMajors } from "../../../hooks/api/useMajor";
import { useCreatePartner } from "../../../hooks/api/usePartner";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import { Multiselect } from "../../../components/ui";

const schema = yup.object().shape({
  name: yup.string().required("Nama partner wajib diisi"),
  major_id: yup.string().required("Jurusan wajib diisi"),
  image: yup
    .mixed()
    .required("Gambar partner wajib diisi")
    .test("fileSize", "Ukuran gambar maksimal 2MB", (value) => {
      if (!value) return false;
      return value.size <= 2 * 1024 * 1024;
    })
    .test(
      "fileType",
      "Format gambar tidak valid (harus PNG, JPG, atau JPEG)",
      (value) => {
        if (!value) return false;
        return ["image/png", "image/jpeg", "image/jpg"].includes(value.type);
      }
    ),
});

const TambahPartner = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const { data: majorsDataRaw = [] } = useMajors();

  const majorsData = majorsDataRaw?.data || [];
  const majorOptions = majorsData.map((major) => ({
    value: major.id?.toString(),
    label: major.name,
    color: major.color || "#FF6000",
  }));


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
      major_id: "",
      image: null,
    },
  });

  const selectedMajor = watch("major_id");

  const createPartner = useCreatePartner({
    onSuccess: () => {
      Swal.fire({
        title: "Berhasil!",
        text: "Data partner berhasil ditambahkan.",
        icon: "success",
        confirmButtonColor: "#f97316",
        confirmButtonText: "OK",
      }).then(() => {
        reset();
        setPreview(null);
        navigate("/admin/partner");
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text:
          error?.response?.data?.message ||
          "Terjadi kesalahan saat menambahkan data.",
        confirmButtonColor: "#f97316",
      });
    },
  });

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
    formData.append("major_id", data.major_id);
    formData.append("image", data.image);

    await createPartner.mutateAsync(formData);
    // jangan reset di sini, biarkan onSuccess yang handle reset & alert
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
          Tambah Data Partner
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Nama */}
        <div className="flex flex-col">
          <label htmlFor="name" className="font-bold text-gray-800">
            Nama Perusahaan <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            placeholder="Masukkan Nama Perusahaan"
            className={`w-full px-3 py-2 text-gray-600 border rounded-lg focus:outline-none focus:ring-1 ${
              errors.name
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-orange-500 focus:ring-orange-500"
            }`}
          />
          {errors.name && (
            <span className="text-red-500 text-sm mt-1">
              {errors.name.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          {majorsData.length === 0 ? (
            <div className="flex flex-col">
              <label className="font-bold text-gray-800">
                Jurusan <span className="text-red-500">*</span>
              </label>
              <div className="w-full px-3 py-2 text-gray-500 border border-gray-300 rounded-lg">
                Memuat data jurusan...
              </div>
            </div>
          ) : (
            <Multiselect
              label="Jurusan"
              required={true}
              options={majorOptions}
              value={selectedMajor}
              onChange={(value) => setValue("major_id", value)}
              placeholder="Pilih jurusan..."
              error={errors.major_id?.message}
              multiple={false}
            />
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="upload" className="font-bold text-gray-800">
            Gambar partner <span className="text-red-500">*</span>
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
                  x
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
            <span className="text-red-500 text-sm mt-1">
              {errors.image.message}
            </span>
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

export default TambahPartner;
