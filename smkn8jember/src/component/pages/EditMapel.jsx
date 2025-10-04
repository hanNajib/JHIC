import { IoIosArrowBack } from "react-icons/io";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const EditMapel = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // ambil id dari URL
  const [mapel, setMapel] = useState([]);

  // Fetch data guru dari JSON
  useEffect(() => {
    fetch("/mapel.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((a) => a.id === parseInt(id));
        setMapel(found);
      });
  }, [id]);

  // handle submit (sementara console log)
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log({
    //   nama: mapel.nama,
    //   jabatan: mapel.jabatan,
    //   mapel: mapel.mapel,
    //   foto: preview || mapel.foto,
    // });
    alert("Data siap dikirim ke backend (lihat console)");
  };

  return (
    <div className="flex flex-col justify-center gap-10 w-full h-fit bg-white rounded-lg p-5">
      {/* Title */}
      <div className="flex items-center w-screen gap-3">
        <button
          onClick={() => navigate(-1)}
          className="bg-orange-500 text-3xl lg:text-4xl text-center p-1 rounded-4xl text-white"
        >
          <IoIosArrowBack />
        </button>
        <h1 className="font-bold text-gray-800 text-3xl lg:text-4xl">Edit Data Mapel</h1>
      </div>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {/* mapel */}
        <div className="flex flex-col">
          <label htmlFor="mapel" className="font-bold text-gray-800">
            Mapel
          </label>
          <input
            type="text"
            id="mapel"
            value={mapel.mapel || ""}
            onChange={(e) => setMapel({ ...mapel, mapel: e.target.value })}
            placeholder="Masukkan Mapel Umum Jurusan"
            className="w-full px-3 py-1 text-gray-600 border border-gray-600 rounded-lg focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
          />
        </div>

        {/* jurusan */}
        <div className="flex flex-col">
          <label htmlFor="jurusan" className="font-bold text-gray-800">
            Jurusan
          </label>
          <input
            type="text"
            id="jurusan"
            value={mapel.jurusan || ""}
            onChange={(e) => setMapel({ ...mapel, jurusan: e.target.value })}
            placeholder="Masukkan Jurusan"
            className="w-full px-3 py-1 text-gray-600 border border-gray-600 rounded-lg focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
          />
        </div>

        {/* deskripsi */}
        <div className="flex flex-col">
          <label htmlFor="deskripsi" className="font-bold text-gray-800">
            Deskripsi
          </label>
          <input
            type="text"
            id="deskripsi"
            value={mapel.deskripsi || ""}
            onChange={(e) => setMapel({ ...mapel, deskripsi: e.target.value })}
            placeholder="Masukkan Deskripsi Singkat"
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

export default EditMapel;
