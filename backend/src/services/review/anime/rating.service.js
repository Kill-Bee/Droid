import {
  createRating,
  findUserRating,
  updateRating,
  getAverageRating,
} from "../../../models/review/anime/rating.model.js";
import { ValidationError } from "../../../errors/index.js";

export async function rateAnimeService({ userId, animeId, rating }) {
  if (rating < 0.5 || rating > 5 || rating * 2 !== Math.floor(rating * 2)) {
    throw new BadRequestException("Invalid rating");
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
