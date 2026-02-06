import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

export default function AuthButton({ avatar }) {
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
    <>
      <img
        src={
          avatar ||
          "https://i.pinimg.com/736x/32/9c/c6/329cc6ad5210a2c666554d58c7a433e8.jpg"
        }
        alt="profile"
        onClick={() => navigate("/profile")}
      />
      {/* <button onClick={handleLogout} className="login-navbar">
        Logout
      </button> */}
    </>
  );
}
