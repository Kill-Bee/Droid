import { query } from "../../../config/db.js";

// Upsert
export async function findUserRating(userId, mangaId) {
  const result = await query(
    `SELECT * FROM ratings
    WHERE user_id = $1 AND manga_id = $2`,
    [userId, mangaId],
  );
  return result.rows[0];
}

export async function createRating({ userId, mangaId, rating }) {
  const sql = `
    INSERT INTO ratings (user_id, manga_id, rating)
    VALUES ($1, $2, $3)
    RETURNING id, rating, created_at
    `;
  const { rows } = await query(sql, [userId, mangaId, rating]);
  return rows[0];
}

export async function updateRating(id, rating) {
  return query(
    `UPDATE ratings
    SET rating = $1, updated_at = NOW()
    WHERE id = $2`,
    [rating, id],
  );
}

export async function getAverageRating(mangaId) {
  const result = await query(
    `SELECT
      COUNT(*) as total_reviews,
      ROUND(AVG(rating), 1) as average_rating
    FROM ratings
    WHERE manga_id = $1`,
    [mangaId],
  );
  return result.rows[0];
}

export async function upsertRating({ userId, mangaId, rating }) {
  const sql = `
    INSERT INTO ratings (user_id, manga_id, rating)
    VALUES ($1, $2, $3)
    ON CONFLICT (user_id, manga_id) WHERE manga_id IS NOT NULL
    DO UPDATE SET 
      rating = EXCLUDED.rating, 
      updated_at = NOW()
    RETURNING id, rating, created_at, updated_at
    `;
  const { rows } = await query(sql, [userId, mangaId, rating]);
  return rows[0];
}

export async function deleteRating({ userId, mangaId }) {
  const sql = `
    DELETE FROM ratings
    WHERE user_id = $1 AND manga_id = $2
    RETURNING *
    `;
  const { rows } = await query(sql, [userId, mangaId]);
  return rows[0];
}
