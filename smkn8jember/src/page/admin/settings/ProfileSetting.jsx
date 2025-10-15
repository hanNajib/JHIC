import { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import { Loading } from "../../../components/ui";

const schema = yup.object().shape({
  username: yup.string().required("Nama wajib diisi"),
  bio: yup.string().required("Bio wajib diisi"),
  email: yup.string().email("Email tidak valid").required("Email wajib diisi"),
  phone_number: yup.string().required("No HP wajib diisi"),
  profile_image: yup
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

const ProfileSetting = () => {
  const navigate = useNavigate();
  const { user, update } = useAuth();
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      bio: "",
      email: "",
      phone_number: "",
      profile_image: null,
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        username: user.username || "",
        bio: user.bio || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
        profile_image: null,
      });
      setPreview(user.profile_image);
    }
  }, [user, reset]);

  if (!user) {
    return <Loading variant="spinner" size="large" />;
  }

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("profile_image", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("bio", data.bio);
      formData.append("phone_number", data.phone_number);
      if (data.profile_image) {
        formData.append("profile_image", data.profile_image);
      }

      await update(formData);

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Profil berhasil diperbarui.",
        confirmButtonColor: "#f97316",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Terjadi kesalahan saat menyimpan data.",
        confirmButtonColor: "#f97316",
      });
    } finally {
      setLoading(false);
    }
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
          Pengaturan Profil
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex justify-center flex-col lg:flex-row items-start gap-5">
          {/* INFORMASI UMUM */}
          <div className="flex flex-col gap-4 bg-gray-50 w-full p-5 rounded-lg border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-orange-500 pb-2">
              Informasi Umum
            </h2>

            {/* Username */}
            <div className="flex flex-col">
              <label className="font-bold text-gray-800 mb-1">Username</label>
              <input
                {...register("username")}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:border-orange-500 focus:ring-orange-500"
                placeholder="Masukkan username baru"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="font-bold text-gray-800 mb-1">Email</label>
              <input
                {...register("email")}
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:border-orange-500 focus:ring-orange-500"
                placeholder="Masukkan email baru"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Bio */}
            <div className="flex flex-col">
              <label className="font-bold text-gray-800 mb-1">Bio Singkat</label>
              <input
                {...register("bio")}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:border-orange-500 focus:ring-orange-500"
                placeholder="Masukkan bio singkat baru"
              />
              {errors.bio && (
                <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
              )}
            </div>

            {/* No HP */}
            <div className="flex flex-col">
              <label className="font-bold text-gray-800 mb-1">No HP</label>
              <input
                {...register("phone_number")}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:border-orange-500 focus:ring-orange-500"
                placeholder="Masukkan nomor HP"
              />
              {errors.phone_number && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone_number.message}
                </p>
              )}
            </div>
          </div>

          {/* FOTO PROFIL */}
          <div className="flex flex-col gap-4 bg-gray-50 w-full p-5 rounded-lg border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-orange-500 pb-2">
              Foto Profil
            </h2>
            <label
              htmlFor="profile_image"
              className={`flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                preview
                  ? "border-orange-300 bg-orange-50"
                  : "border-gray-300 bg-white hover:bg-gray-50"
              }`}
            >
              {preview ? (
                <div className="relative p-4">
                  <img
                    src={user.profile_image }
                    alt="Preview"
                    className="h-65 w-48 object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setPreview(null);
                      setValue("profile_image", null);
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
                    Klik untuk pilih foto
                  </p>
                  <p className="text-xs text-gray-400">
                    Format: PNG, JPEG, JPG
                  </p>
                </div>
              )}
              <input
                id="profile_image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoChange}
              />
            </label>
            {errors.profile_image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.profile_image.message}
              </p>
            )}
          </div>
        </div>

        {/* Tombol */}
        <div className="flex gap-3 justify-end mt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={loading || isSubmitting}
            className="px-8 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSetting;
