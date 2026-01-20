import { query } from "../config/db.js";

// Read
export async function findAllManga() {
  const result = await query("SELECT * FROM manga ORDER BY created_at DESC");
  return result.rows;
}


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




