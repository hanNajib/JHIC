import { useState } from "react";
import Navbar from "../../components/Navbar";
import { ArticleCard, Button } from "../../components/ui";
import Footer from "../../components/Footer";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// Data sampel artikel untuk halaman Artikel
const sampleArticles = [
  {
    id: 1,
    title: "Juara 1 Lomba Kompetensi Siswa Tingkat Provinsi",
    description: "Siswa SMKN 8 Jember meraih prestasi gemilang dengan menjadi juara 1 dalam lomba kompetensi siswa tingkat provinsi.",
    image: "/assets/images/artikel-1.jpg",
    date: "2024-03-15",
    category: "Prestasi",
    tags: ["Prestasi", "LKS"]
  },
  {
    id: 2,
    title: "Workshop Teknologi Industri 4.0",
    description: "SMKN 8 Jember mengadakan workshop teknologi industri 4.0 untuk meningkatkan kompetensi siswa.",
    image: "/assets/images/artikel-2.jpg",
    date: "2024-03-10",
    category: "Kegiatan",
    tags: ["Workshop", "Teknologi"]
  },
  {
    id: 3,
    title: "Kunjungan Industri ke PT. Astra",
    description: "Siswa melakukan kunjungan industri ke PT. Astra untuk melihat langsung praktik kerja di dunia industri.",
    image: "/assets/images/artikel-3.jpg",
    date: "2024-03-05",
    category: "Kunjungan",
    tags: ["Kunjungan", "Industri"]
  },
  {
    id: 4,
    title: "Pelantikan OSIS Periode 2024",
    description: "Pelantikan pengurus OSIS baru periode 2024 dilaksanakan dengan khidmat di aula sekolah.",
    image: "/assets/images/artikel-4.jpg",
    date: "2024-02-28",
    category: "Kegiatan",
    tags: ["OSIS", "Kegiatan"]
  },
  {
    id: 5,
    title: "Pelatihan Digital Marketing",
    description: "Workshop digital marketing untuk siswa jurusan bisnis dan manajemen.",
    image: "/assets/images/artikel-5.jpg",
    date: "2024-02-20",
    category: "Workshop",
    tags: ["Workshop", "Digital"]
  },
  {
    id: 6,
    title: "Expo Karya Siswa 2024",
    description: "Pameran karya siswa dari berbagai jurusan menampilkan inovasi dan kreativitas.",
    image: "/assets/images/artikel-6.jpg",
    date: "2024-02-15",
    category: "Event",
    tags: ["Event", "Karya"]
  }
];

const ArtikelPage = () => {
  const [sort, setSort] = useState("terbaru");
  const [category, setCategory] = useState("");
  const visibleArticles = sampleArticles;
  const isLoading = false;
  return (
    <>
      <Navbar />
      <section
        className="flex flex-col items-center justify-center py-20 relative text-center"
        style={{
          backgroundImage: "url('/assets/images/header-artikel.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 w-full h-full bg-orange-500 opacity-40 pointer-events-none z-0"></div>

        <div className="relative z-10 max-w-3xl">
          <h1 className="font-poppins font-bold text-white text-4xl md:text-6xl mb-4">
            Artikel Kami
          </h1>
          <p className="font-poppins hidden md:block text-white text-lg md:text-xl leading-relaxed">
            Temukan Berita Berita Terbaru Mengenai SMK Negeri 8 Jember
          </p>
        </div>
      </section>

      <section className="bg-[#e6ecf2] flex flex-col items-center justify-center py-8 px-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Kategori Artikel
        </h1>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <select
            aria-label="Pilih kategori"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-20 focus:outline-none bg-white text-gray-700"
          >
            {" "}
            {["tes", 'tes2'].map((c) => (
              <option key={c.id} value={c.id}>
                {" "}
                {c.label}{" "}
              </option>
            ))}{" "}
          </select>

          <button
            onClick={() => setSort(sort === "terbaru" ? "terlama" : "terbaru")}
            className="flex items-center justify-center gap-2 px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition"
          >
            {sort === "terbaru" ? (
              <>
                Terbaru <FaChevronUp className="text-sm" />
              </>
            ) : (
              <>
                Teralama <FaChevronDown className="text-sm" />
              </>
            )}
          </button>
        </div>
      </section>

      <section className="bg-white flex flex-col items-center justify-center py-8 px-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 w-full pt-10 gap-6 items-stretch pb-4">
          {visibleArticles.map((article, index) => (
            <ArticleCard
              key={article.id}
              article={article}
              className={
                index >= 3 ? "hidden md:flex md:flex-col md:flex-none" : ""
              }
            />
          ))}
        </div>
      </section>
      <div className="w-full py-6 bg-white">
        <div className="w-full max-w-6xl mx-auto px-6 md:px-16 flex justify-center">
          <Button>Tampilkan Lebih Banyak Artikel</Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ArtikelPage;
