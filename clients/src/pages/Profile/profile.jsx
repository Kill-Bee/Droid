import "./profile.css";

export default function Profile() {
  return (
    <>
      <div className="box"></div>
      <div className="bacground">
        <div className="headerProfile">
          <div className="biodata">
            <img
              src="https://i.pinimg.com/1200x/64/ea/c9/64eac9d3e7906fa45b3f7f298f29e11e.jpg"
              alt="profile"
              className="fotoProfile"
            />
            <div>
              <h1>FauzanGaming0202</h1>
              <label>
                manuk nyo manuk manuk nyo manuk manuk nyo manukmanuk nyo
                manukmanuk nyo manukmanuk nyo manukmanuk nyo manukmanuk nyo
                manukmanuk nyo manukmanuk nyo manukmanuk nyo manuk
              </label>
              <p htmlFor="">Joined on September 17, 2025</p>
            </div>
            <button>Edit Profile</button>
          </div>
        </div>
        <div className="mainProfile">
          <h1>Your rating</h1>
          <div className="slider-wrapper-profile">
            {/* <button className="slide-arrow slide-arrow-left" onClick={handleSlideLeft}>‹</button> */}
            <div className="container-slide">
              <div className="card">
                <img
                  src="https://cdn.myanimelist.net/r/216x326/images/anime/5/87048.webp?s=8b58c1a2928f95ed0d5dbe2f9e5b9991"
                  alt="card"
                />
                <h3>Shingeki no Kyojin</h3>
                <p>⭐ 9.0</p>
              </div>
              <div className="card">
                <img
                  src="https://cdn.myanimelist.net/r/216x326/images/anime/1286/99889.jpg"
                  alt="card"
                />
                <h3>Demon Slayer</h3>
                <p>⭐ 8.7</p>
              </div>
              <div className="card">
                <img
                  src="https://cdn.myanimelist.net/r/216x326/images/anime/1223/96541.jpg"
                  alt="card"
                />
                <h3>One Piece</h3>
                <p>⭐ 8.9</p>
              </div>
              <div className="card">
                <img
                  src="https://cdn.myanimelist.net/r/216x326/images/anime/10/47347.jpg"
                  alt="card"
                />
                <h3>Naruto</h3>
                <p>⭐ 8.3</p>
              </div>
              <div className="card">
                <img
                  src="https://cdn.myanimelist.net/r/216x326/images/anime/1208/94745.jpg"
                  alt="card"
                />
                <h3>Jujutsu Kaisen</h3>
                <p>⭐ 8.6</p>
              </div>
              <div className="card">
                <img
                  src="https://cdn.myanimelist.net/r/216x326/images/anime/1337/99013.jpg"
                  alt="card"
                />
                <h3>My Hero Academia</h3>
                <p>⭐ 8.4</p>
              </div>
              <div className="card">
                <img
                  src="https://cdn.myanimelist.net/r/216x326/images/anime/5/73199.jpg"
                  alt="card"
                />
                <h3>Death Note</h3>
                <p>⭐ 9.0</p>
              </div>
            </div>
            {/* <button className="slide-arrow slide-arrow-right" onClick={handleSlideRight}>›</button> */}
          </div>
        </div>
      </div>
    </>
  );
}
