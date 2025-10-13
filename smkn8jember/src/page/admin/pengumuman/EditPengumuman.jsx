import { IoIosArrowBack } from "react-icons/io";
import { Editor } from "@tinymce/tinymce-react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditPengumuman = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // ambil id dari URL
  const [artikel, setArtikel] = useState([]);
  const [kategori, setKategori] = useState("");
  const [konten, setKonten] = useState("");
  const [preview, setPreview] = useState(null);

  const kategoriList = ["Info", "Penting"];

  // fetch data artikel
  useEffect(() => {
    fetch("/pengumuman.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((a) => a.id === parseInt(id));
        setArtikel(found);
        if (found) {
          setKonten(found.deskripsi || "");
          setKategori(found.kategori || "");
          setPreview(found.gambar || null); // <-- set gambar dari JSON
        }
      });
  }, [id]);

  // handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      judul: artikel.judul,
      konten: konten,
      kategori: kategori,
      gambar: preview,
    });
    alert("Data siap dikirim ke backend (lihat console)");
  };

  // handle checkbox kategori
  const handleChange = (value) => {
    setKategori(value);
  };

  // handle upload gambar
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
        className="bg-orange-500 text-3xl lg:text-4xl text-center p-1 rounded-4xl text-white"
      >
        <IoIosArrowBack />
      </a>
      <h1 className="font-bold text-gray-900 text-2xl md:text-3xl lg:text-4xl">Edit Pengumuman</h1>
    </div>

    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Judul */}
        <div className="flex flex-col">
          <label htmlFor="judul" className="font-bold text-gray-800">
            Judul
          </label>
          <input
            type="text"
            name="judul"
            id="judul"
            value={artikel.judul}
            onChange={(e) => setArtikel({ ...artikel, judul: e.target.value })}
            placeholder="Masukkan Judul Pengumuman"
            className="w-full px-3 py-1 text-gray-600 border border-gray-600 rounded-lg focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
          />
        </div>

        {/* Input Radio Kategori */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-800">Kategori</label>
          <div className="flex flex-col">
            {kategoriList.map((item) => (
              <label
                key={item}
                className="flex items-center gap-2 text-sm text-gray-600"
              >
                <input
                  type="radio"
                  value={item}
                  checked={kategori === item}
                  onChange={() => handleChange(item)}
                  className="accent-orange-500"
                />
                {item}
              </label>
            ))}
          </div>
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
              plugins: "lists link image table code",
              toolbar:
                "undo redo | bold italic | bullist numlist",
                placeholder: "Masukkan Deskripsi Pengumuman"
            }}
          />
        </div>

        {/* Upload Gambar */}
        <div className="w-full">
          <label className="block font-semibold mb-2 text-gray-800">
            Gambar
          </label>
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
              <img src={artikel.image} alt="" />
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
            onClick={() => window.location.reload()}
            className="py-1 w-24 text-orange-500 text-sm md:text-base font-bold border-[1.9px] border-orange-500 rounded-4xl hover:bg-orange-500 hover:text-white transition duration-300"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  </div>
);

};

export default EditPengumuman;
