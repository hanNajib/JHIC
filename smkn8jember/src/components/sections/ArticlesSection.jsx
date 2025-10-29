import React from "react";
import { Section, Button, ArticleCard } from "../ui";
import { useArticles } from "../../hooks/api/useArticle";
import { useNavigate } from "react-router-dom";

const ArticlesSection = ({ className = "" }) => {
  const { data: articleResponse, isLoading } = useArticles();
  const navigate = useNavigate();

  const articles = articleResponse?.data || [];
  
  if (isLoading) {
    return (
      <Section title="Artikel Terbaru" className={className}>
        <p className="text-center text-gray-500">Memuat artikel...</p>
      </Section>
    );
  }

  return (
    <Section
      title={
        <>
          Artikel <span className="text-[#ff6000]">Terbaru</span>
        </>
      }
      subtitle="Ikuti berita dan informasi terkini seputar kegiatan dan prestasi SMK Negeri 8 Jember"
      className={className}
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 w-full pt-10 gap-6 items-stretch pb-4">
        {articles.slice(0, 6).map((article, index) => (
          <ArticleCard
            key={article.id}
            article={article}
            className={index >= 3 ? "hidden md:flex md:flex-col md:flex-none" : ""}
          />
        ))}
      </div>

      <div className="flex justify-center items-center w-full pt-5">
        <Button onClick={() => navigate("/artikel")}>Lihat Semua Artikel</Button>
      </div>
    </Section>
  );
};

export default ArticlesSection;
