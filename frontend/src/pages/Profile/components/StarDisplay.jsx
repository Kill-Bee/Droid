export default function StarDisplay({ rating }) {
  if (!rating || rating === 0) return <span className="star-display">—</span>;

  const stars = [];

  for (let i = 1; i <= 5; i++) {
    const fill = Math.min(Math.max(rating - (i - 1), 0), 1);

    if (fill === 0) break;

    stars.push(
      <span key={i} className="star-display-wrapper">
        <span className="star-display-empty">★</span>
        <span className="star-display-fill" style={{ width: `${fill * 100}%` }}>
          ★
        </span>
      </span>,
    );
  }

  return <span className="star-display">{stars}</span>;
}
