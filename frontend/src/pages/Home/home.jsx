import { useState, useEffect } from "react";
import { getAnimes } from "../../services/anime.service";
import { getAnimesCarousel } from "../../services/anime-carousel.service";
import "./home.css";

export default function Home({ search, onRatingClick }) {
  const [animes, setAnimes] = useState([]);
  const [animesCarousel, setAnimesCarousel] = useState([]);
  const [debounceSearch, setDebounceSearch] = useState("");
  const keyword = (debounceSearch || search || "").toLowerCase();

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

  const handleSlideLeft = () => {
    const container = document.querySelector(".container-slide");
    container.scrollBy({ left: -400, behavior: "smooth" });
  };

  const handleSlideRight = () => {
    const container = document.querySelector(".container-slide");
    container.scrollBy({ left: 400, behavior: "smooth" });
  };

  const filteredAnimes = animes.filter((anime) =>
    anime.title.toLowerCase().includes(keyword)
  );

  return (
    <>
      <div className="header">
        {animesCarousel.map((carousel) => (
          <div key={carousel.id} className="carousel-item">
            <div className="background">
              <img
                src={
                  carousel.cover_image ||
                  "https://i.pinimg.com/736x/84/0c/fe/840cfe78663db88b699b805b25e1eb9d.jpg"
                }
                alt={carousel.title}
              />
            </div>

            <div className="hero-content">
              <h1 className="hero-title">{carousel.title}</h1>

              <div className="hero-tags">
                <span className="tag">Tahun: {carousel.release_year}</span>
                <span className="tag">Episode: {carousel.episodes}</span>
              </div>

              <p className="hero-description">{carousel.description}</p>

              <div className="hero-buttons">
                <button className="btn-play">
                  <span>⭐</span> Rateing
                </button>
                <button className="btn-favorite">
                  <span>🔖</span> Favorit Saya
                </button>
              </div>
            </div>

            <button className="hero-arrow hero-arrow-left"></button>
            <button className="hero-arrow hero-arrow-right"></button>
          </div>
        ))}
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
                      onClick={onRatingClick}
                    />
                    <h3 onClick={onRatingClick}>{anime.title.length > 15 ? anime.title.substring(0, 15) + "..." : anime.title}</h3>
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