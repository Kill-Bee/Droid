import {
  getMangaService,
  getMangaByIdService,
  createMangaService,
} from "../services/manga.service.js";

export async function getMangaList(req, res, next) {
  try {
    const MangaList = await getMangaService();
    res.json(MangaList);
  } catch (err) {
    next(err);
  }
}

export async function getMangaById(req, res, next) {
  try {
    const { id } = req.params;

    const Manga = await getMangaByIdService(id);

    if (!Manga) {
      return res.status(404).json({ error: "Manga not found" });
    }
    res.json(Manga);
  } catch (err) {
    next(err);
  }
}

export async function createManga(req, res, next) {
  try {
    const { title, description, cover_image, release_year, chapters } =
      req.body;

    if (!title || release_year == null || episodes == null) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const Manga = await createMangaService({
      title,
      description,
      cover_image,
      release_year: Number(release_year),
      chapters: Number(chapters),
    });

    res.status(201).json(Manga);
  } catch (err) {
    next(err);
  }
}


