import React, { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home/home.jsx";
import Profile from "./pages/Profile/profile.jsx";
import Login from "./pages/login/login.jsx";

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

  return (
    <>
      {!isLoginView && (
        <Navbar
          onHomeClick={handleHomeClick}
          onProfileClick={handleProfileClick}
          onLoginClick={handleLoginClick}
        />
      )}
      {view === "home" && <Home />}
      {view === "profile" && <Profile />}
      {view === "login" && <Login onHomeClick={handleHomeClick} />}
    </>
  );
}
