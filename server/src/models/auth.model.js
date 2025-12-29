import { query } from "../config/db.js";

export async function findUserByUsername(username) {
  const result = await query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return result[0];
}

export async function createUser(username, passwordHash) {
  const result = await query("INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username, created_at", [
    username,
    passwordHash,
  ]);
  return result[0]; 
}