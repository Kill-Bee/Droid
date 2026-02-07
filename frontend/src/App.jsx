import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/navbar/Navbar.jsx";
import Anime from "./pages/Anime/Anime.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Auth from "./pages/login/Auth.jsx";
import AnimeRating from "./pages/Rating/Anime/anime-rating.jsx";
import MangaRating from "./pages/Rating/Manga/manga-rating.jsx";
import AddAnime from "./pages/Data/AddAnime.jsx";
import AddManga from "./pages/Data/AddManga.jsx";
import Home from "./pages/Home/Home.jsx";
import Manga from "./pages/Manga/Manga.jsx";
import Footer from "./components/footer/Footer.jsx";

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
      <ToastContainer
        position="top-center"
        autoClose={3000}
        closeButton={false}
        theme="dark"
      />

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
          path="/auth"
          element={
            <>
              <Auth />
            </>
          }
        />

        {/* Routes dengan Navbar menggunakan Layout */}
        <Route element={<MainLayout search={search} setSearch={setSearch} />}>
          {/* Anime routes */}
          <Route path="/anime" element={<Anime search={search} />} />
          <Route path="/anime/:id" element={<AnimeRating />} />
          <Route path="/anime/carousel/:id" element={<AnimeRating />} />

          {/* Manga routes */}
          <Route path="/manga" element={<Manga search={search} />} />
          <Route path="/manga/:id" element={<MangaRating />} />
          <Route path="/manga/carousel/:id" element={<MangaRating />} />

          {/* Profile route */}
          <Route path="/profile" element={<Profile />} />

          {/* Data management routes */}
          <Route path="/add-anime" element={<AddAnime />} />
          <Route path="/add-manga" element={<AddManga />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
