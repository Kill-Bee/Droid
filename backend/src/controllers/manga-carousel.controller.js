import {
  getMangaCarouselService,
  createMangaCarouselService,
} from "../services/manga-carousel.service.js";

export async function getMangaCarouselList(req, res, next) {
  try {
    const mangaList = await getMangaCarouselService();
    res.json(mangaList);
  } catch (err) {
    next(err);
  }
}

export async function createMangaCarousel(req, res, next) {
  try {
    const manga = await createMangaCarouselService(req.body);
    res.status(201).json(manga);
  } catch (err) {
    next(err);
  }
}
