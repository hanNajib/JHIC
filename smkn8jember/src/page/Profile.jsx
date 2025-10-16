import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ArticleCard } from "../components/ui";
import { useArticles } from "../hooks/api/useArticle";
import { useAdminByName } from "../hooks/api/useAdmin";

const Profile = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data: author, isLoading: authorLoading } = useAdminByName(slug);
  console.log(author);
  
  const { data: articleResponse, isLoading: articleLoading } = useArticles();
  const articles = articleResponse?.data || articleResponse?.articles || [];

  const userArticles = useMemo(() => {
    if (!author) return [];
    return articles.filter(
      (a) =>
        a.author?.username?.toLowerCase() ===
        author?.username?.toLowerCase()
    );
  }, [articles, author]);

  const totalLoading = authorLoading || articleLoading;

  return (
    <>
      <Navbar />

      {/* PROFIL PENULIS */}
      <div className="flex flex-col lg:flex-row justify-center items-center px-6 md:px-10 lg:px-16 py-10 gap-10 lg:gap-16">
        {/* Foto */}
        {totalLoading ? (
          <div className="w-56 h-56 md:w-72 md:h-72 lg:w-[410px] lg:h-[410px] rounded-full bg-gray-200 animate-pulse" />
        ) : (
          <img
            src={author?.profile_image || "/assets/images/default-profile.png"}
            className="w-56 h-56 md:w-72 md:h-72 lg:w-[410px] lg:h-[410px] rounded-full object-cover shadow-md"
            alt={author?.username || "Profile"}
          />
        )}

        {/* Info */}
        <div className="flex flex-col justify-center gap-6 text-center lg:text-left">
          {totalLoading ? (
            <>
              <div className="h-8 bg-gray-200 rounded-md w-64 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded-md w-48 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded-md w-52 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded-md w-44 animate-pulse" />
              </div>
            </>
          ) : (
            <>
              <h1 className="text-gray-800 font-bold text-3xl md:text-4xl lg:text-5xl">
                {author?.username}
              </h1>

              <div className="flex flex-col gap-1 text-base md:text-lg lg:text-xl">
                <h4 className="text-gray-600">
                  Bio: <span className="font-semibold">{author?.bio || "-"}</span>
                </h4>
                <h4 className="text-gray-600">
                  Email: <span className="font-semibold">{author?.email}</span>
                </h4>
                <h4 className="text-gray-600">
                  No Hp:{" "}
                  <span className="font-semibold">
                    {author?.phone_number || "-"}
                  </span>
                </h4>
              </div>

              {/* Statistik */}
              <div className="flex justify-center lg:justify-start items-center gap-6 mt-4">
                <div className="flex flex-col justify-center items-center font-bold bg-orange-500/20 rounded-lg w-full h-24 border-2 border-orange-500">
                  <h3 className="text-orange-500 text-3xl">{userArticles.length}</h3>
                  <h4 className="text-gray-800 text-lg">Artikel</h4>
                </div>

                <div className="flex flex-col justify-center items-center font-bold bg-orange-500/20 rounded-lg w-full h-24 border-2 border-orange-500">
                  <h3 className="text-orange-500 text-3xl">5740</h3>
                  <h4 className="text-gray-800 text-lg">Dilihat</h4>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ARTIKEL PENULIS */}
      <div className="bg-gray-200 px-6 md:px-10 lg:px-16 py-10">
        <div className="text-center w-full p-2 border-b-4 border-orange-500">
          <h2 className="text-gray-800 text-xl md:text-2xl font-bold">
            Artikel
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 w-full pt-10 gap-6">
          {totalLoading ? (
            Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-60 bg-gray-300 rounded-xl animate-pulse"
                />
              ))
          ) : userArticles.length > 0 ? (
            userArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => navigate(`/artikel/${article.slug}`)}
                className="cursor-pointer"
              >
                <ArticleCard article={article} />
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 text-lg">
              Belum ada artikel yang ditulis.
            </p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
