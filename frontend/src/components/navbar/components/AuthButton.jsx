import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

export default function AuthButton({ profile }) {
  const navigate = useNavigate();
  const { isAuth } = useAuth();


  const defaultAvatar = "https://i.pinimg.com/736x/32/9c/c6/329cc6ad5210a2c666554d58c7a433e8.jpg";

  if (!isAuth) {
    return (
      <button onClick={() => navigate("/auth")} className="login-navbar">
        Login
      </button>
    );
  }

  return (
    <div
      className="profile-hover-container"
      // onMouseEnter={() => setShowPreview(true)}
      // onMouseLeave={() => setShowPreview(false)}
    >
      <img
        src={profile?.avatar || defaultAvatar}
        alt="profile"
        onClick={() => navigate("/profile")}
        className="nav-avatar"
      />

    </div>
  );
}
