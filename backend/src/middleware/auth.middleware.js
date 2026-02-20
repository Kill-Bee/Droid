import jwt from "jsonwebtoken";

export async function authMiddleware(req, res, next) {
  try {
    // Header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    // Validation format: Bearer <token>
    const parts = authHeader.split(" ");
    if (parts.length !== 2) {
      return res
        .status(401)
        .json({ message: "Malformed authorization header" });
    }

    const [scheme, token] = parts;

    if (scheme !== "Bearer") {
      return res
        .status(401)
        .json({ message: "Authorization scheme must be Bearer" });
    }

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    req.user = decoded;

    next();
  } catch (error) {
    console.error("AUTH MIDDLEWARE ERROR:", error.message);

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Forbidden: insufficient permissions",
      });
    }

    next();
  };
}