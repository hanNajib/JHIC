import { IoIosArrowBack } from "react-icons/io";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useCreateUser } from "../../../hooks/api/useAdmin";
import Loading from "../../../components/ui/Loading";

const schema = yup.object().shape({
  username: yup.string().required("Username wajib diisi"),
  email: yup
    .string()
    .required("Email wajib diisi")
    .email("Format email tidak valid"),
  password: yup
    .string()
    .required("Password wajib diisi")
    .min(6, "Password minimal 6 karakter"),
  phone_number: yup.string().nullable(),
  bio: yup.string().nullable(),
  foto: yup
    .mixed()
    .nullable()
    .test(
      "fileType",
      "Hanya file PNG, JPEG, dan JPG yang diperbolehkan",
      (value) => {
        if (!value) return true;
        return ["image/png", "image/jpeg", "image/jpg"].includes(value.type);
      }
    )
    .test("fileSize", "Ukuran file maksimal 2MB", (value) => {
      if (!value) return true;
      return value.size <= 2 * 1024 * 1024;
    }),
});

const TambahUserJurusan = () => {
  const navigate = useNavigate();
  const createUser = useCreateUser({
    onSuccess: () => navigate(-1),
  });

  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      phone_number: "",
      bio: "",
      foto: null,
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("foto", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);

    const submitData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] !== null && data[key] !== undefined) {
        submitData.append(key, data[key]);
      }

      if (data.foto) {
        submitData.append("profile_image", data.foto);
      }
    });

    createUser.mutate(submitData, {
      onSuccess: () => {
        setIsLoading(false);
      },
      onError: (error) => {
        setIsLoading(false);
        console.error("Gagal menambahkan admin:", error);
      },
    });
  };

  const handleReset = () => {
    reset();
    setPreview(null);
  };

  return (
    <div className="flex flex-col justify-center gap-10 w-full h-fit bg-white rounded-lg p-5 relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center rounded-lg">
          <Loading type="spinner" message="Menyimpan data admin..." />
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="bg-orange-500 cursor-pointer text-3xl lg:text-4xl text-center p-2 rounded-lg text-white hover:bg-orange-600 transition-colors"
          disabled={isLoading}
        >
          <IoIosArrowBack />
        </button>
        <h1 className="font-bold text-gray-900 text-2xl md:text-3xl lg:text-4xl">
          Tambah Admin
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Username */}
        <div className="flex flex-col">
          <label className="font-bold text-gray-800">
            Username <span className="text-red-500">*</span>
          </label>
          <input
            {...register("username")}
            type="text"
            placeholder="Masukkan Username"
            className={`w-full px-3 py-2 text-gray-600 border rounded-lg focus:outline-none focus:ring-1 ${
              errors.username
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-orange-500"
            }`}
          />
          {errors.username && (
            <span className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="font-bold text-gray-800">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="Masukkan Email"
            className={`w-full px-3 py-2 text-gray-600 border rounded-lg focus:outline-none focus:ring-1 ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-orange-500"
            }`}
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label className="font-bold text-gray-800">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            {...register("password")}
            type="password"
            placeholder="Masukkan Password (min. 6 karakter)"
            className={`w-full px-3 py-2 text-gray-600 border rounded-lg focus:outline-none focus:ring-1 ${
              errors.password
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-orange-500"
            }`}
          />
          {errors.password && (
            <span className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </span>
          )}
        </div>

        {/* Role */}
        {/* <div className="flex flex-col">
          <label className="font-bold text-gray-800">
            Role <span className="text-red-500">*</span>
          </label>
          <select
            {...register("role")}
            className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          >
            <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
          </select>
        </div> */}

        {/* Nomor HP */}
        <div className="flex flex-col">
          <label className="font-bold text-gray-800">No. HP</label>
          <input
            {...register("phone_number")}
            type="tel"
            placeholder="Masukkan Nomor HP (Opsional)"
            className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>

        {/* Bio */}
        <div className="flex flex-col">
          <label className="font-bold text-gray-800">Bio Singkat</label>
          <textarea
            {...register("bio")}
            rows="3"
            placeholder="Masukkan Bio Singkat (Opsional)"
            className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 resize-vertical"
          />
        </div>

        {/* Foto Profil */}
        <div className="w-full">
          <label className="block font-semibold mb-2 text-gray-800">
            Foto Profil
            <span className="text-sm font-normal text-gray-500 ml-1">
              (Opsional)
            </span>
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
                    setValue("foto", null);
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center">
                <IoCloudUploadOutline className="text-6xl text-gray-400 mb-2" />
                <p className="text-gray-600 font-medium mb-1">
                  Klik untuk pilih foto profil
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
          {errors.foto && (
            <span className="text-red-500 text-sm mt-1">
              {errors.foto.message}
            </span>
          )}
        </div>

        {/* Tombol */}
        <div className="flex gap-3 justify-end mt-6">
          <button
            type="button"
            onClick={handleReset}
            className="py-2 px-6 text-orange-500 text-base font-bold border-2 border-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition duration-300"
            disabled={isLoading}
          >
            Reset
          </button>
          <button
            type="submit"
            className="bg-orange-500 text-white font-semibold py-2 px-6 text-base rounded-lg hover:bg-orange-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TambahUserJurusan;
