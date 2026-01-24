import {
  getAnimeService,
  getAnimeByIdService,
  animeDetailService,
  createAnimeService,
} from "../services/anime.service.js";

export async function getAnimeList(req, res, next) {
  try {
    const animeList = await getAnimeService();
    res.json(animeList);
  } catch (err) {
    next(err);
  }
}

export async function getAnimeById(req, res, next) {
  try {
    const { id } = req.params;
    const anime = await getAnimeByIdService(id);
    res.json(anime);
  } catch (err) {
    next(err);
  }
}

export async function createAnime(req, res, next) {
  try {
    const anime = await createAnimeService(req.body);
    res.status(201).json(anime);
  } catch (err) {
    next(err);
  }
}

export async function animeDetail(req, res, next) {
  try {
    const { id } = req.params;
    const anime = await animeDetailService(id);
    res.json(anime);
  } catch (err) {
    next(err);
  }
}
