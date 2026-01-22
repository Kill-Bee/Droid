import {
  findAllAnime,
  findAnimeById,
  makeAnime,
  animeDetails,
} from "../models/anime.model.js";
import { ValidationError, NotFoundError } from "../errors/index.js";

export async function getAnimeService() {
  return await findAllAnime();
}

export async function getAnimeByIdService(id) {
  if (!id) {
    throw new ValidationError("ID anime harus diisi");
  }

  const anime = await findAnimeById(id);

  if (!anime) {
    throw new NotFoundError("Anime tidak ditemukan");
  }

  return anime;
}

export async function createAnimeService(data) {
  // Validasi required fields
  if (!data.title) {
    throw new ValidationError("Judul anime harus diisi");
  }

  if (data.release_year == null) {
    throw new ValidationError("Tahun rilis harus diisi");
  }

  if (data.episodes == null) {
    throw new ValidationError("Jumlah episode harus diisi");
  }

  // Konversi dan validasi data
  const episodes = Number(data.episodes);
  const releaseYear = Number(data.release_year);

  if (isNaN(episodes) || episodes <= 0) {
    throw new ValidationError("Jumlah episode harus lebih dari 0");
  }

  if (isNaN(releaseYear) || releaseYear < 1900) {
    throw new ValidationError("Tahun rilis harus lebih dari 1900");
  }

  return await makeAnime({
    title: data.title,
    description: data.description,
    cover_image: data.cover_image,
    release_year: releaseYear,
    episodes: episodes,
  });
}

export async function animeDetailService(id) {
  if (!id) {
    throw new ValidationError("ID anime harus diisi");
  }

  const anime = await animeDetails(id);

  if (!anime) {
    throw new NotFoundError("Anime tidak ditemukan");
  }

  return anime;
}
