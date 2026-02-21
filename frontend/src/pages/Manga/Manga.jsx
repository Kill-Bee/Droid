import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getManga } from "../../services/manga/manga.service";
import { getMangaCarousel } from "../../services/manga/manga-carousel.service";
import { useMangaSearch } from "../../hooks/useMangaSearch";
import {
  MediaCard,
  MediaSlider,
  HeroCarousel,
  CarouselSkeleton,
  CardSkeleton,
} from "../../components/common";
import "./manga.css";

export default function Manga({ search }) {
  const navigate = useNavigate();
  const [manga, setManga] = useState([]);
  const [mangaCarousel, setMangaCarousel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [carouselLoading, setCarouselLoading] = useState(true);

  const { data: searchResults, loading: searchLoading } =
    useMangaSearch(search);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getManga();
        setManga(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching manga:", error);
        setManga([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setCarouselLoading(true);
        const data = await getMangaCarousel();
        setMangaCarousel(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching manga carousel:", error);
        setMangaCarousel([]);
      } finally {
        setCarouselLoading(false);
      }
    })();
  }, []);

  const handleMangaClick = (mangaId) => {
    window.scrollTo(0, 0);
    navigate(`/manga/${mangaId}`);
  };

  const handleMangaCarouselClick = (mangaId) => {
    window.scrollTo(0, 0);
    navigate(`/manga/carousel/${mangaId}`);
  };

  const filteredManga = search ? searchResults : manga;
  const isLoading = search ? searchLoading : loading;

  const seinenManga = filteredManga.filter((m) => m.genres?.includes("Seinen"));
  const romanceManga = filteredManga.filter((m) =>
    m.genres?.includes("Romance"),
  );
  const actionManga = filteredManga.filter((m) => m.genres?.includes("Action"));

  const renderCards = (items, onClick) =>
    items.map((item) => (
      <MediaCard
        key={item.id}
        id={item.id}
        title={item.title}
        coverImage={item.cover_image}
        onClick={onClick}
      />
    ));

  return (
    <>
      <HeroCarousel
        items={mangaCarousel}
        loading={carouselLoading}
        onItemClick={handleMangaCarouselClick}
        skeletonComponent={CarouselSkeleton}
        type="manga"
      />
      <div className="banner-bottom-bg" aria-hidden="true" />

      <div className="main">
        <MediaSlider
          title="Sedang Trending (Manga)"
          loading={isLoading}
          skeletonComponent={CardSkeleton}
        >
          {renderCards(filteredManga, handleMangaClick)}
        </MediaSlider>

        <MediaSlider
          title="Seinen"
          loading={loading}
          skeletonComponent={CardSkeleton}
        >
          {renderCards(seinenManga, handleMangaClick)}
        </MediaSlider>

        <MediaSlider
          title="Romance"
          loading={loading}
          skeletonComponent={CardSkeleton}
        >
          {renderCards(romanceManga, handleMangaClick)}
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
            {actionManga.map((item) => (
              <div className="card-diam" key={item.id}>
                <div>
                  <img
                    src={
                      item.cover_image ||
                      "https://via.placeholder.com/300x400?text=No+Image"
                    }
                    alt={item.title}
                    onClick={() => handleMangaClick(item.id)}
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
