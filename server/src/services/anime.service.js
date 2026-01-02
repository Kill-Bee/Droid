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
  return await createAnime(data);
}

export async function updateAnimeService(id, data) {
  return await updateAnime(id, data);
}

export async function deleteAnimeService(id) {
  return await deleteAnime(id);
}
