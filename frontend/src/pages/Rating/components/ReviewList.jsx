import { useState } from "react";
import ReviewCard from "./ReviewCard";

export default function ReviewList({ reviews }) {
  const [currentPage, setCurrentPage] = useState(1);
  const revPerPage = 3;
  const indexOfLastRev = currentPage * revPerPage;
  const indexOfFirstRev = indexOfLastRev - revPerPage;
  const currentRev = reviews.slice(indexOfFirstRev, indexOfLastRev);
  const totalPages = Math.ceil(reviews.length / revPerPage);

  // handle pagnation
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  
  if (reviews.length === 0) {
    return <p style={{ color: "#ccc" }}>No reviews yet.</p>;
  }

  return (
    <div className="review-list">
      {currentRev.map((review, idx) => (
        <ReviewCard key={review.id || idx} review={review} />
      ))}

      {totalPages > 1 && (
         <div className="pagination">
          <button onClick={goToPrevPage} disabled={currentPage === 1}>
            Prev
          </button>
          <span>{currentPage} / {totalPages}</span>
          <button onClick={goToNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}
