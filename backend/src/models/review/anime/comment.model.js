import { query } from "../../../config/db.js";

export async function createComment({ ratingId, content }) {
  const sql = `
    INSERT INTO comments (rating_id, content)
    VALUES ($1, $2)
    RETURNING content, created_at
    `;
  const { rows } = await query(sql, [ratingId, content]);
  return rows[0];
}
