import { IoIosArrowBack } from "react-icons/io";
import { useState, useEffect } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/ui/Loading";
import { useAdmin, useUpdateUser } from "../../hooks/api/useAdmin";

const EditUserJurusan = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone_number: "",
    bio: "",
    role: "admin",
    foto: null
  });
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [initialFoto, setInitialFoto] = useState(null);

  const { data: userData, isLoading: loadingUser } = useAdmin(id);

  const updateUser = useUpdateUser(id, {
    onSuccess: () => {
      console.log("Admin berhasil diupdate");
      navigate(-1);
    }
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        username: userData.username || "",
        email: userData.email || "",
        phone_number: userData.phone_number || "",
        bio: userData.bio || "",
        role: userData.role || "admin",
        foto: null
      });

      if (userData.foto) {
        setInitialFoto(userData.foto);
        setPreview(userData.foto);
      }
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          foto: "Hanya file PNG, JPEG, dan JPG yang diperbolehkan"
        }));
        return;
      }

      // Validate file size (max 2MB)
      const maxSize = 2 * 1024 * 1024; // 2MB in bytes
      if (file.size > maxSize) {
        setErrors(prev => ({
          ...prev,
          foto: "Ukuran file maksimal 2MB"
        }));
        return;
      }

      // Clear file error
      setErrors(prev => ({
        ...prev,
        foto: ""
      }));

      setFormData(prev => ({
        ...prev,
        foto: file
      }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setErrors({});
    
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username wajib diisi";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Format email tidak valid";
      }
    }

    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    const submitData = new FormData();
    submitData.append('username', formData.username);
    submitData.append('email', formData.email);
    submitData.append('role', formData.role);
    submitData.append('phone_number', formData.phone_number || '');
    submitData.append('bio', formData.bio || '');
    
    if (formData.password && formData.password.trim()) {
      submitData.append('password', formData.password);
    }
    
    if (formData.foto) {
      submitData.append('foto', formData.foto);
    }

    updateUser.mutate({ id, data: submitData }, {
      onSuccess: () => {
        setIsLoading(false);
      },
      onError: (error) => {
        setIsLoading(false);
        console.error("Gagal mengupdate admin:", error.message || error);
        setErrors({ 
          submit: error.message || "Gagal mengupdate admin" 
        });
      }
    });
  };

  const handleReset = () => {
    if (userData) {
      setFormData({
        username: userData.username || "",
        email: userData.email || "",
        password: "",
        phone_number: userData.phone_number || "",
        bio: userData.bio || "",
        role: userData.role || "admin",
        foto: null
      });
      setPreview(initialFoto);
    }
    setErrors({});
  };

  if (loadingUser) {
    return (
      <div className="flex items-center justify-center w-full h-96">
        <Loading type="spinner" message="Memuat data admin..." />
      </div>
    );
  }

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
          Edit Admin
        </h1>
      </div>

      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label htmlFor="username" className="font-bold text-gray-800">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Masukkan Username"
              className={`w-full px-3 py-2 text-gray-600 border rounded-lg focus:outline-none focus:ring-1 ${
                errors.username 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:border-orange-500 focus:ring-orange-500'
              }`}
              required
            />
            {errors.username && (
              <span className="text-red-500 text-sm mt-1">{errors.username}</span>
            )}
          </div>

          {/* email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="font-bold text-gray-800">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Masukkan Email"
              className={`w-full px-3 py-2 text-gray-600 border rounded-lg focus:outline-none focus:ring-1 ${
                errors.email 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:border-orange-500 focus:ring-orange-500'
              }`}
              required
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-1">{errors.email}</span>
            )}
          </div>

          {/* password */}
          <div className="flex flex-col">
            <label htmlFor="password" className="font-bold text-gray-800">
              Password
              <span className="text-sm font-normal text-gray-500 ml-1">(Kosongkan jika tidak ingin mengubah)</span>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Masukkan Password Baru (min. 6 karakter)"
              className={`w-full px-3 py-2 text-gray-600 border rounded-lg focus:outline-none focus:ring-1 ${
                errors.password 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:border-orange-500 focus:ring-orange-500'
              }`}
              minLength="6"
            />
            {errors.password && (
              <span className="text-red-500 text-sm mt-1">{errors.password}</span>
            )}
          </div>

          {/* role */}
          <div className="flex flex-col">
            <label htmlFor="role" className="font-bold text-gray-800">
              Role <span className="text-red-500">*</span>
            </label>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              required
            >
              <option value="admin">Admin</option>
              <option value="super_admin">Super Admin</option>
              <option value="moderator">Moderator</option>
            </select>
          </div>

          {/* phone_number */}
          <div className="flex flex-col">
            <label htmlFor="phone_number" className="font-bold text-gray-800">
              No. HP
            </label>
            <input
              type="tel"
              name="phone_number"
              id="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              placeholder="Masukkan Nomor HP (Opsional)"
              className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>

          {/* bio */}
          <div className="flex flex-col">
            <label htmlFor="bio" className="font-bold text-gray-800">
              Bio Singkat
            </label>
            <textarea
              name="bio"
              id="bio"
              rows="3"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Masukkan Bio Singkat (Opsional)"
              className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 resize-vertical"
            />
          </div>

          {/* input gambar */}
          <div className="w-full">
            <label className="block font-semibold mb-2 text-gray-800">
              Foto Profil
              <span className="text-sm font-normal text-gray-500 ml-1">(Opsional)</span>
            </label>

            {/* Kotak Upload */}
            <label
              htmlFor="upload"
              className={`flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                preview 
                  ? 'border-orange-300 bg-orange-50' 
                  : 'border-gray-300 bg-white hover:bg-gray-50'
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
                      setFormData(prev => ({ ...prev, foto: null }));
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
              <span className="text-red-500 text-sm mt-1">{errors.foto}</span>
            )}
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <span className="text-red-700 text-sm">{errors.submit}</span>
            </div>
          )}

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
              {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserJurusan;