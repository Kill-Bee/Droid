import {
  getMangaCarouselService,
  createMangaCarouselService,
  getMangaCarouselByIdService,
} from "../../services/manga/manga-carousel.service.js";

export async function getMangaCarouselList(req, res, next) {
  try {
    const mangaList = await getMangaCarouselService();
    res.json(mangaList);
  } catch (err) {
    next(err);
  }
}

export async function getMangaCarouselById(req, res, next) {
  try {
    const { id } = req.params;
    const manga = await getMangaCarouselByIdService(id);
    res.json(manga);
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
