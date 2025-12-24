import { getAllAnime } from "../services/animeService.js";

export async function getAnimeList(req, res, next) {
  try {
    const animeList = await getAllAnime();
    res.json(animeList);
  } catch (err) {
    next(err);
  }
}