import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAnimes } from "../../services/anime.service";
import { getAnimesCarousel } from "../../services/anime-carousel.service";
import "./anime.css";

export default function Anime({ search,  }) {
  const navigate = useNavigate();
  const [animes, setAnimes] = useState([]);
  const [animesCarousel, setAnimesCarousel] = useState([]);
  const [debounceSearch, setDebounceSearch] = useState("");
  const keyword = (debounceSearch || search || "").toLowerCase();
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAnimes();
        setAnimes(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching animes:", error);
        setAnimes([]);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAnimesCarousel();
        setAnimesCarousel(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching animes carousel:", error);
        setAnimesCarousel([]);
      }
    })();
  }, []);

  useEffect(() => {
    if (animesCarousel.length === 0) return;

    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % animesCarousel.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [animesCarousel.length]);

  const handleSlideLeft = () => {
    const container = document.querySelector(".container-slide");
    container.scrollBy({ left: -400, behavior: "smooth" });
  };

  const handleSlideRight = () => {
    const container = document.querySelector(".container-slide");
    container.scrollBy({ left: 400, behavior: "smooth" });
  };

  const handleAnimeClick = (animeId) => {
    navigate(`/anime/${animeId}`);
  };

  const filteredAnimes = animes.filter((anime) =>
    anime.title.toLowerCase().includes(keyword),
  );

  return (
    <>
      <div className="header">
        {animesCarousel.length > 0 && (
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
              <h1 className="hero-title">{animesCarousel[slide].title}</h1>

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
                    <span className="read-more" onClick={ () => handleAnimeClick(animesCarousel.id)}>
                      {" "}
                      ...ReadMore
                    </span>
                  </>
                ) : (
                  animesCarousel[slide].description
                )}
              </p>

              <div className="hero-buttons">
                <button className="btn-favorite" onClick={() => handleAnimeClick(animesCarousel.id)}>
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
        )}
      </div>
      <div className="main">
        <h1>Sedang Trending (ANIME)</h1>
        <div className="slider-wrapper">
          <button
            className="slide-arrow slide-arrow-left"
            onClick={handleSlideLeft}
          ></button>
          <div className="container-slide">
            {filteredAnimes.map((anime) => {
              return (
                <div className="card" key={anime.id}>
                  <div>
                    <img
                      src={anime.cover_image}
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
          <button
            className="slide-arrow slide-arrow-right"
            onClick={handleSlideRight}
          ></button>
        </div>
      </div>
    </>
  );
}
