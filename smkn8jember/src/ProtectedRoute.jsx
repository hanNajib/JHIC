import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import TextLoading from "./components/ui/TextLoading";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if(loading) {
    return <TextLoading variant="flipFlow" text="ESKALABER" />;
  }
  
  if (!loading && !user) {
    return <Navigate to="/login" />;
  }
  return children ;

};

export default ProtectedRoute;
