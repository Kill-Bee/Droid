import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAnimes } from "../../services/anime/anime.service";
import { getAnimesCarousel } from "../../services/anime/anime-carousel.service";
import { useAnimeSearch } from "../../hooks/useAnimeSearch";
import {
  MediaCard,
  MediaSlider,
  HeroCarousel,
  CarouselSkeleton,
  CardSkeleton,
} from "../../components/common";
import "./anime.css";

export default function Anime({ search }) {
  const navigate = useNavigate();
  const [animes, setAnimes] = useState([]);
  const [animesCarousel, setAnimesCarousel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [carouselLoading, setCarouselLoading] = useState(true);

  const { data: searchResults, loading: searchLoading } =
    useAnimeSearch(search);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getAnimes();
        setAnimes(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching animes:", error);
        setAnimes([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setCarouselLoading(true);
        const data = await getAnimesCarousel();
        setAnimesCarousel(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching animes carousel:", error);
        setAnimesCarousel([]);
      } finally {
        setCarouselLoading(false);
      }
    })();
  }, []);

  const handleAnimeClick = (animeId) => {
    window.scrollTo(0, 0);
    navigate(`/anime/${animeId}`);
  };

  const handleAnimeCarouselClick = (animeId) => {
    window.scrollTo(0, 0);
    navigate(`/anime/carousel/${animeId}`);
  };

  const filteredAnimes = search ? searchResults : animes;
  const isLoading = search ? searchLoading : loading;

  const actionAnimes = filteredAnimes.filter((anime) =>
    anime.genres?.includes("Action"),
  );
  const romanceAnimes = filteredAnimes.filter((anime) =>
    anime.genres?.includes("Romance"),
  );
  const fantasyAnimes = filteredAnimes.filter((anime) =>
    anime.genres?.includes("Fantasy"),
  );

  const renderCards = (items, onClick) =>
    items.map((anime) => (
      <MediaCard
        key={anime.id}
        id={anime.id}
        title={anime.title}
        coverImage={anime.cover_image}
        onClick={onClick}
      />
    ));

  return (
    <>
      <HeroCarousel
        items={animesCarousel}
        loading={carouselLoading}
        onItemClick={handleAnimeCarouselClick}
        skeletonComponent={CarouselSkeleton}
        type="anime"
      />
      <div className="banner-bottom-bg" aria-hidden="true" />

      <div className="main">
        <MediaSlider
          title="Sedang Trending"
          loading={isLoading}
          skeletonComponent={CardSkeleton}
        >
          {renderCards(filteredAnimes, handleAnimeClick)}
        </MediaSlider>

        <MediaSlider
          title="Action"
          loading={loading}
          skeletonComponent={CardSkeleton}
        >
          {renderCards(actionAnimes, handleAnimeClick)}
        </MediaSlider>

        <MediaSlider
          title="Romance"
          loading={loading}
          skeletonComponent={CardSkeleton}
        >
          {renderCards(romanceAnimes, handleAnimeClick)}
        </MediaSlider>

        <h1>Other</h1>
        {loading ? (
          <div className="card-last">
            {Array.from({ length: 10 }).map((_, i) => (
              <CardSkeleton key={`card-ske${i}`} />
            ))}
          </div>
        ) : (
          <div className="card-last">
            {fantasyAnimes.map((anime) => (
              <div className="card-diam" key={anime.id}>
                <div>
                  <img
                    src={
                      anime.cover_image ||
                      "https://via.placeholder.com/300x400?text=No+Image"
                    }
                    alt={anime.title}
                    onClick={() => handleAnimeClick(anime.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
