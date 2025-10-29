import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import DefaultLayout from "../components/layout/DefaultLayout";
import { ArticleCard } from "../components/ui";
import { useArticles } from "../hooks/api/useArticle";
import { useAdminByName } from "../hooks/api/useAdmin";

const Profile = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data: author, isLoading: authorLoading } = useAdminByName(slug);
  const { data: articlesResponse, isLoading: articlesLoading } = useArticles({
    authorId: author?.id,
  });
  const articles = articlesResponse?.data || [];

  const totalLoading = authorLoading || articlesLoading;

  // --- Profile Content Section ---
  const renderProfileContent = () => (
    <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center lg:items-start px-6 md:px-10 lg:px-16 py-16 gap-10 lg:gap-20 bg-white shadow-lg">
      {/* Foto Profil (Larger and Centered) */}
      <div className="flex-shrink-0 w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden bg-gray-200 border-4 border-orange-500 shadow-xl">
        {author?.profile_image ? (
          <img
            src={author.profile_image}
            alt={`${author.username}'s Profile`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl md:text-8xl font-bold text-gray-500">
            {author?.username?.charAt(0).toUpperCase() || "A"}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col justify-center gap-6 text-center lg:text-left w-full lg:max-w-xl">
        {totalLoading ? (
          // Loading State
          <div className="flex flex-col gap-4 items-center lg:items-start">
            <div className="h-8 bg-gray-200 rounded-md w-64 animate-pulse" />
            <div className="space-y-2 w-full">
              <div className="h-5 bg-gray-200 rounded-md w-3/4 animate-pulse" />
              <div className="h-5 bg-gray-200 rounded-md w-2/3 animate-pulse" />
              <div className="h-5 bg-gray-200 rounded-md w-1/2 animate-pulse" />
            </div>
            <div className="h-20 w-32 bg-gray-200 rounded-lg mt-4 animate-pulse" />
          </div>
        ) : (
          // Content
          <>
            <h1 className="text-gray-800 font-extrabold text-3xl md:text-4xl border-b-2 border-orange-500 pb-2">
              {author?.username}
            </h1>

            <div className="flex flex-col gap-2 text-base md:text-lg">
              <h4 className="text-gray-700">
                <span className="font-semibold text-gray-900">Bio:</span>{" "}
                {author?.bio || "Penulis belum menambahkan bio."}
              </h4>
              <h4 className="text-gray-700">
                <span className="font-semibold text-gray-900">Email:</span>{" "}
                {author?.email}
              </h4>
              <h4 className="text-gray-700">
                <span className="font-semibold text-gray-900">No Hp:</span>{" "}
                {author?.phone_number || "-"}
              </h4>
            </div>

            {/* Stats Badge */}
            <div className="flex justify-center lg:justify-start items-center mt-4">
              <div className="flex flex-col justify-center items-center font-bold bg-orange-500 text-white rounded-xl w-40 h-24 shadow-md transition-all duration-300 hover:bg-orange-600">
                <h3 className="text-3xl">
                  {articles.length}
                </h3>
                <h4 className="text-sm uppercase tracking-wider">Total Artikel</h4>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );

  // --- Article Section ---
  const renderArticlesSection = () => (
    <div className="bg-gray-50 px-6 md:px-10 lg:px-16 py-12">
      <div className="flex items-center justify-center mb-10">
        <h2 className="text-gray-800 text-2xl md:text-3xl font-extrabold relative inline-block pb-1">
          <span className="relative z-10">Artikel {author?.username}</span>
          <span className="absolute left-0 bottom-0 w-full h-1 bg-orange-500 z-0 rounded-full"></span>
        </h2>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-8">
        {totalLoading ? (
          // Article Loading State
          Array(6)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden shadow-lg bg-white p-4 animate-pulse"
              >
                <div className="h-40 bg-gray-300 rounded-md mb-4" />
                <div className="h-6 bg-gray-300 rounded-md w-3/4 mb-2" />
                <div className="h-4 bg-gray-300 rounded-md w-full mb-1" />
                <div className="h-4 bg-gray-300 rounded-md w-2/3" />
              </div>
            ))
        ) : articles.length > 0 ? (
          // Articles Content
          articles.map((article) => (
            <div
              key={article.id}
              onClick={() => navigate(`/artikel/${article.slug}`)}
              className="cursor-pointer transition-transform duration-300 hover:scale-[1.03]  rounded-xl"
            >
              <ArticleCard article={article} />
            </div>
          ))
        ) : (
          // No Articles
          <p className="col-span-full text-center text-gray-500 text-lg py-10">
            **{author?.username || "Penulis"}** belum mempublikasikan artikel apapun.
          </p>
        )}
      </div>
    </div>
  );

  return (
    <DefaultLayout>
      {/* Profile Header */}
      {renderProfileContent()}

      {/* Article List */}
      {renderArticlesSection()}
    </DefaultLayout>
  );
};

export default Profile;