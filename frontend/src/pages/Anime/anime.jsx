import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAnimes } from "../../services/anime.service";
import { getAnimesCarousel } from "../../services/anime-carousel.service";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./anime.css";

export default function Anime({ search }) {
  const navigate = useNavigate();
  const [animes, setAnimes] = useState([]);
  const [animesCarousel, setAnimesCarousel] = useState([]);
  const [debounceSearch, setDebounceSearch] = useState("");
  const keyword = (debounceSearch || search || "").toLowerCase();
  const [slide, setSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [carouselLoading, setCarouselLoading] = useState(true);
  const [expectedCount, setExpectedCount] = useState(10);
  const skeletonItems = Array.from({ length: expectedCount });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getAnimes();
        setAnimes(Array.isArray(data) ? data : []);
        if (data && data.length > 0) setExpectedCount(data.length);
      } catch (error) {
        console.error("Error fetching animes:", error);
        setAnimes([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setCarouselLoading(true);
        const data = await getAnimesCarousel();
        setAnimesCarousel(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching animes carousel:", error);
        setAnimesCarousel([]);
      } finally {
        setCarouselLoading(false);
      }
    })();
  }, []);

  // use effect untuk carousel
  useEffect(() => {
    if (animesCarousel.length === 0) return;

    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % animesCarousel.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [animesCarousel.length]);

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

  const handleAnimeClick = (animeId) => {
    window.scrollTo(0, 0);
    navigate(`/anime/${animeId}`);
  };

  const handleAnimeCarouselClick = (animeId) => {
    window.scrollTo(0, 0);
    navigate(`/anime/carousel/${animeId}`);
  };

  const filteredAnimes = animes.filter((anime) =>
    anime.title.toLowerCase().includes(keyword),
  );

  const actionAnimes = filteredAnimes.filter((anime) =>
    anime.genres?.includes("Action"),
  );
  const romanceAnimes = filteredAnimes.filter((anime) =>
    anime.genres?.includes("Romance"),
  );
  const fantasyAnimes = filteredAnimes.filter((anime) =>
    anime.genres?.includes("Fantasy"),
  );

  return (
    <>
      <div className="header">
        {carouselLoading ? (
          <CarouselSkeleton />
        ) : animesCarousel.length > 0 ? (
          <div className="carousel-item">
            <div className="background">
              <img
                src={
                  animesCarousel[slide].cover_image ||
                  "https://i.pinimg.com/736x/84/0c/fe/840cfe78663db88b699b805b25e1eb9d.jpg"
                }
                alt={animesCarousel[slide].title}
              />
            </div>

            <div className="hero-content">
               <img
                src={
                  animesCarousel[slide].logo ||
                  animesCarousel[slide].title
                }
                alt={animesCarousel[slide].title}
                className="logo"
              />
              {/* <h1 className="hero-title">{animesCarousel[slide].title}</h1> */}

              <div className="hero-tags">
                <span className="tag">
                  Tahun: {animesCarousel[slide].release_year}
                </span>
                <span className="tag">
                  Episode: {animesCarousel[slide].episodes}
                </span>
              </div>

              <p className="hero-description">
                {animesCarousel[slide].description.length > 250 ? (
                  <>
                    {animesCarousel[slide].description.substring(0, 250)}
                    <span
                      className="read-more"
                      onClick={() =>
                        handleAnimeCarouselClick(animesCarousel[slide].id)
                      }
                    >
                      {" "}
                      ...ReadMore
                    </span>
                  </>
                ) : (
                  animesCarousel[slide].description
                )}
              </p>

              <div className="hero-buttons">
                <button
                  className="btn-favorite"
                  onClick={() =>
                    handleAnimeCarouselClick(animesCarousel[slide].id)
                  }
                >
                  <span>⭐</span> Rating
                </button>
              </div>
            </div>

            {/* <button className="hero-arrow hero-arrow-left" onClick={handlePrevCarousel}></button>
            <button className="hero-arrow hero-arrow-right" onClick={handleNextCarousel}></button> */}

            <div className="carousel-dots">
              {animesCarousel.map((_, i) => (
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
        <h1>Sedang Trending</h1>
        <div className="slider-wrapper">
          <button
            className="slide-arrow slide-arrow-left"
            onClick={handleSlideLeft}
          ></button>
          {loading ? (
            <div className="container-slide">
              {skeletonItems.map((_, i) => (
                <CardSkelaton key={`trend-skel-${i}`} />
              ))}
            </div>
          ) : (
            <div className="container-slide">
              {filteredAnimes.map((anime) => {
                return (
                  <div className="card" key={anime.id}>
                    <div>
                      <img
                        src={
                          anime.cover_image ||
                          "https://via.placeholder.com/300x400?text=No+Image"
                        }
                        alt={anime.title}
                        onClick={() => handleAnimeClick(anime.id)}
                      />
                      <h3 onClick={() => handleAnimeClick(anime.id)}>
                        {anime.title.length > 20
                          ? anime.title.substring(0, 20) + "..."
                          : anime.title}
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
        <h1>Action</h1>
        <div className="slider-wrapper">
          <button
            className="slide-arrow slide-arrow-left"
            onClick={handleSlideLeft}
          ></button>
          {loading ? (
            <div className="container-slide">
              {skeletonItems.map((_, i) => (
                <CardSkelaton key={`action-skel-${i}`} />
              ))}
            </div>
          ) : (
            <div className="container-slide">
              {actionAnimes.map((anime) => {
                return (
                  <div className="card" key={anime.id}>
                    <div>
                      <img
                        src={
                          anime.cover_image ||
                          "https://via.placeholder.com/300x400?text=No+Image"
                        }
                        alt={anime.title}
                        onClick={() => handleAnimeClick(anime.id)}
                      />
                      <h3 onClick={() => handleAnimeClick(anime.id)}>
                        {anime.title.length > 20
                          ? anime.title.substring(0, 20) + "..."
                          : anime.title}
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
          {loading ? (
            <div className="container-slide">
              {skeletonItems.map((_, i) => (
                <CardSkelaton key={`action-skel-${i}`} />
              ))}
            </div>
          ) : (
            <div className="container-slide">
              {romanceAnimes.map((anime) => {
                return (
                  <div className="card" key={anime.id}>
                    <div>
                      <img
                        src={
                          anime.cover_image ||
                          "https://via.placeholder.com/300x400?text=No+Image"
                        }
                        alt={anime.title}
                        onClick={() => handleAnimeClick(anime.id)}
                      />
                      <h3 onClick={() => handleAnimeClick(anime.id)}>
                        {anime.title.length > 20
                          ? anime.title.substring(0, 20) + "..."
                          : anime.title}
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
              <CardSkelaton key={`card-ske${i}`} />
            ))}
          </div>
        ) : (
          <div className="card-last">
            {fantasyAnimes.map((anime) => {
              return (
                <div className="card-diam" key={anime.id}>
                  <div>
                    <img
                      src={
                        anime.cover_image ||
                        "https://via.placeholder.com/300x400?text=No+Image"
                      }
                      alt={anime.title}
                      onClick={() => handleAnimeClick(anime.id)}
                    />
                    <h3 onClick={() => handleAnimeClick(anime.id)}>
                      {anime.title.length > 20
                        ? anime.title.substring(0, 20) + "..."
                        : anime.title}
                    </h3>
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

function CardSkelaton({ card }) {
  return (
    <SkeletonTheme baseColor="#1d1c1c" highlightColor="#444">
      <div className="card-skeleton">
        <div className="img-skeleton">
          <Skeleton height={300} borderRadius={8} />
        </div>
        <div className="title-skeleton">
          <Skeleton width={200} />
        </div>
      </div>
    </SkeletonTheme>
  );
}
