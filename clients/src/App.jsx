import React, { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home/home.jsx";
import Profile from "./pages/Profile/profile.jsx";
import LoginPage from "./pages/login/login.jsx";
import Rating from "./pages/Rating/rating.jsx";

export default function App() {
  const [view, setView] = useState("home");
  const isLoginView = view === "login";

  const handleProfileClick = () =>{
    setView("profile");
  }
  const handleHomeClick = () =>{
    setView("home");
  }
   const handleLoginClick = () =>{
    setView("login");
  }
  const handleRatingClick = () =>{
    setView("rating");
  }

  return (
    <>
      {!isLoginView && (
        <Navbar
          onHomeClick={handleHomeClick}
          onProfileClick={handleProfileClick}
          onLoginClick={handleLoginClick}
        />
      )}
      {view === "home" && <Home  onRatingClick={handleRatingClick} />}
      {view === "profile" && <Profile />}
      {view === "login" && <LoginPage onHomeClick={handleHomeClick} />}
      {view === "rating" && <Rating/>}
    </>
  );
}
