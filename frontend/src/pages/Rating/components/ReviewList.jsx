import ReviewCard from "./ReviewCard";

export default function ReviewList({ reviews }) {
  if (reviews.length === 0) {
    return <p style={{ color: "#ccc" }}>No reviews yet.</p>;
  }

  return (
    <div className="review-list">
      {reviews.map((review, idx) => (
        <ReviewCard key={review.id || idx} review={review} />
      ))}
    </div>
  );
}
