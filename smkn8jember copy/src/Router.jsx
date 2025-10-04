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
          <Route path="artikel/tambah/" element={<TambahArtikel />} />
          <Route path="artikel/edit/:id" element={<EditArtikel />} />
          <Route path="artikelUser/edit/:id" element={<EditArtikel />} />
          <Route path="pengumuman" element={<Pengumuman />} />
          <Route path="pengumuman/tambah" element={<PengumumanTambah />} />
          <Route path="pengumuman/edit/:id" element={<EditPengumuman />} />
          <Route path="gambar" element={<Gambar />} />
          <Route path="gambar/edit/:id" element={<EditGambar />} />
          <Route path="gambar/tambah" element={<TambahGambar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
