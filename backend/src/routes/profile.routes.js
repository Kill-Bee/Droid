import express from "express";
import { getProfileData, updateProfileData } from "../controllers/profile.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getProfileData);
router.put("/", authMiddleware, updateProfileData);


export default router;
