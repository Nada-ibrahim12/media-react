import Navbar from "./pages/components/Navbar";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/Home/index";
import Login from "./pages/Register/components/Login";
import Register from "./pages/Register/components/Register";
import Upload from "./pages/Upload/index";
import Welcome from "./pages/Register/index";
import { useState, useEffect } from "react";

export default function App() {
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${import.meta.env.VITE_API_URL}/auth/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          return response.json();
        })
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          localStorage.removeItem("token");
          navigate("/");
        });
    } else {
      navigate("/");
    }
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserData(null);
    navigate("/");
  }

  function ProtectedRoute({ children }: { children: React.ReactNode }) {
    if (!localStorage.getItem("token")) {
      return <Navigate to="/" replace />;
    }
    return <>{children}</>;
  }
  

  return (
    <>
      <Navbar userData={userData} logout={handleLogout} />
      <div>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <Upload />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}
