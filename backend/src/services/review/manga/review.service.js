import { getMangaReviews } from "../../../models/review/manga/review.model.js";
import {
  createRating,
  upsertRating,
  deleteRating,
} from "../../../models/review/manga/rating.model.js";
import {
  createComment,
  upsertComment,
} from "../../../models/review/manga/comment.model.js";
import { ValidationError } from "../../../errors/index.js";

export async function postReview({ userId, mangaId, rating, comment }) {
  if (rating < 0.5 || rating > 5 || rating * 2 !== Math.floor(rating * 2)) {
    throw new ValidationError("Invalid rating");
  }

  const ratingRow = await createRating({ userId, mangaId, rating });

  if (comment && comment.trim() !== "") {
    await createComment({
      ratingId: ratingRow.id,
      content: comment,
    });
  }

  return ratingRow;
}

export async function upsertReview({ userId, mangaId, rating, comment }) {
  if (rating < 0.5 || rating > 5 || rating * 2 !== Math.floor(rating * 2)) {
    throw new ValidationError("Invalid rating");
  }

  const ratingRow = await upsertRating({ userId, mangaId, rating });

  if (comment && comment.trim()) {
    await upsertComment({
      ratingId: ratingRow.id,
      content: comment.trim(),
    });
  }

  return ratingRow;
}

export async function fetchMangaReviews(mangaId) {
  return await getMangaReviews(mangaId);
}

export async function removeReview({ userId, mangaId }) {
  const deleted = await deleteRating({ userId, mangaId });
  if (!deleted) {
    throw new Error("Review not found");
  }
  return deleted;
}
