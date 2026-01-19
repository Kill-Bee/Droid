import { Router } from "express";
import {
  getAnimeList,
  getAnimeById,
  createAnime,
  updateAnime,
  deleteAnime,
} from "../controllers/anime.controller.js";
import {
  getAnimeCarouselList,
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
router.put("/:id", updateAnime);
router.delete("/:id", deleteAnime);

export default router;
