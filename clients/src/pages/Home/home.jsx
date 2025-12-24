import "./home.css";

export default function Home() {
    const handleSlideLeft = () => {
    const container = document.querySelector('.container-slide');
    container.scrollBy({ left: -400, behavior: 'smooth' });
  };

  const handleSlideRight = () => {
    const container = document.querySelector('.container-slide');
    container.scrollBy({ left: 400, behavior: 'smooth' });
  };

  return (
    <>
    <div className="header">
      <div className="background">
      <img src="https://i.pinimg.com/736x/84/0c/fe/840cfe78663db88b699b805b25e1eb9d.jpg" alt="bacground" />
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
          Saitama adalah seorang pria yang memulai hobi menjadi pahlawan. Setelah 
          tiga tahun menjalani latihan khusus, dia mendapatkan kekuatan tak terkalahkan 
          yang mampu mengalahkan musuh mana pun dengan satu pukulan. Secara 
          kebetulan, dia bertemu dengan Genos yang kemudian menjadi muridnya....
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
        <button className="slide-arrow slide-arrow-left" onClick={handleSlideLeft}>‹</button>
        <div className="container-slide">
          <div className="card">
            <img src="https://cdn.myanimelist.net/r/216x326/images/anime/5/87048.webp?s=8b58c1a2928f95ed0d5dbe2f9e5b9991" alt="card" />
            <h3>Shingeki no Kyojin</h3>
            <p>⭐ 9.0</p>
          </div>
          <div className="card">
            <img src="https://cdn.myanimelist.net/r/216x326/images/anime/1286/99889.jpg" alt="card" />
            <h3>Demon Slayer</h3>
            <p>⭐ 8.7</p>
          </div>
          <div className="card">
            <img src="https://cdn.myanimelist.net/r/216x326/images/anime/1223/96541.jpg" alt="card" />
            <h3>One Piece</h3>
            <p>⭐ 8.9</p>
          </div>
          <div className="card">
            <img src="https://cdn.myanimelist.net/r/216x326/images/anime/10/47347.jpg" alt="card" />
            <h3>Naruto</h3>
            <p>⭐ 8.3</p>
          </div>
          <div className="card">
            <img src="https://cdn.myanimelist.net/r/216x326/images/anime/1208/94745.jpg" alt="card" />
            <h3>Jujutsu Kaisen</h3>
            <p>⭐ 8.6</p>
          </div>
          <div className="card">
            <img src="https://cdn.myanimelist.net/r/216x326/images/anime/1337/99013.jpg" alt="card" />
            <h3>My Hero Academia</h3>
            <p>⭐ 8.4</p>
          </div>
          <div className="card">
            <img src="https://cdn.myanimelist.net/r/216x326/images/anime/5/73199.jpg" alt="card" />
            <h3>Death Note</h3>
            <p>⭐ 9.0</p>
          </div>
        </div>
        <button className="slide-arrow slide-arrow-right" onClick={handleSlideRight}>›</button>
      </div>
    </div>
    </>
  );
}