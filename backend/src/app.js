import express from "express";
import cors from "cors";
import animeRoutes from "./routes/anime.routes.js";
import mangaRoutes from "./routes/manga.routes.js"
import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { authMiddleware } from "./middleware/auth.middleware.js";

export function buildApp() {
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    }),
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Authentication routes
  app.use("/auth", authRoutes);

  // Health routes
  app.use("/health", healthRoutes);

  // Anime use
  app.use("/anime", animeRoutes);

  // Manga use
  app.use("/manga", mangaRoutes);

  // Error handling middleware
  app.use(errorMiddleware);
  app.use(authMiddleware);

  return app;
}
