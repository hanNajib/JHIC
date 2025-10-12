import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { LoadingTransition } from "./components/ui/TextLoading";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (!loading && !user) {
    return <Navigate to="/login" />;
  }

  return (
    <LoadingTransition 
      loading={loading}
      text="ESKALABER"
      size="xl"
      fullscreen={true}
    >
      {children}
    </LoadingTransition>
  );
};

export default ProtectedRoute;