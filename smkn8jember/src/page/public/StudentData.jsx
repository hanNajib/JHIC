import {
  PiGenderFemaleBold,
  PiGenderMaleBold,
  PiStudentBold,
} from "react-icons/pi";
import { RiBuilding2Line } from "react-icons/ri";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Loading } from "../../components/ui";
import { useStudentData } from "../../hooks/api/useStudentData";

const StudentData = () => {
  const { data: studentResponseHook, isLoading } = useStudentData();
  const studentResponse = studentResponseHook?.data || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading variant="spinner" size="large" />
      </div>
    );
  }

  // Ambil nilai dari API (pastikan key-nya sesuai field di backend)
  const data = {};
  studentResponse.forEach((item) => {
    data[item.name?.toLowerCase()] = item.value;
  });
  console.log(data);
  

  const totalSiswa =
    (parseInt(data.jumlahsiswa || 0) || 0) +
    (parseInt(data.jumlahsiswi || 0) || 0) 

  const statistik = [
    {
      icon: <PiStudentBold size={30} className="text-white" />,
      jumlah: totalSiswa.toLocaleString(),
      label: "Total Siswa",
    },
    {
      icon: <PiGenderMaleBold size={30} className="text-white" />,
      jumlah: (parseInt(data.jumlahsiswa) || 0).toLocaleString(),
      label: "Siswa Laki-laki",
    },
    {
      icon: <PiGenderFemaleBold size={30} className="text-white" />,
      jumlah: (parseInt(data.jumlahsiswi) || 0).toLocaleString(),
      label: "Siswa Perempuan",
    },
    {
      icon: <RiBuilding2Line size={30} className="text-white" />,
      jumlah: (parseInt(data.jumlahrombelkelas) || 0).toLocaleString(),
      label: "Rombel Kelas",
    },
  ];

  const classes = [
    {
      grade: "X",
      jumlah: `${data.kelas10 || 0} Siswa`,
      kelas: "Kelas 10",
    },
    {
      grade: "XI",
      jumlah: `${data.kelas11 || 0} Siswa`,
      kelas: "Kelas 11",
    },
    {
      grade: "XII",
      jumlah: `${data.kelas12 || 0} Siswa`,
      kelas: "Kelas 12",
    },
  ];

  return (
    <>
      <Navbar />

      {/* Header */}
      <section
        className="flex flex-col items-center justify-center py-20 relative text-center"
        style={{
          backgroundImage: "url('/assets/images/header-siswa.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 w-full h-full bg-orange-500 opacity-40 z-0"></div>

        <div className="relative z-10 max-w-3xl">
          <h1 className="font-poppins font-bold text-white text-4xl md:text-6xl mb-4">
            Data Siswa
          </h1>
          <p className="font-poppins hidden md:block text-white text-lg md:text-xl leading-relaxed">
            Semua Data Siswa-Siswi Kelas 10, 11, dan 12 SMK Negeri 8 Jember
          </p>
        </div>
      </section>

      {/* Statistik */}
      <section className="grid grid-cols-2 md:flex md:flex-row items-center gap-6 justify-center py-8 px-6">
        {statistik.map((item, index) => (
          <div
            key={index}
            className="bg-[#F77F00]/20 w-full md:w-48 p-6 rounded-lg shadow-md flex flex-col items-center gap-6"
          >
            <div className="bg-[#FF6000] text-white p-2 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform duration-300">
              {item.icon}
            </div>
            <div className="leading-snug flex flex-col items-center">
              <p className="font-bold text-2xl font-poppins">{item.jumlah}</p>
              <p className="text-xs font-poppins text-[#495057]">
                {item.label}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Daftar Kelas */}
      <section className="bg-[#EEEEEE] py-16 flex flex-col items-center justify-center px-6 m-8 rounded-lg">
        <h1 className="font-bold text-2xl font-poppins">Daftar Data Siswa</h1>
        <div className="flex flex-row flex-wrap items-center justify-center gap-8 mt-10">
          {classes.map((kelas, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-md flex flex-col items-center w-64 hover:scale-105 transition-transform duration-300"
            >
              <div className="bg-[#FF6000] w-32 h-32 flex items-center justify-center rounded-full text-white text-5xl font-bold mb-6">
                {kelas.grade}
              </div>
              <p className="font-bold text-lg font-poppins">{kelas.jumlah}</p>
              <p className="text-sm text-gray-500 font-poppins">
                {kelas.kelas}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default StudentData;
