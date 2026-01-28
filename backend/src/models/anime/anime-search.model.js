import { query } from "../../config/db.js";

export async function searchAnime({ keyword }) {
  let sql = `
    SELECT id, title
    FROM anime
    WHERE 1=1
  `;

  const values = [];

  if (keyword) {
    values.push(`%${keyword}%`);
    sql += ` AND title ILIKE $${values.length}`;
  }

  sql += ` ORDER BY title ASC`;

  const { rows } = await query(sql, values);
  return rows;
}
