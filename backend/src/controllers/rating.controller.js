import { findUserRating } from "../models/rating.model.js";
import {
  rateAnimeService,
  getAverageRatings,
} from "../services/rating.service.js";

export async function rateAnime(req, res) {
  try {
    const userId = req.user.id;
    const animeId = req.params.animeId;
    const { rating } = req.body;

    const result = await rateAnimeService({ userId, animeId, rating });

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getAnimeRating(req, res) {
  try {
    const animeId = req.params.animeId;
    const averageData = await getAverageRatings(animeId);

    let userRating = null;
    if (req.user && req.user.id) {
      const existing = await findUserRating(animeId, req.user.id);
      userRating = existing ? existing.rating : null;
    }

    res.json({ rating: userRating, average: averageData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
