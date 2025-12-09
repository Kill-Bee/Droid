export default function Section() {
  return (
    <section className="carousel-section">
      <h2 className="section-title">ON GOING</h2>
      <div className="carousel">
        <button className="carousel-arrow left" aria-label="previous">‹</button>
        <div className="carousel-track-container">
          <ul className="carousel-track">
            <li className="card">
              <div className="card-thumb">
                <img src="./images/card.jpeg" alt="Anime 1" />
              </div>
              <div className="card-meta">
                <div className="card-rating">★ 9.7</div>
                <div className="card-title">JUDUL</div>
                <div className="card-ep">EPS:12/12</div>
              </div>
            </li>
            <li className="card">
              <div className="card-thumb">
                <img src="./images/thumb2.jpg" alt="Anime 2" />
              </div>
              <div className="card-meta">
                <div className="card-rating">★ 9.7</div>
                <div className="card-title">JUDUL</div>
                <div className="card-ep">EPS:12/12</div>
              </div>
            </li>
            <li className="card">
              <div className="card-thumb">
                <img src="./images/thumb3.jpg" alt="Anime 3" />
              </div>
              <div className="card-meta">
                <div className="card-rating">★ 9.7</div>
                <div className="card-title">JUDUL</div>
                <div className="card-ep">EPS:12/12</div>
              </div>
            </li>
            <li className="card">
              <div className="card-thumb">
                <img src="./images/thumb4.jpg" alt="Anime 4" />
              </div>
              <div className="card-meta">
                <div className="card-rating">★ 9.7</div>
                <div className="card-title">JUDUL</div>
                <div className="card-ep">EPS:12/12</div>
              </div>
            </li>
            <li className="card">
              <div className="card-thumb">
                <img src="./images/thumb5.jpg" alt="Anime 5" />
              </div>
              <div className="card-meta">
                <div className="card-rating">★ 9.7</div>
                <div className="card-title">JUDUL</div>
                <div className="card-ep">EPS:12/12</div>
              </div>
            </li>
            <li className="card">
              <div className="card-thumb">
                <img src="./images/thumb5.jpg" alt="Anime 5" />
              </div>
              <div className="card-meta">
                <div className="card-rating">★ 9.7</div>
                <div className="card-title">JUDUL</div>
                <div className="card-ep">EPS:12/12</div>
              </div>
            </li>
            <li className="card">
              <div className="card-thumb">
                <img src="./images/thumb5.jpg" alt="Anime 5" />
              </div>
              <div className="card-meta">
                <div className="card-rating">★ 9.7</div>
                <div className="card-title">JUDUL</div>
                <div className="card-ep">EPS:12/12</div>
              </div>
            </li>
            <li className="card">
              <div className="card-thumb">
                <img src="./images/thumb5.jpg" alt="Anime 5" />
              </div>
              <div className="card-meta">
                <div className="card-rating">★ 9.7</div>
                <div className="card-title">JUDUL</div>
                <div className="card-ep">EPS:12/12</div>
              </div>
            </li>
          </ul>
        </div>
        <button className="carousel-arrow right" aria-label="next">›</button>
      </div>
    </section>
  )
}
