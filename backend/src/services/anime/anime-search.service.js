import { ValidationError } from "../../errors/index.js";
import { searchAnime } from "../../models/anime/anime-search.model.js";

export async function searchAnimeService(query) {
  const { q } = query;

  if (!q) {
    throw new Error("At least one search parameter is required");
  }

  return await searchAnime({ keyword: q });
}
