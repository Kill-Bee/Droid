import { useState, useEffect } from "react";
import { searchManga } from "../services/manga/manga-search.service";

export function useMangaSearch(query, delay = 400) {
  const [debounced, setDebounced] = useState(query);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), delay);
    return () => clearTimeout(t);
  }, [query, delay]);

  useEffect(() => {
    if (!debounced?.trim()) return;

    let cancelled = false;

    async function run() {
      setLoading(true);
      try {
        const res = await searchManga(debounced);
        if (!cancelled) setData(res.data);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => (cancelled = true);
  }, [debounced]);

  return { data, loading };
}
