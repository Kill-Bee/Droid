import { uploadCoverAnime } from "./storage";
import { getAnimeCarouselApi, createAnimeCarouselApi } from "../api/anime-carousel.api";

export async function getAnimesCarousel() {
  return getAnimeCarouselApi();
}

export async function createAnimeCarousel(data) {
  let coverUrl = null;

  if (data.coverFile) {
    coverUrl = await uploadCoverAnime(data.coverFile);
  }

  return createAnimeCarouselApi({
    logo: data.logo,
    title: data.title,
    description: data.description,
    cover_image: coverUrl,
    release_year: data.releaseYear,
    episodes: data.episodes,
  });
}
