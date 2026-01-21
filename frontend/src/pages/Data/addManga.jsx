import { useState, useRef } from "react";
import { createManga } from "../../services/manga.service";
import { createMangaCarousel } from "../../services/manga-carousel.service";
import { toast } from "react-toastify";

export default function AddManga() {
  const [view, setView] = useState("manga");

  const showManga = () => setView("manga");
  const showMangaCarousel = () => setView("mangaCarousel");

  return view === "manga" ? (
    <Manga onMangaCarouselClick={showMangaCarousel} />
  ) : (
    <MangaCarousel onMangaClick={showManga} />
  );
}

function MangaCarousel({ onMangaClick }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [chapters, setChapters] = useState("");
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
    setChapters("");
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
    const chp = Number(chapters);

    if (!releaseYear || year <= 1900) {
      toast.info("Tahun rilis tidak boleh kosong!");
      return;
    }

    if (!chapters || chp <= 0) {
      toast.info("Jumlah chapters tidak boleh kosong!");
      return;
    }

    try {
      await createMangaCarousel({
        title,
        description,
        coverFile,
        chapters: chp,
        releaseYear: year,
      });

      toast.success("Manga carousel berhasil ditambahkan!");
      clearForm();
    } catch (error) {
      toast.error(error.message || "Gagal menambahkan Manga carousel");
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
          <h2 style={{ marginBottom: 8 }}>Tambah Manga Carousel Baru</h2>

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
              placeholder="Manga tentang..."
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
            <label>Jumlah Chapters</label>
            <input
              type="number"
              value={chapters}
              onChange={(e) => setEpisodes(e.target.value)}
              placeholder="100"
              style={inputStyle}
            />
          </div>

          <p>
            Wanna input Manga?{" "}
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();
                onMangaClick();
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


function Manga({ onMangaCarouselClick }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [chapters, setChapters] = useState("");
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
    setChapters("");
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
    const chp = Number(chapters);

    if (!releaseYear || year <= 1900) {
      toast.info("Tahun rilis tidak boleh kosong!");
      return;
    }

    if (!chapters || chp <= 0) {
      toast.info("Jumlah episode tidak boleh kosong!");
      return;
    }

    try {
      await createManga({
        title,
        description,
        coverFile,
        chapters: chp,
        releaseYear: year,
      });

      toast.success("Manga berhasil ditambahkan!");
      clearForm();
    } catch (error) {
      toast.error(error.message || "Gagal menambahkan Manga");
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
          <h2 style={{ marginBottom: 8 }}>Tambah Manga Cards Baru</h2>

          {/* Judul */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label>Judul</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="sekar gambuh pinng catur..."
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
              placeholder="Manga tentang..."
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
            <label>Jumlah chapters</label>
            <input
              type="number"
              value={chapters}
              onChange={(e) => setChapters(e.target.value)}
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
                onMangaCarouselClick();
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
