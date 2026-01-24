import { useState } from "react";
import "../rating.css";

export default function StarRating({
  value = 0,
  onChange,
  onSubmit,
  loading = false,
  labels = ["worst", "bad", "mid", "good", "GOAT"],
}) {
  const [hover, setHover] = useState(0);

  return (
    <div className="star-rating">
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= (hover || value) ? "star active" : "star"}
            onClick={() => !loading && onChange(star)}
            onMouseEnter={() => !loading && setHover(star)}
            onMouseLeave={() => setHover(0)}
          >
            ★
          </span>
        ))}
      </div>

      <p className="rating-text">
        {value > 0 ? labels[value - 1] : "belum memilih"}
      </p>

      <button
        disabled={loading || value === 0}
        onClick={() => onSubmit(value)}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
}
