import { apiPublic } from "../client/publicFetch";

export async function getAnimesApi() {
  return apiPublic.get("/anime");
}

export async function getAnimeByIdApi(id) {
  return apiPublic.get(`/anime/${id}`);
}

export async function getAnimeDetailByIdApi(id) {
  return apiPublic.get(`/anime/detail/${id}`);
}

export async function deleteAnimeApi(id) {
  const response = await apiPublic.delete(`/anime/${id}`);
  return response.json();
}

export function createAnimeApi({
  title,
  description,
  cover_image,
  release_year,
  episodes,
}) {
  return apiPublic.post("/anime", {
    title,
    description,
    cover_image,
    release_year,
    episodes,
  });
}
