import { uploadCoverManga } from "../storage";
import { getMangaApi, getMangaByIdApi, createMangaApi } from "../../api/manga/manga.api";

export async function getManga() {
  return getMangaApi();
}
export async function getMangaById(id) {
  return getMangaByIdApi(id);
}

export async function createManga(data) {
  let coverUrl = null;

  if (data.coverFile) {
    coverUrl = await uploadCoverManga(data.coverFile);
  }

  return createMangaApi({
    title: data.title,
    description: data.description,
    cover_image: coverUrl,
    release_year: data.releaseYear,
    chapters: data.chapters,
  });
}
