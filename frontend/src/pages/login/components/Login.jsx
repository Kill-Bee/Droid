import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/useAuth";
import { toast } from "react-toastify";
import "../login.css";

export default function Login({ onRegisterClick }) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await login(username, password);
      toast.success("Login berhasil");
      navigate("/anime");
    } catch (err) {
      toast.error(err.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login">
      <div className="login-card">
        <div className="top">
          <svg onClick={() => navigate("/")} viewBox="0 0 24 24">
            <path d="M15 7L10 12L15 17" />
          </svg>
          <h2>Login</h2>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />

          <p>
            Don't have an account?{" "}
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();
                onRegisterClick();
              }}
            >
              Register here
            </a>
          </p>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
