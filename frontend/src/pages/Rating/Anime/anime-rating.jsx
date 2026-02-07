import "./anime-rating.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

import { getAnimeDetailById } from "../../../services/anime/anime.service";
import { getAnimeRate } from "../../../services/review/anime/rating.service";
import {
  deleteAnimeReviews,
  getAnimeReviews,
  upsertAnimeReviews,
} from "../../../services/review/anime/review.service";

import AnimeInfo from "./components/AnimeInfo";
import RatingButtons from "../components/RatingButtons";
import ReviewList from "../components/ReviewList";
import RatingPopup from "./components/RatingPopup";

export default function AnimeRating() {
  const { id } = useParams();

  const [anime, setAnime] = useState(null);
  const [savedRating, setSavedRating] = useState(0);
  const [draftRating, setDraftRating] = useState(0);
  const [savedComment, setSavedComment] = useState("");
  const [draftComment, setDraftComment] = useState("");
  const [reviews, setReviews] = useState([]);

  const [pageLoading, setPageLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupLoading, setPopupLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

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
          setSavedComment(res.comment || "");
          setDraftComment(res.comment || "");
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
    setDraftComment(savedComment);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    if (popupLoading) return;
    setIsPopupOpen(false);
  };

  const handleSubmitRating = async (value, comment) => {
    try {
      setPopupLoading(true);
      await upsertAnimeReviews(id, value, comment);

      setSavedRating(value);
      setDraftRating(value);
      setSavedComment(comment);
      setDraftComment(comment);

      const res = await getAnimeReviews(id);
      setReviews(res || []);

      toast.success("Rating updated");
      setIsPopupOpen(false);
    } catch (error) {
      toast.error("Failed to update rating");
      console.error(error);
    } finally {
      setPopupLoading(false);
    }
  };

  const handleDeleteReview = async () => {
    if (!window.confirm("Are you sure you want to delete your review?")) {
      return;
    }

    try {
      setDeleteLoading(true);
      await deleteAnimeReviews(id);

      setSavedRating(0);
      setDraftRating(0);
      setSavedComment("");
      setDraftComment("");

      const res = await getAnimeReviews(id);
      setReviews(res || []);

      toast.success("Review deleted");
    } catch (error) {
      toast.error("Failed to delete review");
      console.error(error);
    } finally {
      setDeleteLoading(false);
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
          <AnimeInfo anime={anime} />

          {/* RIGHT */}
          <div className="rating-right">
            <h1 className="h1-right">{anime.title}</h1>
            <label>Synopsis</label>
            <p className="text-light">
              {anime.description || "No description available."}
            </p>

            <RatingButtons
              savedRating={savedRating}
              deleteLoading={deleteLoading}
              onOpenPopup={handleOpenPopup}
              onDelete={handleDeleteReview}
            />

            <h2 className="reviews">Reviews</h2>
            <ReviewList reviews={reviews} />
          </div>
        </div>
      </div>

      <RatingPopup
        isOpen={isPopupOpen}
        draftRating={draftRating}
        draftComment={draftComment}
        loading={popupLoading}
        onRatingChange={setDraftRating}
        onCommentChange={setDraftComment}
        onSubmit={handleSubmitRating}
        onClose={handleClosePopup}
      />
    </div>
  );
}
