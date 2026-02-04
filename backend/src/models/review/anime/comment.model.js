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

export async function updateComment(id, content) {
  return query(
    `UPDATE comments
    SET content = $1, updated_at = NOW()
    WHERE id = $2`,
    [content, id],
  )
}

export async function upsertComment({ ratingId, content }) {
  const sql = `
    INSERT INTO comments (rating_id, content)
    VALUES ($1, $2)
    ON CONFLICT (rating_id)
    DO UPDATE SET 
      content = EXCLUDED.content, 
      updated_at = NOW()
    RETURNING id, content, created_at, updated_at
    `;
  const { rows } = await query(sql, [ratingId, content]);
  return rows[0];
}