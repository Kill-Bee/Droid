import { getReviewsManga, postReviewsManga, upsertReviewsManga, deleteReviewsManga } from "../../../api/review/review.api";

export async function getMangaReviews(mangaId) {
  return getReviewsManga(mangaId);
}

export async function postMangaReviews(mangaId, rating, comment) {
  return postReviewsManga(mangaId, rating, comment);
}

export async function upsertMangaReviews(mangaId, rating, comment) {
  return upsertReviewsManga(mangaId, rating, comment);
}

export async function deleteMangaReviews(mangaId) {
  return deleteReviewsManga(mangaId);
}