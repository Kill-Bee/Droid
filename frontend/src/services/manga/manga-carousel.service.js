import { uploadCoverManga, uploadLogoManga } from "../storage";
import { getMangaCarouselApi, createMangaCarouselApi } from "../../api/manga/manga-carousel.api";

export async function getMangaCarousel() {
  return getMangaCarouselApi();
}

export async function createMangaCarousel(data) {
  let coverUrl = null;
  let logoUrl = null;

  if (data.coverFile) {
    coverUrl = await uploadCoverManga(data.coverFile);
  }

  if (data.logo) {
    logoUrl = await uploadLogoManga(data.logo);
  }

  return createMangaCarouselApi({
    logo: logoUrl,
    title: data.title,
    description: data.description,
    cover_image: coverUrl,
    release_year: data.releaseYear,
    chapters: data.chapters,
  });
}
