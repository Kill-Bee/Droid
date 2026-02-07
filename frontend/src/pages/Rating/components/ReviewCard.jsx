import { useState } from "react";
import "../rating.css";

const defaultAvatar = "https://i.pinimg.com/736x/32/9c/c6/329cc6ad5210a2c666554d58c7a433e8.jpg";
const defaultBanner = "https://i.pinimg.com/736x/83/4e/00/834e00c4b74c19d8a8e4cabfd9c6a533.jpg";

export default function ReviewCard({ review }) {
  const { avatar, display_name, username, rating, created_at, content, banner, badge } =
    review;
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="card-rating">
      <div
        className="left-card"
        onMouseEnter={() => setShowPopup(true)}
        onMouseLeave={() => setShowPopup(false)}
      >
        <img
          src={avatar || defaultAvatar}
          alt={display_name || username}
        />
        {showPopup && (
          <div className="profile-preview-card review-popup">
            <div
              className="preview-banner"
              style={{
                backgroundImage: `url(${banner || defaultBanner})`,
              }}
            />
            <div className="preview-content">
              <img
                src={avatar || defaultAvatar}
                alt="avatar"
                className="preview-avatar"
              />
              <div className="preview-info">
                <div className="preview-name-row">
                  <span className="preview-name">
                    {display_name || "User"}
                  </span>
                  {badge && <span className="preview-user-badge">{badge}</span>}
                </div>
                {username && (
                  <span className="preview-badge">@{username}</span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="right-card">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <h3 style={{ margin: 0 }}>{display_name || username}</h3>
          <div
            style={{
              display: "inline-block",
              verticalAlign: "middle",
            }}
          >
            {[1, 2, 3, 4, 5].map((star) => {
              const fill = Math.min(Math.max((rating || 0) - (star - 1), 0), 1);
              return (
                <span key={star} className="star-wrapper-mini">
                  <span className="star-mini empty">★</span>
                  <span
                    className="star-mini fill"
                    style={{ width: `${fill * 100}%` }}
                  >
                    ★
                  </span>
                </span>
              );
            })}
          </div>
        </div>
        <i>{new Date(created_at).toLocaleDateString()}</i>
        <p style={{ marginTop: 6 }}>{content || ""}</p>
      </div>
    </div>
  );
}
