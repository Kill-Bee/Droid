import { query } from "../config/db.js";

export async function findAllAnimeCarousel() {
  const result = await query(
    "SELECT * FROM anime_carousel ORDER BY created_at DESC"
  );
  return result.rows;
}

export async function makeAnimeCarousel({
  title,
  description,
  cover_image,
  release_year,
  episodes,
}) {
  const result = await query(
    `
    INSERT INTO anime_carousel (title, description, cover_image, release_year, episodes)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
    [title, description, cover_image, release_year, episodes]
  );

  return result.rows[0];
}
