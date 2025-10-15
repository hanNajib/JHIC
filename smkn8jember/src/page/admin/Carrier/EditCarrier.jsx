import { IoIosArrowBack } from "react-icons/io";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMajors } from "../../../hooks/api/useMajor";
import { useCareer, useUpdateCareer } from "../../../hooks/api/useCareer";
import { Multiselect } from "../../../components/ui";
import Swal from "sweetalert2";

const schema = yup.object().shape({
  name: yup.string().required("Nama pekerjaan wajib diisi"),
  salary: yup.string().required("Gaji wajib diisi"),
  major_id: yup.string().required("Jurusan wajib diisi"),
  image: yup
    .mixed()
    .nullable()
    .test("fileSize", "Ukuran gambar maksimal 2MB", (value) => {
      if (!value || typeof value === "string") return true; 
      return value.size <= 2 * 1024 * 1024;
    })
    .test(
      "fileType",
      "Format gambar tidak valid (harus PNG, JPG, atau JPEG)",
      (value) => {
        if (!value || typeof value === "string") return true;
        return ["image/png", "image/jpeg", "image/jpg"].includes(value.type);
      }
    ),
});

const EditCareer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: currentCareer, isLoading, error } = useCareer(id);
  
  const updateCareer = useUpdateCareer(id, {
    onSuccess: () => {
      Swal.fire({
        title: "Berhasil!",
        text: "Karier berhasil diperbarui",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate('/admin/career');
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Gagal!",
        text: error.response?.data?.message || "Terjadi kesalahan saat memperbarui karier",
        icon: "error",
      });
    }
  });
  
  const { data: majorsDataRaw = [] } = useMajors();
  const majorsData = majorsDataRaw?.data || [];
  const majorOptions = majorsData.map((major) => ({
    value: major.id?.toString(),
    label: major.name,
    color: major.color || "#FF6000",
  }));

  const [preview, setPreview] = useState(null);
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
      salary: "",
      major_id: "",
      image: null,
    },
  });

  const selectedMajor = watch("major_id");

  useEffect(() => {
    if (currentCareer) {
      console.log("Setting form values:", currentCareer); // Debug log
      setValue("name", currentCareer.name || "");
      setValue("salary", currentCareer.salary || "");
      setValue("major_id", currentCareer.major_id?.toString() || "");
      setValue("image", null);
      setPreview(currentCareer.image);
    }
  }, [currentCareer, setValue]);

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
    formData.append("salary", data.salary);
    formData.append("major_id", data.major_id);
    if (data.image) formData.append("image", data.image);

    await updateCareer.mutateAsync(formData);
  };

  const handleReset = () => {
    if (currentCareer) {
      setValue("name", currentCareer.name || "");
      setValue("salary", currentCareer.salary || "");
      setValue("major_id", currentCareer.major_id?.toString() || "");
      setValue("image", null);
      setPreview(currentCareer.image);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center text-gray-500 py-10">
        Memuat data karier...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-lg p-5">
        <div className="text-center text-red-500">
          <h3 className="text-lg font-semibold mb-2">Error Loading Data</h3>
          <p>{error?.message || "Gagal memuat data karier"}</p>
        </div>
      </div>
    );
  }

  if (!currentCareer && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-lg p-5">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Data Tidak Ditemukan</h3>
          <p className="text-gray-600">Karier dengan ID tersebut tidak ditemukan.</p>
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
          Edit Data Karier
        </h1>
      </div>

      {/* Form */}
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        {/* Nama Pekerjaan */}
        <div className="flex flex-col">
          <label htmlFor="name" className="font-bold text-gray-800">
            Nama Pekerjaan
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            placeholder="Masukkan nama pekerjaan"
            className="w-full px-3 py-1 text-gray-600 border border-gray-600 rounded-lg"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Gaji */}
        <div className="flex flex-col">
          <label htmlFor="salary" className="font-bold text-gray-800">
            Gaji
          </label>
          <input
            {...register("salary")}
            type="text"
            id="salary"
            placeholder="Masukkan gaji"
            className="w-full px-3 py-1 text-gray-600 border border-gray-600 rounded-lg"
          />
          {errors.salary && (
            <p className="text-red-500 text-sm mt-1">{errors.salary.message}</p>
          )}
        </div>

        {/* Jurusan */}
        <div className="flex flex-col">
          <label className="font-bold text-gray-800 mb-2">
            Jurusan <span className="text-red-500">*</span>
          </label>
          <Multiselect
            options={majorOptions}
            value={selectedMajor}
            onChange={(value) => setValue("major_id", value)}
            placeholder="Pilih jurusan"
            isSearchable
            multiple={false}
          />
          {errors.major_id && (
            <span className="text-red-500 text-sm mt-1">
              {errors.major_id.message}
            </span>
          )}
        </div>

        {/* Upload Foto */}
        <div className="w-full">
          <label className="block font-bold mb-2 text-gray-800">Icon</label>
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
              <p className="text-gray-600">Pilih foto karier</p>
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

export default EditCareer;
