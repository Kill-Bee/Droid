import {
  findAllManga,
  findMangaById,
  makeManga
} from "../models/manga.model.js";

export async function getMangaService() {
  return await findAllManga();
}

export async function getMangaByIdService(id) {
  return await findMangaById(id);
}

export async function createMangaService(data) {
  if (data.chapters <= 0) {
    throw new Error("Episodes must be greater than 0");
  }
  
  if (data.release_year < 1900) {
    throw new Error("Release year must be greater than 1900");
  }
  
  return await makeManga(data);
}

