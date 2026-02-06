import { apiAuth } from "../../client/authFetch";

export async function getReviewsAnime(animeId) {
  return await apiAuth.get(`/anime/${animeId}/reviews`);
}

export async function postReviewsAnime(animeId, rating, comment) {
  return await apiAuth.post(`/anime/${animeId}/reviews`, {
    rating,
    comment,
  });
}

export async function upsertReviewsAnime(animeId, rating, comment) {
  return await apiAuth.post(`/anime/${animeId}/reviews/upsert`, {
    rating,
    comment,
  });
}

export async function deleteReviewsAnime(animeId) {
  return await apiAuth.delete(`/anime/${animeId}/reviews`);
}