import "./rating.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { getAnimeById } from "../../services/anime.service";

export default function Rating() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  // Label untuk setiap rating
  const ratingLabels = ["worst", "bad", "mid", "good", "GOAT"];

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getAnimeById(id);
        setAnime(data);
      } catch (error) {
        toast.error("Failed to fetch anime data");
        console.error("Error fetching anime:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  if (loading) {
    return (
      <div className="background-hitam">
        <div className="container-rating">
          <p style={{ color: "white", textAlign: "center" }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="background-hitam">
        <div className="container-rating">
          <p style={{ color: "white", textAlign: "center" }}>Anime not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="background-hitam">
      <div className="box"></div>
      <div className="container-rating">
        <div className="rating-wrapper">
          <div className="rating-left">
            <img
              src={anime.cover_image || "https://via.placeholder.com/300x450"}
              alt={anime.title}
              className="vertical-banner"
            />
            <h1 className="h1-left">{anime.title}</h1>
            <div className="information">
              <p>
                <b>Genre:</b> Action, Adventure, Comedy
              </p>
              <p>
                <b>Release Year:</b> {anime.release_year}
              </p>
              <p>
                <b>Episodes:</b> {anime.episodes}
              </p>
            </div>
          </div>

          <div className="rating-right">
            <h1 className="h1-right">{anime.title}</h1>
            <label htmlFor="">Synopsis</label>
            <p className="text-light">
              {anime.description || "No description available."}
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
            <button onClick={handleClosePopup} className="close-btn-rating">
              Tutup
            </button>
            <button
              onClick={() => {
                console.log("Rating:", rating, "-", ratingLabels[rating - 1]);
                handleClosePopup();
              }}
              className="submit-btn-rating"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
