import { getReviewsAnime, postReviewsAnime } from "../../api/review/review.api";

export async function getAnimeReviews(animeId) {
  return getReviewsAnime(animeId);
}

export async function postAnimeReviews(animeId, rating, comment) {
  return postReviewsAnime(animeId, rating, comment);
}
