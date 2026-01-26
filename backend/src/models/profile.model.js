import { query } from "../config/db.js";

export async function getProfile(userId) {
  const sql = `
    SELECT
      u.id,
      u.username,
      m.display_name,
      m.avatar,
      m.badge,
      m.banner,
      m.bio,
      m.joined_at,
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
    LEFT JOIN members m ON m.user_id = u.id
    LEFT JOIN ratings r
      ON r.user_id = u.id AND r.anime_id IS NOT NULL
    LEFT JOIN anime a
      ON a.id = r.anime_id
    WHERE u.id = $1
    GROUP BY u.id, m.display_name, m.avatar, m.badge, m.banner, m.bio, m.joined_at;
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
