import { Router } from "express";
import { getAnimeList } from "../controllers/animeController.js";

const router = Router();

router.get("/", getAnimeList);

export default router;
