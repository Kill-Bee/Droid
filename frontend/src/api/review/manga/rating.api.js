// import { apiPublic } from "../client/publicFetch";
import { apiAuth } from "../../client/authFetch";

export async function getMangaRating(mangaId) {
  return await apiAuth.get(`/manga/${mangaId}/rating`);
}

export async function setMangaRating(mangaId, rating) {
  return await apiAuth.post(`/manga/${mangaId}/rating`, {
    rating,
  });
}
