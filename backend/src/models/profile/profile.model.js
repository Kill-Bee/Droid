import { query } from "../../config/db.js";

export async function getProfile(userId) {
  const sql = `
    WITH anime_ratings AS (
      SELECT 
        r.user_id,
        json_agg(
          json_build_object(
            'anime_id', a.id,
            'title', a.title,
            'cover_image', a.cover_image,
            'rating', r.rating
          )
        ) AS rated_anime
      FROM ratings r
      JOIN anime a ON a.id = r.anime_id
      WHERE r.user_id = $1 AND r.anime_id IS NOT NULL
      GROUP BY r.user_id
    ),
    manga_ratings AS (
      SELECT 
        r.user_id,
        json_agg(
          json_build_object(
            'manga_id', mg.id,
            'title', mg.title,
            'cover_image', mg.cover_image,
            'rating', r.rating
          )
        ) AS rated_manga
      FROM ratings r
      JOIN manga mg ON mg.id = r.manga_id
      WHERE r.user_id = $1 AND r.manga_id IS NOT NULL
      GROUP BY r.user_id
    )
    SELECT
      u.id,
      u.username,
      m.display_name,
      m.avatar,
      m.badge,
      m.banner,
      m.bio,
      m.joined_at,
      COALESCE(ar.rated_anime, '[]'::json) AS rated_anime,
      COALESCE(mr.rated_manga, '[]'::json) AS rated_manga
    FROM users u
    LEFT JOIN members m ON m.user_id = u.id
    LEFT JOIN anime_ratings ar ON ar.user_id = u.id
    LEFT JOIN manga_ratings mr ON mr.user_id = u.id
    WHERE u.id = $1;
  `;

  const { rows } = await query(sql, [userId]);
  return rows[0];
}

export async function updateMember(userId, memberData) {
  const { displayName, avatar, badge, banner, bio } = memberData;
  const sql = `
    UPDATE members 
    SET 
      display_name = COALESCE($2, display_name),
      avatar = COALESCE($3, avatar),
      badge = COALESCE($4, badge),
      banner = COALESCE($5, banner),
      bio = COALESCE($6, bio)
    WHERE user_id = $1
    RETURNING id, user_id, display_name, avatar, badge, banner, bio, joined_at
  `;
  const { rows } = await query(sql, [
    userId,
    displayName,
    avatar,
    badge,
    banner,
    bio,
  ]);
  return rows[0];
}
