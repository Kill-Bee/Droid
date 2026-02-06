import * as reviewService from "../../../services/review/manga/review.service.js";

export async function createReview(req, res) {
  try {
    const userId = req.user.id;
    const { mangaId } = req.params;
    const { rating, comment } = req.body;

    if (!rating) {
      return res.status(400).json({ message: "Rating is required" });
    }

    const result = await reviewService.postReview({
      userId,
      mangaId,
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
    const { mangaId } = req.params;
    const { rating, comment } = req.body;

    const result = await reviewService.upsertReview({
      userId,
      mangaId,
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

export async function getMangaReviews(req, res) {
  try {
    const { mangaId } = req.params;
    const reviews = await reviewService.fetchMangaReviews(mangaId);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function deleteReview(req, res) {
  try {
    const userId = req.user.id;
    const { mangaId } = req.params;

    await reviewService.removeReview({ userId, mangaId });

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(err.message === "Review not found" ? 404 : 500).json({
      message: err.message,
    });
  }
}
