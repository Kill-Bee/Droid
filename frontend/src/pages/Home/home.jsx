import { useState, useEffect } from "react";
import { getAnimes } from "../../services/anime.service";
import "./home.css";

export default function Home({ onRatingClick }) {
  const [animes, setAnimes] = useState([]);

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

  const handleSlideLeft = () => {
    const container = document.querySelector(".container-slide");
    container.scrollBy({ left: -400, behavior: "smooth" });
  };

  const handleSlideRight = () => {
    const container = document.querySelector(".container-slide");
    container.scrollBy({ left: 400, behavior: "smooth" });
  };

  return (
    <>
      <div className="header">
        <div className="background">
          <img
            src="https://i.pinimg.com/736x/84/0c/fe/840cfe78663db88b699b805b25e1eb9d.jpg"
            alt="bacground"
          />
        </div>

        <div className="hero-content">
          <h1 className="hero-title">ONE PUNCH MAN</h1>

          <div className="hero-tags">
            <span className="tag">Adaptasi komik</span>
            <span className="tag">Berjuang</span>
            <span className="tag">Inspiratif</span>
            <span className="tag">Diperbarui ke E 35</span>
          </div>

          <p className="hero-description">
            Saitama adalah seorang pria yang memulai hobi menjadi pahlawan.
            Setelah tiga tahun menjalani latihan khusus, dia mendapatkan
            kekuatan tak terkalahkan yang mampu mengalahkan musuh mana pun
            dengan satu pukulan. Secara kebetulan, dia bertemu dengan Genos yang
            kemudian menjadi muridnya....
          </p>

          <div className="hero-buttons">
            <button className="btn-play">
              <span>⭐</span> Rateing
            </button>
            <button className="btn-favorite">
              <span>🔖</span> Favorit Saya
            </button>
          </div>
        </div>

        <button className="hero-arrow hero-arrow-left">‹</button>
        <button className="hero-arrow hero-arrow-right">›</button>
      </div>
      <div className="main">
        <h1>Sedang Trending (ANIME)</h1>
        <div className="slider-wrapper">
          <button
            className="slide-arrow slide-arrow-left"
            onClick={handleSlideLeft}
          >
            ‹
          </button>
          <div className="container-slide">
            {animes.map((anime) => {
              return (
                <div className="card" key={anime.id}>
                  <div>
                    <img
                      src={anime.cover_image}
                      alt={anime.title}
                      onClick={onRatingClick}
                    />
                    <h3 onClick={onRatingClick}>{anime.title}</h3>
                    <p>⭐ 9.0</p>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            className="slide-arrow slide-arrow-right"
            onClick={handleSlideRight}
          >
            ›
          </button>
        </div>
      </div>
    </>
  );
}
