import { IoIosArrowBack } from "react-icons/io";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

const EditStrukturOrganisasi = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // ambil id dari URL
  const [jabatan, setJabatan] = useState([]);
  const [preview, setPreview] = useState(null);

  // Fetch data jabatan dari JSON
  useEffect(() => {
    fetch("/guru.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((a) => a.id === parseInt(id));
        setJabatan(found);
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
      nama: jabatan.nama,
      jabatan: jabatan.jabatan,
      mapel: jabatan.mapel,
      foto: preview || jabatan.foto,
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
        <h1 className="font-bold text-gray-800 text-3xl lg:text-4xl">Edit Data Jabatan</h1>
      </div>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {/* Jabatan */}
        <div className="flex flex-col">
          <label htmlFor="jabatan" className="font-bold text-gray-800">
            Jabatan
          </label>
          <input
            type="text"
            id="jabatan"
            value={jabatan.jabatan}
            onChange={(e) =>
              setJabatan({ ...jabatan, jabatan: e.target.value })
            }
            placeholder="Masukkan Nama Jabatan"
            className="w-full px-3 py-1 text-gray-600 border border-gray-600 rounded-lg focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
          />
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

export default EditStrukturOrganisasi;
