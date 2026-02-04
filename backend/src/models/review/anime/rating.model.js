import { query } from "../../../config/db.js";

// Upsert
export async function findUserRating(userId, animeId) {
  const result = await query(
    `SELECT * FROM ratings
    WHERE user_id = $1 AND anime_id = $2`,
    [userId, animeId],
  );
  return result.rows[0];
}

export async function createRating({ userId, animeId, rating }) {
  const sql = `
    INSERT INTO ratings (user_id, anime_id, rating)
    VALUES ($1, $2, $3)
    RETURNING id, rating, created_at
    `;
  const { rows } = await query(sql, [userId, animeId, rating]);
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

export async function getAverageRating(animeId) {
  const result = await query(
    `SELECT
      COUNT(*) as total_reviews,
      ROUND(AVG(rating), 1) as average_rating
    FROM ratings
    WHERE anime_id = $1`,
    [animeId],
  );
  return result.rows[0];
}

export async function upsertRating({ userId, animeId, rating }) {
  const sql = `
    INSERT INTO ratings (user_id, anime_id, rating)
    VALUES ($1, $2, $3)
    ON CONFLICT (user_id, anime_id)
    DO UPDATE SET 
      rating = EXCLUDED.rating, 
      updated_at = NOW()
    RETURNING id, rating, created_at, updated_at
    `;
  const { rows } = await query(sql, [userId, animeId, rating]);
  return rows[0];
}