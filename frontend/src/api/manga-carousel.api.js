import { apiFetch } from "./client/index";

export async function getMangaCarouselApi() {
  return apiFetch("/manga/carousel");
}

export function createMangaCarouselApi({
  title,
  description,
  cover_image,
  release_year,
  chapters,
}) {
  return apiFetch("/manga/carousel", {
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