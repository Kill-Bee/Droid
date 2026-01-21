import { Router } from "express";
import {
  getMangaById,
  getMangaList,
  createManga,
} from "../controllers/manga.controller.js";
import {
  getMangaCarouselList,
  createMangaCarousel,
  getMangaCarouselById,
} from "../controllers/manga-carousel.controller.js";

const router = Router();
// Manga
router.get("/", getMangaList);
router.post("/", createManga);

// Manga Crousel
router.get("/carousel", getMangaCarouselList);
router.post("/carousel", createMangaCarousel);

router.get("/:id", getMangaById);
router.get("/carousel/:id", getMangaCarouselById);
export default router;
