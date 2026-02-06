import { findUserRating } from "../../../models/review/manga/rating.model.js";
import {
  rateMangaService,
  getAverageRatings,
} from "../../../services/review/manga/rating.service.js";

export async function rateManga(req, res) {
  try {
    const userId = req.user.id;
    const mangaId = req.params.mangaId;
    const { rating } = req.body;

    const result = await rateMangaService({ userId, mangaId, rating });

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getMangaRating(req, res) {
  try {
    const mangaId = req.params.mangaId;
    const averageData = await getAverageRatings(mangaId);

    let userRating = null;
    if (req.user && req.user.id) {
      const existing = await findUserRating(req.user.id, mangaId);
      userRating = existing ? existing.rating : null;
    }

    res.json({ rating: userRating, average: averageData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
