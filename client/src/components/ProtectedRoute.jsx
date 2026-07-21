import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// ===============================
// Protected Route
// ===============================

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Wait until authentication check finishes
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;