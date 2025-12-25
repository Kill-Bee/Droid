import express from "express";
import animeRoutes from "./routes/animeRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import { authMiddleware } from "./middleware/authMiddleware.js";

export function buildApp() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Authentication routes
  app.use("/users", authRoutes);

  // Health routes
  app.use("/health", healthRoutes);

  // Anime use
  app.use("/anime", animeRoutes);

  // Error handling middleware
  app.use(errorMiddleware);
  app.use(authMiddleware);

  return app;
}