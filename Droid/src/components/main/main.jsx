export default function Main() {
  return (
    <main className="main-content">
      <div className="hero-background">
        <img
          src="./images/background1.jpeg"
          alt="Hero Background"
          className="background-img"
          id="carouselImg"
        />
      </div>

      <div className="content-wrapper">
        <div className="content-left">
          <h1 className="anime-title">SOUSOU NO FRIRENS BEYOND JOURNEYS:END'S</h1>

          <div className="action-buttons">
            <button className="play-btn">
              <span className="play-icon">▶</span>
              <span className="play-text">PLAY</span>
            </button>
            <button className="add-list-btn">
              <span className="plus-icon">+</span>
              <span className="add-text">ADD TO LIST</span>
            </button>
          </div>

          <div className="description">
            <p>
              the story of Frieren, an elf wizard who has a very long life.
              After his team, consisting of human heroes, defeats the Demon
              King, Frieren realizes that he doesn't really understand his
              short-lived comrades. When his friends pass away from old age,
              Frieren embarks on a new journey north with his student, Fern, and
              soldier Stark, to make amends and understand more deeply about
              human life and emotional bonds
            </p>
          </div>

          <div className="rating">
            <span className="star">★</span>
            <span className="rating-value">9.7</span>
          </div>
        </div>
      </div>
    </main>
  );
}
