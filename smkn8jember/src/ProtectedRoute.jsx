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

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const isSuperAdmin = user.role === "superadmin";
  const isAdmin = user.role === "admin";

  const adminAllowedPaths = [
    "/admin/dashboard",
    "/admin/artikel",
    "/admin/artikel/tambah",
    "/admin/artikel/edit/",
    "/admin/gambar",
    "/admin/gambar/tambah",
    "/admin/gambar/edit/",
  ];

  if (isAdmin) {
    const currentPath = location.pathname;
    const canAccess = adminAllowedPaths.some((path) =>
      currentPath.startsWith(path)
    );

    if (!canAccess) {
      return <Navigate to="/admin/dashboard" replace />;
    }
  }

  if (isSuperAdmin || isAdmin) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;