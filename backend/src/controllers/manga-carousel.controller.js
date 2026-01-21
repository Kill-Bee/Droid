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
    const { title, description, cover_image, release_year, chapters } =
      req.body;

    if (!title || release_year == null || chapters == null) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const manga = await createMangaCarouselService({
      title,
      description,
      cover_image,
      release_year: Number(release_year),
      chapters: Number(chapters),
    });

    res.status(201).json(manga);
  } catch (err) {
    next(err);
  }
}
