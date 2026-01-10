import {
  getAllAnime,
  createAnimeService,
  updateAnimeService,
  deleteAnimeService,
} from "../services/anime.service.js";

export async function getAnimeList(req, res, next) {
  try {
    const animeList = await getAllAnime();
    res.json(animeList);
  } catch (err) {
    next(err);
  }
}

export async function createAnime(req, res, next) {
  try {
    const { title, description, cover_image, release_year, episodes } =
      req.body;
    
    if (!title || release_year == null || episodes == null) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const anime = await createAnimeService({
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

export async function updateAnime(req, res, next) {
  try {
    const { id } = req.params;
    const { title, description, cover_image, release_year, episodes } =
      req.body;

    if (!id || !title || !release_year) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const updatedAnime = await updateAnimeService(id, {
      title,
      description,
      cover_image,
      release_year,
      episodes,
    });
    res.json(updatedAnime);
  } catch (err) {
    next(err);
  }
}

export async function deleteAnime(req, res, next) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await deleteAnimeService(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
