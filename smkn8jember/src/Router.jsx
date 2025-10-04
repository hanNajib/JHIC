import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./page/Index";
import Dashboard from "./component/pages/Dashboard";
import Artikel from "./component/pages/Artikel";
import EditArtikel from "./component/pages/EditArtikel";
import TambahArtikel from "./component/pages/TambahArtikel";
import ArtikelUser from "./component/pages/ArtikelUser";
import Pengumuman from "./component/pages/Pengumuman";
import PengumumanTambah from "./component/pages/TambahPengumuman";
import EditPengumuman from "./component/pages/EditPengumuman";
import Gambar from "./component/pages/Gambar";
import EditGambar from "./component/pages/EditGambar";
import TambahGambar from "./component/pages/TambahGambar";
import Guru from "./component/pages/Guru";
import TambahGuru from "./component/pages/TambahGuru";
import EditGuru from "./component/pages/EditGuru";
import Karyawan from "./component/pages/Karyawan";
import TambahKaryawan from "./component/pages/TambahKaryawan";
import EditKaryawan from "./component/pages/EditKaryawan";
import Siswa from "./component/pages/Siswa";
import Fasilitas from "./component/pages/fasilitas";
import TambahFasilitas from "./component/pages/TambahFasilitas";
import EditFasilitas from "./component/pages/EditFasilitas";
import Ekstra from "./component/pages/Ekstra";
import TambahEkstra from "./component/pages/TambahEkstra";
import EditEkstra from "./component/pages/EditEkstra";
import Mapel from "./component/pages/Mapel";
import TambahMapel from "./component/pages/TambahMapel";
import EditMapel from "./component/pages/EditMapel";
import UserJurusan from "./component/pages/userJurusan";
import TambahUserJurusan from "./component/pages/TambahUserJurusan";
import EditUserJurusan from "./component/pages/EditUserJurusan";
import Jurusan from "./component/pages/Jurusan";
import TambahJurusan from "./component/pages/TambahJurusan";
import EditJurusan from "./component/pages/EditJurusan";
import JurusanTrash from "./component/pages/JurusanTrash";
import StrukturOrganisasi from "./component/pages/StrukturOrganisasi";
import TambahJabatan from "./component/pages/TambahJabatan";
import EditStrukturOrganisasi from "./component/pages/EditStrukturOrganisasi";
import StrukturOrganisasiTrash from "./component/pages/StrukturOrganisasiTrash";
import WebSetting from "./component/pages/WebSetting";
import ArtikelUserVerifikasi from "./component/pages/ArtikelUserVerifikasi";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Parent: Index sebagai layout */}
        <Route path="/" element={<Index />}>
          {/* isi konten muncul di <Outlet /> */}
          <Route index element={<Dashboard />} /> {/* default / */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="artikel" element={<Artikel />} />
          <Route path="artikelUser" element={<ArtikelUser />} />
          <Route path="artikelUser/verifikasi" element={<ArtikelUserVerifikasi />} />
          <Route path="artikel/tambah/" element={<TambahArtikel />} />
          <Route path="artikel/edit/:id" element={<EditArtikel />} />
          <Route path="artikelUser/edit/:id" element={<EditArtikel />} />
          <Route path="pengumuman" element={<Pengumuman />} />
          <Route path="pengumuman/tambah" element={<PengumumanTambah />} />
          <Route path="pengumuman/edit/:id" element={<EditPengumuman />} />
          <Route path="gambar" element={<Gambar />} />
          <Route path="gambar/edit/:id" element={<EditGambar />} />
          <Route path="gambar/tambah" element={<TambahGambar />} />
          <Route path="dataguru" element={<Guru />} />
          <Route path="dataguru/tambah" element={<TambahGuru />} />
          <Route path="dataguru/edit/:id" element={<EditGuru />} />
          <Route path="datakaryawan" element={<Karyawan />} />
          <Route path="datakaryawan/tambah" element={<TambahKaryawan />} />
          <Route path="datakaryawan/edit/:id" element={<EditKaryawan />} />
          <Route path="siswa" element={<Siswa />} />
          <Route path="fasilitas" element={<Fasilitas />} />
          <Route path="fasilitas/tambah" element={<TambahFasilitas />} />
          <Route path="fasilitas/edit/:id" element={<EditFasilitas />} />
          <Route path="ekstrakulikuler" element={<Ekstra />} />
          <Route path="ekstrakulikuler/tambah" element={<TambahEkstra />} />
          <Route path="ekstrakulikuler/edit/:id" element={<EditEkstra />} />
          <Route path="mapel" element={<Mapel />} />
          <Route path="mapel/tambah" element={<TambahMapel />} />
          <Route path="mapel/edit/:id" element={<EditMapel />} />
          <Route path="userjurusan" element={<UserJurusan />} />
          <Route path="userjurusan/tambah" element={<TambahUserJurusan />} />
          <Route path="userjurusan/edit/:id" element={<EditUserJurusan />} />
          <Route path="jurusan" element={<Jurusan />} />
          <Route path="jurusan/tambah" element={<TambahJurusan />} />
          <Route path="jurusan/edit/:id" element={<EditJurusan />} />
          <Route path="jurusantrash" element={<JurusanTrash />} />
          <Route path="strukturorganisasi" element={<StrukturOrganisasi />} />
          <Route path="strukturorganisasi/tambah" element={<TambahJabatan />} />
          <Route path="strukturorganisasi/edit/:id" element={<EditStrukturOrganisasi />} />
          <Route path="strukturorganisasitrash" element={<StrukturOrganisasiTrash />} />
          <Route path="websetting" element={<WebSetting />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
