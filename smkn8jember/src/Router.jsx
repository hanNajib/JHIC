import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "./components/layout/AdminLayout";
// Auth
import Login from "./page/auth/Login";
// Public Pages
import HomePage from "./page/public/HomePage";
import History from "./page/public/History";
import HeadMaster from "./page/public/HeadMaster";
import Announcement from "./page/public/Announcement";
import Gallery from "./page/public/Gallery";
import MajorDetail from "./page/public/MajorDetail";
// Admin - Dashboard
import Dashboard from "./page/admin/dashboard/Dashboard";
// Admin - Artikel
import Artikel from "./page/admin/artikel/Artikel";
import ArtikelUser from "./page/admin/artikel/ArtikelUser";
import ArtikelUserVerifikasi from "./page/admin/artikel/ArtikelUserVerifikasi";
import TambahArtikel from "./page/admin/artikel/TambahArtikel";
import EditArtikel from "./page/admin/artikel/EditArtikel";
// Admin - Pengumuman
import Pengumuman from "./page/admin/pengumuman/Pengumuman";
import PengumumanTambah from "./page/admin/pengumuman/TambahPengumuman";
import EditPengumuman from "./page/admin/pengumuman/EditPengumuman";
// Admin - Galeri
import Gambar from "./page/admin/galeri/Gambar";
import EditGambar from "./page/admin/galeri/EditGambar";
import TambahGambar from "./page/admin/galeri/TambahGambar";
// Admin - Guru
import Guru from "./page/admin/guru/Guru";
import TambahGuru from "./page/admin/guru/TambahGuru";
import EditGuru from "./page/admin/guru/EditGuru";
// Admin - Karyawan
import Karyawan from "./page/admin/karyawan/Karyawan";
import TambahKaryawan from "./page/admin/karyawan/TambahKaryawan";
import EditKaryawan from "./page/admin/karyawan/EditKaryawan";
// Admin - Siswa
import Siswa from "./page/admin/siswa/Siswa";
// Admin - Fasilitas
import Fasilitas from "./page/admin/fasilitas/Fasilitas";
import TambahFasilitas from "./page/admin/fasilitas/TambahFasilitas";
import EditFasilitas from "./page/admin/fasilitas/EditFasilitas";
// Admin - Ekstrakulikuler
import Ekstra from "./page/admin/ekstra/Ekstra";
import TambahEkstra from "./page/admin/ekstra/TambahEkstra";
import EditEkstra from "./page/admin/ekstra/EditEkstra";
// Admin - Mapel
import Mapel from "./page/admin/mapel/Mapel";
import TambahMapel from "./page/admin/mapel/TambahMapel";
import EditMapel from "./page/admin/mapel/EditMapel";
// Admin - User Admin
import UserJurusan from "./page/admin/user-admin/UserJurusan";
import TambahUserJurusan from "./page/admin/user-admin/TambahUserJurusan";
import EditUserJurusan from "./page/admin/user-admin/EditUserJurusan";
// Admin - Jurusan
import Jurusan from "./page/admin/jurusan/Jurusan";
import TambahJurusan from "./page/admin/jurusan/TambahJurusan";
import EditJurusan from "./page/admin/jurusan/EditJurusan";
import JurusanTrash from "./page/admin/jurusan/JurusanTrash";
// Admin - Struktur Organisasi
import StrukturOrganisasi from "./page/admin/struktur/StrukturOrganisasi";
import EditStrukturOrganisasi from "./page/admin/struktur/EditStrukturOrganisasi";
import StrukturOrganisasiTrash from "./page/admin/struktur/StrukturOrganisasiTrash";
// Admin - Settings
import TambahJabatan from "./page/admin/settings/TambahJabatan";
import WebSetting from "./page/admin/settings/WebSetting";
import VisiMisi from "./page/public/VisiMisi";
import StudentData from "./page/public/StudentData";
import Struktur from "./page/public/Struktur";
import DetailArtikel from "./page/public/DetailArtikel";
import ArtikelPage from "./page/public/Artikel";
import Teacher from "./page/public/Teacher";
import Employee from "./page/public/Employee";
import Facilitas from "./page/public/Facilitas";
import Extracurricular from "./page/public/Extracurricular";
import Kategori from "./page/admin/kategori/Kategori";
import TambahKategori from "./page/admin/kategori/TambahKategori";
import EditKategori from "./page/admin/kategori/EditKategori";
import Partner from "./page/admin/partner/Partner";
import TambahPartner from "./page/admin/partner/TambahPartner";
import EditPartner from "./page/admin/partner/EditPartner";
import Carrier from "./page/admin/Carrier/Carrier";
import TambahCarrier from "./page/admin/Carrier/TambahCarrier";
import EditCarrier from "./page/admin/Carrier/EditCarrier";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<Dashboard />} />

          {/* Artikel */}
          <Route path="artikel" element={<Artikel />} />
          <Route path="artikel/tambah" element={<TambahArtikel />} />
          <Route path="artikel/edit/:id" element={<EditArtikel />} />
          <Route path="artikelUser" element={<ArtikelUser />} />
          <Route path="artikelUser/verifikasi" element={<ArtikelUserVerifikasi />} />
          <Route path="artikelUser/edit/:id" element={<EditArtikel />} />

          {/* Pengumuman */}
          <Route path="pengumuman" element={<Pengumuman />} />
          <Route path="pengumuman/tambah" element={<PengumumanTambah />} />
          <Route path="pengumuman/edit/:id" element={<EditPengumuman />} />

          {/* Gambar */}
          <Route path="gambar" element={<Gambar />} />
          <Route path="gambar/tambah" element={<TambahGambar />} />
          <Route path="gambar/edit/:id" element={<EditGambar />} />

          {/* Data Guru */}
          <Route path="dataguru" element={<Guru />} />
          <Route path="dataguru/tambah" element={<TambahGuru />} />
          <Route path="dataguru/edit/:id" element={<EditGuru />} />

          {/* Data Karyawan */}
          <Route path="datakaryawan" element={<Karyawan />} />
          <Route path="datakaryawan/tambah" element={<TambahKaryawan />} />
          <Route path="datakaryawan/edit/:id" element={<EditKaryawan />} />

          {/* Siswa */}
          <Route path="siswa" element={<Siswa />} />

          {/* Fasilitas */}
          <Route path="fasilitas" element={<Fasilitas />} />
          <Route path="fasilitas/tambah" element={<TambahFasilitas />} />
          <Route path="fasilitas/edit/:id" element={<EditFasilitas />} />

          {/* Ekstrakulikuler */}
          <Route path="ekstrakulikuler" element={<Ekstra />} />
          <Route path="ekstrakulikuler/tambah" element={<TambahEkstra />} />
          <Route path="ekstrakulikuler/edit/:id" element={<EditEkstra />} />

          {/* Mata Pelajaran */}
          <Route path="mapel" element={<Mapel />} />
          <Route path="mapel/tambah" element={<TambahMapel />} />
          <Route path="mapel/edit/:id" element={<EditMapel />} />

          {/* Admin Jurusan */}
          <Route path="data-user" element={<UserJurusan />} />
          <Route path="data-user/tambah" element={<TambahUserJurusan />} />
          <Route path="data-user/edit/:id" element={<EditUserJurusan />} />

          {/* Jurusan */}
          <Route path="jurusan" element={<Jurusan />} />
          <Route path="jurusan/tambah" element={<TambahJurusan />} />
          <Route path="jurusan/edit/:id" element={<EditJurusan />} />

          {/* Kategori */}
          <Route path="kategori" element={<Kategori />} />
          <Route path="kategori/tambah" element={<TambahKategori />} />
          <Route path="kategori/edit/:id" element={<EditKategori />} />

          {/* partner */}
          <Route path="partner" element={<Partner />} />
          <Route path="partner/tambah" element={<TambahPartner />} />
          <Route path="partner/edit/:id" element={<EditPartner />} />

          {/* CArrier */}
          <Route path="carrier" element={<Carrier />} />
          <Route path="carrier/tambah" element={<TambahCarrier />} />
          <Route path="carrier/edit/:id" element={<EditCarrier />} />

          {/* Struktur Organisasi */}
          <Route path="strukturorganisasi" element={<StrukturOrganisasi />} />
          <Route path="strukturorganisasi/tambah" element={<TambahJabatan />} />
          <Route path="strukturorganisasi/edit/:id" element={<EditStrukturOrganisasi />} />
          <Route path="strukturorganisasitrash" element={<StrukturOrganisasiTrash />} />

          {/* Web Setting */}
          <Route path="websetting" element={<WebSetting />} />

        </Route>

        {/* Public Routes */}
        <Route path="/history" element={<History />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/facilitas" element={<Facilitas />} />
        <Route path="/extracurricular" element={<Extracurricular />} />
        <Route path="/headmaster" element={<HeadMaster />} />
        <Route path="/announcement" element={<Announcement />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/major/:id" element={<MajorDetail />} />
        <Route path="/detail" element={<DetailArtikel />} />
        <Route path="/visi-misi" element={<VisiMisi />} />
        <Route path="/student-data" element={<StudentData />} />
        <Route path="/artikel" element={<ArtikelPage />} />
        <Route path="/artikel/:slug" element={<DetailArtikel />} />
        <Route path="/struktur" element={<Struktur />} />


        {/* Not Found */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );  
}

export default Router;
