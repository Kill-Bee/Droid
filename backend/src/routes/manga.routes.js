import { Router } from "express";
import {
  getMangaById,
  getMangaList,
  createManga,
} from "../controllers/manga.controller.js";

const router = Router();

router.get("/", getMangaList)
router.get("/:id", getMangaById)
router.post("/", createManga)

export default router;
