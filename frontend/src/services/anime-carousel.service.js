import { getAnimeCarouselApi, createAnimeCarouselApi } from "../api/anime-carousel.api";
import { uploadCover } from "./storage";

export async function getAnimesCarousel() {
  return getAnimeCarouselApi();
}

export async function createAnimeCarousel(data) {
  let coverUrl = null;

  if (data.coverFile) {
    coverUrl = await uploadCover(data.coverFile);
  }

  return createAnimeCarouselApi({
    title: data.title,
    description: data.description,
    cover_image: coverUrl,
    release_year: data.releaseYear,
    episodes: data.episodes,
  });
}
