import {
  getAnimeCarouselService,
  createAnimeCarouselService,
} from "../services/anime-carousel.service.js";

export async function getAnimeCarouselList(req, res, next) {
  try {
    const animeList = await getAnimeCarouselService();
    res.json(animeList);
  } catch (err) {
    next(err);
  }
}

export async function createAnimeCarousel(req, res, next) {
  try {
    const anime = await createAnimeCarouselService(req.body);
    res.status(201).json(anime);
  } catch (err) {
    next(err);
  }
}
