import {
  makeAnimeCarousel,
  findAllAnimeCarousel,
} from "../models/anime-carousel.model.js";

export async function getAnimeCarouselService() {
  return await findAllAnimeCarousel();
}

export async function createAnimeCarouselService(data) {
  if (data.episodes <= 0) {
    throw new Error("Episodes must be greater than 0");
  }

  if (data.release_year < 1900) {
    throw new Error("Release year must be greater than 1900");
  }

  return await makeAnimeCarousel(data);
}
