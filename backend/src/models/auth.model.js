import { query } from "../config/db.js";

export async function findUserByUsername(username) {
  const result = await query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return result.rows[0];
}

export async function createUser(username, passwordHash, avatar) {
  const result = await query(
    "INSERT INTO users (username, password_hash, avatar) VALUES ($1, $2, $3) RETURNING id, username, avatar, created_at",
    [username, passwordHash, avatar],
  );
  return result.rows[0];
}
