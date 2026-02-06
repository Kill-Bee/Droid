import {
  getMangaService,
  getMangaByIdService,
  mangaDetailService,
  createMangaService,
} from "../../services/manga/manga.service.js";

export async function getMangaList(req, res, next) {
  try {
    const mangaList = await getMangaService();
    res.json(mangaList);
  } catch (err) {
    next(err);
  }
}

export async function getMangaById(req, res, next) {
  try {
    const { id } = req.params;
    const manga = await getMangaByIdService(id);
    res.json(manga);
  } catch (err) {
    next(err);
  }
}

export async function createManga(req, res, next) {
  try {
    const manga = await createMangaService(req.body);
    res.status(201).json(manga);
  } catch (err) {
    next(err);
  }
}
export async function mangaDetail(req, res, next) {
  try {
    const { id } = req.params;
    const manga = await mangaDetailService(id);
    res.json(manga);
  } catch (err) {
    next(err);
  }
}
