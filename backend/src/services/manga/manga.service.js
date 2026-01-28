import {
  findAllManga,
  findMangaById,
  makeManga,
} from "../../models/manga/manga.model.js";
import { ValidationError, NotFoundError } from "../../errors/index.js";

export async function getMangaService() {
  return await findAllManga();
}

export async function getMangaByIdService(id) {
  if (!id) {
    throw new ValidationError("ID manga harus diisi");
  }

  const manga = await findMangaById(id);

  if (!manga) {
    throw new NotFoundError("Manga tidak ditemukan");
  }

  return manga;
}

export async function createMangaService(data) {
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

  return await makeManga({
    title: data.title,
    description: data.description,
    cover_image: data.cover_image,
    release_year: releaseYear,
    chapters: chapters,
  });
}
