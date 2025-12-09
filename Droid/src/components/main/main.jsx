export default function Main() {
  return (
    <main class="main-content">
      <div class="hero-background">
        <img
          src="./images/background1.jpeg"
          alt="Hero Background"
          class="background-img"
          id="carouselImg"
        />
      </div>

      <div class="content-wrapper">
        <div class="content-left">
          <h1 class="anime-title">SOUSOU NO FRIRENS BEYOND JOURNEYS:END'S</h1>

          <div class="action-buttons">
            <button class="play-btn">
              <span class="play-icon">▶</span>
              <span class="play-text">PLAY</span>
            </button>
            <button class="add-list-btn">
              <span class="plus-icon">+</span>
              <span class="add-text">ADD TO LIST</span>
            </button>
          </div>

          <div class="description">
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

          <div class="rating">
            <span class="star">★</span>
            <span class="rating-value">9.7</span>
          </div>
        </div>
      </div>
    </main>
  );
}
