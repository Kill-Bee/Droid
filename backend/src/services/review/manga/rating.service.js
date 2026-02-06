import {
  createRating,
  findUserRating,
  updateRating,
  getAverageRating,
} from "../../../models/review/manga/rating.model.js";

export async function rateMangaService({ userId, mangaId, rating }) {
  if (rating < 0.5 || rating > 5 || rating * 2 !== Math.floor(rating * 2)) {
    throw new BadRequestException("Invalid rating");
  }

  const existing = await findUserRating(userId, mangaId);

  if (existing) {
    await updateRating(existing.id, rating);
    return { message: "Rating updated successfully" };
  }

  await createRating({ userId, mangaId, rating });

  return { message: "Rating created successfully" };
}

export async function getAverageRatings(mangaId) {
  return await getAverageRating(mangaId);
}
