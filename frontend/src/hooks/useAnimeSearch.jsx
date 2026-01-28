import { useState, useEffect } from "react";
import { searchAnime } from "../services/anime/anime-search.service";

export function useAnimeSearch(query, delay = 400) {
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
        const res = await searchAnime(debounced);
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
