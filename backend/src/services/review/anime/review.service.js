import { getAnimeReviews } from "../../../models/review/anime/review.model.js";
import {
  createRating,
  upsertRating,
  deleteRating,
} from "../../../models/review/anime/rating.model.js";
import {
  createComment,
  upsertComment,
} from "../../../models/review/anime/comment.model.js";
import { ValidationError } from "../../../errors/index.js";

export async function postReview({ userId, animeId, rating, comment }) {
  if (rating < 0.5 || rating > 5 || rating * 2 !== Math.floor(rating * 2)) {
    throw new ValidationError("Invalid rating");
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

export async function upsertReview({ userId, animeId, rating, comment }) {
  if (rating < 0.5 || rating > 5 || rating * 2 !== Math.floor(rating * 2)) {
    throw new ValidationError("Invalid rating");
  }

  const ratingRow = await upsertRating({ userId, animeId, rating });

  if (comment && comment.trim()) {
    await upsertComment({
      ratingId: ratingRow.id,
      content: comment.trim(),
    });
  }

  return ratingRow;
}

export async function fetchAnimeReviews(animeId) {
  return await getAnimeReviews(animeId);
}

export async function removeReview({ userId, animeId }) {
  const deleted = await deleteRating({ userId, animeId });
  if (!deleted) {
    throw new Error("Review not found");
  }
  return deleted;
}
