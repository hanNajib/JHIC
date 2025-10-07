import { IoIosArrowBack } from "react-icons/io";
import { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const TambahJurusan = () => {
  const navigate = useNavigate();

  const [judul, setJudul] = useState("");
  const [konten, setKonten] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // data siap dikirim ke backend
    console.log({
      judul: judul,
      konten: konten,
    });
  };

  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col justify-center gap-10 w-full h-fit bg-white rounded-lg p-5">
      {/* Title */}
      <div className="flex items-center gap-3">
        <a
          onClick={() => navigate(-1)}
          className="bg-orange-500 cursor-pointer text-3xl lg:text-4xl text-center p-1 rounded-4xl text-white"
        >
          <IoIosArrowBack />
        </a>
        <h1 className="font-bold text-gray-900 text-2xl md:text-3xl lg:text-4xl">
          Tambah Data Jurusan
        </h1>
      </div>

      <div>
        <form action="" className="flex flex-col gap-5">
          {/* jurusan */}
          <div className="flex flex-col">
            <label htmlFor="nama" className="font-bold text-gray-800">
              Nama Jurusan
            </label>
            <input
              type="text"
              name="nama"
              id="nama"
              placeholder="Masukkan Nama Jurusan"
              className="w-full px-3 py-1 text-gray-600 border border-gray-600 rounded-lg focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
            />
          </div>

          {/* Konten pakai TinyMCE */}
          <div>
            <label className="block mb-1 font-semibold text-gray-800">
              Deskripsi
            </label>
            <Editor
              apiKey="z1lkqlsk4vjd7irjkvmackpeb4dq8dz0hisyrfb09w6x7c2c"
              value={konten}
              onEditorChange={(newContent) => setKonten(newContent)}
              init={{
                height: 300,
                menubar: false,
                plugins: "lists link table code",
                toolbar: "undo redo | bold italic underline",
                content_style:
                  "body { font-family:Inter,Arial,sans-serif; font-size:14px; color:#4B5563; }", // gray-600
              }}
            />
          </div>

          {/* input gambar */}
          <div className="w-full">
            <label className="block font-semibold mb-2 text-gray-800">
              Gambar
            </label>

            {/* Kotak Upload */}
            <label
              htmlFor="upload"
              className="flex flex-col items-center justify-center w-full h-fit border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-full object-contain rounded-lg"
                />
              ) : (
                <div className="py-10 flex flex-col items-center justify-center">
                  <IoCloudUploadOutline className="text-6xl text-gray-600" />
                  <p className="text-gray-600 font-medium">
                    Klik Untuk Pilih Gambar
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
          </div>

          <div className="flex gap-3 justify-end">
            <button className="bg-orange-500 text-white font-semibold py-1 text-base w-24 rounded-4xl hover:bg-orange-600">
              Save
            </button>
            <button className="py-1 w-24 text-orange-500 text-base font-bold border-[1.9px] border-orange-500 rounded-4xl hover:bg-orange-500 hover:text-white transition duration-300">
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahJurusan;
