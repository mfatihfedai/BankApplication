import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const ProtectedRoute = ({ role, children }) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== role) {
    return <Navigate to="/" replace />; // Rol eşleşmezse ana sayfaya yönlendir
  }

  return children;
};

export default ProtectedRoute;
