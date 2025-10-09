import { IoIosArrowBack } from "react-icons/io";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

const WebSetting = () => {
  const id = 1;
  const [websetting, setWebSetting] = useState([]);
  // console.log(websetting);

  useEffect(() => {
    fetch("/websetting.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((a) => a.id === parseInt(id));
        setWebSetting(found || null);
      });
  }, [id]);

  const [previewLogo, setPreviewLogo] = useState("");
  const [previewHero, setPreviewHero] = useState("");
  console.log(previewLogo);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreviewLogo(URL.createObjectURL(file));
  };

  const handleHeroChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreviewHero(URL.createObjectURL(file));
  };

  return (
    <div className="flex justify-center gap-5 ">
      <form className="flex flex-col gap-5 w-full">
        <div className="flex justify-center flex-col lg:flex-row items-start gap-5">
          {/* GENERAL SETTING */}
          <div className="flex flex-col gap-4 bg-white w-full p-5 rounded-lg">
            <h1 className="text-3xl font-bold text-gray-800">
              General Setting
            </h1>

            {/* titleHeroSection */}
            <div className="flex flex-col">
              <label
                htmlFor="titleHeroSection"
                className="font-bold text-gray-800"
              >
                Title Hero Section
              </label>
              <input
                type="text"
                id="titleHeroSection"
                value={websetting.titleHeroSection}
                onChange={(e) =>
                  setWebSetting({
                    ...websetting,
                    titleHeroSection: e.target.value,
                  })
                }
                placeholder="Masukkan nama websetting"
                className="w-full px-3 py-1 text-gray-600 border border-gray-600 rounded-lg focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
              />
            </div>

            {/* Konten Hero Section TinyMCE */}
            <div>
              <label className="block mb-1 font-semibold text-gray-800">
                Deskripsi Hero Section
              </label>
              <Editor
                apiKey="z1lkqlsk4vjd7irjkvmackpeb4dq8dz0hisyrfb09w6x7c2c"
                value={websetting.descHeroSection}
                onEditorChange={(newContent) =>
                  setWebSetting({
                    ...websetting,
                    descHeroSection: newContent,
                  })
                }
                init={{
                  height: 300,
                  menubar: false,
                  plugins: "lists link table code",
                  toolbar:
                    "undo redo | bold italic | bullist numlist | link | code",
                }}
              />
            </div>

            {/* Konten Footer TinyMCE */}
            <div>
              <label className="block mb-1 font-semibold text-gray-800">
                Deskripsi Footer
              </label>
              <Editor
                apiKey="z1lkqlsk4vjd7irjkvmackpeb4dq8dz0hisyrfb09w6x7c2c"
                value={websetting.descFooter}
                onEditorChange={(newContent) =>
                  setWebSetting({
                    ...websetting,
                    descFooter: newContent,
                  })
                }
                init={{
                  height: 300,
                  menubar: false,
                  plugins: "lists link table code",
                  toolbar:
                    "undo redo | bold italic | bullist numlist | link | code",
                }}
              />
            </div>

            {/* Konten About TinyMCE */}
            <div>
              <label className="block mb-1 font-semibold text-gray-800">
                Deskripsi About
              </label>
              <Editor
                apiKey="z1lkqlsk4vjd7irjkvmackpeb4dq8dz0hisyrfb09w6x7c2c"
                value={websetting.descAbout}
                onEditorChange={(newContent) =>
                  setWebSetting({
                    ...websetting,
                    descAbout: newContent,
                  })
                }
                init={{
                  height: 300,
                  menubar: false,
                  plugins: "lists link table code",
                  toolbar:
                    "undo redo | bold italic | bullist numlist | link | code",
                }}
              />
            </div>

            {/* Konten Kata Sambutan TinyMCE */}
            <div>
              <label className="block mb-1 font-semibold text-gray-800">
                Kata Sambutan
              </label>
              <Editor
                apiKey="z1lkqlsk4vjd7irjkvmackpeb4dq8dz0hisyrfb09w6x7c2c"
                value={websetting.kataSambutan}
                onEditorChange={(newContent) =>
                  setWebSetting({
                    ...websetting,
                    kataSambutan: newContent,
                  })
                }
                init={{
                  height: 300,
                  menubar: false,
                  plugins: "lists link table code",
                  toolbar:
                    "undo redo | bold italic | bullist numlist | link | code",
                }}
              />
            </div>

            {/* Grid Input */}
            <div className="grid grid-cols-2 gap-3">
              {/* Jumlah Siswa */}
              <div className="flex flex-col">
                <label
                  htmlFor="jumlahsiswa"
                  className="font-bold text-gray-800"
                >
                  Jumlah Siswa
                </label>
                <input
                  type="text"
                  id="jumlahsiswa"
                  value={websetting.jumlahSiswa}
                  onChange={(e) =>
                    setWebSetting({
                      ...websetting,
                      jumlahSiswa: e.target.value,
                    })
                  }
                  placeholder="Berapa Jumlah Siswa"
                  className="w-full px-3 py-1 text-gray-600 border border-gray-600 rounded-lg focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
                />
              </div>

              {/* Jumlah Guru */}
              <div className="flex flex-col">
                <label htmlFor="jumlahguru" className="font-bold text-gray-800">
                  Jumlah Guru
                </label>
                <input
                  type="text"
                  id="jumlahguru"
                  value={websetting.jumlahGuru}
                  onChange={(e) =>
                    setWebSetting({
                      ...websetting,
                      jumlahGuru: e.target.value,
                    })
                  }
                  placeholder="Masukkan jumlah guru"
                  className="w-full px-3 py-1 text-gray-600 border border-gray-600 rounded-lg focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
                />
              </div>

              {/* Tahun Berdiri */}
              <div className="flex flex-col">
                <label
                  htmlFor="tahunBerdiri"
                  className="font-bold text-gray-800"
                >
                  Tahun Berdiri
                </label>
                <input
                  type="text"
                  id="tahunBerdiri"
                  value={websetting.tahunBerdiri}
                  onChange={(e) =>
                    setWebSetting({
                      ...websetting,
                      tahunBerdiri: e.target.value,
                    })
                  }
                  placeholder="Masukkan tahun berdiri"
                  className="w-full px-3 py-1 text-gray-600 border border-gray-600 rounded-lg focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
                />
              </div>

              {/* Tingkat Kesuksesan */}
              <div className="flex flex-col">
                <label htmlFor="sukses" className="font-bold text-gray-800">
                  Tingkat Kesuksesan
                </label>
                <input
                  type="text"
                  id="sukses"
                  value={websetting.sukses}
                  onChange={(e) =>
                    setWebSetting({
                      ...websetting,
                      sukses: e.target.value,
                    })
                  }
                  placeholder="Masukkan tingkat kesuksesan"
                  className="w-full px-3 py-1 text-gray-600 border border-gray-600 rounded-lg focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
                />
              </div>
            </div>
          </div>

          {/* IMAGE SETTING */}
          <div className="w-full flex flex-col gap-5">
            <div className="flex flex-col gap-4 bg-white p-5 rounded-lg">
              <h1 className="text-3xl font-bold text-gray-800">
                Image Setting
              </h1>

              {/* Upload Gambar */}
              <div className="w-full">
                <label className="block font-semibold mb-2">Logo</label>
                <label
                  htmlFor="upload"
                  className="flex flex-col items-center justify-center w-full h-fit border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50"
                >
                  {previewLogo ? (
                    <img
                      src={previewLogo}
                      alt="ok"
                      className="h-full object-contain rounded-lg"
                    />
                  ) : (
                    <img src={websetting.logo} alt="ok" />
                  )}
                  <input
                    id="upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoChange}
                  />
                </label>
              </div>
              {/* Upload Gambar */}
              <div className="w-full">
                <label className="block font-semibold mb-2">
                  Gambar Hero Section
                </label>
                <label
                  htmlFor="upload"
                  className="flex flex-col items-center justify-center w-full h-fit border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50"
                >
                  {previewHero ? (
                    <img
                      src={previewHero}
                      alt="Preview"
                      className="h-full object-contain rounded-lg"
                    />
                  ) : (
                    <img src={websetting.gambarHeroSection} alt="" />
                  )}
                  <input
                    id="upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleHeroChange}
                  />
                </label>
              </div>
            </div>

            {/* LINK SETTING */}
            <div className="flex flex-col gap-4 bg-white p-5 rounded-lg">
              <h1 className="text-3xl font-bold text-gray-800">Link Setting</h1>

              {/* Link YT */}
              <div className="flex flex-col">
                <label htmlFor="linkYT" className="font-bold text-gray-800">
                  Link Youtube
                </label>
                <input
                  type="text"
                  id="linkYT"
                  value={websetting.linkYT}
                  onChange={(e) =>
                    setWebSetting({
                      ...websetting,
                      linkYT: e.target.value,
                    })
                  }
                  placeholder="Masukkan link YouTube"
                  className="w-full px-3 py-1 text-gray-600 border border-gray-600 rounded-lg focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
                />
              </div>

              {/* Link IG */}
              <div className="flex flex-col">
                <label htmlFor="linkIG" className="font-bold text-gray-800">
                  Link Instagram
                </label>
                <input
                  type="text"
                  id="linkIG"
                  value={websetting.linkIG}
                  onChange={(e) =>
                    setWebSetting({
                      ...websetting,
                      linkIG: e.target.value,
                    })
                  }
                  placeholder="Masukkan link Instagram"
                  className="w-full px-3 py-1 text-gray-600 border border-gray-600 rounded-lg focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
                />
              </div>

              {/* Link FB */}
              <div className="flex flex-col">
                <label htmlFor="linkFB" className="font-bold text-gray-800">
                  Link Facebook
                </label>
                <input
                  type="text"
                  id="linkFB"
                  value={websetting.linkFB}
                  onChange={(e) =>
                    setWebSetting({
                      ...websetting,
                      linkFB: e.target.value,
                    })
                  }
                  placeholder="Masukkan link Facebook"
                  className="w-full px-3 py-1 text-gray-600 border border-gray-600 rounded-lg focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label htmlFor="email" className="font-bold text-gray-800">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  value={websetting.email}
                  onChange={(e) =>
                    setWebSetting({
                      ...websetting,
                      email: e.target.value,
                    })
                  }
                  placeholder="Masukkan email"
                  className="w-full px-3 py-1 text-gray-600 border border-gray-600 rounded-lg focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
                />
              </div>

              {/* NoHp */}
              <div className="flex flex-col">
                <label htmlFor="nohp" className="font-bold text-gray-800">
                  NoHp
                </label>
                <input
                  type="text"
                  id="nohp"
                  value={websetting.nohp}
                  onChange={(e) =>
                    setWebSetting({
                      ...websetting,
                      nohp: e.target.value,
                    })
                  }
                  placeholder="Masukkan NoHp"
                  className="w-full px-3 py-1 text-gray-600 border border-gray-600 rounded-lg focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
                />
              </div>

              {/* Lokasi */}
              <div className="flex flex-col">
                <label htmlFor="lokasi" className="font-bold text-gray-800">
                  Lokasi
                </label>
                <input
                  type="text"
                  id="lokasi"
                  value={websetting.lokasi}
                  onChange={(e) =>
                    setWebSetting({
                      ...websetting,
                      lokasi: e.target.value,
                    })
                  }
                  placeholder="Masukkan lokasi"
                  className="w-full px-3 py-1 text-gray-600 border border-gray-600 rounded-lg focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button className="bg-orange-500 text-white font-semibold py-1 text-base w-fit px-4 rounded-4xl hover:bg-orange-600">
          Simpan Perubahan
        </button>
        </div>
      </form>
    </div>
  );
};

export default WebSetting;
