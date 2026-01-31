import { apiAuth } from "../client/authFetch";
// import { apiPublic } from "../client/publicFetch";

export async function getReviewsAnime(animeId) {
  return await apiAuth.get(`/anime/${animeId}/reviews`);
}

export async function postReviewsAnime(animeId, rating, comment) {
  return await apiAuth.post(`/anime/${animeId}/reviews`, {
    rating,
    comment,
  });
}
