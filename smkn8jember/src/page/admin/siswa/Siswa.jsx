import { IoIosArrowBack } from "react-icons/io";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Siswa = () => {
  const id = 1; // ✅ ambil id dari URL
  const [siswa, setSiswa] = useState([]);

  useEffect(() => {
    fetch("/siswa.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((a) => a.id === parseInt(id));
        setSiswa(found || null);
      });
  }, [id]);

  return (
    <div className="flex flex-col justify-center gap-10 w-full h-fit bg-white rounded-lg p-5">
      {/* Title */}
      <div className="flex items-center gap-3">
        <h1 className="font-bold text-gray-900 text-2xl md:text-3xl lg:text-4xl">Data Siswa  Setting</h1>
      </div>

      <form className="flex flex-col gap-5">
        {/* kelas10 */}
        <div className="flex flex-col">
          <label htmlFor="kelas10" className="font-bold text-gray-800">
            Jumlah Siswa Kelas 10
          </label>
          <input
            type="text"
            id="kelas10"
            value={siswa.kelas10}
            onChange={(e) => setSiswa({ ...siswa, kelas10: e.target.value })}
            placeholder="Masukkan Jumlah Siswa Kelas 10"
            className="w-full px-3 py-1 text-gray-600 border border-gray-600 rounded-lg focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
          />
        </div>

        {/* kelas11 */}
        <div className="flex flex-col">
          <label htmlFor="kelas11" className="font-bold text-gray-800">
            Jumlah Siswa Kelas 11
          </label>
          <input
            type="text"
            id="kelas11"
            value={siswa.kelas11}
            onChange={(e) => setSiswa({ ...siswa, kelas11: e.target.value })}
            placeholder="Masukkan Jumlah Siswa Kelas 11"
            className="w-full px-3 py-1 text-gray-600 border border-gray-600 rounded-lg focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
          />
        </div>

        {/* kelas12 */}
        <div className="flex flex-col">
          <label htmlFor="kelas12" className="font-bold text-gray-800">
            Jumlah Siswa Kelas 12
          </label>
          <input
            type="text"
            id="kelas12"
            value={siswa.kelas12}
            onChange={(e) => setSiswa({ ...siswa, kelas12: e.target.value })}
            placeholder="Masukkan Jumlah Siswa Kelas 12"
            className="w-full px-3 py-1 text-gray-600 border border-gray-600 rounded-lg focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
          />
        </div>

        {/* lakilaki */}
        <div className="flex flex-col">
          <label htmlFor="lakilaki" className="font-bold text-gray-800">
            Jumlah Siswa Laki Laki
          </label>
          <input
            type="text"
            id="lakilaki"
            value={siswa.lakilaki}
            onChange={(e) => setSiswa({ ...siswa, lakilaki: e.target.value })}
            placeholder="Masukkan Jumlah Siswa Laki-Laki"
            className="w-full px-3 py-1 text-gray-600 border border-gray-600 rounded-lg focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
          />
        </div>

        {/* perempuan */}
        <div className="flex flex-col">
          <label htmlFor="perempuan" className="font-bold text-gray-800">
            Jumlah Siswa Perempuan
          </label>
          <input
            type="text"
            id="perempuan"
            value={siswa.perempuan}
            onChange={(e) => setSiswa({ ...siswa, perempuan: e.target.value })}
            placeholder="Masukkan Jumlah Siswa Perempuan"
            className="w-full px-3 py-1 text-gray-600 border border-gray-600 rounded-lg focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
          />
        </div>

        {/* rombelKelas */}
        <div className="flex flex-col">
          <label htmlFor="rombelKelas" className="font-bold text-gray-800">
            Jumlah Siswa Rombel Kelas
          </label>
          <input
            type="text"
            id="rombelKelas"
            value={siswa.rombelKelas}
            onChange={(e) =>
              setSiswa({ ...siswa, rombelKelas: e.target.value })
            }
            placeholder="Masukkan Jumlah Rombel Kelas"
            className="w-full px-3 py-1 text-gray-600 border border-gray-600 rounded-lg focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
          />
        </div>

        {/* Tombol */}
        <div className="flex gap-3 justify-end">
          <button
            type="submit"
            className="bg-orange-500 text-white font-semibold py-1 text-sm md:text-base w-24 rounded-4xl hover:bg-orange-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Siswa;
