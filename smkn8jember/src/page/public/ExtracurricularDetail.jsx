import { useFacilities } from "../../hooks/api/useFacility";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import { Icon } from "../../components/ui";
import parse from "html-react-parser";
import {
  useExtarculicular,
  useExtarculiculars,
} from "../../hooks/api/useExtarculicular";

const ExtracurricularDetail = () => {
  const [param] = useSearchParams();
  const id = param.get("i") || "";
  const { data: ekstra = [], isLoading, isError } = useExtarculicular(id);
  const { data: ekstraRes } = useExtarculiculars({ limit: 5 });
  const ekstraList =
    ekstraRes?.data?.filter((val) => val.id !== ekstra.id) || [];

  // render terus kalau masih loading
  if (isLoading) {
    return (
      <DefaultLayout>
        <p className="text-center py-10 text-gray-600">
          Loading data ekstracurricular...
        </p>
      </DefaultLayout>
    );
  }

  // pesan jika tidak ada data ditemukan
  if (!ekstra) {
    return (
      <DefaultLayout>
        <p className="text-center py-10 text-gray-600">
          Ekstracurricular tidak ditemukan 😢
        </p>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="flex flex-col lg:flex-row w-full bg-[#F8F9FA] px-2 md:px-10 py-6 md:py-8 gap-4">
        <div className="w-full lg:w-5/7 bg-white p-4 md:p-6 rounded-2xl shadow-lg">
          <h1 className="font-poppins font-bold text-3xl md:text-4xl lg:text-5xl text-[#272727] py-5">
            {ekstra.name}
          </h1>

          <img
            src={ekstra.image || "/assets/images/default-article.jpg"}
            alt={ekstra.name}
            className="w-full h-[15rem] md:h-[30rem] object-cover object-center rounded-xl"
          />

          <div className="font-poppins text-lg text-justify text-black leading-relaxed py-8 whitespace-pre-line">
            {ekstra.description || "Tidak ada konten"}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-2/7 flex flex-col md:flex-row lg:flex-col gap-4 lg:gap-0 items-stretch">
          {/* Lainnya */}
          <div className="w-full bg-white p-6 rounded-2xl shadow-lg h-full lg:h-auto mb-6">
            <h1 className="font-poppins font-semibold text-black text-xl flex items-center gap-3">
              Fasilitas Lainnya
            </h1>

            <div className="flex flex-col pt-7 gap-4">
              {ekstraList.length > 0 ? (
                ekstraList.map((item) => {
                  const slug = item.name.toLowerCase().replace(/\s+/g, "_");

                  return (
                    <Link
                      to={`/ekstrakurikuler/${slug}?i=${item.id}`}
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
                          {item.description}
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

export default ExtracurricularDetail;
