import { findAllAnime } from "../models/animeModel.js";

export async function getAllAnime() {
  // Fetch anime list from the database
  return await findAllAnime();
}
