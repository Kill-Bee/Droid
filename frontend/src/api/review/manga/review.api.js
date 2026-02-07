import { apiAuth } from "../../client/authFetch";

export async function getReviewsManga(mangaId) {
  return await apiAuth.get(`/manga/${mangaId}/reviews`);
}

export async function postReviewsManga(mangaId, rating, comment) {
  return await apiAuth.post(`/manga/${mangaId}/reviews`, {
    rating,
    comment,
  });
}

export async function upsertReviewsManga(mangaId, rating, comment) {
  return await apiAuth.post(`/manga/${mangaId}/reviews/upsert`, {
    rating,
    comment,
  });
}

export async function deleteReviewsManga(mangaId) {
  return await apiAuth.delete(`/manga/${mangaId}/reviews`);
}