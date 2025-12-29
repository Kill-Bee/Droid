import { findAllAnime } from "../models/anime.model.js";

export async function getAllAnime() {
  // Fetch anime list from the database
  return await findAllAnime();
}
