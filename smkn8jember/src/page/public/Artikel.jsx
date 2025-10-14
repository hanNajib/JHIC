import { useState } from "react";
import Navbar from "../../components/Navbar";
import { ArticleCard, Button } from "../../components/ui";
import Footer from "../../components/Footer";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useArticles } from "../../hooks/api/useArticle";

const ArtikelPage = () => {
  const { data: articlesResponse, isLoading, isError } = useArticles();
  const articles = articlesResponse?.data || [];

  const [sort, setSort] = useState("terbaru");
  const [category, setCategory] = useState("");
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

      {/* Filter Section */}
      <section className="bg-[#f9fafb] pt-10 pb-5 px-6 md:px-16 border-b border-gray-200">
        <div className="max-w-6xl mx-auto w-full flex flex-col gap-6">
          {/* Active Filters */}

          <form action="" className="border-b border-gray-200 pb-10 px-10">
            <label
              for="search"
              class="block font-semibold text-2xl text-gray-600 mb-2"
            >
              Cari Artikel
            </label>

            <div class="flex items-center rounded-full border border-gray-300 overflow-hidden transition focus-within:ring-1 focus-within:ring-orange-400 focus-within:border-orange-400">
              <input
                type="text"
                id="search"
                placeholder="Telusuri artikel..."
                class="flex-1 px-4 py-2.5 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm"
              />
              <button
                type="submit"
                class="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-8 py-2.5 transition"
              >
                Cari
              </button>
            </div>
          </form>

          {/* Tabs & Sort */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Tabs */}
            <div className="flex flex-wrap gap-3 text-gray-700 font-medium">
              {["All", "RPL", "TKJ", "DKV", "TKR", "TSM", "APTH", "APT"].map(
                (tab, i) => (
                  <button
                    key={i}
                    className={`w-16 border-b-2 transition duration-200 ${
                      tab === "All"
                        ? "border-orange-500 text-orange-500"
                        : "border-transparent hover:border-gray-600"
                    }`}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>

            {/* Terbaru/lama */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="sort"
                className="text-sm font-medium text-gray-600"
              >
                Sort by:
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border border-orange-500 rounded-md py-2 px-10 focus:outline-none focus:ring-1 focus:ring-orange-400"
              >
                <option value="terbaru">Newest</option>
                <option value="terlama">Oldest</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white flex flex-col items-center justify-center py-8 px-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 w-full pt-10 gap-6 items-stretch pb-4">
          {articles.map((article, index) => (
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
