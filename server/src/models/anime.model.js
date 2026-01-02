import { query } from "../config/db.js";

// Read
export async function findAllAnime() {
  const result = await query("SELECT * FROM anime ORDER BY created_at DESC");
  return result.rows;
}

export async function findAnimeById(id) {
  const result = await query("SELECT * FROM anime WHERE id = $1", [id]);
  return result.rows[0];
}

// Insert
export async function createAnime({
  title,
  description,
  cover_image,
  release_year,
}) {
  const result = await query(
    `
    INSERT INTO anime (title, description, cover_image, release_year)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [title, description, cover_image, release_year],
  );

  return result.rows[0];
}

// Update
export async function updateAnime(
  id,
  { title, description, cover_image, release_year },
) {
  const result = await query(
    `
    UPDATE anime
    SET title = $1,
        description = $2,
        cover_image = $3,
        release_year = $4
    WHERE id = $5
    RETURNING *
    `,
    [title, description, cover_image, release_year, id],
  );

  return result.rows[0];
}

// Delete
export async function deleteAnime(id) {
  const result = await query("DELETE FROM anime WHERE id = $1 RETURNING *", [
    id,
  ]);
  return result.rows[0];
}
