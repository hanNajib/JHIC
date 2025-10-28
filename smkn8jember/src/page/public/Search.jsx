import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FaSearch, FaNewspaper, FaBullhorn, FaImage, FaGraduationCap, FaSpinner } from "react-icons/fa";
import { useSearch } from "../../hooks/api/useSearch";
import { ArticleCard, Button } from "../../components/ui";
import AnnouncementCard from "../../components/ui/AnnouncementCard";
import DefaultLayout from "../../components/layout/DefaultLayout";
import parse from "html-react-parser";

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryParam = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [activeTab, setActiveTab] = useState('all');
  
  const { data: searchResults, isLoading, error } = useSearch({
    s: queryParam
  });

  useEffect(() => {
    setSearchQuery(queryParam);
  }, [queryParam]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const results = searchResults?.data || {};
  const articles = results.articles?.data || [];
  const announcements = results.announcements?.data || [];
  const galleries = results.galleries?.data || [];
  const majors = results.majors?.data || [];

  const totalResults = articles.length + announcements.length + galleries.length + majors.length;

  const tabs = [
    { key: 'all', label: 'Semua', count: totalResults, icon: FaSearch },
    { key: 'articles', label: 'Artikel', count: articles.length, icon: FaNewspaper },
    { key: 'announcements', label: 'Pengumuman', count: announcements.length, icon: FaBullhorn },
    { key: 'galleries', label: 'Galeri', count: galleries.length, icon: FaImage },
    { key: 'majors', label: 'Jurusan', count: majors.length, icon: FaGraduationCap },
  ];

  const renderSearchResults = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-20">
          <FaSpinner className="animate-spin text-3xl text-orange-500 mr-3" />
          <span className="text-lg text-gray-600">Mencari...</span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-20">
          <div className="text-red-500 text-lg mb-4">
            Terjadi kesalahan saat mencari
          </div>
          <p className="text-gray-600">{error.message}</p>
        </div>
      );
    }

    if (!queryParam.trim()) {
      return (
        <div className="text-center py-20">
          <FaSearch className="text-6xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Mulai Pencarian
          </h3>
          <p className="text-gray-500">
            Masukkan kata kunci untuk mencari artikel, pengumuman, galeri, atau jurusan
          </p>
        </div>
      );
    }

    if (totalResults === 0) {
      return (
        <div className="text-center py-20">
          <FaSearch className="text-6xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Tidak ada hasil ditemukan
          </h3>
          <p className="text-gray-500">
            Coba gunakan kata kunci yang berbeda atau periksa ejaan
          </p>
        </div>
      );
    }

    const renderContent = () => {
      switch (activeTab) {
        case 'articles':
          return renderArticles();
        case 'announcements':
          return renderAnnouncements();
        case 'galleries':
          return renderGalleries();
        case 'majors':
          return renderMajors();
        default:
          return renderAllResults();
      }
    };

    return (
      <div className="space-y-8">
        <div className="border-b border-gray-200 pb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Hasil Pencarian untuk "{queryParam}"
          </h2>
          <p className="text-gray-600">
            Ditemukan {totalResults} hasil
          </p>
        </div>
        {renderContent()}
      </div>
    );
  };

  const renderArticles = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-1 bg-orange-500"></div>
        <h3 className="text-xl font-semibold text-gray-800 whitespace-nowrap">
          Artikel ({articles.length})
        </h3>
        <div className="flex-1 h-1 bg-orange-500"></div>
      </div>
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div key={article.id} onClick={() => navigate(`/artikel/${article.slug}`)} className="cursor-pointer">
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">Tidak ada artikel ditemukan</p>
      )}
    </div>
  );

  const renderAnnouncements = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-1 bg-orange-500"></div>
        <h3 className="text-xl font-semibold text-gray-800 whitespace-nowrap">
          Pengumuman ({announcements.length})
        </h3>
        <div className="flex-1 h-1 bg-orange-500"></div>
      </div>
      {announcements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">Tidak ada pengumuman ditemukan</p>
      )}
    </div>
  );

  const renderGalleries = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-1 bg-green-500"></div>
        <h3 className="text-xl font-semibold text-gray-800 whitespace-nowrap">
          Galeri ({galleries.length})
        </h3>
        <div className="flex-1 h-1 bg-green-500"></div>
      </div>
      {galleries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleries.map((gallery) => (
            <div 
              key={gallery.id}
              className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden cursor-pointer"
              onClick={() => navigate(`/gallery`)}
            >
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                {gallery.image ? (
                  <img 
                    src={gallery.image} 
                    alt={gallery.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <FaImage className="text-4xl text-gray-300" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                  {gallery.title}
                </h4>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {gallery.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">Tidak ada galeri ditemukan</p>
      )}
    </div>
  );

  const renderMajors = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-1 bg-orange-500"></div>
        <h3 className="text-xl font-semibold text-gray-800 whitespace-nowrap">
          Jurusan ({majors.length})
        </h3>
        <div className="flex-1 h-1 bg-orange-500"></div>
      </div>
      {majors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {majors.map((major) => (
            <div 
              key={major.id}
              className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden cursor-pointer"
              onClick={() => navigate(`/major/${major.short_name}`)}
            >
              <div className="h-40 bg-gray-200 relative overflow-hidden">
                {major.image ? (
                  <img 
                    src={major.image} 
                    alt={major.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200">
                    <FaGraduationCap className="text-5xl text-purple-300" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-gray-800 mb-1 line-clamp-2">
                  {major.name}
                </h4>
                <p className="text-xs text-purple-600 font-medium mb-3 bg-purple-50 px-2 py-1 rounded inline-block">
                  {major.short_name}
                </p>
                <div className="text-gray-600 text-sm line-clamp-3">
                  {parse(major.description || '')}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">Tidak ada jurusan ditemukan</p>
      )}
    </div>
  );

  const renderAllResults = () => (
    <div className="space-y-12">
      {articles.length > 0 && (
        <div>
          {renderArticles()}
          {articles.length > 3 && (
            <div className="text-center mt-6">
              <Button onClick={() => setActiveTab('articles')}>
                Lihat Semua Artikel ({articles.length})
              </Button>
            </div>
          )}
        </div>
      )}
      
      {announcements.length > 0 && (
        <div>
          {renderAnnouncements()}
          {announcements.length > 3 && (
            <div className="text-center mt-6">
              <Button onClick={() => setActiveTab('announcements')}>
                Lihat Semua Pengumuman ({announcements.length})
              </Button>
            </div>
          )}
        </div>
      )}
      
      {galleries.length > 0 && (
        <div>
          {renderGalleries()}
          {galleries.length > 3 && (
            <div className="text-center mt-6">
              <Button onClick={() => setActiveTab('galleries')}>
                Lihat Semua Galeri ({galleries.length})
              </Button>
            </div>
          )}
        </div>
      )}
      
      {majors.length > 0 && (
        <div>
          {renderMajors()}
          {majors.length > 3 && (
            <div className="text-center mt-6">
              <Button onClick={() => setActiveTab('majors')}>
                Lihat Semua Jurusan ({majors.length})
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <DefaultLayout>
      {/* Header Section */}
      <section
        className="flex flex-col items-center justify-center py-20 relative text-center"
        style={{
          backgroundImage: "url('/assets/images/hero.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 w-full h-full bg-orange-500 opacity-40 pointer-events-none z-0"></div>
        <div className="relative z-10 max-w-3xl">
          <h1 className="font-poppins font-bold text-white text-4xl md:text-6xl mb-4">
            Pencarian
          </h1>
          <p className="font-poppins hidden md:block text-white text-lg md:text-xl leading-relaxed">
            Temukan apa yang Anda cari
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-[#f9fafb] pt-10 pb-5 px-6 md:px-16 border-b border-gray-200">
        <div className="max-w-6xl mx-auto w-full flex flex-col gap-6">
          <div className="border-b border-gray-200 pb-10 px-10">
            <label
              htmlFor="search"
              className="block font-semibold text-2xl text-gray-600 mb-2"
            >
              Cari Konten
            </label>
            <form onSubmit={handleSearch}>
              <div className="flex items-center rounded-full border border-gray-300 overflow-hidden transition focus-within:ring-1 focus-within:ring-orange-400 focus-within:border-orange-400">
                <input
                  type="text"
                  id="search"
                  value={searchQuery}
                  onChange={handleInputChange}
                  placeholder="Telusuri artikel, pengumuman, galeri, atau jurusan..."
                  className="flex-1 px-6 py-3 focus:outline-none bg-transparent"
                />
                <button
                  type="submit"
                  className="px-6 py-3 text-gray-600 hover:text-orange-500 transition-colors"
                >
                  <FaSearch className="text-xl" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="bg-white pt-10 pb-10 px-6 md:px-16 border-b border-gray-200">
        <div className="max-w-6xl mx-auto w-full">
          {/* Tabs */}
          {queryParam.trim() && totalResults > 0 && (
            <div className="mb-10 px-10">
              <div className="flex flex-wrap gap-3 border-b border-gray-200 pb-4">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`flex items-center gap-2 px-4 py-2 font-medium transition-all relative ${
                        activeTab === tab.key
                          ? 'text-orange-500'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      <Icon className="text-sm" />
                      {tab.label}
                      <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                        {tab.count}
                      </span>
                      {activeTab === tab.key && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Results Content */}
          <div className="px-10">
            {renderSearchResults()}
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default Search;
