import * as reviewService from "../../../services/review/anime/review.service.js";

export async function createReview(req, res) {
  try {
    const userId = req.user.id;
    const { animeId } = req.params;
    const { rating, comment } = req.body;

    if (!rating) {
      return res.status(400).json({ message: "Rating is required" });
    }

    const result = await reviewService.postReview({
      userId,
      animeId,
      rating,
      comment,
    });

    res.status(201).json({
      message: "Review created",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function upsertReview(req, res) {
  try {
    const userId = req.user.id;
    const { animeId } = req.params;
    const { rating, comment } = req.body;

    const result = await reviewService.upsertReview({
      userId,
      animeId,
      rating,
      comment,
    });

    res.status(200).json({
      message: "Review saved",
      data: result,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function getAnimeReviews(req, res) {
  try {
    const { animeId } = req.params;
    const reviews = await reviewService.fetchAnimeReviews(animeId);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
