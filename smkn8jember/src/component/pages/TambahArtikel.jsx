import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const TambahArtikel = () => {
  const navigate = useNavigate();
  const [kategori, setKategori] = useState("");
  const kategoriList = [
    "RPL",
    "DKV",
    "TKJ",
    "TSM",
    "TKR",
    "APT",
    "ATPH",
    "Prestasi",
    "Karya",
    "Religius",
    "Ekstrakulikuler",
    "Kunjungan",
  ];
  const maxPilihan = 2; // batas maksimal

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

  const handleChange = (value) => {
    if (kategori.includes(value)) {
      // kalau sudah dipilih → uncheck (hapus dari array)
      setKategori(kategori.filter((item) => item !== value));
    } else {
      // kalau belum dipilih
      if (kategori.length < maxPilihan) {
        setKategori([...kategori, value]);
      } else {
        // hapus yang pertama, lalu tambahkan yang baru
        setKategori([...kategori.slice(1), value]);
      }
    }
  };

  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col justify-center gap-14 w-full h-fit bg-white rounded-lg p-5">
      {/* Title */}
      <div className="flex items-center gap-3">
        <a onClick={() => navigate(-1)} className="bg-orange-500 cursor-pointer text-4xl text-center p-1 rounded-4xl text-white">
          <IoIosArrowBack />
        </a>
        <h1 className="font-bold text-gray-800 text-4xl">Tambah Artikel</h1>
      </div>

      <div>
        <form action="" className="flex flex-col gap-5">
          {/* Judul */}
          <div className="flex flex-col">
            <label htmlFor="judul" className="font-bold text-gray-800">
              Judul
            </label>
            <input
              type="text"
              name="judul"
              id="judul"
              placeholder="Masukkan Judul Artikel"
              className="w-full px-3 py-1 border border-gray-700 rounded-lg focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
          {/* Input Radio */}
          <div className="flex flex-col">
            <label className="font-semibold">Kategori (max {maxPilihan})</label>
            <div className="grid grid-rows-7 grid-flow-col gap-2">
              {kategoriList.map((item) => (
                <label key={item} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    value={item}
                    checked={kategori.includes(item)}
                    onChange={() => handleChange(item)}
                    className="accent-orange-500"
                  />
                  {item}
                </label>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Terpilih:{" "}
              {kategori.length > 0 ? kategori.join(", ") : "Belum memilih"}
            </p>
          </div>
          {/* Input Konten pakai TinyMCE */}
          <div>
            <label className="block mb-1 font-semibold">Deskripsi</label>
            <Editor
              apiKey="no-api-key"
              value={konten}
              onEditorChange={(newContent) => setKonten(newContent)}
              init={{
                height: 300,
                menubar: false,
                plugins: "lists link image table code",
                toolbar:
                  "undo redo | bold italic | bullist numlist | link image | code",
              }}
            />
          </div>

          {/* input gambar */}
          <div className="w-full">
            <label className="block font-semibold mb-2">Masukkan Gambar</label>

            {/* Kotak Upload */}
            <label
              htmlFor="upload"
              className="flex flex-col items-center justify-center w-full h-fit border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50"
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
            <button className="bg-orange-500 text-white font-semibold py-1 text-base w-24 rounded-4xl hover:bg-orange-600">Save</button>
            <button className="py-1 w-24 text-orange-500 text-base font-bold border-[1.9px] border-orange-500 rounded-4xl hover:bg-orange-500 hover:text-white transition duration-300">Reset</button>
          </div>
          <button>save</button>
        </form>
      </div>
    </div>
  );
};

export default TambahArtikel;
