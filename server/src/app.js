import express from "express";
import animeRoutes from "./routes/anime.routes.js";
import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { authMiddleware } from "./middleware/auth.middleware.js";

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
