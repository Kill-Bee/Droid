import {
  makeMangaCarousel,
  findAllMangaCarousel,
  findMangaCarouselById,
} from "../../models/manga/manga-carousel.model.js";
import { ValidationError } from "../../errors/index.js";

export async function getMangaCarouselService() {
  return await findAllMangaCarousel();
}

export async function getMangaCarouselByIdService(id) {
  if (!id) {
    throw new ValidationError("ID manga carousel harus diisi");
  }

  const manga = await findMangaCarouselById(id);

  if (!manga) {
    throw new NotFoundError("Manga Carousel tidak ditemukan");
  }

  return manga;
}

export async function createMangaCarouselService(data) {
  // Validasi required fields
  if (!data.title) {
    throw new ValidationError("Judul manga harus diisi");
  }

  if (data.release_year == null) {
    throw new ValidationError("Tahun rilis harus diisi");
  }

  if (data.chapters == null) {
    throw new ValidationError("Jumlah chapter harus diisi");
  }

  // Konversi dan validasi data
  const chapters = Number(data.chapters);
  const releaseYear = Number(data.release_year);

  if (isNaN(chapters) || chapters <= 0) {
    throw new ValidationError("Jumlah chapter harus lebih dari 0");
  }

  if (isNaN(releaseYear) || releaseYear < 1900) {
    throw new ValidationError("Tahun rilis harus lebih dari 1900");
  }

  return await makeMangaCarousel({
    title: data.title,
    description: data.description,
    cover_image: data.cover_image,
    release_year: releaseYear,
    chapters: chapters,
  });
}
