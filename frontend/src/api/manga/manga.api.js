import { apiPublic } from "../client/publicFetch";

export async function getMangaApi() {
  return apiPublic.get("/manga");
}

export async function getMangaByIdApi(id) {
  return apiPublic.get(`/manga/${id}`);
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