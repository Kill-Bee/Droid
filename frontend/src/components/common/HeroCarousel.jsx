import { useState, useEffect } from "react";

export default function HeroCarousel({
  items = [],
  onItemClick,
  loading,
  skeletonComponent: SkeletonComponent,
  type = "anime", // "anime" or "manga"
}) {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    if (items.length === 0) return;
    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % items.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [items.length]);

  if (loading) {
    return (
      <div className="header">{SkeletonComponent && <SkeletonComponent />}</div>
    );
  }

  if (items.length === 0) {
    return <div className="header"></div>;
  }

  const currentItem = items[slide];
  const episodeLabel = type === "manga" ? "Chapters" : "Episode";
  const episodeCount =
    type === "manga" ? currentItem.chapters : currentItem.episodes;

  return (
    <div className="header">
      <div className="carousel-item">
        <div className="background">
          <img
            src={
              currentItem.cover_image ||
              "https://i.pinimg.com/736x/84/0c/fe/840cfe78663db88b699b805b25e1eb9d.jpg"
            }
            alt={currentItem.title}
          />
        </div>

        <div className="hero-content">
          <img
            src={currentItem.logo || currentItem.title}
            alt={currentItem.title}
            className="logo"
          />

          <div className="hero-tags">
            <span className="tag">Tahun: {currentItem.release_year}</span>
            <span className="tag">
              {episodeLabel}: {episodeCount}
            </span>
          </div>

          <p className="hero-description">
            {currentItem.description?.length > 250 ? (
              <>
                {currentItem.description.substring(0, 250)}
                <span
                  className="read-more"
                  onClick={() => onItemClick?.(currentItem.id)}
                >
                  {" "}
                  ...ReadMore
                </span>
              </>
            ) : (
              currentItem.description
            )}
          </p>

          <div className="hero-buttons">
            <button
              className="btn-favorite"
              onClick={() => onItemClick?.(currentItem.id)}
            >
              <span>⭐</span> Rating
            </button>
          </div>
        </div>

        <div className="carousel-dots">
          {items.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === slide ? "active" : ""}`}
              onClick={() => setSlide(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
