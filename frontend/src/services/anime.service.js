import { uploadCover } from "./storage.js";
import {
  getAnimesApi,
  getAnimeByIdApi,
  deleteAnimeApi,
  createAnimeApi,
} from "../api/anime.api.js";

export async function getAnimes() {
  return getAnimesApi();
}

export async function getAnimeById(id) {
  return getAnimeByIdApi(id);
}

export async function deleteAnime(id) {
  return deleteAnimeApi(id);
}

export async function createAnime(data) {
  let coverUrl = null;

  if (data.coverFile) {
    coverUrl = await uploadCover(data.coverFile);
  }

  return createAnimeApi({
    title: data.title,
    description: data.description,
    cover_image: coverUrl,
    release_year: data.releaseYear,
    episodes: data.episodes,
  });
}
