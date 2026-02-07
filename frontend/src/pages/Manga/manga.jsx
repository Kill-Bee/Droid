import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getManga } from "../../services/manga/manga.service";
import { getMangaCarousel } from "../../services/manga/manga-carousel.service";
import { useMangaSearch } from "../../hooks/useMangaSearch";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./manga.css";

export default function Manga({ search }) {
  const navigate = useNavigate();
  const [manga, setManga] = useState([]);
  const [mangaCarousel, setMangaCarousel] = useState([]);
  const [slide, setSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [carouselLoading, setCarouselLoading] = useState(true);
  const [expectedCount, setExpectedCount] = useState(10);
  const skeletonItems = Array.from({ length: expectedCount });

  const { data: searchResults, loading: searchLoading } =
    useMangaSearch(search);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getManga();
        setManga(Array.isArray(data) ? data : []);
        if (data && data.length > 0) setExpectedCount(data.length);
      } catch (error) {
        console.error("Error fetching manga:", error);
        setManga([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setCarouselLoading(true);
        const data = await getMangaCarousel();
        setMangaCarousel(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching manga carousel:", error);
        setMangaCarousel([]);
      } finally {
        setCarouselLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (mangaCarousel.length === 0) return;

    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % mangaCarousel.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [mangaCarousel.length]);

  const handleSlideLeft = () => {
    const container = document.querySelector(".container-slide");
    if (!container) return;
    container.scrollBy({ left: -400, behavior: "smooth" });
  };

  const handleSlideRight = () => {
    const container = document.querySelector(".container-slide");
    if (!container) return;
    container.scrollBy({ left: 400, behavior: "smooth" });
  };

  const handleMangaClick = (mangaId) => {
    window.scrollTo(0, 0);
    navigate(`/manga/${mangaId}`);
  };

  const handleMangaCarouselClick = (mangaId) => {
    window.scrollTo(0, 0);
    navigate(`/manga/carousel/${mangaId}`);
  };

  // const filteredManga = manga.filter((manga) =>
  //   manga.title.toLowerCase().includes(keyword),
  // );

  const filteredManga = search ? searchResults : manga;
  const isLoading = search ? searchLoading : loading;

  const seinenManga = filteredManga.filter((manga) =>
    manga.genres?.includes("Seinen"),
  );
  const romanceManga = filteredManga.filter((manga) =>
    manga.genres?.includes("Romance"),
  );
  const actionManga = filteredManga.filter((manga) =>
    manga.genres?.includes("Action"),
  );

  return (
    <>
      <div className="header">
        {carouselLoading ? (
          <CarouselSkeleton />
        ) : mangaCarousel.length > 0 ? (
          <div className="carousel-item">
            <div className="background">
              <img
                src={
                  mangaCarousel[slide].cover_image ||
                  "https://i.pinimg.com/736x/84/0c/fe/840cfe78663db88b699b805b25e1eb9d.jpg"
                }
                alt={mangaCarousel[slide].title}
              />
            </div>

            <div className="hero-content">
              <img
                src={mangaCarousel[slide].logo || mangaCarousel[slide].title}
                alt={mangaCarousel[slide].title}
                className="logo"
              />
              {/* <h1 className="hero-title">{mangaCarousel[slide].title}</h1> */}

              <div className="hero-tags">
                <span className="tag">
                  Tahun: {mangaCarousel[slide].release_year}
                </span>
                <span className="tag">
                  Episode: {mangaCarousel[slide].chapters}
                </span>
              </div>

              <p className="hero-description">
                {mangaCarousel[slide].description.length > 250 ? (
                  <>
                    {mangaCarousel[slide].description.substring(0, 250)}
                    <span
                      className="read-more"
                      onClick={() =>
                        handleMangaCarouselClick(mangaCarousel[slide].id)
                      }
                    >
                      {" "}
                      ...ReadMore
                    </span>
                  </>
                ) : (
                  mangaCarousel[slide].description
                )}
              </p>

              <div className="hero-buttons">
                <button
                  className="btn-favorite"
                  onClick={() =>
                    handleMangaCarouselClick(mangaCarousel[slide].id)
                  }
                >
                  <span>⭐</span> Rating
                </button>
              </div>
            </div>

            {/* <button className="hero-arrow hero-arrow-left" onClick={handlePrevCarousel}></button>
            <button className="hero-arrow hero-arrow-right" onClick={handleNextCarousel}></button> */}

            <div className="carousel-dots">
              {mangaCarousel.map((_, i) => (
                <span
                  key={i}
                  className={`dot ${i === slide ? "active" : ""}`}
                  onClick={() => setSlide(i)}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
      <div className="banner-bottom-bg" aria-hidden="true" />
      <div className="main">
        <h1>Sedang Trending (Manga)</h1>
        <div className="slider-wrapper">
          <button
            className="slide-arrow slide-arrow-left"
            onClick={handleSlideLeft}
          ></button>
          {isLoading ? (
            <div className="container-slide">
              {skeletonItems.map((_, i) => (
                <CardSkeleton key={`trend-skel-${i}`} />
              ))}
            </div>
          ) : (
            <div className="container-slide">
              {filteredManga.map((manga) => {
                return (
                  <div className="card" key={manga.id}>
                    <div>
                      <img
                        src={
                          manga.cover_image ||
                          "https://via.placeholder.com/300x400?text=No+Image"
                        }
                        alt={manga.title}
                        onClick={() => handleMangaClick(manga.id)}
                      />
                      <h3 onClick={() => handleMangaClick(manga.id)}>
                        {manga.title.length > 20
                          ? manga.title.substring(0, 20) + "..."
                          : manga.title}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <button
            className="slide-arrow slide-arrow-right"
            onClick={handleSlideRight}
          ></button>
        </div>
        <h1>seinen</h1>
        <div className="slider-wrapper">
          <button
            className="slide-arrow slide-arrow-left"
            onClick={handleSlideLeft}
          ></button>
          {isLoading ? (
            <div className="container-slide">
              {skeletonItems.map((_, i) => (
                <CardSkeleton key={`action-skel-${i}`} />
              ))}
            </div>
          ) : (
            <div className="container-slide">
              {seinenManga.map((manga) => {
                return (
                  <div className="card" key={manga.id}>
                    <div>
                      <img
                        src={
                          manga.cover_image ||
                          "https://via.placeholder.com/300x400?text=No+Image"
                        }
                        alt={manga.title}
                        onClick={() => handleMangaClick(manga.id)}
                      />
                      <h3 onClick={() => handleMangaClick(manga.id)}>
                        {manga.title.length > 20
                          ? manga.title.substring(0, 20) + "..."
                          : manga.title}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <button
            className="slide-arrow slide-arrow-right"
            onClick={handleSlideRight}
          ></button>
        </div>
        <h1>Romance</h1>
        <div className="slider-wrapper">
          <button
            className="slide-arrow slide-arrow-left"
            onClick={handleSlideLeft}
          ></button>
          {isLoading ? (
            <div className="container-slide">
              {skeletonItems.map((_, i) => (
                <CardSkeleton key={`action-skel-${i}`} />
              ))}
            </div>
          ) : (
            <div className="container-slide">
              {romanceManga.map((manga) => {
                return (
                  <div className="card" key={manga.id}>
                    <div>
                      <img
                        src={
                          manga.cover_image ||
                          "https://via.placeholder.com/300x400?text=No+Image"
                        }
                        alt={manga.title}
                        onClick={() => handleMangaClick(manga.id)}
                      />
                      <h3 onClick={() => handleMangaClick(manga.id)}>
                        {manga.title.length > 20
                          ? manga.title.substring(0, 20) + "..."
                          : manga.title}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <button
            className="slide-arrow slide-arrow-right"
            onClick={handleSlideRight}
          ></button>
        </div>
        <h1>Other</h1>
        {loading ? (
          <div className="card-last">
            {skeletonItems.map((_, i) => (
              <CardSkeleton key={`card-ske${i}`} />
            ))}
          </div>
        ) : (
          <div className="card-last">
            {actionManga.map((manga) => {
              return (
                <div className="card-diam" key={manga.id}>
                  <div>
                    <img
                      src={
                        manga.cover_image ||
                        "https://via.placeholder.com/300x400?text=No+Image"
                      }
                      alt={manga.title}
                      onClick={() => handleMangaClick(manga.id)}
                    />
                    {/* <h3 onClick={() => handleAnimeClick(anime.id)}>
                      {anime.title.length > 20
                        ? anime.title.substring(0, 20) + "..."
                        : anime.title}
                    </h3> */}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

function CarouselSkeleton() {
  return (
    <SkeletonTheme baseColor="#1d1c1c" highlightColor="#444">
      <div className="carousel-skeleton-wrapper">
        <Skeleton width="100%" height={1000} borderRadius={8} />
      </div>
    </SkeletonTheme>
  );
}
function CardSkeleton() {
  return (
    <SkeletonTheme baseColor="#1d1c1c" highlightColor="#444">
      <div className="card-skeleton">
        <div className="img-skeleton">
          <Skeleton width={200} height={300} borderRadius={8} />
        </div>
        <div className="title-skeleton">
          <Skeleton width={200} />
        </div>
      </div>
    </SkeletonTheme>
  );
}
