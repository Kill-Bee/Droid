import { useState, useRef } from "react";
import { createAnime } from "../../services/anime.service";

export default function AddData() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [episodes, setEpisodes] = useState("");
  const [coverFile, setCoverFile] = useState(null);
  const fileRef = useRef(null);

  const inputStyle = {
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #d1d5db",
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
      alert("Judul tidak boleh kosong!");
      return;
    }

    const year = Number(releaseYear);
    const eps = Number(episodes);

    if (!releaseYear || year <= 1900) {
      alert("Tahun rilis tidak boleh kosong!");
      return;
    }

    if (!episodes || eps <= 0) {
      alert("Jumlah episode tidak boleh kosong!");
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

      alert("Anime berhasil ditambahkan!");
      clearForm();
    } catch (error) {
      alert(error.message || "Gagal menambahkan anime");
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: 480,
          margin: "100px auto",
          padding: 24,
          borderRadius: 12,
          backgroundColor: "#ffffff",
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
            placeholder="Contoh: Ibu Mochi Tuyul Tangan 100rb Ngrogoh Ngrogoh"
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

        <button
          type="submit"
          style={{
            marginTop: 12,
            padding: "12px 16px",
            borderRadius: 8,
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            fontSize: 16,
            fontWeight: 600,
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#1d4ed8")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#2563eb")
          }
        >
          Tambahkan Anime
        </button>
      </form>
    </>
  );
}
