import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ArticleCard } from "../components/ui";
import { useArticles } from "../hooks/api/useArticle";
import { useAdminByName } from "../hooks/api/useAdmin";
import DefaultLayout from "../components/layout/DefaultLayout";

const Profile = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data: author, isLoading: authorLoading } = useAdminByName(slug);
  const articles = author?.articles || [];


  const totalLoading = authorLoading;

  return (
    <DefaultLayout>
      {/* ===== PROFIL PENULIS ===== */}
      <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start px-6 md:px-10 lg:px-16 py-12 gap-10 lg:gap-16 bg-white">
        {/* Foto Profil */}
        {totalLoading ? (
          <div className="w-40 h-40 md:w-52 md:h-52 rounded-full bg-gray-200 animate-pulse" />
        ) : (
          <img
            src={author?.profile_image || "/assets/images/default-profile.png"}
            alt={author?.username || "Profile"}
            className="w-40 h-40 md:w-52 md:h-52 rounded-full object-cover shadow-lg border-4 border-orange-500"
          />
        )}

        {/* Info */}
        <div className="flex flex-col justify-center gap-5 text-center lg:text-left">
          {totalLoading ? (
            <>
              <div className="h-6 bg-gray-200 rounded-md w-48 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded-md w-40 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded-md w-44 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded-md w-36 animate-pulse" />
              </div>
            </>
          ) : (
            <>
              <h1 className="text-gray-800 font-bold text-2xl md:text-3xl">
                {author?.username}
              </h1>

              <div className="flex flex-col gap-1 text-base md:text-lg">
                <h4 className="text-gray-600">
                  Bio:{" "}
                  <span className="font-semibold">
                    {author?.bio || "-"}
                  </span>
                </h4>
                <h4 className="text-gray-600">
                  Email:{" "}
                  <span className="font-semibold">{author?.email}</span>
                </h4>
                <h4 className="text-gray-600">
                  No Hp:{" "}
                  <span className="font-semibold">
                    {author?.phone_number || "-"}
                  </span>
                </h4>
              </div>

              <div className="flex justify-center lg:justify-start items-center gap-4 mt-3">
                <div className="flex flex-col justify-center items-center font-bold bg-orange-500/20 rounded-lg w-32 h-20 border-2 border-orange-500">
                  <h3 className="text-orange-500 text-2xl">
                    {articles.length}
                  </h3>
                  <h4 className="text-gray-800 text-sm">Artikel</h4>
                </div>

                <div className="flex flex-col justify-center items-center font-bold bg-orange-500/20 rounded-lg w-32 h-20 border-2 border-orange-500">
                  <h3 className="text-orange-500 text-2xl">5740</h3>
                  <h4 className="text-gray-800 text-sm">Dilihat</h4>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ===== ARTIKEL PENULIS ===== */}
      <div className="bg-gray-200 px-6 md:px-10 lg:px-16 py-10">
        <div className="text-center w-full p-2 border-b-4 border-orange-500">
          <h2 className="text-gray-800 text-xl md:text-2xl font-bold">
            Artikel
          </h2>
        </div>

        {/* Card tetap sejajar & konsisten */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full pt-10 gap-6">
          {totalLoading ? (
            Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-60 bg-gray-300 rounded-xl animate-pulse"
                />
              ))
          ) : articles.length > 0 ? (
            articles.map((article) => (
              <div
                key={article.id}
                onClick={() => navigate(`/artikel/${article.slug}`)}
                className="cursor-pointer transition-transform hover:scale-[1.02]"
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

    </DefaultLayout>
  );
};

export default Profile;
