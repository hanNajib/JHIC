import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ArticleCard } from "../components/ui";

const Profile = () => {
  const [artikel, setArtikel] = useState([]);

  useEffect(() => {
    fetch("/data2.json")
      .then((res) => res.json())
      .then((data) => setArtikel(data));
  }, []);

  return (
    <>
      <Navbar />

      {/* Bagian Profil */}
      <div className="flex flex-col lg:flex-row justify-center items-center px-6 md:px-10 lg:px-16 py-10 gap-10 lg:gap-16">
        {/* Foto Profil */}
        <img
          src="image/fasil.jpg"
          className="w-56 h-56 md:w-72 md:h-72 lg:w-[410px] lg:h-[410px] rounded-full object-cover shadow-md"
          alt="Foto Profile"
        />

        {/* Info Profil */}
        <div className="flex flex-col justify-center gap-6 text-center lg:text-left">
          <h1 className="text-gray-800 font-bold text-3xl md:text-4xl lg:text-5xl">
            Rekayasa Perangkat Lunak
          </h1>

          <div className="flex flex-col gap-1 text-base md:text-lg lg:text-xl">
            <h4 className="text-gray-600">
              Email:{" "}
              <span className="font-semibold">Andrea@gmail.com</span>
            </h4>
            <h4 className="text-gray-600">
              No Hp:{" "}
              <span className="font-semibold">085730857394</span>
            </h4>
          </div>

          <p className="text-orange-500 text-lg md:text-xl font-bold leading-snug">
            “
            <span className="text-gray-600 font-normal">
              {" "}
              Kami Adalah RPL, Jurusan Paling Bikin Pusing dari Jurusan yang
              Lainnya{" "}
            </span>
            ”
          </p>

          {/* Statistik */}
          <div className="flex justify-center lg:justify-start items-center gap-6 mt-4">
            <div className="flex flex-col justify-center items-center font-bold bg-orange-500/20 rounded-lg w-full h-24 border-2 border-orange-500">
              <h3 className="text-orange-500 text-3xl">{artikel.length}</h3>
              <h4 className="text-gray-800 text-lg">Artikel</h4>
            </div>

            <div className="flex flex-col justify-center items-center font-bold bg-orange-500/20 rounded-lg w-full h-24 border-2 border-orange-500">
              <h3 className="text-orange-500 text-3xl">5740</h3>
              <h4 className="text-gray-800 text-lg">Dilihat</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Bagian Artikel */}
      <div className="bg-gray-200 px-6 md:px-10 lg:px-16 py-10">
        <div className="text-center w-full p-2 border-b-4 border-orange-500">
          <h2 className="text-gray-800 text-xl md:text-2xl font-bold">
            Artikel
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 w-full pt-10 gap-6">
          {artikel.map((article, index) => (
            <ArticleCard
              key={article.id}
              article={article}
            />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
