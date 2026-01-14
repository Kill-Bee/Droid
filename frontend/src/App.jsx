import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home/home.jsx";
import Profile from "./pages/Profile/profile.jsx";
import LoginPage from "./pages/login/login.jsx";
import Rating from "./pages/Rating/rating.jsx";
import AddData from "./pages/Data/addData.jsx";

export default function App() {
  const [view, setView] = useState("login");
  const [search, setSearch] = useState("");
  const isLoginView = view === "login";

  const handleProfileClick = () => {
    setView("profile");
  };
  const handleHomeClick = () => {
    setView("home");
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

  return (
    <>
      {!isLoginView && (
        <Navbar
          search={search}
          setSearch={setSearch}
          onHomeClick={handleHomeClick}
          onProfileClick={handleProfileClick}
          onLoginClick={handleLoginClick}
          onAddDataClick={handleAddDataClick}
        />
      )}
      {view === "home" && (
        <Home search={search} onRatingClick={handleRatingClick} />
      )}
      {view === "profile" && <Profile />}
      {view === "login" && <LoginPage onHomeClick={handleHomeClick} />}
      {view === "rating" && <Rating />}
      {view === "add" && <AddData />}
    </>
  );
}
