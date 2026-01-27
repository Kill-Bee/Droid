import { query } from "../config/db.js";

// Read
export async function findAllAnime() {
  const result = await query(
    `
    SELECT
      a.id,
      a.title,
      a.description,
      a.cover_image,
      a.release_year,
      a.episodes,
      a.created_at,
      COALESCE(
        ARRAY_AGG(DISTINCT g.name) FILTER (WHERE g.name IS NOT NULL),
        '{}'
      ) AS genres
    FROM anime a
    LEFT JOIN anime_genres ag ON ag.anime_id = a.id
    LEFT JOIN genres g ON g.id = ag.genre_id
    GROUP BY a.id
    ORDER BY a.created_at DESC;
    `,
  );
  return result.rows;
}

export async function findAnimeById(id) {
  const result = await query("SELECT * FROM anime WHERE id = $1", [id]);
  return result.rows[0];
}

// Insert
export async function makeAnime({
  title,
  description,
  cover_image,
  release_year,
  episodes,
}) {
  const result = await query(
    `
    INSERT INTO anime (title, description, cover_image, release_year, episodes)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
    [title, description, cover_image, release_year, episodes],
  );

  return result.rows[0];
}

export async function animeDetails(id) {
  const result = await query(
    `
    SELECT
      a.id,
      a.title,
      a.description,
      a.cover_image,
      a.release_year,
      a.episodes,
      a.created_at,
      COALESCE(
        ARRAY_AGG(DISTINCT g.name) FILTER (WHERE g.name IS NOT NULL),
        '{}'
      ) AS genres
    FROM anime a
    LEFT JOIN anime_genres ag ON ag.anime_id = a.id
    LEFT JOIN genres g ON g.id = ag.genre_id
    WHERE a.id = $1
    GROUP BY a.id
    `,
    [id],
  );

  return result.rows[0];
}
