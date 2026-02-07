import StarRating from "../../components/StarRating";
import "../anime-rating.css";

export default function RatingPopup({
  isOpen,
  draftRating,
  draftComment,
  loading,
  onRatingChange,
  onCommentChange,
  onSubmit,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>What is your rating to this anime?</h2>

        <StarRating
          value={draftRating}
          comment={draftComment}
          loading={loading}
          onChange={onRatingChange}
          onCommentChange={onCommentChange}
          onSubmit={onSubmit}
          onClose={onClose}
        />
      </div>
    </div>
  );
}
