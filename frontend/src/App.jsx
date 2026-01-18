import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar.jsx";
import Anime from "./pages/Anime/anime.jsx";
import Profile from "./pages/Profile/profile.jsx";
import LoginPage from "./pages/login/login.jsx";
import Rating from "./pages/Rating/rating.jsx";
import AddData from "./pages/Data/addData.jsx";
import Home from "./pages/Home/home.jsx"

export default function App() {
  const [view, setView] = useState("home");
  const [search, setSearch] = useState("");
  const isLoginView = view === "login";

  const handleProfileClick = () => {
    setView("profile");
  };
  const handleAnimeClick = () => {
    setView("anime");
  };
  const handleLoginClick = () => {
    setView("login");
  };
  const handleRatingClick = () => {
    setView("rating");
  };
  const handleAddDataClick = () => {
    setView("add");
  };
  const handleHomeClick = () => {
    setView("home");
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {!isLoginView && view !=="home" &&(
        <Navbar
          search={search}
          setSearch={setSearch}
          onHomeClick={handleHomeClick}
          onProfileClick={handleProfileClick}
          onLoginClick={handleLoginClick}
          onAddDataClick={handleAddDataClick}
          onAnimeClick={handleAnimeClick}
        />
      )}
      {view === "anime" && (
        <Anime search={search} onRatingClick={handleRatingClick} />
      )}
      {view === "profile" && <Profile />}
      {view === "login" && <LoginPage onAnimeClick={handleAnimeClick} />}
      {view === "rating" && <Rating />}
      {view === "add" && <AddData />}
      {view === "home" && <Home onAnimeClick={handleAnimeClick} />}

    </>
  );
}
