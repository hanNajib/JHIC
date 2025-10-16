import { IoIosArrowBack } from "react-icons/io";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Multiselect from "../../../components/ui/Multiselect";
import { useCreateStaff } from "../../../hooks/api/useStaff";
import { useSubjects } from "../../../hooks/api/useSubject";

const TambahGuru = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    subjects: "",
    image: null,
  });
  const [errors, setErrors] = useState({});

  const createStaffMutation = useCreateStaff();
  const { data: subjectsResponse } = useSubjects();
  const subjectsData = subjectsResponse?.data || [];

  const subjectOptions = subjectsData?.map((subject) => ({
    value: subject.name,
    label: subject.name,
    color: subject.color || "gray",
  })) || [];



  const validationSchema = Yup.object({
    name: Yup.string().required("Nama wajib diisi"),
    subjects: Yup.string().required("Mata pelajaran wajib diisi"),
    image: Yup.mixed()
      .nullable()
      .test("fileSize", "Ukuran file maksimal 2MB", (value) => {
        if (!value) return true;
        return value.size <= 2 * 1024 * 1024;
      })
      .test("fileType", "Hanya file gambar yang diperbolehkan", (value) => {
        if (!value) return true;
        return ["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(
          value.type
        );
      }),
  });

  const validateField = async (field, value) => {
    try {
      await validationSchema.validateAt(field, { [field]: value });
      setErrors(prev => ({ ...prev, [field]: "" }));
      return true;
    } catch (error) {
      setErrors(prev => ({ ...prev, [field]: error.message }));
      return false;
    }
  };

  const validateForm = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (error) {
      const formErrors = {};
      error.inner.forEach((err) => {
        formErrors[err.path] = err.message;
      });
      setErrors(formErrors);
      return false;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const isValid = await validateForm();
    if (!isValid) return;

    const submitFormData = new FormData();
    submitFormData.append("name", formData.name);
    submitFormData.append("position", "");
    submitFormData.append("subjects", formData.subjects);
    submitFormData.append("category", "lainnya");
    submitFormData.append("role", "teacher");
    
    if (formData.image) {
      submitFormData.append("image", formData.image);
    }

    createStaffMutation.mutate(submitFormData, {
      onSuccess: () => {
        Swal.fire({
          title: "Berhasil!",
          text: "Data guru berhasil ditambahkan",
          icon: "success",
          confirmButtonColor: "#f97316",
        }).then(() => {
          navigate("/admin/dataguru");
        });
      },
      onError: (error) => {
        console.error("Error creating teacher:", error);
        Swal.fire({
          title: "Gagal!",
          text: error.response?.data?.message || "Terjadi kesalahan saat menambahkan data",
          icon: "error",
          confirmButtonColor: "#f97316",
        });
      },
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      validateField("image", file);
      
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubjectsChange = (selectedSubjects) => {
    const subjectsString = Array.isArray(selectedSubjects) ? selectedSubjects.join(", ") : selectedSubjects;
    setFormData(prev => ({ ...prev, subjects: subjectsString }));
    validateField("subjects", subjectsString);
  };

  const selectedSubjects = formData.subjects ? formData.subjects.split(", ").filter(Boolean) : [];

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
          Tambah Guru
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col">
          <label htmlFor="name" className="font-bold text-gray-800">
            Nama Guru <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Masukkan nama guru"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 text-gray-600 border rounded-lg focus:outline-none focus:ring-1 ${
              errors.name
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-orange-500 focus:ring-orange-500"
            }`}
            required
          />
          {errors.name && (
            <span className="text-red-500 text-sm mt-1">{errors.name}</span>
          )}
        </div>

        <div className="flex flex-col">
          <Multiselect
            label="Mata Pelajaran"
            required={true}
            options={subjectOptions}
            value={selectedSubjects}
            onChange={handleSubjectsChange}
            placeholder="Pilih atau ketik mata pelajaran"
            searchPlaceholder="Cari mata pelajaran"
            customValue={true}
            addCustomPlaceholder="Tekan Enter untuk menggunakan nama mata pelajaran yang diketik"
            multiple={false}
            error={errors.subjects}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="image" className="font-bold text-gray-800">
            Foto Guru
          </label>

          <label
            htmlFor="image"
            className={`flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
              imagePreview
                ? "border-orange-300 bg-orange-50"
                : "border-gray-300 bg-white hover:bg-gray-50"
            }`}
          >
            {imagePreview ? (
              <div className="relative p-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-48 w-48 object-cover rounded-lg shadow-md"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setImagePreview(null);
                    setFormData(prev => ({ ...prev, image: null }));
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="py-10 flex flex-col items-center justify-center">
                <IoCloudUploadOutline className="text-6xl text-gray-600" />
                <p className="text-gray-600 font-medium">
                  Klik untuk pilih foto guru
                </p>
                <p className="text-xs text-gray-600">PNG, JPEG, JPG (Max 2MB)</p>
              </div>
            )}

            <input
              id="image"
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
          {errors.image && (
            <span className="text-red-500 text-sm mt-1">{errors.image}</span>
          )}
        </div>

        <div className="flex gap-3 justify-end mt-6">
          <button
            type="button"
            onClick={() => navigate("/admin/guru")}
            className="py-2 px-6 text-orange-500 text-base font-bold border-2 border-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition duration-300"
            disabled={createStaffMutation.isPending}
          >
            Batal
          </button>
          <button
            type="submit"
            className="bg-orange-500 text-white font-semibold py-2 px-6 text-base rounded-lg hover:bg-orange-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={createStaffMutation.isPending}
          >
            {createStaffMutation.isPending ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TambahGuru;
