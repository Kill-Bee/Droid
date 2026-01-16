import {
  findAllAnime,
  makeAnime,
  changeAnime,
  deleteAnime,
} from "../models/anime.model.js";

export async function getAnimeService() {
  return await findAllAnime();
}

export async function createAnimeService(data) {
  if (data.episodes <= 0) {
    throw new Error("Episodes must be greater than 0");
  }
  
  if (data.release_year < 1900) {
    throw new Error("Release year must be greater than 1900");
  }
  
  return await makeAnime(data);
}

export async function updateAnimeService(id, data) {
  return await changeAnime(id, data);
}

export async function deleteAnimeService(id) {
  return await deleteAnime(id);
}
