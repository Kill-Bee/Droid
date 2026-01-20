import { apiFetch } from "./client";

export async function getMangaApi() {
  return apiFetch("/manga");
}

export async function getMangaByIdApi(id) {
  return apiFetch(`/manga/${id}`);
}

export function createMangaApi({
  title,
  description,
  cover_image,
  release_year,
  chapters,
}) {
  return apiFetch("/manga", {
    method: "POST",
    body: JSON.stringify({
      title,
      description,
      cover_image,
      release_year,
      chapters,
    }),
  });
}