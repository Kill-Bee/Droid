import { searchAnimeService } from "../../services/anime/anime-search.service.js";

export async function queueAnime(req, res) {
  try {
    const result = await searchAnimeService(req.query);

    res.json({
      data: result,
      total: result.length,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
