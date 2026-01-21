import { AppError } from "../errors/index.js";

export function errorMiddleware(err, req, res, next) {
  // Handle custom AppError (ValidationError, NotFoundError, etc.)
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.name,
      message: err.message,
    });
  }

  // Schema validation (zod / joi / express-validator)
  if (err.name === "ZodError") {
    return res.status(400).json({
      error: "Bad request",
      details: err.errors,
    });
  }

  // Postgres unique violation
  const pgCode = err.code || err?.cause?.code;
  if (pgCode === "23505") {
    return res.status(409).json({
      error: "Unique constraint violation",
    });
  }

  console.error(err);
  res.status(500).json({ error: "Internal server error" });
}
