import "../rating.css";

export default function ReviewCard({ review }) {
  const { avatar, display_name, username, rating, created_at, content } =
    review;

  return (
    <div className="card-rating">
      <div className="left-card">
        <img
          src={avatar || "https://via.placeholder.com/80"}
          alt={display_name || username}
        />
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
