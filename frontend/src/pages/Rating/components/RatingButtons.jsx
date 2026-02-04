import "../rating.css";

export default function RatingButtons({
  savedRating,
  deleteLoading,
  onOpenPopup,
  onDelete,
}) {
  return (
    <div className="buttons-rating">
      <button onClick={onOpenPopup}>
        {savedRating > 0 ? `Edit Rating ★ ${savedRating}` : "Rating ★"}
      </button>
      {savedRating > 0 && (
        <button
          onClick={onDelete}
          disabled={deleteLoading}
          style={{ backgroundColor: "#dc3545", marginLeft: "10px" }}
        >
          {deleteLoading ? "Deleting..." : "Delete Review"}
        </button>
      )}
    </div>
  );
}