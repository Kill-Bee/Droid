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

// Update
export async function updateAnime(
  id,
  { title, description, cover_image, release_year, episodes },
) {
  const result = await query(
    `
    UPDATE anime
    SET title = $1,
        description = $2,
        cover_image = $3,
        release_year = $4,
        episodes = $5
    WHERE id = $6
    RETURNING *
    `,
    [title, description, cover_image, release_year, episodes, id],
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
