import { getAllAnime } from "../services/anime.service.js";

export async function getAnimeList(req, res, next) {
  try {
    const animeList = await getAllAnime();
    res.json(animeList);
  } catch (err) {
    next(err);
  }
}