import React, { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home/home.jsx";
import Profile from "./pages/Profile/profile.jsx";

export default function App() {
  const [view, setView] = useState("home");

  const handleProfileClick = () =>{
    setView("profile");
  }
  const handleHomeClick = () =>{
    setView("home");
  }

  return (
    <>
      <Navbar onHomeClick={handleHomeClick} onProfileClick={handleProfileClick} />
      {view === "home" && <Home />}
      {view === "profile" && <Profile />}
    </>
  );
}
