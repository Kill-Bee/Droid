import {
  findAllAnime,
  createAnime,
  updateAnime,
  deleteAnime,
} from "../models/anime.model.js";

export async function getAllAnime() {
  return await findAllAnime();
}

export async function createAnimeService(data) {
  if (data.episodes <= 0) {
    throw new Error("Episodes must be greater than 0");
  }
  
  if (data.release_year < 1900) {
    throw new Error("Release year must be greater than 1900");
  }
  
  return await createAnime(data);
}

export async function updateAnimeService(id, data) {
  return await updateAnime(id, data);
}

export async function deleteAnimeService(id) {
  return await deleteAnime(id);
}
