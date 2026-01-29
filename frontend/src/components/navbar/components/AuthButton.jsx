import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

export default function AuthButton() {
  const navigate = useNavigate();
  const { isAuth, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  if (!isAuth) {
    return (
      <button onClick={() => navigate("/auth")} className="login-navbar">
        Login
      </button>
    );
  }

  return (
    <button onClick={handleLogout} className="login-navbar">
      Logout
    </button>
  );
}
