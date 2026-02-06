import { searchMangaService } from "../../services/manga/manga-search.service.js";

export async function queueManga(req, res) {
  try {
    const result = await searchMangaService(req.query);

    res.json({
      data: result,
      total: result.length,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
