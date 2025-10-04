import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const TambahJabatan = () => {
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
        <h1 className="font-bold text-gray-800 text-3xl lg:text-4xl">
          Tambah Data Jabatan
        </h1>
      </div>

      <div>
        <form action="" className="flex flex-col gap-5">
          {/* jabatan */}
          <div className="flex flex-col">
            <label htmlFor="jabatan" className="font-bold text-gray-800">
              Jabatan
            </label>
            <input
              type="text"
              name="jabatan"
              id="jabatan"
              placeholder="Masukkan Jabatan Baru"
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

export default TambahJabatan;
