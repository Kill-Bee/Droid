import { getReviewsAnime, postReviewsAnime, upsertReviewsAnime, deleteReviewsAnime } from "../../api/review/review.api";

export async function getAnimeReviews(animeId) {
  return getReviewsAnime(animeId);
}

export async function postAnimeReviews(animeId, rating, comment) {
  return postReviewsAnime(animeId, rating, comment);
}

export async function upsertAnimeReviews(animeId, rating, comment) {
  return upsertReviewsAnime(animeId, rating, comment);
}

export async function deleteAnimeReviews(animeId) {
  return deleteReviewsAnime(animeId);
}