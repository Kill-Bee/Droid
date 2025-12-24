import { query } from "../config/db.js";

export async function findAllAnime() {
  const result = await query("SELECT * FROM anime");
  return result.rows;
}