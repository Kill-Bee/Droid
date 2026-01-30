import { query } from "../../../config/db.js";

export async function createComment({ ratingId, userId, animeId, comment }) {
  const result = await query(
    `
    INSERT INTO comments (rating_id, user_id, anime_id, content)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [ratingId, userId, animeId, comment],
  );

  return result.rows[0];
}
