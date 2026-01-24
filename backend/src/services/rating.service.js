import {
  createRating,
  findUserRating,
  updateRating,
  getAverageRating,
} from "../models/rating.model.js";
import { ValidationError } from "../errors/index.js";

export async function rateAnimeService({ userId, animeId, rating }) {
  if (rating < 1 || rating > 5) {
    throw new ValidationError("Rating must be between 1 and 5");
  }

  const existing = await findUserRating(userId, animeId);

  if (existing) {
    await updateRating(existing.id, rating);
    return { message: "Rating updated successfully" };
  }

  await createRating({ userId, animeId, rating });

  return { message: "Rating created successfully" };
}

export async function getAverageRatings(animeId) {
  return await getAverageRating(animeId);
}
