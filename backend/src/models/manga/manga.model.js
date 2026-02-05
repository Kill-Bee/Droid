import { query } from "../../config/db.js";

// Read
export async function findAllManga() {
  const result = await query(
    `
    SELECT
      a.id,
      a.title,
      a.description,
      a.cover_image,
      a.release_year,
      a.chapters,
      a.created_at,
      COALESCE(
        ARRAY_AGG(DISTINCT g.name) FILTER (WHERE g.name IS NOT NULL),
        '{}'
      ) AS genres
    FROM manga a
    LEFT JOIN manga_genres ag ON ag.manga_id = a.id
    LEFT JOIN genres g ON g.id = ag.genre_id
    GROUP BY a.id
    ORDER BY a.created_at DESC;
    `,
  );
  return result.rows;
}

// export async function findAllManga() {
//   const result = await query("SELECT * FROM manga ORDER BY created_at DESC");
//   return result.rows;
// }


export async function findMangaById(id) {
  const result = await query("SELECT * FROM manga WHERE id = $1", [id]);
  return result.rows[0];
}

// Insert
export async function makeManga({
  title,
  description,
  cover_image,
  release_year,
  chapters,
}) {
  const result = await query(
    `
    INSERT INTO manga (title, description, cover_image, release_year, chapters)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
    [title, description, cover_image, release_year, chapters]
  );

  return result.rows[0];
}
export async function mangaDetails(id) {
  const result = await query(
    `
    SELECT
      a.id,
      a.title,
      a.description,
      a.cover_image,
      a.release_year,
      a.chapters,
      a.created_at,
      COALESCE(
        ARRAY_AGG(DISTINCT g.name) FILTER (WHERE g.name IS NOT NULL),
        '{}'
      ) AS genres
    FROM manga a
    LEFT JOIN manga_genres ag ON ag.manga_id = a.id
    LEFT JOIN genres g ON g.id = ag.genre_id
    WHERE a.id = $1
    GROUP BY a.id
    `,
    [id],
  );

  return result.rows[0];
}



