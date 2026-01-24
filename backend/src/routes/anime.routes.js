import { Router } from "express";
import {
  getAnimeList,
  getAnimeById,
  createAnime,
  animeDetail,
} from "../controllers/anime.controller.js";
import {
  getAnimeCarouselList,
  getAnimeCarouselById,
  createAnimeCarousel,
} from "../controllers/anime-carousel.controller.js";
import { rateAnime, getAnimeRating } from "../controllers/rating.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

// Anime
router.get("/", getAnimeList);
router.post("/", createAnime);

// Anime Carousel
router.get("/carousel", getAnimeCarouselList);
router.post("/carousel", createAnimeCarousel);

// Anime | Carousel by ID
router.get("/:id", getAnimeById);
router.get("/detail/:id", animeDetail);
router.get("/carousel/:id", getAnimeCarouselById);

// Anime | Rating
router.post("/:animeId/rating", authMiddleware, rateAnime);
router.get("/:animeId/rating", getAnimeRating);

export default router;
