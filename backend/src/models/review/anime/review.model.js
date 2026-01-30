import { query } from "../../../config/db.js";

export const findAnimeReviews = async (animeId) => {
  const { rows } = await query(
    `
    SELECT
      r.id AS rating_id,
      r.rating,
      r.created_at AS join_at,
      c.content AS comment,
      m.display_name,
      m.avatar,
      m.badge
    FROM ratings r
    JOIN members m ON m.user_id = r.user_id
    LEFT JOIN comments c ON c.rating_id = r.id
    WHERE r.anime_id = $1
    ORDER BY r.created_at DESC
    `,
    [animeId],
  );

  return rows;
};
