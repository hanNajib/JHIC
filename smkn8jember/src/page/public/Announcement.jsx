import { useMemo, useState } from "react";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { AnnouncementCard, Button } from "../../components/ui";
import { useAnnouncementsPublic } from "../../hooks/api/useAnnouncement";
import TextLoading from "../../components/ui/TextLoading";
import PengumumanPopUp from "../../components/ui/PengumumanPopUp";

const Announcement = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const handleOpenPopup = (image) => setSelectedImage(image);
  const handleClosePopup = () => setSelectedImage(null);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useAnnouncementsPublic({ limit: 1 });

  const announcements = useMemo(
    () => data?.pages.flatMap((page) => page.data) || [],
    [data]
  );

  console.log(announcements);


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
      {/* Hero Section */}
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
            Informasi resmi terbaru dari SMK Negeri 8 Jember untuk siswa, guru,
            dan masyarakat.
          </p>
        </div>
      </section>

      {/* List */}
      <section className="bg-white py-10">
        <div className="max-w-6xl mx-auto px-6 md:px-16 space-y-6">
          {isLoading ? (
            <div className="flex justify-center py-10">
              <TextLoading text="Loading" />
            </div>
          ) : announcements.length > 0 ? (
            announcements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                announcement={announcement}
                onClick={() => handleOpenPopup(announcement)}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">
              Belum ada pengumuman saat ini 📭
            </p>
          )}
        </div>
      </section>

      {/* Load More */}
      {!isLoading && hasNextPage && (
        <div className="py-8">
          <div className="max-w-6xl mx-auto flex justify-center px-6 md:px-16">
            <Button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage
                ? "Memuat..."
                : "Tampilkan Lebih Banyak Pengumuman"}
            </Button>
          </div>
        </div>
      )}
      <PengumumanPopUp pengumuman={selectedImage} onClose={handleClosePopup} />
    </DefaultLayout>
  );
};

export default Announcement;
