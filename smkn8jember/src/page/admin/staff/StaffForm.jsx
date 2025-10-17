import { IoIosArrowBack } from "react-icons/io";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { Multiselect } from "../../../components/ui";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateStaff, useUpdateStaff, useStaffById } from "../../../hooks/api/useStaff";
import Swal from "sweetalert2";

const createSchema = (role) => yup.object().shape({
  name: yup.string().required("Nama wajib diisi"),
  position: role === "principal" || role === "teacher" ? yup.string().nullable() : yup.string().nullable(),
  category: role === "teacher" ? yup.string().nullable() : 
           role === "principal" ? yup.string().nullable() :
           yup.string().required("Kategori wajib diisi"),
  subjects: role === "teacher" ? yup.string().nullable() : yup.string().nullable(),
  image: yup
    .mixed()
    .nullable()
    .test("fileSize", "Ukuran gambar maksimal 2MB", (value) => {
      if (!value) return true;
      return value.size <= 2 * 1024 * 1024;
    })
    .test("fileType", "Format gambar tidak valid", (value) => {
      if (!value) return true;
      return ["image/png", "image/jpeg", "image/jpg"].includes(value.type);
    }),
});

const StaffForm = () => {
  const navigate = useNavigate();
  const { role: urlRole, id } = useParams();
  const isEdit = !!id;
  
  // Determine role from URL parameter or default
  const role = urlRole || "employee";
  
  // Validation schema based on role
  const schema = createSchema(role);

  const createStaff = useCreateStaff({
    onSuccess: () => {
      console.log("✅ Staff berhasil ditambahkan");
    },
    onError: (error) => {
      console.error("❌ Error tambah staff:", error);
    },
  });

  const updateStaff = useUpdateStaff(id, {
    onSuccess: () => {
      console.log("✅ Staff berhasil diupdate");
    },
    onError: (error) => {
      console.error("❌ Error update staff:", error);
    },
  });

  // Fetch existing data for edit mode
  const { data: existingStaff, isLoading: loadingStaff } = useStaffById(id, {
    enabled: isEdit,
  });

  const categoryOptions = [
    { value: "waka", label: "Wakil Kepala Sekolah" },
    { value: "koordinator", label: "Koordinator" },
    { value: "koordinator_jurusan", label: "Koordinator Jurusan" },
    { value: "komite", label: "Komite" },
    { value: "lainnya", label: "Lainnya" },
  ];

  // Category options khusus untuk principal (hanya kepala_sekolah)
  const principalCategoryOptions = [
    { value: "kepala_sekolah", label: "Kepala Sekolah" },
  ];

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
      position: "",
      category: role === "principal" ? "kepala_sekolah" : "lainnya",
      subjects: "",
    },
  });

  const [preview, setPreview] = useState(null);
  const selectedCategory = watch("category");

  // Load existing data when editing
  useEffect(() => {
    if (isEdit && existingStaff && !loadingStaff) {
      reset({
        name: existingStaff.name || "",
        position: existingStaff.position || "",
        category: existingStaff.category || (role === "principal" ? "kepala_sekolah" : "lainnya"),
        subjects: existingStaff.subjects || "",
        image: null,
      });
      
      if (existingStaff.image) {
        setPreview(existingStaff.image);
      }
    }
  }, [existingStaff, loadingStaff, isEdit, reset, role]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setValue("image", file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleReset = () => {
    if (isEdit && existingStaff) {
      reset({
        name: existingStaff.name || "",
        position: existingStaff.position || "",
        category: existingStaff.category || (role === "principal" ? "kepala_sekolah" : "lainnya"),
        subjects: existingStaff.subjects || "",
        image: null,
      });
      setPreview(existingStaff.image || null);
    } else {
      reset({
        name: "",
        position: "",
        category: role === "principal" ? "kepala_sekolah" : "lainnya",
        subjects: "",
        image: null,
      });
      setPreview(null);
    }
  };

  const onSubmit = async (data) => {
    try {
      console.log("📤 Submitting staff data:", data);
      
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("role", role);
      
      // Auto-assign position based on role
      if (role === "principal") {
        formData.append("position", "Kepala Sekolah");
        formData.append("category", "kepala_sekolah");
      } else if (role === "teacher") {
        formData.append("position", data.position || "Guru");
        if (data.category) formData.append("category", data.category);
      } else {
        if (data.position) formData.append("position", data.position);
        formData.append("category", data.category);
      }
      
      if (data.subjects && role === "teacher") formData.append("subjects", data.subjects);
      if (data.image) {
        formData.append("image", data.image);
        console.log("🖼️ Image file included:", data.image.name);
      }

      if (isEdit) {
        await updateStaff.mutateAsync(formData);
      } else {
        await createStaff.mutateAsync(formData);
      }

      await Swal.fire({
        title: "Berhasil!",
        text: `Data ${getRoleLabel(role)} berhasil ${isEdit ? 'diperbarui' : 'ditambahkan'}!`,
        icon: "success",
        confirmButtonColor: "#059669",
      });

      navigate(-1);
    } catch (error) {
      console.error("❌ Error:", error);
      await Swal.fire({
        title: "Gagal!",
        text: error.message || `Gagal ${isEdit ? 'memperbarui' : 'menambah'} data ${getRoleLabel(role)}`,
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  // Helper functions
  const getRoleLabel = (role) => {
    const roleLabels = {
      teacher: "Guru",
      employee: "Karyawan",
      principal: "Kepala Sekolah",
    };
    return roleLabels[role] || "Staff";
  };

  const getPageTitle = () => {
    const operation = isEdit ? "Edit" : "Tambah";
    return `${operation} Data ${getRoleLabel(role)}`;
  };

  if (isEdit && loadingStaff) {
    return (
      <div className="flex flex-col justify-center gap-10 w-full h-fit bg-white rounded-lg p-5">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data...</p>
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
          {getPageTitle()}
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Nama */}
        <div className="flex flex-col">
          <label htmlFor="name" className="font-bold text-gray-800">
            Nama <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            placeholder={`Masukkan Nama ${getRoleLabel(role)}`}
            className={`w-full px-3 py-2 text-gray-600 border rounded-lg focus:outline-none focus:ring-1 ${
              errors.name
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-orange-500 focus:ring-orange-500"
            }`}
          />
          {errors.name && (
            <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>
          )}
        </div>

        {/* Jabatan - hanya untuk employee */}
        {role === "employee" && (
          <div className="flex flex-col">
            <label htmlFor="position" className="font-bold text-gray-800">
              Jabatan
            </label>
            <input
              id="position"
              type="text"
              {...register("position")}
              placeholder="Masukkan Jabatan"
              className={`w-full px-3 py-2 text-gray-600 border rounded-lg focus:outline-none focus:ring-1 ${
                errors.position
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-orange-500 focus:ring-orange-500"
              }`}
            />
            {errors.position && (
              <span className="text-red-500 text-sm mt-1">{errors.position.message}</span>
            )}
          </div>
        )}

        {/* Kategori - hanya untuk employee dan principal */}
        {(role === "employee" || role === "principal") && (
          <div className="flex flex-col">
            <label htmlFor="category" className="font-bold text-gray-800">
              Kategori {role === "employee" && <span className="text-red-500">*</span>}
            </label>
            <Multiselect
              options={role === "principal" ? principalCategoryOptions : categoryOptions}
              value={selectedCategory}
              onChange={(value) => setValue("category", value)}
              placeholder="Pilih Kategori"
              multiple={false}
              customValue={false}
              disabled={role === "principal"}
              className={errors.category ? "border-red-500" : ""}
            />
            {errors.category && (
              <span className="text-red-500 text-sm mt-1">{errors.category.message}</span>
            )}
          </div>
        )}

        {/* Mata Pelajaran - hanya untuk teacher */}
        {role === "teacher" && (
          <div className="flex flex-col">
            <label htmlFor="subjects" className="font-bold text-gray-800">
              Mata Pelajaran
            </label>
            <input
              id="subjects"
              type="text"
              {...register("subjects")}
              placeholder="Masukkan Mata Pelajaran"
              className={`w-full px-3 py-2 text-gray-600 border rounded-lg focus:outline-none focus:ring-1 ${
                errors.subjects
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-orange-500 focus:ring-orange-500"
              }`}
            />
            {errors.subjects && (
              <span className="text-red-500 text-sm mt-1">{errors.subjects.message}</span>
            )}
          </div>
        )}

        {/* Upload Gambar */}
        <div className="flex flex-col">
          <label htmlFor="image" className="font-bold text-gray-800">
            Foto {getRoleLabel(role)}
          </label>
          <div
            onClick={() => document.getElementById("image").click()}
            className={`w-full border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
              errors.image
                ? "border-red-500 bg-red-50"
                : "border-gray-300 hover:border-orange-500 hover:bg-orange-50"
            }`}
          >
            {preview ? (
              <div className="relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <p className="text-white font-medium">Klik untuk mengganti foto</p>
                </div>
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center">
                <IoCloudUploadOutline className="text-6xl text-gray-400 mb-4" />
                <p className="text-gray-600 font-medium mb-2">
                  Klik untuk pilih foto {getRoleLabel(role)}
                </p>
                <p className="text-gray-400 text-sm">PNG, JPG, JPEG (Max 2MB)</p>
              </div>
            )}
          </div>
          <input
            id="image"
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            onChange={handleFileChange}
            className="hidden"
          />
          {errors.image && (
            <span className="text-red-500 text-sm mt-1">{errors.image.message}</span>
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
            {isSubmitting ? "Menyimpan..." : isEdit ? "Update" : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StaffForm;