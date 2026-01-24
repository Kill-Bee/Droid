import { uploadCoverManga } from "./storage";
import { getMangaCarouselApi, createMangaCarouselApi } from "../api/Manga-carousel.api";

export async function getMangaCarousel() {
  return getMangaCarouselApi();
}

export async function createMangaCarousel(data) {
  let coverUrl = null;

  if (data.coverFile) {
    coverUrl = await uploadCoverManga(data.coverFile);
  }

  return createMangaCarouselApi({
    title: data.title,
    description: data.description,
    cover_image: coverUrl,
    release_year: data.releaseYear,
    chapters: data.chapters,
  });
}
