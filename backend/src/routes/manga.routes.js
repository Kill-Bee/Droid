import { Router } from "express";
import {
  getMangaById,
  getMangaList,
  createManga,
  mangaDetail,
} from "../controllers/manga/manga.controller.js";
import {
  getMangaCarouselList,
  createMangaCarousel,
  getMangaCarouselById,
} from "../controllers/manga/manga-carousel.controller.js";
import { getMangaRating } from "../controllers/review/manga/rating.controller.js";
import {
  getMangaReviews,
  createReview,
  upsertReview,
  deleteReview,
} from "../controllers/review/manga/review.controller.js";
import { queueManga } from "../controllers/manga/manga-search.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();
// Manga
router.get("/", getMangaList);
router.post("/", createManga);

// Manga Crousel
router.get("/carousel", getMangaCarouselList);
router.post("/carousel", createMangaCarousel);

// manga Search
router.get("/search", queueManga);

// manga | Card by ID
router.get("/detail/:id", mangaDetail);

// manga | Carousel by ID
router.get("/carousel/:id", getMangaCarouselById);
router.get("/:id", getMangaById);

// manga | Rating
router.get("/:mangaId/rating", authMiddleware, getMangaRating);


// manga | Reviews
router.post("/:mangaId/reviews/upsert", authMiddleware, upsertReview);
router.post("/:mangaId/reviews", authMiddleware, createReview);
router.get("/:mangaId/reviews", authMiddleware, getMangaReviews);
router.delete("/:mangaId/reviews", authMiddleware, deleteReview);

// router.get("/:id", getMangaById);
// router.get("/carousel/:id", getMangaCarouselById);
export default router;
