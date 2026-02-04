import { Router } from "express";
import {
  getAnimeList,
  getAnimeById,
  createAnime,
  animeDetail,
} from "../controllers/anime/anime.controller.js";
import {
  getAnimeCarouselList,
  getAnimeCarouselById,
  createAnimeCarousel,
} from "../controllers/anime/anime-carousel.controller.js";
import { getAnimeRating } from "../controllers/review/anime/rating.controller.js";
import {
  getAnimeReviews,
  createReview,
  upsertReview,
  deleteReview,
} from "../controllers/review/anime/review.controller.js";
import { queueAnime } from "../controllers/anime/anime-search.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

// Anime
router.get("/", getAnimeList);
router.post("/", createAnime);

// Anime Carousel
router.get("/carousel", getAnimeCarouselList);
router.post("/carousel", createAnimeCarousel);

// Anime Search
router.get("/search", queueAnime);

// Anime | Card by ID
router.get("/detail/:id", animeDetail);

// Anime | Carousel by ID
router.get("/carousel/:id", getAnimeCarouselById);
router.get("/:id", getAnimeById);

// Anime | Rating
router.get("/:animeId/rating", authMiddleware, getAnimeRating);

// Anime | Reviews
router.post("/:animeId/reviews/upsert", authMiddleware, upsertReview);
router.post("/:animeId/reviews", authMiddleware, createReview);
router.get("/:animeId/reviews", authMiddleware, getAnimeReviews);
router.delete("/:animeId/reviews", authMiddleware, deleteReview);

export default router;
