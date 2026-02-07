import { getMangaRating, setMangaRating } from "../../../api/review/manga/rating.api";

export async function getMangaRate(mangaId) {
  return getMangaRating(mangaId);
}

export async function setMangaRate(mangaId, rating) {
  return setMangaRating(mangaId, rating);
}
