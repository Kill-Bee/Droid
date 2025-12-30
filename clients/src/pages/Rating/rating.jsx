import "./rating.css";
import { useState } from "react";

export default function Rating() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  // Label untuk setiap rating
  const ratingLabels = ["worst", "bad", "mid", "good", "GOAT"];

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="background-hitam">
      <div className="box"></div>
      <div className="container-rating">
        <div className="rating-wrapper">
          <div className="rating-left">
            <img
              src="https://cdn.myanimelist.net/images/anime/1015/138006.jpg"
              alt="banner img"
              className="vertical-banner"
            />
            <h1 className="h1-left">NARUTO</h1>
            <div className="information">
              <p>
                <b>Genre:</b> Action, Adventure, Comedy
              </p>
              <p>
                <b>Release:</b> 22-06-08
              </p>
              <p>
                <b>Status:</b> Completed
              </p>
            </div>
          </div>

          <div className="rating-right">
            <h1 className="h1-right">Naruto</h1>
            <label htmlFor="">Synopsis</label>
            <p className="text-light">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos in
              sit culpa. Iusto asperiores eius ex enim voluptas necessitatibus
              doloribus, placeat molestias inventore voluptatem, quo animi
              mollitia non quis nemo! Odit voluptates sunt, eum rerum non
              temporibus reiciendis officiis corporis nesciunt, repellendus
              quam, harum aut dolore officia fuga animi natus blanditiis
              repudiandae ipsa alias eius enim libero! Fugiat placeat quod
              pariatur aliquid exercitationem porro excepturi dolorem ipsam enim
              rem labore nostrum in vitae, non voluptas autem.
            </p>
            <div className="buttons-rating">
              <button onClick={handleOpenPopup}>Rating ★ </button>
            </div>
          </div>
        </div>
      </div>
      {/* terbuka jika ispopup true */}
      {isPopupOpen && (
        // agar bisa cllose di luar content  onClick={handleClosePopup
        <div className="popup-overlay" onClick={handleClosePopup}>
          {/* agar popup tidak tertutup */}
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>What is your ratting to this anime</h2>
            {/* array bintang */}
            <div className="stars-container">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={
                    star <= (hoverRating || rating) ? "star active" : "star"
                  }
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  ★
                </span>
              ))}
            </div>
            {/* tampilan & logic bintang */}
            <p className="rating-text">
              {rating > 0 
                ? `rating: ${ratingLabels[rating - 1]}` 
                : "belum memilih"}
            </p>
            <button onClick={handleClosePopup} className="close-btn-rating">Tutup</button>
            <button onClick={() => {
              console.log("Rating:", rating, "-", ratingLabels[rating - 1]);
              handleClosePopup();
            }} className="submit-btn-rating">
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
