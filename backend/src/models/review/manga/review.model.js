import { query } from "../../../config/db.js";

export const getMangaReviews = async (mangaId) => {
  const { rows } = await query(
    `
    SELECT
      r.rating,
      c.content,
      r.created_at,
      u.username,
      m.display_name,
      m.avatar,
      m.badge,
      m.banner
    FROM ratings r
    JOIN users u ON u.id = r.user_id
    LEFT JOIN members m ON m.user_id = u.id
    LEFT JOIN comments c ON c.rating_id = r.id
    WHERE r.manga_id = $1
    ORDER BY r.created_at DESC;
    `,
    [mangaId],
  );

  return rows;
};
