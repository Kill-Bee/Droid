import "../rating.css";

export default function MangaInfo({ manga }) {
  return (
    <div className="rating-left">
      <img
        src={manga.cover_image || "https://via.placeholder.com/300x450"}
        alt={manga.title}
        className="vertical-banner"
      />
      <h1 className="h1-left">{manga.title}</h1>
      <div className="information">
        <p>
          <b>Genre:</b> {manga.genres?.join(", ") || "-"}
        </p>
        <p>
          <b>Release Year:</b> {manga.release_year || "-"}
        </p>
        <p>
          <b>Chapters:</b> {manga.chapters || "-"}
        </p>
      </div>
    </div>
  );
}
