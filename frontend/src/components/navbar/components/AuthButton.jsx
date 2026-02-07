import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

export default function AuthButton({ profile }) {
  const navigate = useNavigate();
  const { isAuth, logout } = useAuth();
  const [showPreview, setShowPreview] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  const defaultAvatar = "https://i.pinimg.com/736x/32/9c/c6/329cc6ad5210a2c666554d58c7a433e8.jpg";
  const defaultBanner = "https://i.pinimg.com/736x/83/4e/00/834e00c4b74c19d8a8e4cabfd9c6a533.jpg";

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

      {showPreview && (
        <div className="profile-preview-card">
          <div
            className="preview-banner"
            style={{
              backgroundImage: `url(${profile?.banner || defaultBanner})`,
            }}
          />
          <div className="preview-content">
            <img
              src={profile?.avatar || defaultAvatar}
              alt="avatar"
              className="preview-avatar"
            />
            <div className="preview-info">
              <div className="preview-name-row">
                <span className="preview-name">
                  {profile?.display_name || "User"}
                </span>
                {profile?.badge && (
                  <span className="preview-user-badge">{profile.badge}</span>
                )}
              </div>
              {profile?.username && (
                <span className="preview-badge">@{profile.username}</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
