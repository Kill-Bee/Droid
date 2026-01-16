import { Router } from "express";
import {
  getAnimeList,
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
router.put("/:id", updateAnime);
router.delete("/:id", deleteAnime);

// Anime Carousel
router.get("/carousel", getAnimeCarouselList);
router.post("/carousel", createAnimeCarousel);

export default router;
