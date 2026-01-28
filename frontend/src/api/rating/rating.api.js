import { apiPublic } from "../client/publicFetch";
import { apiAuth } from "../client/authFetch";

export async function getAnimeRating(animeId) {
  return await apiPublic.get(`/anime/${animeId}/rating`);
}

export async function setAnimeRating(animeId, rating) {
  return await apiAuth.post(`/anime/${animeId}/rating`, {
    rating,
  });
}
