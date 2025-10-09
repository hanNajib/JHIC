import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./page/admin/Dashboard";
import Artikel from "./page/admin/Artikel";
import EditArtikel from "./page/admin/EditArtikel";
import TambahArtikel from "./page/admin/TambahArtikel";
import ArtikelUser from "./page/admin/ArtikelUser";
import Pengumuman from "./page/admin/Pengumuman";
import PengumumanTambah from "./page/admin/TambahPengumuman";
import EditPengumuman from "./page/admin/EditPengumuman";
import Gambar from "./page/admin/Gambar";
import EditGambar from "./page/admin/EditGambar";
import TambahGambar from "./page/admin/TambahGambar";
import Guru from "./page/admin/Guru";
import TambahGuru from "./page/admin/TambahGuru";
import EditGuru from "./page/admin/EditGuru";
import Karyawan from "./page/admin/Karyawan";
import TambahKaryawan from "./page/admin/TambahKaryawan";
import EditKaryawan from "./page/admin/EditKaryawan";
import Siswa from "./page/admin/Siswa";
import Fasilitas from "./page/admin/Fasilitas";
import TambahFasilitas from "./page/admin/TambahFasilitas";
import EditFasilitas from "./page/admin/EditFasilitas";
import Ekstra from "./page/admin/Ekstra";
import TambahEkstra from "./page/admin/TambahEkstra";
import EditEkstra from "./page/admin/EditEkstra";
import Mapel from "./page/admin/Mapel";
import TambahMapel from "./page/admin/TambahMapel";
import EditMapel from "./page/admin/EditMapel";
import UserJurusan from "./page/admin/UserJurusan";
import TambahUserJurusan from "./page/admin/TambahUserJurusan";
import EditUserJurusan from "./page/admin/EditUserJurusan";
import Jurusan from "./page/admin/Jurusan";
import TambahJurusan from "./page/admin/TambahJurusan";
import EditJurusan from "./page/admin/EditJurusan";
import JurusanTrash from "./page/admin/JurusanTrash";
import StrukturOrganisasi from "./page/admin/StrukturOrganisasi";
import TambahJabatan from "./page/admin/TambahJabatan";
import EditStrukturOrganisasi from "./page/admin/EditStrukturOrganisasi";
import StrukturOrganisasiTrash from "./page/admin/StrukturOrganisasiTrash";
import WebSetting from "./page/admin/WebSetting";
import ArtikelUserVerifikasi from "./page/admin/ArtikelUserVerifikasi";
import History from './page/History'
import HomePage from './page/HomePage'
import AdminLayout from './components/layout/AdminLayout'
import HeadMaster from './page/HeadMaster'
import Gallery from './page/Gallery'
import Announcement from './page/Announcement'
import Login from './page/Login'
import DetailArtikel from "./page/DetailArtikel";
import Struktur from "./page/Struktur";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        {/* ADMIN ROUTES */}
        <Route path="/" element={<AdminLayout />}>
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

        {/* USER ROUTES */}
        <Route path="/history" element={<History />} />
        <Route path="/headmaster" element={<HeadMaster />} />
        <Route path="/announcement" element={<Announcement />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/detail" element={<DetailArtikel/>} />
        <Route path="/struktur" element={<Struktur/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
