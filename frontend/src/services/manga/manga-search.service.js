import { searchMangaApi } from "../../api/manga/manga-search.api";

export async function searchManga(q) {
  return searchMangaApi(q);
}
