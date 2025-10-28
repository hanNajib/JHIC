import { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useWebSettings, useUpdateWebSettings } from "../../../hooks/api/useWebSettings";
import { Loading } from "../../../components/ui";
import Swal from "sweetalert2";
import { IoIosArrowBack } from "react-icons/io";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const WebSetting = () => {
  const navigate = useNavigate();
  const { data: webSettings, isLoading } = useWebSettings();
  const updateWebSettings = useUpdateWebSettings();
  
  const [formData, setFormData] = useState({});
  const [originalData, setOriginalData] = useState({}); // Track original data
  const [previewLogo, setPreviewLogo] = useState("");
  const [previewHero, setPreviewHero] = useState("");

  useEffect(() => {
    if (webSettings?.data) {
      const initialData = {};
      webSettings.data.forEach((setting) => {
        initialData[setting.title] = setting.value;
      });
      setFormData(initialData);
      setOriginalData(initialData);
      
      if (initialData.logo_sekolah) {
        setPreviewLogo(initialData.logo_sekolah);
      }
      if (initialData.hero_image) {
        setPreviewHero(initialData.hero_image);
      }
    }
  }, [webSettings]);

  const hasChanges = () => {
    return Object.entries(formData).some(([title, value]) => {
      if (!value) return false;
      if (value instanceof File) return true;
      if (typeof value === 'string' && value.startsWith('http')) return false;
      return value !== originalData[title];
    });
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewLogo(URL.createObjectURL(file));
      handleInputChange("logo_sekolah", file);
    }
  };

  const handleHeroChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewHero(URL.createObjectURL(file));
      handleInputChange("hero_image", file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const changedFields = Object.entries(formData).filter(([title, value]) => {
        if (!value) return false;
        
        if (value instanceof File) return true;
        
        if (typeof value === 'string' && value.startsWith('http')) return false;
        
        return value !== originalData[title];
      });

      if (changedFields.length === 0) {
        Swal.fire({
          icon: "info",
          title: "Tidak Ada Perubahan",
          text: "Tidak ada data yang diubah",
        });
        return;
      }

      const updatePromises = changedFields.map(([title, value]) => {
        if (value instanceof File) {
          const data = new FormData();
          data.append('value', value);
          return updateWebSettings.mutateAsync({ title, data });
        }
        return updateWebSettings.mutateAsync({ 
          title, 
          data: { value } 
        });
      });

      await Promise.all(updatePromises);
      
      setOriginalData({ ...formData });
      
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: `${changedFields.length} pengaturan berhasil diperbarui`,
      });
    } catch (error) {
      console.error('Error updating settings:', error);
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: error?.response?.data?.message || error?.message || "Terjadi kesalahan saat memperbarui pengaturan",
      });
    }
  };

  if (isLoading) {
    return <Loading variant="spinner" size="large" />;
  }

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
          Pengaturan Website
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">

        <div className="flex justify-center flex-col lg:flex-row items-start gap-5">
          {/* INFORMASI UMUM */}
          <div className="flex flex-col gap-4 bg-gray-50 w-full p-5 rounded-lg border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-orange-500 pb-2">
              Informasi Umum
            </h2>

            {/* Judul Halaman */}
            <div className="flex flex-col">
              <label
                htmlFor="judul_halaman"
                className="font-bold text-gray-800 mb-1"
              >
                Judul Halaman
              </label>
              <input
                type="text"
                id="judul_halaman"
                value={formData.judul_halaman || ""}
                onChange={(e) => handleInputChange("judul_halaman", e.target.value)}
                className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:border-orange-500 focus:ring-orange-500"
                placeholder="Masukkan judul halaman"
              />
            </div>

            {/* Deskripsi Halaman */}
            <div className="flex flex-col">
              <label
                htmlFor="deskripsi_halaman"
                className="font-bold text-gray-800 mb-1"
              >
                Deskripsi Halaman
              </label>
              <textarea
                id="deskripsi_halaman"
                value={formData.deskripsi_halaman || ""}
                onChange={(e) => handleInputChange("deskripsi_halaman", e.target.value)}
                rows="4"
                className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:border-orange-500 focus:ring-orange-500"
                placeholder="Masukkan deskripsi halaman"
              />
            </div>

            {/* Deskripsi Footer */}
            <div className="flex flex-col">
              <label
                htmlFor="deskripsi_footer"
                className="font-bold text-gray-800 mb-1"
              >
                Deskripsi Footer
              </label>
              <textarea
                id="deskripsi_footer"
                value={formData.deskripsi_footer || ""}
                onChange={(e) => handleInputChange("deskripsi_footer", e.target.value)}
                rows="3"
                className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:border-orange-500 focus:ring-orange-500"
                placeholder="Masukkan deskripsi footer"
              />
            </div>

            {/* Tahun Berdiri */}
            <div className="flex flex-col">
              <label
                htmlFor="tahun_berdiri"
                className="font-bold text-gray-800 mb-1"
              >
                Tahun Berdiri
              </label>
              <input
                type="text"
                id="tahun_berdiri"
                value={formData.tahun_berdiri || ""}
                onChange={(e) => handleInputChange("tahun_berdiri", e.target.value)}
                className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:border-orange-500 focus:ring-orange-500"
                placeholder="Masukkan tahun berdiri"
              />
            </div>
          </div>

          {/* KONTAK & SOSIAL MEDIA */}
          <div className="flex flex-col gap-4 bg-gray-50 w-full p-5 rounded-lg border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-orange-500 pb-2">
              Kontak & Sosial Media
            </h2>

            {/* Email */}
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="font-bold text-gray-800 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email || ""}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:border-orange-500 focus:ring-orange-500"
                placeholder="Masukkan email"
              />
            </div>

            {/* Telepon */}
            <div className="flex flex-col">
              <label
                htmlFor="telepon"
                className="font-bold text-gray-800 mb-1"
              >
                Telepon
              </label>
              <input
                type="text"
                id="telepon"
                value={formData.telepon || ""}
                onChange={(e) => handleInputChange("telepon", e.target.value)}
                className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:border-orange-500 focus:ring-orange-500"
                placeholder="Masukkan nomor telepon"
              />
            </div>

            {/* Alamat */}
            <div className="flex flex-col">
              <label
                htmlFor="alamat"
                className="font-bold text-gray-800 mb-1"
              >
                Alamat
              </label>
              <textarea
                id="alamat"
                value={formData.alamat || ""}
                onChange={(e) => handleInputChange("alamat", e.target.value)}
                rows="3"
                className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:border-orange-500 focus:ring-orange-500"
                placeholder="Masukkan alamat lengkap"
              />
            </div>

            {/* YouTube */}
            <div className="flex flex-col">
              <label
                htmlFor="youtube_link"
                className="font-bold text-gray-800 mb-1"
              >
                Link YouTube
              </label>
              <input
                type="url"
                id="youtube_link"
                value={formData.youtube_link || ""}
                onChange={(e) => handleInputChange("youtube_link", e.target.value)}
                className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:border-orange-500 focus:ring-orange-500"
                placeholder="https://youtube.com/..."
              />
            </div>

            {/* Facebook */}
            <div className="flex flex-col">
              <label
                htmlFor="facebook_link"
                className="font-bold text-gray-800 mb-1"
              >
                Link Facebook
              </label>
              <input
                type="url"
                id="facebook_link"
                value={formData.facebook_link || ""}
                onChange={(e) => handleInputChange("facebook_link", e.target.value)}
                className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:border-orange-500 focus:ring-orange-500"
                placeholder="https://facebook.com/..."
              />
            </div>

            {/* Instagram */}
            <div className="flex flex-col">
              <label
                htmlFor="instagram_link"
                className="font-bold text-gray-800 mb-1"
              >
                Link Instagram
              </label>
              <input
                type="url"
                id="instagram_link"
                value={formData.instagram_link || ""}
                onChange={(e) => handleInputChange("instagram_link", e.target.value)}
                className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:border-orange-500 focus:ring-orange-500"
                placeholder="https://instagram.com/..."
              />
            </div>
          </div>
        </div>

        {/* KONTEN EDITOR */}
        <div className="flex flex-col gap-5">
          {/* Deskripsi About */}
          <div className="flex flex-col gap-4 bg-gray-50 w-full p-5 rounded-lg border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-orange-500 pb-2">
              Deskripsi About
            </h2>
            <Editor
              apiKey="z1lkqlsk4vjd7irjkvmackpeb4dq8dz0hisyrfb09w6x7c2c"
              value={formData.deskripsi_about || ""}
              onEditorChange={(content) => handleInputChange("deskripsi_about", content)}
              init={{
                height: 300,
                menubar: false,
                plugins: "lists link table code",
                toolbar:
                  "undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist | code",
                content_style:
                  "body { font-family:Inter,Arial,sans-serif; font-size:14px; color:#4B5563; }",
              }}
            />
          </div>

          {/* Kata Sambutan */}
          <div className="flex flex-col gap-4 bg-gray-50 w-full p-5 rounded-lg border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-orange-500 pb-2">
              Kata Sambutan Kepala Sekolah
            </h2>
            <Editor
              apiKey="z1lkqlsk4vjd7irjkvmackpeb4dq8dz0hisyrfb09w6x7c2c"
              value={formData.kata_sambutan || ""}
              onEditorChange={(content) => handleInputChange("kata_sambutan", content)}
              init={{
                height: 300,
                menubar: false,
                plugins: "lists link table code",
                toolbar:
                  "undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist | code",
                content_style:
                  "body { font-family:Inter,Arial,sans-serif; font-size:14px; color:#4B5563; }",
              }}
            />
          </div>

          {/* Visi */}
          <div className="flex flex-col gap-4 bg-gray-50 w-full p-5 rounded-lg border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-orange-500 pb-2">
              Visi
            </h2>
            <Editor
              apiKey="z1lkqlsk4vjd7irjkvmackpeb4dq8dz0hisyrfb09w6x7c2c"
              value={formData.visi || ""}
              onEditorChange={(content) => handleInputChange("visi", content)}
              init={{
                height: 300,
                menubar: false,
                plugins: "lists link table code",
                toolbar:
                  "undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist | code",
                content_style:
                  "body { font-family:Inter,Arial,sans-serif; font-size:14px; color:#4B5563; }",
              }}
            />
          </div>

          <div className="flex flex-col gap-4 bg-gray-50 w-full p-5 rounded-lg border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-orange-500 pb-2">
              Misi
            </h2>
            <Editor
              apiKey="z1lkqlsk4vjd7irjkvmackpeb4dq8dz0hisyrfb09w6x7c2c"
              value={formData.misi || ""}
              onEditorChange={(content) => handleInputChange("misi", content)}
              init={{
                height: 300,
                menubar: false,
                plugins: "lists link table code",
                toolbar:
                  "undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist | code",
                content_style:
                  "body { font-family:Inter,Arial,sans-serif; font-size:14px; color:#4B5563; }",
              }}
            />
          </div>

          {/* Logo & Hero Images */}
          <div className="flex flex-col lg:flex-row gap-5">
            {/* Logo Sekolah */}
            <div className="flex flex-col gap-4 bg-gray-50 w-full p-5 rounded-lg border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 border-b-2 border-orange-500 pb-2">
                Logo Sekolah
              </h2>
              <div className="flex flex-col">
                <label
                  htmlFor="logo_sekolah"
                  className="font-bold text-gray-800 mb-2"
                >
                  Upload Logo
                </label>
                <label
                  htmlFor="logo_sekolah"
                  className={`flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                    previewLogo || formData.logo_sekolah
                      ? "border-orange-300 bg-orange-50"
                      : "border-gray-300 bg-white hover:bg-gray-50"
                  }`}
                >
                  {previewLogo || formData.logo_sekolah ? (
                    <div className="relative p-4">
                      <img
                        src={previewLogo || formData.logo_sekolah}
                        alt="Preview Logo"
                        className="h-48 w-48 object-contain rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setPreviewLogo("");
                          handleInputChange("logo_sekolah", null);
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
                        Klik untuk pilih logo
                      </p>
                      <p className="text-xs text-gray-400">
                        Format: PNG, JPEG, JPG
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    id="logo_sekolah"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Hero Image */}
            <div className="flex flex-col gap-4 bg-gray-50 w-full p-5 rounded-lg border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 border-b-2 border-orange-500 pb-2">
                Hero Image
              </h2>
              <div className="flex flex-col">
                <label
                  htmlFor="hero_image"
                  className="font-bold text-gray-800 mb-2"
                >
                  Upload Hero Image
                </label>
                <label
                  htmlFor="hero_image"
                  className={`flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                    previewHero || formData.hero_image
                      ? "border-orange-300 bg-orange-50"
                      : "border-gray-300 bg-white hover:bg-gray-50"
                  }`}
                >
                  {previewHero || formData.hero_image ? (
                    <div className="relative p-4">
                      <img
                        src={previewHero || formData.hero_image}
                        alt="Preview Hero"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setPreviewHero("");
                          handleInputChange("hero_image", null);
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
                        Klik untuk pilih hero image
                      </p>
                      <p className="text-xs text-gray-400">
                        Format: PNG, JPEG, JPG
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    id="hero_image"
                    accept="image/*"
                    onChange={handleHeroChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Tombol Aksi */}
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
            disabled={updateWebSettings.isPending || !hasChanges()}
            className="px-8 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {updateWebSettings.isPending ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default WebSetting;
