import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { LoadingTransition } from "./components/ui/TextLoading";
import { useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <LoadingTransition
        loading={true}
        text="ESKALABER"
        size="xl"
        fullscreen={true}
      />
    );
  }

  // Jika belum login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role checking
  const isSuperAdmin = user.role === "superadmin";
  const isAdmin = user.role === "admin";

  // Daftar halaman yang boleh diakses oleh admin biasa
  const adminAllowedPaths = [
    "/admin/dashboard",
    "/admin/artikel",
    "/admin/artikel/tambah",
    "/admin/artikel/edit/",
    "/admin/gambar",
    "/admin/gambar/tambah",
    "/admin/gambar/edit/",
  ];

  // Cek apakah path sekarang boleh diakses oleh admin biasa
  if (isAdmin) {
    const currentPath = location.pathname;
    const canAccess = adminAllowedPaths.some((path) =>
      currentPath.startsWith(path)
    );

    if (!canAccess) {
      return <Navigate to="/admin/dashboard" replace />;
    }
  }

  // Superadmin bisa akses semua halaman
  if (isSuperAdmin || isAdmin) {
    return children;
  }

  // Jika role tidak dikenal
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
