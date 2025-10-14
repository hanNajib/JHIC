import React from "react";
import { Section, Button, ArticleCard } from "../ui";
import { useArticles } from "../../hooks/api/useArticle";

const ArticlesSection = ({ className = "" }) => {
  const { data: articlesResponse, isLoading, isError } = useArticles();
  const articles = articlesResponse?.data || [];

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
        {articles.map((article, index) => (
          <ArticleCard
            key={article.id}
            article={article}
            className={
              index >= 6 ? "hidden " : ""
            }
          />
        ))}
      </div>

      <div className="flex justify-center items-center w-full pt-5">
        <Button>Lihat Semua Artikel</Button>
      </div>
    </Section>
  );
};

export default ArticlesSection;
