import { query } from "../config/db.js";

export async function getProfile(userId) {
  const sql = `
    SELECT
      u.id,
      u.username,
      u.avatar,
      COALESCE(
        json_agg(
          json_build_object(
            'anime_id', a.id,
            'title', a.title,
            'cover_image', a.cover_image,
            'rating', r.rating
          )
        ) FILTER (WHERE a.id IS NOT NULL),
        '[]'
      ) AS rated_anime
    FROM users u
    LEFT JOIN ratings r
      ON r.user_id = u.id AND r.anime_id IS NOT NULL
    LEFT JOIN anime a
      ON a.id = r.anime_id
    WHERE u.id = $1
    GROUP BY u.id;
    `;

  const { rows } = await query(sql, [userId]);
  return rows[0];
}
