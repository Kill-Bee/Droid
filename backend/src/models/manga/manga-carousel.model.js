import { query } from "../../config/db.js";

export async function findAllMangaCarousel() {
  const result = await query(
    "SELECT * FROM manga_carousel ORDER BY created_at DESC"
  );
  return result.rows;
}

export async function findMangaCarouselById(id) {
  const result = await query("SELECT * FROM manga_carousel WHERE id = $1", [id]);
  return result.rows[0];
}

export async function makeMangaCarousel({
  logo,
  title,
  description,
  cover_image,
  release_year,
  chapters,
}) {
  const result = await query(
    `
    INSERT INTO manga_carousel (logo, title, description, cover_image, release_year, chapters)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `,
    [logo, title, description, cover_image, release_year, chapters]
  );

  return result.rows[0];
}
