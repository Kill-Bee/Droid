import { Router } from "express";
import {
  getAnimeList,
  getAnimeById,
  createAnime,
} from "../controllers/anime.controller.js";
import {
  getAnimeCarouselList,
  getAnimeCarouselById,
  createAnimeCarousel,
} from "../controllers/anime-carousel.controller.js";

const router = Router();

// Anime
router.get("/", getAnimeList);
router.post("/", createAnime);

// Anime Carousel
router.get("/carousel", getAnimeCarouselList);
router.post("/carousel", createAnimeCarousel);

// Anime | Carousel by ID
router.get("/:id", getAnimeById);
router.get("/carousel/:id", getAnimeCarouselById);

export default router;
