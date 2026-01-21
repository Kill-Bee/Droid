import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Routes, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar.jsx";
import Anime from "./pages/Anime/anime.jsx";
import Profile from "./pages/Profile/profile.jsx";
import LoginPage from "./pages/login/login.jsx";
import Rating from "./pages/Rating/rating.jsx";
import AddData from "./pages/Data/addData.jsx";
import AddManga from "./pages/Data/addManga.jsx"
import Home from "./pages/Home/home.jsx";
import Manga from "./pages/Manga/manga.jsx";

export default function App() {
  const [search, setSearch] = useState("");

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} theme="dark" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/anime"
          element={
            <>
              <Navbar search={search} setSearch={setSearch} />
              <Anime search={search} />
            </>
          }
        />

        <Route
          path="/anime/:id"
          element={
            <>
              <Navbar search={search} setSearch={setSearch} />
              <Rating />
            </>
          }
        />
        <Route
          path="/manga"
          element={
            <>
              <Navbar search={search} setSearch={setSearch} />
              <Manga search={search} />
            </>
          }
        />

        <Route
          path="/profile"
          element={
            <>
              <Navbar search={search} setSearch={setSearch} />
              <Profile />
            </>
          }
        />

        <Route
          path="/add-data"
          element={
            <>
              <Navbar search={search} setSearch={setSearch} />
              <AddData />
            </>
          }
        />
        <Route
          path="/add-manga"
          element={
            <>
              <Navbar search={search} setSearch={setSearch} />
              <AddManga />
            </>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
