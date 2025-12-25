import { Router } from "express";
import { loginController } from "../controllers/authController.js";

const router = Router();

router.get("/login", loginController);

export default router;