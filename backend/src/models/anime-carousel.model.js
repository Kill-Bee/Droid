import { query } from "../config/db.js";

export async function findAllAnimeCarousel() {
  const result = await query(
    "SELECT * FROM anime_carousel ORDER BY created_at DESC"
  );
  return result.rows;
}

export async function findAnimeCarouselById(id) {
  const result = await query("SELECT * FROM anime_carousel WHERE id = $1", [id]);
  return result.rows[0];
}

export async function makeAnimeCarousel({
  logo,
  title,
  description,
  cover_image,
  release_year,
  episodes,
}) {
  const result = await query(
    `
    INSERT INTO anime_carousel (logo, title, description, cover_image, release_year, episodes)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `,
    [logo, title, description, cover_image, release_year, episodes]
  );

  return result.rows[0];
}
