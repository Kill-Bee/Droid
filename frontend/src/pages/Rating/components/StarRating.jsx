import { useState } from "react";
import "../rating.css";

export default function StarRating({
  value = 0,
  onChange,
  onSubmit,
  onClose,
  loading = false,
}) {
  const [hover, setHover] = useState(0);
  const activeValue = hover > 0 ? hover : value;

  const getLabel = (value) => {
    if (value === 0) return "belum memilih";
    if (value <= 1) return "worst";
    if (value <= 2) return "bad";
    if (value <= 3) return "mid";
    if (value <= 4) return "good";
    return "GOAT";
  };

  return (
    <div className="star-rating">
      <div className="stars-container">
        {[1, 2, 3, 4, 5].map((star) => {
          const fill = Math.min(Math.max(activeValue - (star - 1), 0), 1);
          return (
            <span
              key={star}
              className="star-wrapper"
              onMouseMove={(e) => {
                if (loading) return;
                const { left, width } = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - left;
                const value = x < width / 2 ? star - 0.5 : star;
                setHover(value);
              }}
              onClick={() => !loading && onChange(activeValue)}
              onMouseLeave={() => setHover(0)}
            >
              <span className="star empty">★</span>
              <span className="star fill" style={{ width: `${fill * 100}%` }}>
                ★
              </span>
            </span>
          );
        })}
      </div>

      <p className="rating-text">
        {value > 0 ? getLabel(value) : "Belum Memilih"}
      </p>

      <div className="popup-buttons">
        <button
          className="close-btn-rating"
          disabled={loading}
          onClick={onClose}
        >
          Tutup
        </button>

        <button
          className="submit-btn-rating"
          disabled={loading || value === 0}
          onClick={() => onSubmit(value)}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
