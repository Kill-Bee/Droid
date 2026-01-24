import {
  rateAnimeService,
  getAverageRatings,
} from "../services/rating.service.js";

export async function rateAnime(req, res) {
  try {
    const userId = req.user.id;
    const { animeId, rating } = req.body;

    const result = await rateAnimeService({ userId, animeId, rating });

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getAnimeRating(req, res) {
  try {
    const animeId = req.params.animeId;
    const data = await getAverageRatings(animeId);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
