import { Router } from "express";
import { getAnimeList } from "../controllers/anime.controller.js";

const router = Router();

router.get("/", getAnimeList);

export default router;
