import { IoIosArrowBack } from "react-icons/io";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, use } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMajor, useUpdateMajor } from "../../../hooks/api/useMajor";

const schema = yup.object().shape({
  name: yup.string().nullable().notRequired(),
  description: yup.string().nullable().notRequired(),
  image: yup
    .mixed()
    .nullable()
    .notRequired()
    .test("fileSize", "Ukuran gambar maksimal 2MB", (value) => {
      if (!value) return true;
      return value.size <= 2 * 1024 * 1024;
    })
    .test("fileType", "Format gambar tidak valid (harus PNG, JPG, atau JPEG)", (value) => {
      if (!value) return true;
      return ["image/png", "image/jpeg", "image/jpg"].includes(value.type);
    }),
});


const EditJurusan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: currentJurusan, isLoading } = useMajor(id);
  const updateMajor = useUpdateMajor(id);

  const [preview, setPreview] = useState(null);


  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      image: null,
    },
  });

  // ketika data jurusan sudah diambil dari API
  useEffect(() => {
    if (currentJurusan) {
      reset({
        name: currentJurusan.name || "",
        description: currentJurusan.description || "",
        image: null,
      });
      setPreview(currentJurusan.image); // tampilkan gambar lama
    }
  }, [currentJurusan, reset]);

  // handle ganti gambar baru
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue("image", file);
    }
  };

  // handle update data
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      if (data.image) formData.append("image", data.image);

      await updateMajor.mutateAsync(formData);
      navigate(-1)
    } catch (error) {
      console.error("Gagal update jurusan:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center text-gray-500 py-10">
        Memuat data jurusan...
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center gap-10 w-full h-fit bg-white rounded-lg p-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="bg-orange-500 text-3xl lg:text-4xl text-center p-1 rounded-4xl text-white"
        >
          <IoIosArrowBack />
        </button>
        <h1 className="font-bold text-gray-900 text-2xl md:text-3xl lg:text-4xl">
          Edit Data Jurusan
        </h1>
      </div>

      {/* Form */}
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        {/* Nama Jurusan */}
        <div className="flex flex-col">
          <label htmlFor="name" className="font-bold text-gray-800">
            Nama Jurusan
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            placeholder="Masukkan Nama Jurusan"
            className="w-full px-3 py-1 text-gray-600 border border-gray-600 rounded-lg focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Deskripsi */}
        <div>
          <label className="block mb-1 font-semibold text-gray-800">
            Deskripsi
          </label>
          <Editor
            apiKey="z1lkqlsk4vjd7irjkvmackpeb4dq8dz0hisyrfb09w6x7c2c"
            value={watch("description")}
            onEditorChange={(newContent) =>
              setValue("description", newContent)
            }
            init={{
              height: 300,
              menubar: false,
              plugins: "lists link table code",
              toolbar: "undo redo | bold italic underline | bullist numlist",
              content_style:
                "body { font-family:Inter,Arial,sans-serif; font-size:14px; color:#4B5563; }",
            }}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Upload Foto */}
        <div className="w-full">
          <label className="block font-semibold mb-2 text-gray-800">
            Gambar Jurusan
          </label>
          <label
            htmlFor="upload"
            className="flex flex-col items-center justify-center w-full h-fit border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50"
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="h-64 object-contain rounded-lg"
              />
            ) : (
              <div className="py-10 flex flex-col items-center justify-center">
                <p className="text-gray-600 font-medium">
                  Klik untuk pilih gambar
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
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
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

export default EditJurusan;
