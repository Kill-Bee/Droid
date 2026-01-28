import { searchAnimeApi } from "../../api/anime/anime-search.api";

export async function searchAnime(q) {
  return searchAnimeApi(q);
}
