import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Icon } from "../../components/ui";
import { useNavigate, useParams } from "react-router-dom";
import { useArticle, useArticles } from "../../hooks/api/useArticle";
import parse from "html-react-parser";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { useCategories } from "../../hooks/api/useCategory";

function DetailArtikel() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { data: allArticles } = useArticles();
  const { data: categoriesData } = useCategories();

  const categories = Array.isArray(categoriesData)
    ? categoriesData
    : categoriesData?.data || [];

  const articleCategories = categories.filter((cat) => cat.type === "article");

  const articlesArray = Array.isArray(allArticles)
    ? allArticles
    : allArticles?.data || allArticles?.articles || [];

  const otherArticles = articlesArray
    .filter((a) => a.slug !== slug)
    .slice(0, 5);

  const { data: articleResponse, isLoading } = useArticle(slug);
  const article = articleResponse || {};

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col lg:flex-row w-full bg-[#F8F9FA] px-2 md:px-10 py-6 md:py-8 gap-4 animate-pulse">
          {/* Skeleton Artikel Utama */}
          <div className="w-full lg:w-5/7 bg-white p-4 md:p-6 rounded-2xl shadow-lg">
            <div className="flex gap-3 flex-wrap mb-4">
              {[1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="bg-gray-300 w-20 h-6 rounded-full"
                ></span>
              ))}
            </div>

            <div className="w-3/4 h-10 bg-gray-300 rounded-md mb-4"></div>
            <div className="w-1/2 h-5 bg-gray-300 rounded-md mb-8"></div>

            <div className="w-full h-[15rem] md:h-[30rem] bg-gray-300 rounded-xl mb-8"></div>

            <div className="space-y-4 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-4 bg-gray-300 rounded-md"></div>
              ))}
            </div>

            <div className="flex gap-3 items-center border-t-[1.5px] border-[#A0A0A0] pt-4">
              <div className="w-14 h-14 bg-gray-300 rounded-full"></div>
              <div className="flex flex-col gap-2">
                <div className="w-32 h-4 bg-gray-300 rounded-md"></div>
                <div className="w-24 h-3 bg-gray-300 rounded-md"></div>
              </div>
            </div>
          </div>

          {/* Skeleton Sidebar */}
          <div className="w-full lg:w-2/7 flex flex-col md:flex-row lg:flex-col gap-4 lg:gap-0 items-stretch">
            {/* Lainnya */}
            <div className="w-full bg-white p-6 rounded-2xl shadow-lg h-full lg:h-auto mb-6">
              <div className="w-32 h-6 bg-gray-300 rounded-md mb-6"></div>
              <div className="flex flex-col gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-2">
                    <div className="w-20 h-20 bg-gray-300 rounded-md"></div>
                    <div className="flex flex-col gap-2 w-full">
                      <div className="w-3/4 h-3 bg-gray-300 rounded-md"></div>
                      <div className="w-1/2 h-3 bg-gray-300 rounded-md"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Kategori */}
            <div className="w-full bg-white p-6 rounded-2xl shadow-lg h-full lg:h-auto overflow-y-auto">
              <div className="w-32 h-6 bg-gray-300 rounded-md mb-6"></div>
              <div className="flex flex-col gap-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-full h-4 bg-gray-300 rounded-md border-b-[1px] border-gray-200 py-2"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // ✅ Tampilan Normal
  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row w-full bg-[#F8F9FA] px-2 md:px-10 py-6 md:py-8 gap-4">
        <div className="w-full lg:w-5/7 bg-white p-4 md:p-6 rounded-2xl shadow-lg">
          {/* kategori */}
          <div className="flex gap-3 flex-wrap">
            {article.categories?.map((cat) => (
              <span
                key={cat.id}
                style={{ backgroundColor: cat.color || "#ff6000" }}
                className="font-poppins font-semibold py-1 px-3 text-white rounded-4xl"
              >
                {cat.name}
              </span>
            ))}
          </div>

          <h1 className="font-poppins font-bold text-3xl md:text-4xl lg:text-5xl text-[#272727] py-5">
            {article.title}
          </h1>

          <div className="flex flex-col pb-7 pt-2 gap-2 relative">
            <div className="flex items-center gap-2 text-[#5a5a5a] text-sm">
              <Icon name="IoCalendarClearOutline" size={16} />
              {article.created_at
                ? new Date(article.created_at).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })
                : "-"}
            </div>
            <div className="flex items-center gap-2 text-[#5a5a5a] text-sm">
              <Icon name="LuEye" size={16} />
              Telah Dilihat Sebanyak {article.views || 0}
            </div>
          </div>

          <img
            src={article.image || "/assets/images/default-article.jpg"}
            alt={article.title}
            className="w-full h-[15rem] md:h-[30rem] object-cover object-center rounded-xl"
          />

          <div className="font-poppins text-start text-black leading-relaxed py-8">
            {article.content ? parse(article.content) : <p>Tidak ada konten</p>}
          </div>

          {article.author && (
            <div className="flex gap-3 items-center border-t-[1.5px] border-[#A0A0A0] pt-3">
              <img
                src={
                  article.author.profile_image ||
                  "/assets/images/default-profile.png"
                }
                alt={article.author.username}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h1
                  className="text-[#212529] font-poppins font-bold text-xl cursor-pointer hover:text-orange-500"
                  onClick={() =>
                    (window.location.href = `/profile/${
                      article.author.username || article.author?.id
                    }`)
                  }
                >
                  {article.author.username}
                </h1>

                <p className="text-sm text-[#5A5A5A]">{article.author.email}</p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-2/7 flex flex-col md:flex-row lg:flex-col gap-4 lg:gap-0 items-stretch">
          {/* Lainnya */}
          <div className="w-full bg-white p-6 rounded-2xl shadow-lg h-full lg:h-auto mb-6">
            <h1 className="font-poppins font-semibold text-black text-xl flex items-center gap-3">
              Lainnya
            </h1>

            <div className="flex flex-col pt-7 gap-4">
              {otherArticles.length > 0 ? (
                otherArticles.map((item) => (
                  <div
                    onClick={() => navigate(`/artikel/${item.slug}`)}
                    key={item.id}
                    className="flex gap-2 cursor-pointer hover:opacity-80 transition"
                  >
                    <img
                      src={item.image || "/assets/images/default-article.jpg"}
                      alt={item.title}
                      className="w-20 h-20 object-cover object-center rounded-md"
                    />
                    <div className="flex flex-col gap-1">
                      <h1 className="font-poppins font-semibold text-[#1a1a1a] leading-snug text-sm line-clamp-3">
                        {item.title}
                      </h1>
                      <p className="font-poppins text-[#5A5A5A] text-xs">
                        {new Date(item.created_at).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 italic">
                  Tidak ada artikel lainnya.
                </p>
              )}
            </div>
          </div>

          {/* Kategori */}
          <div className="w-full bg-white p-6 rounded-2xl shadow-lg h-full lg:h-auto overflow-y-auto">
            <h1 className="font-poppins font-semibold text-black text-xl flex items-center gap-2">
              <Icon name="TbCategoryFilled" size={26} color="#ff6000" />{" "}
              Kategori
            </h1>
            <div className="flex flex-col pt-5">
              {articleCategories.length > 0 ? (
                articleCategories.map((cat) => (
                  <div
                    key={cat.id}
                    className="border-b-[1px] text-[#212529] font-poppins text-lg py-2 border-[#D0CFCF] cursor-pointer hover:text-[#ff6000] transition"
                  >
                    <a href={`/kategori/${cat.slug || cat.id}`}>{cat.name}</a>
                  </div>
                ))
              ) : (
                <p className="text-[#5A5A5A] text-sm italic">
                  Tidak ada kategori artikel.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DetailArtikel;
