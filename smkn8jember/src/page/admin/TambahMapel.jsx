import { IoIosArrowBack } from "react-icons/io";
import { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Drop from "../../components/ui/DropdownSelect";

const TambahMapel = () => {
  const navigate = useNavigate();

  const [judul, setJudul] = useState("");
  const [konten, setKonten] = useState("");
  const [mapel, setMapel] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      judul: judul,
      konten: konten,
    });
  };

  const [kategori, setKategori] = useState([]);
  useEffect(() => {
    fetch("/drop.json")
      .then((res) => res.json())
      .then((data) => setKategori(data));
  }, []);

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
          Tambah Mapel
        </h1>
      </div>

      <div>
        <form action="" className="flex flex-col gap-5">
          {/* mapel */}
          <div className="flex flex-col">
            <label htmlFor="mapel" className="font-bold text-gray-800">
              Mapel
            </label>
            <input
              type="text"
              name="mapel"
              id="mapel"
              placeholder="Masukkan Mapel Umum Jurusan"
              className="w-full px-3 py-1 text-gray-600 border border-gray-600 rounded-lg focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
            />
          </div>

          {/* mapel */}
          <Drop
            label="mapel"
            name="mapel"
            options={kategori} 
            value={mapel} 
            onChange={(e) => setMapel(e.target.value)} 
            placeholder="Pilih Mapel"
            showPlaceholder={true}
          />

          {/* deskripsi */}
          <div className="flex flex-col">
            <label htmlFor="deskripsi" className="font-bold text-gray-800">
              Deskripsi Singkat
            </label>
            <input
              type="text"
              name="deskripsi"
              id="deskripsi"
              placeholder="Masukkan Deskripsi Singkat"
              className="w-full px-3 py-1 text-gray-600 border border-gray-600 rounded-lg focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
            />
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

export default TambahMapel;
