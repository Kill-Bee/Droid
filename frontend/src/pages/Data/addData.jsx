import { useState, useRef } from "react";
import { createAnime, createAnimeCarousel } from "../../services/anime.service";
import { toast } from "react-toastify";

export default function AddData() {
  const [view, setView] = useState("anime");

  const showAnime = () => setView("anime");
  const showAnimeCarousel = () => setView("animeCarousel");

  return view === "anime" ? (
    <Anime onAnimeCarouselClick={showAnimeCarousel} />
  ) : (
    <AnimeCarousel onAnimeClick={showAnime} />
  );
}

function AnimeCarousel({ onAnimeClick }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [episodes, setEpisodes] = useState("");
  const [coverFile, setCoverFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);

  const inputStyle = {
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #f2e9e1",
    fontSize: 14,
  };

  function clearForm() {
    setTitle("");
    setDescription("");
    setReleaseYear("");
    setEpisodes("");
    setCoverFile(null);

    if (fileRef.current) {
      fileRef.current.value = "";
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      toast.info("Judul tidak boleh kosong!");
      return;
    }

    const year = Number(releaseYear);
    const eps = Number(episodes);

    if (!releaseYear || year <= 1900) {
      toast.info("Tahun rilis tidak boleh kosong!");
      return;
    }

    if (!episodes || eps <= 0) {
      toast.info("Jumlah episode tidak boleh kosong!");
      return;
    }

    try {
      await createAnimeCarousel({
        title,
        description,
        coverFile,
        episodes: eps,
        releaseYear: year,
      });

      toast.success("Anime carousel berhasil ditambahkan!");
      clearForm();
    } catch (error) {
      toast.error(error.message || "Gagal menambahkan anime carousel");
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="anime">
        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: 480,
            margin: "100px auto",
            padding: 24,
            borderRadius: 12,
            backgroundColor: "#faf4ed",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <h2 style={{ marginBottom: 8 }}>Tambah Anime Carousel Baru</h2>

          {/* Judul */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label>Judul</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Junji..."
              style={inputStyle}
            />
          </div>

          {/* Deskripsi */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label>Deskripsi</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Anime tentang..."
              style={inputStyle}
            />
          </div>

          {/* Gambar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label>Cover</label>
            <input
              type="file"
              ref={fileRef}
              accept="image/*"
              onChange={(e) => setCoverFile(e.target.files[0])}
            />
          </div>

          {/* Tahun Rilis */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label>Tahun Rilis</label>
            <input
              type="number"
              value={releaseYear}
              onChange={(e) => setReleaseYear(e.target.value)}
              placeholder="2001"
              style={inputStyle}
            />
          </div>

          {/* Jumlah Episode */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label>Jumlah Episode</label>
            <input
              type="number"
              value={episodes}
              onChange={(e) => setEpisodes(e.target.value)}
              placeholder="100"
              style={inputStyle}
            />
          </div>

          <p>
            Wanna input anime?{" "}
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();
                onAnimeClick();
              }}
            >
              Click here
            </a>
          </p>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: 12,
              padding: "12px 16px",
              borderRadius: 8,
              backgroundColor: "#56949f",
              color: "#faf4ed",
              border: "none",
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#286983")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#56949f")
            }
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
}


function Anime({ onAnimeCarouselClick }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [episodes, setEpisodes] = useState("");
  const [coverFile, setCoverFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);

  const inputStyle = {
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #f2e9e1",
    fontSize: 14,
  };

  function clearForm() {
    setTitle("");
    setDescription("");
    setReleaseYear("");
    setEpisodes("");
    setCoverFile(null);

    if (fileRef.current) {
      fileRef.current.value = "";
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      toast.info("Judul tidak boleh kosong!");
      return;
    }

    const year = Number(releaseYear);
    const eps = Number(episodes);

    if (!releaseYear || year <= 1900) {
      toast.info("Tahun rilis tidak boleh kosong!");
      return;
    }

    if (!episodes || eps <= 0) {
      toast.info("Jumlah episode tidak boleh kosong!");
      return;
    }

    try {
      await createAnime({
        title,
        description,
        coverFile,
        episodes: eps,
        releaseYear: year,
      });

      toast.success("Anime berhasil ditambahkan!");
      clearForm();
    } catch (error) {
      toast.error(error.message || "Gagal menambahkan anime");
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="anime">
        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: 480,
            margin: "100px auto",
            padding: 24,
            borderRadius: 12,
            backgroundColor: "#faf4ed",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <h2 style={{ marginBottom: 8 }}>Tambah Anime Baru</h2>

          {/* Judul */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label>Judul</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Kingdom..."
              style={inputStyle}
            />
          </div>

          {/* Deskripsi */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label>Deskripsi</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Anime tentang..."
              style={inputStyle}
            />
          </div>

          {/* Gambar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label>Cover</label>
            <input
              type="file"
              ref={fileRef}
              accept="image/*"
              onChange={(e) => setCoverFile(e.target.files[0])}
            />
          </div>

          {/* Tahun Rilis */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label>Tahun Rilis</label>
            <input
              type="number"
              value={releaseYear}
              onChange={(e) => setReleaseYear(e.target.value)}
              placeholder="2001"
              style={inputStyle}
            />
          </div>

          {/* Jumlah Episode */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label>Jumlah Episode</label>
            <input
              type="number"
              value={episodes}
              onChange={(e) => setEpisodes(e.target.value)}
              placeholder="26"
              style={inputStyle}
            />
          </div>

          <p>
            Wanna input carousel?{" "}
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();
                onAnimeCarouselClick();
              }}
            >
              Click here
            </a>
          </p>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: 12,
              padding: "12px 16px",
              borderRadius: 8,
              backgroundColor: "#56949f",
              color: "#faf4ed",
              border: "none",
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#286983")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#56949f")
            }
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
}
