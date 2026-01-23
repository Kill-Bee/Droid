import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar.jsx";
import Anime from "./pages/Anime/anime.jsx";
import Profile from "./pages/Profile/profile.jsx";
import LoginPage from "./pages/login/login.jsx";
import Rating from "./pages/Rating/rating.jsx";
import AddData from "./pages/Data/addData.jsx";
import AddManga from "./pages/Data/addManga.jsx";
import Home from "./pages/Home/home.jsx";
import Manga from "./pages/Manga/manga.jsx";
import Footer from "./components/footer.jsx";

// Layout component dengan Navbar
function MainLayout({ search, setSearch }) {
  return (
    <>
      <Navbar search={search} setSearch={setSearch} />
      <Outlet context={{ search, setSearch }} />
      <Footer />
    </>
  );
}

// Layout wrapper untuk pass props ke child routes
function LayoutWithSearch({ search, setSearch, children }) {
  return (
    <>
      <Navbar search={search} setSearch={setSearch} />
      {children}
    </>
  );
}

export default function App() {
  const [search, setSearch] = useState("");

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} theme="dark" />

      <Routes>
        {/* Public routes tanpa Navbar */}
        <Route
          path="/"
          element={
            <>
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <LoginPage />
            </>
          }
        />

        {/* Routes dengan Navbar menggunakan Layout */}
        <Route element={<MainLayout search={search} setSearch={setSearch} />}>
          {/* Anime routes */}
          <Route path="/anime" element={<Anime search={search} />} />
          <Route path="/anime/:id" element={<Rating />} />

          {/* Manga routes */}
          <Route path="/manga" element={<Manga search={search} />} />
          <Route path="/manga/:id" element={<Rating />} />

          {/* Profile route */}
          <Route path="/profile" element={<Profile />} />

          {/* Data management routes */}
          <Route path="/add-data" element={<AddData />} />
          <Route path="/add-manga" element={<AddManga />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
