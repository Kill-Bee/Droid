import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";

export default function Auth() {
  const [view, setView] = useState("login");

  const showLogin = () => setView("login");
  const showRegister = () => setView("register");

  return view === "login" ? (
    <Login onRegisterClick={showRegister} />
  ) : (
    <Register onLoginClick={showLogin} />
  );
}
