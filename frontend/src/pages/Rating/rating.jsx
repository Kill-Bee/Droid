import "./rating.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

import { getAnimeDetailById } from "../../services/anime/anime.service";
import {
  getAnimeRate,
  setAnimeRate,
} from "../../services/review/rating.service";
import { getAnimeReviews } from "../../services/review/review.service";

import StarRating from "./components/StarRating";

export default function Rating() {
  const { id } = useParams();

  const [anime, setAnime] = useState(null);
  const [savedRating, setSavedRating] = useState(0);
  const [draftRating, setDraftRating] = useState(0);
  const [reviews, setReviews] = useState([]);

  const [pageLoading, setPageLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupLoading, setPopupLoading] = useState(false);

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  useEffect(() => {
    (async () => {
      try {
        setPageLoading(true);
        const data = await getAnimeDetailById(id);
        setAnime(data);
      } catch (error) {
        toast.error("Failed to fetch anime data");
        console.error(error);
      } finally {
        setPageLoading(false);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (!isLoggedIn) return;

    (async () => {
      try {
        const res = await getAnimeRate(id);
        if (res?.rating !== null && res?.rating !== undefined) {
          setSavedRating(res.rating);
          setDraftRating(res.rating);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id, isLoggedIn]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getAnimeReviews(id);
        setReviews(res || []);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  const handleOpenPopup = () => {
    if (!isLoggedIn) {
      toast.error("Please login to rate");
      return;
    }
    setDraftRating(savedRating);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    if (popupLoading) return; // cegah close saat submit
    setIsPopupOpen(false);
  };

  const handleSubmitRating = async (value) => {
    try {
      setPopupLoading(true);
      await setAnimeRate(id, value);

      setSavedRating(value);
      setDraftRating(value);

      toast.success("Rating updated");
      setIsPopupOpen(false);
    } catch (error) {
      toast.error("Failed to update rating");
      console.error(error);
    } finally {
      setPopupLoading(false);
    }
  };

  if (pageLoading) {
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
          {/* LEFT */}
          <div className="rating-left">
            <img
              src={anime.cover_image || "https://via.placeholder.com/300x450"}
              alt={anime.title}
              className="vertical-banner"
            />
            <h1 className="h1-left">{anime.title}</h1>
            <div className="information">
              <p>
                <b>Genre:</b> {anime.genres.join(", ")}
              </p>
              <p>
                <b>Release Year:</b> {anime.release_year}
              </p>
              <p>
                <b>Episodes:</b> {anime.episodes}
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="rating-right">
            <h1 className="h1-right">{anime.title}</h1>
            <label>Synopsis</label>
            <p className="text-light">
              {anime.description || "No description available."}
            </p>

            <div className="buttons-rating">
              <button onClick={handleOpenPopup}>Rating ★</button>
            </div>

            <h2 className="reviews">Reviews</h2>
            {reviews.length === 0 ? (
              <p style={{ color: "#ccc" }}>No reviews yet.</p>
            ) : (
              reviews.map((rev, idx) => (
                <div className="card-rating" key={idx}>
                  <div className="left-card">
                    <img
                      src={rev.avatar || "https://via.placeholder.com/80"}
                      alt={rev.display_name || rev.username}
                    />
                  </div>

                  <div className="right-card">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <h3 style={{ margin: 0 }}>
                        {rev.display_name || rev.username}
                      </h3>
                      <div
                        style={{
                          display: "inline-block",
                          verticalAlign: "middle",
                        }}
                      >
                        {[1, 2, 3, 4, 5].map((star) => {
                          const fill = Math.min(
                            Math.max((rev.rating || 0) - (star - 1), 0),
                            1,
                          );
                          return (
                            <span key={star} className="star-wrapper-mini">
                              <span className="star-mini empty">★</span>
                              <span
                                className="star-mini fill"
                                style={{ width: `${fill * 100}%` }}
                              >
                                ★
                              </span>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    <i>{new Date(rev.created_at).toLocaleDateString()}</i>
                    <p style={{ marginTop: 6 }}>{rev.content || ""}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Pop Up*/}
      {isPopupOpen && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>What is your rating to this anime?</h2>

            <StarRating
              value={draftRating}
              loading={popupLoading}
              onChange={setDraftRating}
              onSubmit={handleSubmitRating}
              onClose={handleClosePopup}
            />
          </div>
        </div>
      )}
    </div>
  );
}
