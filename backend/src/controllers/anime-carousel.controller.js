import {
  getAnimeCarouselService,
  getAnimeCarouselByIdService,
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

export async function getAnimeCarouselById(req, res, next) {
  try {
    const { id } = req.params;
    const anime = await getAnimeCarouselByIdService(id);
    res.json(anime);
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
