import { apiPublic } from "../client/publicFetch";

export async function getAnimeCarouselApi() {
  return apiPublic.get("/anime/carousel");
}

export function createAnimeCarouselApi({
  logo,
  title,
  description,
  cover_image,
  release_year,
  episodes,
}) {
  return apiPublic.post("/anime/carousel", {
    logo,
    title,
    description,
    cover_image,
    release_year,
    episodes,
  });
}
