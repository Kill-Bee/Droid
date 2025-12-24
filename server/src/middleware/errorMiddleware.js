export function errorMiddleware(err, req, res, next) {
  // Schema validation (zod / joi / express-validator)
  if (err.name === "ZodError") {
    return res.status(400).json({
      error: "bad request",
      details: err.errors,
    });
  }

  // Postgres unique violation
  const pgCode = err.code || err?.cause?.code;
  if (pgCode === "23505") {
    return res.status(409).json({
      error: "unique constraint violation",
    });
  }

  console.error(err);
  res.status(500).json({ error: "internal server error" });
}