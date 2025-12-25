import { query } from "../config/db.js";

export async function findUserByUsername(username) {
  const result = await query("SELECT * FROM users WHERE username = ?", [
    username,
  ]);
  return result[0];
}
