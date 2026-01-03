import { useState } from "react";
import "./profile.css";

export default function Profile() {
  const [IsPopupOpen, setIspopupOpne] = useState(false);

  const handlePopupOpen = () => {
    setIspopupOpne(true);
  };
  const handlePopupClose = () => {
    setIspopupOpne(false);
  };
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
              <div className="hero-tags">
                <span className="tag">VETERAN</span>
                <span className="tag">SERVIS GOD</span>
                <span className="tag">TABOLA BALE</span>
                <span className="tag">DEVELOPERS</span>
              </div>
              <label>carpe diem!</label>
              <p htmlFor="">Joined on September 17, 2025</p>
            </div>
            <button onClick={handlePopupOpen}>Edit Profile</button>
          </div>
        </div>
        {IsPopupOpen && (
          <div className="popup-overlay" onClick={handlePopupClose}>
            <div className="popup-container" onClick={(e) => e.stopPropagation()}>
              <div className="popup-header">
                <h2>Edit Profile</h2>
                <button className="popup-close" onClick={handlePopupClose}>✕</button>
              </div>
              
              <div className="popup-body">
                <div className="form-field">
                  <label>Nickname</label>
                  <input type="text" placeholder="Enter your nickname..." />
                </div>

                <div className="form-field">
                  <label>Profile Picture</label>
                  <input type="file" accept="image/*" />
                </div>

                <div className="form-field">
                  <label>Banner Image</label>
                  <input type="file" accept="image/*" />
                </div>

                <div className="form-field">
                  <label>About You</label>
                  <textarea placeholder="Tell us about yourself..."></textarea>
                </div>
              </div>

              <div className="popup-footer">
                <button className="btn-cancel" onClick={handlePopupClose}>Cancel</button>
                <button className="btn-save">Save</button>
              </div>
            </div>
          </div>
        )}
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
