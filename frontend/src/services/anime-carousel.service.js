import { uploadCoverAnime, uploadLogoAnime } from "./storage";
import { getAnimeCarouselApi, createAnimeCarouselApi } from "../api/anime-carousel.api";

export async function getAnimesCarousel() {
  return getAnimeCarouselApi();
}

export async function createAnimeCarousel(data) {
  let coverUrl = null;
  let logoUrl = null;

  if (data.coverFile) {
    coverUrl = await uploadCoverAnime(data.coverFile);
  }

  if (data.logo) {
    logoUrl = await uploadLogoAnime(data.logo);
  }

  return createAnimeCarouselApi({
    logo: logoUrl,
    title: data.title,
    description: data.description,
    cover_image: coverUrl,
    release_year: data.releaseYear,
    episodes: data.episodes,
  });
}
