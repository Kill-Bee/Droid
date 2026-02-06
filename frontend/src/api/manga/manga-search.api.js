import { apiPublic } from "../client/publicFetch";

export function searchMangaApi(q) {
  if (!q || !q.trim()) {
    // jangan fetch sama sekali
    return Promise.resolve({
      data: [],
      total: 0,
    });
  }

  const params = new URLSearchParams({ q: q.trim() });
  return apiPublic.get(`/manga/search?${params.toString()}`);
}
