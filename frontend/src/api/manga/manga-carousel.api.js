import { apiPublic } from "../client/publicFetch";

export async function getMangaCarouselApi() {
  return apiPublic.get("/manga/carousel");
}

export function createMangaCarouselApi({
  title,
  description,
  cover_image,
  release_year,
  chapters,
}) {
  return apiPublic.post("/manga/carousel", {
    title,
    description,
    cover_image,
    release_year,
    chapters,
  });
}
