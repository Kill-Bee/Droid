import { query } from "../../config/db.js";

export async function findUserByUsername(username) {
  const result = await query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return result.rows[0];
}

export async function createUser(username, passwordHash) {
  const result = await query(
    `
    INSERT INTO users (username, password_hash) VALUES ($1, $2) 
    RETURNING id, username, created_at
    `,
    [username, passwordHash],
  );
  return result.rows[0];
}

export async function createMember(userId, memberData) {
  const { displayName, avatar, badge, banner, bio } = memberData;
  const result = await query(
    `
    INSERT INTO members (user_id, display_name, avatar, badge, banner, bio, joined_at) 
    VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP) 
    RETURNING *
    `,
    [userId, displayName, avatar, badge, banner, bio],
  );
  return result.rows[0];
}
