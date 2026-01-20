import { apiFetch } from "./client";

export async function getAnimesApi() {
  return apiFetch("/anime");
}

export async function getAnimeByIdApi(id) {
  return apiFetch(`/anime/${id}`);
}

export async function deleteAnimeApi(id) {
  const response = await apiFetch(`/anime/${id}`, {
    method: "DELETE",
  });
  return response.json();
}

export function createAnimeApi({
  title,
  description,
  cover_image,
  release_year,
  episodes,
}) {
  return apiFetch("/anime", {
    method: "POST",
    body: JSON.stringify({
      title,
      description,
      cover_image,
      release_year,
      episodes,
    }),
  });
}