import { IoIosArrowBack } from "react-icons/io";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Drop from "../atom/drop";

const EditKaryawan = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // ambil id dari URL
  const [karyawan, setKaryawan] = useState([]);
  const [preview, setPreview] = useState([]);

  // Daftar pilihan jabatan
  const jabatanOptions = ["TU", "Toolsman", "Satpam"];

  // Fetch data karyawan dari JSON
  useEffect(() => {
    fetch("/guru.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((a) => a.id === parseInt(id));
        setKaryawan(found);
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
      nama: karyawan.nama,
      jabatan: karyawan.jabatan,
      mapel: karyawan.mapel,
      foto: preview || karyawan.foto,
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
        <h1 className="font-bold text-gray-800 text-3xl lg:text-4xl">
          Edit Data Karyawan
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
            value={karyawan.nama || ""}
            onChange={(e) => setKaryawan({ ...karyawan, nama: e.target.value })}
            placeholder="Masukkan Nama Karyawan"
            className="w-full px-3 py-1 text-gray-600 border border-gray-600 rounded-lg focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
          />
        </div>

        {/* Jabatan */}
        <Drop
          label="Jabatan"
          name="jabatan"
          options={jabatanOptions}
          value={karyawan.jabatan}
          onChange={(e) =>
            setKaryawan({ ...karyawan, jabatan: e.target.value })
          }
          showPlaceholder={false}
        />

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
            className="bg-orange-500 text-white font-semibold py-1 text-base w-24 rounded-4xl hover:bg-orange-600"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="py-1 w-24 text-orange-500 text-base font-bold border-[1.9px] border-orange-500 rounded-4xl hover:bg-orange-500 hover:text-white transition duration-300"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditKaryawan;
