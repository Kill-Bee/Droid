import { searchManga } from "../../models/manga/manga-search.model.js";

export async function searchMangaService(query) {
  const { q } = query;

  if (!q) {
    throw new Error("At least one search parameter is required");
  }

  return await searchManga({ keyword: q });
}
