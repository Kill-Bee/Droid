import { apiPublic } from "../client/publicFetch";

export async function getMangaApi() {
  return apiPublic.get("/manga");
}

export async function getMangaByIdApi(id) {
  return apiPublic.get(`/manga/${id}`);
}

export async function getMangaDetailByIdApi(id) {
  return apiPublic.get(`/manga/detail/${id}`);
}

export async function deleteMangaApi(id) {
  const response = await apiPublic.delete(`/manga/${id}`);
  return response.json();
}

export function createMangaApi({
  title,
  description,
  cover_image,
  release_year,
  chapters,
}) {
  return apiPublic.post("/manga", {
    title,
    description,
    cover_image,
    release_year,
    chapters,
  });
}
