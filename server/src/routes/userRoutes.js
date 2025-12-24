import { Router } from "express";
import { query } from "../config/db.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await query("SELECT * FROM anime");
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

export default router;