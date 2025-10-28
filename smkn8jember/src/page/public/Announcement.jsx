import { useMemo, useState, useEffect } from "react";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { AnnouncementCard, Button } from "../../components/ui";
import { useAnnouncementsPublic } from "../../hooks/api/useAnnouncement";
import TextLoading from "../../components/ui/TextLoading";
import PengumumanPopUp from "../../components/ui/PengumumanPopUp";
import { useDebounce } from "../../hooks/useDebounce";
import { useCategories } from "../../hooks/api/useCategory";

const Announcement = () => {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchTerm = useDebounce(searchText, 500);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch
  } = useAnnouncementsPublic({
    s: debouncedSearchTerm,
    limit: 5
  });

  const announcements = useMemo(
    () => data?.pages.flatMap((page) => page.data) || [],
    [data]
  );

  const { data: categoriesResponse } = useCategories({ type: 'announcements', all: true });
  const categories = categoriesResponse?.data || [];
  const [category, setCategory] = useState("");
  const announcementsList = announcements;

  const filteredAnnouncements = useMemo(() => {
    if (!category) return announcementsList;
    return announcementsList.filter(a => a.category && (a.category.name || '').toLowerCase() === category.toLowerCase());
  }, [announcementsList, category]);

  const [pengumumanPopUp, setPengumumanPopUp] = useState(null);
  const handleOpenPopUp = (announcement) => {
    setPengumumanPopUp(announcement);
  }

  const handleClosePopUp = () => {
    setPengumumanPopUp(null);
  }

  if (isError)
    return (
      <DefaultLayout>
        <div className="flex justify-center items-center py-20">
          <p className="text-red-500 font-medium">Gagal memuat pengumuman 😢</p>
          <Button className="ml-4" onClick={refetch}>
            Coba Lagi
          </Button>
        </div>
      </DefaultLayout>
    );

  return (
    <DefaultLayout>
      <section
        className="relative flex flex-col items-center justify-center py-20 text-center"
        style={{
          backgroundImage: "url('/assets/images/lobby-dalam.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-orange-500/40 z-0" />
        <div className="relative z-10 max-w-3xl px-4">
          <h1 className="font-poppins font-bold text-white text-4xl md:text-6xl mb-4 drop-shadow-md">
            Pengumuman Sekolah
          </h1>
          <p className="font-poppins hidden md:block text-white text-lg md:text-xl leading-relaxed">
            Informasi resmi terbaru dari SMK Negeri 8 Jember untuk siswa, guru, dan masyarakat.
          </p>
        </div>
      </section>

      {/* Filter Section (match Artikel.jsx) */}
      <section className="bg-[#f9fafb] pt-10 pb-5 px-6 md:px-16 border-b border-gray-200">
        <div className="max-w-6xl mx-auto w-full flex flex-col gap-6">
          <div className="border-b border-gray-200 pb-10 px-10">
            <label
              htmlFor="search"
              className="block font-semibold text-2xl text-gray-600 mb-2"
            >
              Cari Pengumuman
            </label>
            <div className="flex items-center rounded-full border border-gray-300 overflow-hidden transition focus-within:ring-1 focus-within:ring-orange-400 focus-within:border-orange-400">
              <input
                type="text"
                id="search"
                name="search"
                placeholder="Telusuri pengumuman..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap gap-4 md:gap-8 text-gray-700 font-medium overflow-x-auto">
              {[{ name: 'All' }, ...categories].map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setCategory(tab.name === 'All' ? '' : tab.name)}
                  className={`px-3 py-1 whitespace-nowrap border-b-2 transition duration-200 ${(tab.name === 'All' && category === '') || tab.name.toLowerCase() === category.toLowerCase()
                      ? 'border-orange-500 text-orange-500'
                      : 'border-transparent hover:border-gray-600'
                    }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* List */}
      <section className="bg-white py-10">
        <div className="max-w-6xl mx-auto px-6 md:px-16 space-y-6">
          {isLoading ? (
            <div className="flex justify-center py-10">
              <TextLoading text="Loading" />
            </div>
          ) : filteredAnnouncements.length > 0 ? (
            filteredAnnouncements.map((announcement) => (
              <AnnouncementCard key={announcement.id} announcement={announcement} onClick={() => handleOpenPopUp(announcement)} />
            ))
          ) : (
            <p className="text-center text-gray-500">Belum ada pengumuman saat ini 📭</p>
          )}
        </div>
      </section>

      {isFetchingNextPage && (
        <div className="w-full py-6 bg-white">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        </div>
      )}

      {hasNextPage && (
        <div className="w-full py-6 bg-white">
          <div className="w-full max-w-6xl mx-auto px-6 md:px-16 flex justify-center">
            <Button 
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? 'Loading...' : 'Tampilkan Lebih Banyak Pengumuman'}
            </Button>
          </div>
        </div>
      )}

      <PengumumanPopUp pengumuman={pengumumanPopUp} onClose={handleClosePopUp} />
    </DefaultLayout>
  );
};

export default Announcement;
