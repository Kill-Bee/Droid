import { getAnimeRating, setAnimeRating } from "../../api/rating/rating.api";

export async function getAnimeRate(animeId) {
  return getAnimeRating(animeId);
}

export async function setAnimeRate(animeId, rating) {
  return setAnimeRating(animeId, rating);
}
