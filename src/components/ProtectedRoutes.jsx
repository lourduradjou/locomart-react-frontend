import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../services/api";
import { useState, useEffect } from "react";

function ProtectedRoutes({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem("access");
    if (!token) {
      return handleLogout();
    }

    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        await refreshToken();
      } else {
        setIsAuthorized(true);
      }
    } catch (error) {
      console.error("Token decode failed:", error);
      handleLogout();
    }
  };

  const refreshToken = async () => {
    const refresh = localStorage.getItem("refresh");
    if (!refresh) {
      return handleLogout();
    }

    try {
      const res = await api.post("/api/token/refresh/", { refresh });
      if (res.status === 200 && res.data.access) {
        localStorage.setItem("access", res.data.access);
        setIsAuthorized(true);
      } else {
        handleLogout();
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      handleLogout();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsAuthorized(false);
  };

  if (isAuthorized === null) {
    return (
      <div className="flex justify-center items-center w-full min-h-screen font-medium text-2xl text-indigo-600">
        Loading...
      </div>
    );
  }

  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoutes;
