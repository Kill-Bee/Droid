import { query } from "../../config/db.js";


export async function findAllMangaCarousel() {
  const result = await query(
    `SELECT *, manga_id FROM manga_carousel ORDER BY created_at DESC`
  );
  return result.rows;
}


export async function findMangaCarouselById(id) {
  const result = await query(
    `SELECT *, manga_id FROM manga_carousel WHERE id = $1`,
    [id]
  );
  return result.rows[0];
}


export async function makeMangaCarousel({
  logo,
  title,
  description,
  cover_image,
  release_year,
  chapters,
  manga_id,
}) {
  const result = await query(
    `
    INSERT INTO manga_carousel (logo, title, description, cover_image, release_year, chapters, manga_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
    `,
    [logo, title, description, cover_image, release_year, chapters, manga_id]
  );

  return result.rows[0];
}
