import "../anime-rating.css";

export default function AnimeInfo({ anime }) {
  return (
    <div className="rating-left">
      <img
        src={anime.cover_image || "https://via.placeholder.com/300x450"}
        alt={anime.title}
        className="vertical-banner"
      />
      <h1 className="h1-left">{anime.title}</h1>
      <div className="information">
        <p>
          <b>Genre:</b> {anime.genres?.join(", ") || "-"}
        </p>
        <p>
          <b>Release Year:</b> {anime.release_year || "-"}
        </p>
        <p>
          <b>Episodes:</b> {anime.episodes || "-"}
        </p>
      </div>
    </div>
  );
}
