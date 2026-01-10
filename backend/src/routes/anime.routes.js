import { Router } from "express";
import { getAnimeList, createAnime, updateAnime, deleteAnime } from "../controllers/anime.controller.js";

const router = Router();

router.get("/", getAnimeList);
router.post("/", createAnime);
router.put("/:id", updateAnime);
router.delete("/:id", deleteAnime);

export default router;
