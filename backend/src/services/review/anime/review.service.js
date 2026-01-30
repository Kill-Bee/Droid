import { findAnimeReviews } from "../../../models/review/anime/review.model.js";

export async function getAnimeReviews(animeId) {
  return await findAnimeReviews(animeId);
}
