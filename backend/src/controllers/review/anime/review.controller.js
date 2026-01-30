import { getAnimeReviews } from "../../../services/review/anime/review.service.js";

export async function getReviewsByAnime(req, res, next) {
  try {
    const { animeId } = req.params;

    const reviews = await getAnimeReviews(animeId);

    res.json({
      data: reviews,
    });
  } catch (err) {
    next(err);
  }
}
