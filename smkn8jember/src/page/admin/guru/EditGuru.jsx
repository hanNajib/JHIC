import { IoIosArrowBack } from "react-icons/io";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Drop from "../../../components/ui/DropdownSelect";

const EditGuru = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // ambil id dari URL
  const [guru, setGuru] = useState([]);
  const [preview, setPreview] = useState(null);

  // Daftar pilihan jabatan
  const jabatanOptions = [
    "Kepala Sekolah",
    "Wakil Kepala Sekolah",
    "Komite",
    "Kemasanan",
    "Kesiswaan",
    "Benddahara",
  ];

  // Fetch data guru dari JSON
  useEffect(() => {
    fetch("/guru.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((a) => a.id === parseInt(id));
        setGuru(found);
        if (found?.foto) setPreview(found.foto); // tampilkan foto lama
      });
  }, [id]);

  // handle upload gambar
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // preview sementara
    }
  };

  // handle submit (sementara console log)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      nama: guru.nama,
      jabatan: guru.jabatan,
      mapel: guru.mapel,
      foto: preview || guru.foto,
    });
    alert("Data siap dikirim ke backend (lihat console)");
  };

  return (
    <div className="flex flex-col justify-center gap-10 w-full h-fit bg-white rounded-lg p-5">
      {/* Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="bg-orange-500 text-3xl lg:text-4xl text-center p-1 rounded-4xl text-white"
        >
          <IoIosArrowBack />
        </button>
        <h1 className="font-bold text-gray-900 text-2xl md:text-3xl lg:text-4xl">
          Edit Data Guru
        </h1>
      </div>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {/* Nama */}
        <div className="flex flex-col">
          <label htmlFor="nama" className="font-bold text-gray-800">
            Nama
          </label>
          <input
            type="text"
            id="nama"
            value={guru.nama || ""}
            onChange={(e) => setGuru({ ...guru, nama: e.target.value })}
            placeholder="Masukkan Nama Guru"
            className="w-full px-3 py-1 text-gray-600 border border-gray-600 rounded-lg focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
          />
        </div>

        {/* Jabatan */}
        <Drop
          label="Jabatan"
          name="jabatan"
          options={jabatanOptions}
          value={guru.jabatan}
          onChange={(e) => setGuru({ ...guru, jabatan: e.target.value })}
          showPlaceholder={false}
        />

        {/* Mapel */}
        <div className="flex flex-col">
          <label htmlFor="mapel" className="font-bold text-gray-800">
            Mata Pelajaran
          </label>
          <input
            type="text"
            id="mapel"
            value={guru.mapel || ""}
            onChange={(e) => setGuru({ ...guru, mapel: e.target.value })}
            placeholder="Masukkan Mata Pelajaran"
            className="w-full px-3 py-1 text-gray-600 border border-gray-600 rounded-lg focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
          />
        </div>

        {/* Upload Foto */}
        <div className="w-full">
          <label className="block font-semibold mb-2 text-gray-800">Foto</label>
          <label
            htmlFor="upload"
            className="flex flex-col items-center justify-center w-full h-fit border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50"
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="h-fit object-contain rounded-lg"
              />
            ) : (
              <p className="text-gray-600">Pilih foto guru</p>
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
  );
};

export default EditGuru;
