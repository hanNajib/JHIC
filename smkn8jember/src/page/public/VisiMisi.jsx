import {
  FaBookReader,
  FaEye,
  FaLightbulb,
  FaRegHandshake,
  FaUserCheck,
  FaUserTie,
} from "react-icons/fa";
import { TbMoonStars } from "react-icons/tb";
import DefaultLayout from "../../components/layout/DefaultLayout";
import parse from "html-react-parser";
import { useWebSettingByTitle } from "../../hooks/api/useWebSettings";

const VisiMisi = () => {
  const {data: visi} = useWebSettingByTitle('visi');
  const {data: misi} = useWebSettingByTitle('misi');
  const nilai = [
    {
      icon: <TbMoonStars className="text-3xl text-[#F77F00]" />,
      title: "Religius",
      desc: "Menghayati dan mengamalkan ajaran agama dalam kehidupan sehari-hari.",
    },
    {
      icon: <FaRegHandshake className="text-3xl text-[#F77F00]" />,
      title: "Jujur",
      desc: "Berperilaku dapat dipercaya dalam perkataan, tindakan, dan pekerjaan.",
    },
    {
      icon: <FaUserCheck className="text-3xl text-[#F77F00]" />,
      title: "Disiplin",
      desc: "Tertib dan patuh pada berbagai ketentuan dan peraturan.",
    },
    {
      icon: <FaUserTie className="text-3xl text-[#F77F00]" />,
      title: "Tanggung Jawab",
      desc: "Setiap siswa harus melaksanakan tugas dan kewajibannya.",
    },
    {
      icon: <FaLightbulb className="text-3xl text-[#F77F00]" />,
      title: "Kreatif",
      desc: "Berpikir dan melakukan sesuatu untuk menghasilkan cara atau hasil baru.",
    },
    {
      icon: <FaEye className="text-3xl text-[#F77F00]" />,
      title: "Mandiri",
      desc: "Sikap dan perilaku yang tidak mudah tergantung pada orang lain.",
    },
  ];
  return (
    <DefaultLayout>
      <section
        className="flex flex-col items-center justify-center py-20 relative text-center"
        style={{
          backgroundImage: "url('/assets/images/header-visi.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >
        <div className="absolute inset-0 w-full h-full bg-orange-500 opacity-40 pointer-events-none z-0"></div>

        <div className="relative z-10 max-w-3xl">
          <h1 className="font-poppins font-bold text-white text-4xl md:text-6xl mb-4">
            Visi & Misi Sekolah
          </h1>
          <p className="font-poppins hidden md:block text-white text-lg md:text-xl leading-relaxed">
            Visi dan misi sekolah menjadi pedoman dalam setiap langkah
            pengembangan pendidikan dan pembentukan karakter siswa.
          </p>
        </div>
      </section>
      <section className="w-full max-w-6xl mx-auto px-6 md:px-16 py-16">
        <div className="flex flex-col gap-8 items-start">
          {/* === VISI === */}
          <div className="bg-[#F77F00]/10 rounded-2xl p-8 shadow-md text-center flex flex-col items-center md:h-fit w-full">
            <div className="bg-[#F77F00]/30 w-16 h-16 flex items-center justify-center rounded-full mb-4">
              <FaEye className="text-[#F77F00] text-3xl" />
            </div>
            <h2 className="font-bold text-2xl mb-4">Visi</h2>
            <p className="text-gray-700 leading-relaxed italic max-w-md">
              {parse(visi?.data.value || "")}
            </p>
          </div>

          <div className="bg-[#F77F00]/10 rounded-2xl p-8 shadow-md">
            <div className="flex items-center flex-col gap-3 mb-4">
              <div className="bg-[#F77F00]/30 w-14 h-14 flex items-center justify-center rounded-full">
                <FaBookReader className="text-[#F77F00] text-2xl" />
              </div>
              <h2 className="font-bold text-2xl">Misi</h2>
            </div>

            <ol className="list-decimal list-inside space-y-2 text-gray-700 leading-relaxed">
              <li>
                Meningkatkan softskill peserta didik yang berprofil pelajar
                Pancasila dan sesuai dengan kebutuhan dunia kerja.
              </li>
              <li>
                Mensinkronkan Kurikulum secara kontekstual terhadap tuntutan
                kebutuhan dan perkembangan dunia kerja.
              </li>
              <li>
                Menerapkan pembelajaran yang berpusat pada peserta didik dengan
                pembelajaran berbasis projek nyata dari dunia kerja.
              </li>
              <li>
                Meningkatkan kompetensi pendidik dan tenaga kependidikan sesuai
                dengan perkembangan teknologi terkini dan berdedikasi tinggi.
              </li>
              <li>
                Mewujudkan kelas wirausaha untuk menumbuhkan jiwa wirausaha
                peserta didik.
              </li>
              <li>
                Menerapkan pola pengelolaan keuangan Badan Layanan Umum Daerah.
              </li>
              <li>
                Meningkatkan mutu sarana dan prasarana serta lingkungan belajar
                yang sesuai standar pendidikan dan standar kerja industri.
              </li>
              <li>
                Menerapkan budaya kerja industri bagi semua warga sekolah.
              </li>
              <li>
                Menjalin kemitraan dengan stakeholder untuk menyelenggarakan
                pendidikan berbasis Teaching Factory, pelatihan, magang, dan
                perekrutan lulusan
              </li>
            </ol>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center py-10 px-6">
        <h1 className="font-poppins font-bold text-2xl mb-10">
          Nilai Nilai Utama
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
          {nilai.map((item, index) => (
            <div
              key={index}
              className="border-2 border-transparent hover:border-[#F77F00] rounded-2xl p-6 flex flex-col items-center gap-4 text-center shadow-sm transition-all duration-300 hover:shadow-lg"
            >
              <div className="bg-[#F77F00]/20 w-14 h-14 flex items-center justify-center rounded-2xl">
                {item.icon}
              </div>
              <h2 className="font-bold text-xl text-gray-800">{item.title}</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </DefaultLayout>
  );
};

export default VisiMisi;
