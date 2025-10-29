import { useFacilities, useFacility } from "../../hooks/api/useFacility";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { Link, useSearchParams } from "react-router-dom";
import parse from "html-react-parser";
import { FaHome } from "react-icons/fa";

const FacilitasDetail = () => {
  const [param] = useSearchParams();
  const id = param.get("i") || "";
  const { data: fasilitas = [], isLoading, isError } = useFacility(id);
  const { data: fasilitasRes } = useFacilities({ limit: 5 });
  const fasilitasList =
    fasilitasRes?.data?.filter((val) => val.id !== fasilitas.id) || [];

  // Skeleton ketika loading
  if (isLoading) {
    return (
      <DefaultLayout>
        <div className="animate-pulse flex flex-col lg:flex-row w-full bg-[#F8F9FA] px-2 md:px-10 py-6 md:py-8 gap-4">
          <div className="w-full lg:w-5/7 bg-white p-4 md:p-6 rounded-2xl shadow-lg">
            <div className="h-8 w-2/3 bg-gray-200 rounded mb-4"></div>
            <div className="w-full h-[15rem] md:h-[30rem] bg-gray-200 rounded-xl mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="w-full lg:w-2/7 bg-white p-6 rounded-2xl shadow-lg h-full">
            <div className="h-6 bg-gray-200 w-1/2 rounded mb-6"></div>
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-20 h-20 bg-gray-200 rounded-md"></div>
                  <div className="flex flex-col justify-center gap-2 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DefaultLayout>
    );
  }

  // Pesan jika tidak ada data ditemukan
  if (!fasilitas) {
    return (
      <DefaultLayout>
        <p className="text-center py-10 text-gray-600">
          Fasilitas tidak ditemukan 😢
        </p>
      </DefaultLayout>
    );
  }

  // Konten utama
  return (
    <DefaultLayout>
      <div className="flex flex-col lg:flex-row w-full bg-[#F8F9FA] px-2 md:px-10 py-6 md:py-8 gap-4">
        <div className="w-full lg:w-5/7 bg-white p-4 md:p-6 rounded-2xl shadow-lg">
          <span
            key={fasilitas.id}
            className="font-poppins w-fit font-semibold py-1 px-3 text-white rounded-4xl bg-orange-500 text-lg flex items-center gap-4"
          >
            <FaHome /> {fasilitas.room_total}
          </span>

          <h1 className="font-poppins font-bold text-3xl md:text-4xl lg:text-5xl text-[#272727] py-5">
            {fasilitas.name}
          </h1>

          <img
            src={fasilitas.image || "/assets/images/default-article.jpg"}
            alt={fasilitas.name}
            className="w-full h-[15rem] md:h-[30rem] object-cover object-center rounded-xl"
          />

          <div className="font-poppins text-lg text-justify text-black leading-relaxed py-8 whitespace-pre-line">
            {parse(fasilitas.description) || "Tidak ada konten"}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-2/7 flex flex-col md:flex-row lg:flex-col gap-4 lg:gap-0 items-stretch">
          <div className="w-full bg-white p-6 rounded-2xl shadow-lg h-full lg:h-auto mb-6">
            <h1 className="font-poppins font-semibold text-black text-xl flex items-center gap-3">
              Fasilitas Lainnya
            </h1>

            <div className="flex flex-col pt-7 gap-4">
              {fasilitasList.length > 0 ? (
                fasilitasList.map((item) => {
                  const slug = item.name.toLowerCase().replace(/\s+/g, "_");

                  return (
                    <Link
                      to={`/fasilitas/${slug}?i=${item.id}`}
                      key={item.id}
                      className="flex gap-2 cursor-pointer hover:opacity-80 transition"
                    >
                      <img
                        src={item.image || "/assets/images/default-article.jpg"}
                        alt={item.name}
                        className="w-20 h-20 object-cover object-center rounded-md"
                      />
                      <div className="flex flex-col justify-center gap-1">
                        <h1 className="font-poppins font-semibold text-[#1a1a1a] leading-snug text-sm line-clamp-3">
                          {item.name}
                        </h1>
                        <p className="text-[#5A5A5A] text-sm line-clamp-2">
                          {parse(item.description)}
                        </p>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <p className="text-sm text-gray-500 italic">
                  Tidak ada artikel lainnya.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FacilitasDetail;
