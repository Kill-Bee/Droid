import "./rating.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

import { getAnimeDetailById } from "../../services/anime/anime.service";
import { getAnimeRate, setAnimeRate } from "../../services/rating/rating.service";
import StarRating from "./components/StarRating";

export default function Rating() {
  const { id } = useParams();

  const [anime, setAnime] = useState(null);
  const [savedRating, setSavedRating] = useState(0);
  const [draftRating, setDraftRating] = useState(0);

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
        <div className="card-ratting">
          <div className="left-card">
            <img src="https://i.pinimg.com/736x/1e/e6/2d/1ee62d4858bf703ef45c2a8af62f9183.jpg" alt="" />
          </div>
          <div className="right-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h1>LavoraRungkad13506</h1>
                <strong>⭐⭐⭐⭐</strong>
              </div>
              <i>Join at</i>
              <label>musisi,rungkad</label>
              <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error, quam aliquam! Similique quisquam ducimus, magnam architecto alias nam totam vero recusandae aperiam libero asperiores saepe, accusamus, tempore ad. In quia aliquam ipsa vel commodi molestias soluta minima sit alias totam dicta nihil suscipit sunt tenetur quas ducimus exercitationem, magni mollitia iste. Quis eum similique, explicabo et nulla ex eaque! Est non sit nulla praesentium iusto neque iure distinctio vero ducimus!</p>
          </div>
        </div>

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
            <textarea className="comment-ratting" placeholder="What do you think about this Anime?(optional)"></textarea>

          </div>
        </div>
      )}

    </div>
  );
}
