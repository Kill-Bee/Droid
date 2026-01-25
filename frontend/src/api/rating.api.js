import { apiFetch } from "./client/index";

export async function getAnimeRating(animeId) {
  return await apiFetch(`/anime/${animeId}/rating`);
}

export async function setAnimeRating(animeId, rating) {
  return await apiFetch(`/anime/${animeId}/rating`, {
    method: "POST",
    body: JSON.stringify({ rating }),
  });
}
