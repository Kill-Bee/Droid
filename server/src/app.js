import express from "express";
import userRoutes from "./routes/userRoutes.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";

export function buildApp() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/health", (_, res) => {
    res.status(200).json({ status: "ok" });
  });

  app.use("/api/users", userRoutes);

  app.use(errorMiddleware);

  return app;
}
