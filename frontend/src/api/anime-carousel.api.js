import { apiFetch } from "./client/index";

export async function getAnimeCarouselApi() {
  return apiFetch("/anime/carousel");
}

export function createAnimeCarouselApi({
  title,
  description,
  cover_image,
  release_year,
  episodes,
}) {
  return apiFetch("/anime/carousel", {
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