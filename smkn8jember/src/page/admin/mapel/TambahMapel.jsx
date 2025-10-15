import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMajors } from "../../../hooks/api/useMajor";
import * as yup from "yup";
import { Multiselect } from "../../../components/ui";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateSubject } from "../../../hooks/api/useSubject";
import Swal from "sweetalert2";

const schema = yup.object().shape({
  name: yup.string().required("Nama Mata Pelajaran wajib diisi"),
  description: yup.string().required("Deskripsi Mata Pelajaran wajib diisi"),
  major_id: yup.string().required("Jurusan wajib diisi"),
});

const TambahMapel = () => {
  const navigate = useNavigate();
  const createMajor = useCreateSubject({
    onSuccess: () => {
      Swal.fire({
        title: "Berhasil!",
        text: "Mata pelajaran berhasil ditambahkan",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate('/admin/mapel');
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Gagal!",
        text: error.response?.data?.message || "Terjadi kesalahan saat menambahkan mata pelajaran",
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
      major_id: "",
    },
  });

  const [preview, setPreview] = useState(null);

  const selectedMajor = watch("major_id");
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
    formData.append("major_id", data.major_id);

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
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="bg-orange-500 cursor-pointer text-3xl lg:text-4xl text-center p-2 rounded-lg text-white hover:bg-orange-600 transition-colors"
        >
          <IoIosArrowBack />
        </button>
        <h1 className="font-bold text-gray-900 text-2xl md:text-3xl lg:text-4xl">
          Tambah Mata Pelajaran
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col">
          <label htmlFor="name" className="font-bold text-gray-800">
            Nama Mata Pelajaran <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            placeholder="Masukkan Nama Mata Pelajaran"
            className={`w-full px-3 py-2 text-gray-600 border rounded-lg focus:outline-none focus:ring-1 ${errors.name
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-orange-500 focus:ring-orange-500"
              }`}
          />
          {errors.name && (
            <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="font-bold text-gray-800">
            Deskripsi <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            {...register("description")}
            value={descriptionValue}
            onChange={(e) => setValue("description", e.target.value)}
            placeholder="Masukkan Deskripsi Mata Pelajaran"
            className={`w-full px-3 py-2 text-gray-600 border rounded-lg focus:outline-none focus:ring-1 h-32 ${errors.description
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-orange-500 focus:ring-orange-500"
              }`}
          />
          {errors.description && (
            <span className="text-red-500 text-sm mt-1">{errors.description.message}</span>
          )}
        </div>

        <div className="flex flex-col">
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
        </div>

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

export default TambahMapel;
