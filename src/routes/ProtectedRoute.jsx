import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const tokenExists = document.cookie.includes("token=");

  return tokenExists ? <Outlet /> : <Navigate to="/login" replace />;
}
