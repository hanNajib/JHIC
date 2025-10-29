import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ArticleCard, Button } from "../../components/ui";
import { useArticlesPublic } from "../../hooks/api/useArticle";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { useDebounce } from "../../hooks/useDebounce";
import { useCategories } from "../../hooks/api/useCategory";

const ArtikelPage = () => {
  const [searchParams] = useSearchParams();
  const queryCategory = searchParams.get('category') || '';
  const [sort, setSort] = useState("terbaru");
  const [category, setCategory] = useState(queryCategory);
  const [searchText, setSearchText] = useState("");
  const debouncedSearchTerm = useDebounce(searchText, 500);

  const { 
    data: articleResponse, 
    isLoading, 
    isError,
    error,
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useArticlesPublic({
    s: debouncedSearchTerm,
    sortDir: sort === "terbaru" ? "desc" : "asc",
    category_name : category === "All" ? undefined : category,
    status: "published",
  });

  const { data: categoriesResponse } = useCategories({ type: ['articles', 'major'], all: true });
  const categories = categoriesResponse?.data || [];
  
  useEffect(() => {
    const queryCategory = searchParams.get('category') || '';
    setCategory(queryCategory);
  }, [searchParams]);
  
  const articles = useMemo(() => {
    if (!articleResponse?.pages) return [];
    return articleResponse.pages.flatMap(page => page.data || []);
  }, [articleResponse]);

  if (isError) {
    return (
      <DefaultLayout>
        <div className="flex flex-col items-center justify-center py-20">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Terjadi Kesalahan</h2>
          <p className="text-gray-600 mb-4">
            {error?.message || 'Gagal memuat artikel. Silakan coba lagi.'}
          </p>
          <Button onClick={() => window.location.reload()}>
            Muat Ulang
          </Button>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
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

      <section className="bg-[#f9fafb] pt-10 pb-5 px-6 md:px-16 border-b border-gray-200">
        <div className="max-w-6xl mx-auto w-full flex flex-col gap-6">
          <div className="border-b border-gray-200 pb-10 px-10">
            <label
              htmlFor="search"
              className="block font-semibold text-2xl text-gray-600 mb-2"
              >
              Cari Artikel
            </label>
            <div className="flex items-center rounded-full border border-gray-300 overflow-hidden transition focus-within:ring-1 focus-within:ring-orange-400 focus-within:border-orange-400">
              <input
                type="text"
                id="search"
                name="search"
                placeholder="Telusuri artikel..."
                value={searchText}
                onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                  className="flex-1 px-4 py-2.5 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm"
                  />
                </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex flex-wrap gap-4 md:gap-8 text-gray-700 font-medium overflow-x-auto">
                  {[{ name: "All" }, ...categories].map((tab, i) => (
                  <button
                    key={i}
                    onClick={() => setCategory(tab.name === "All" ? "" : tab.name)}
                    className={`px-3 py-1 whitespace-nowrap border-b-2 transition duration-200 ${
                    (tab.name === "All" && category === "") || tab.name.toLowerCase() === category.toLowerCase()
                      ? "border-orange-500 text-orange-500"
                      : "border-transparent hover:border-gray-600"
                    }`}
                  >
                    {tab.name}
                  </button>
                  ))}
                </div>

                {/* Terbaru/lama */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm font-medium text-gray-600">
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

      {/* Artikel Grid */}
      <section className="bg-white flex flex-col items-center justify-center py-8 px-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 w-full pt-10 gap-6 items-stretch pb-4">
          {isLoading
            ? Array(6)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-60 bg-gray-200 animate-pulse rounded-md"
                  />
                ))
            : articles.length > 0 ? (
              articles.map((article, index) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  className={"md:flex-col md:flex-none"}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 text-lg">
                Artikel tidak ditemukan
              </p>
            )}
        </div>
      </section>

      {/* Loading indicator untuk pagination */}
      {isFetchingNextPage && (
        <div className="w-full py-6 bg-white">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        </div>
      )}

      {/* Tampilkan Lebih Banyak */}
      {hasNextPage && (
        <div className="w-full py-6 bg-white">
          <div className="w-full max-w-6xl mx-auto px-6 md:px-16 flex justify-center">
            <Button 
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? 'Loading...' : 'Tampilkan Lebih Banyak Artikel'}
            </Button>
          </div>
        </div>
      )}
      </DefaultLayout>
  );
};

export default ArtikelPage;
