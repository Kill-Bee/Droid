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
    const { title, description, cover_image, release_year, episodes } =
      req.body;

    if (!title || release_year == null || episodes == null) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const anime = await createAnimeCarouselService({
      title,
      description,
      cover_image,
      release_year: Number(release_year),
      episodes: Number(episodes),
    });

    res.status(201).json(anime);
  } catch (err) {
    next(err);
  }
}
