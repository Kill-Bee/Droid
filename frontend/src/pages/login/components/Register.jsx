import { useState } from "react";
import { useAuth } from "../../../context/useAuth";
import { toast } from "react-toastify";
import "../login.css";

export default function Register({ onLoginClick }) {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await register(username, password, displayName);
      toast.success("Register berhasil, silakan login");
      onLoginClick();
    } catch (err) {
      toast.error(err.message || "Register gagal!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login">
      <div className="login-card">
        <div className="top">
          <h2>Register</h2>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />

          <label>Display Name</label>
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
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
            Already have an account?{" "}
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();
                onLoginClick();
              }}
            >
              Login here
            </a>
          </p>

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
