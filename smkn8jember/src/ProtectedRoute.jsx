import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { Loading } from "./components/ui";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if(loading) {
    return <Loading fullScreen={true} />
  }

  if (!loading && !user) {
    return <Navigate to="/login" />;
  }

  return children ;
};

export default ProtectedRoute;
