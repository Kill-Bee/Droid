import { useState } from "react";
import "./login.css";

function Login({ onHomeClick, onRegristerClick }) {
  const handleRegisterClick = (event) => {
    event.preventDefault();
    onRegristerClick?.();
  };

  return (
    <>
      <div className="login">
        <div className="login-card">
          <div className="top">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#ffffff"
              onClick={onHomeClick}
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M15 7L10 12L15 17"
                  stroke="#ffffffff"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
            <h2>Login </h2>
          </div>
          <form className="login-form">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
            <p>
              Don't have an account?{" "}
              <a href="" onClick={handleRegisterClick}>
                Register here
              </a>
              .
            </p>
            <button type="submit" onClick={onHomeClick}>
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
function Register({ onHomeClick, onLoginClick }) {
  const handleLoginClick = (event) => {
    event.preventDefault();
    onLoginClick?.();
  };

  return (
    <div className="login">
      <div className="login-card">
        <div className="top">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff"
            onClick={onHomeClick}
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M15 7L10 12L15 17"
                stroke="#ffffffff"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
            </g>
          </svg>
          <h2>Register</h2>
        </div>
        <form className="login-form">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" placeholder="" required />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
          <p>
            Already have an account?{" "}
            <a href="" onClick={handleLoginClick}>
              Login here
            </a>
            .
          </p>
          <button type="submit" onClick={onHomeClick}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage({onHomeClick}) {
  const [view, setView] = useState("login");

  const showLogin = () => setView("login");
  const showRegister = () => setView("register");

  return view === "login" ? (
    <Login onHomeClick={onHomeClick} onRegristerClick={showRegister} />
  ) : (
    <Register onHomeClick={onHomeClick} onLoginClick={showLogin} />
  );
}
