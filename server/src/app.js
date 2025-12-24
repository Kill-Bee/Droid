import express from "express";
import animeRoutes from "./routes/animeRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";

export function buildApp() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/health", healthRoutes);

  app.use("/api/anime", animeRoutes);

  app.use(errorMiddleware);

  return app;
}
