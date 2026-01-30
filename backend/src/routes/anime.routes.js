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
import {
  rateAnime,
  getAnimeRating,
} from "../controllers/review/anime/rating.controller.js";
import { getReviewsByAnime } from "../controllers/review/anime/review.controller.js";
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

// Anime | Carousel by ID
router.get("/:id", getAnimeById);
router.get("/detail/:id", animeDetail);
router.get("/carousel/:id", getAnimeCarouselById);

// Anime | Rating
router.post("/:animeId/rating", authMiddleware, rateAnime);
router.get("/:animeId/rating", authMiddleware, getAnimeRating);

// Anime | Reviews
router.get("/:animeId/reviews", getReviewsByAnime);

export default router;
