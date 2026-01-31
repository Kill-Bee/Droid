import { getAnimeReviews } from "../../../models/review/anime/review.model.js";
import { createRating } from "../../../models/review/anime/rating.model.js";
import { createComment } from "../../../models/review/anime/comment.model.js";

export async function postReview({ userId, animeId, rating, comment }) {
  if (rating < 0.5 || rating > 5 || rating * 2 !== Math.floor(rating * 2)) {
    throw new BadRequestException("Invalid rating");
  }

  const ratingRow = await createRating({ userId, animeId, rating });

  if (comment && comment.trim() !== "") {
    await createComment({
      ratingId: ratingRow.id,
      content: comment,
    });
  }

  return ratingRow;
}

export async function fetchAnimeReviews(animeId) {
  return await getAnimeReviews(animeId);
}
