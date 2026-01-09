import { useState } from "react";
import { createAnime } from "../../services/anime.service";

export default function AddData() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [coverFile, setCoverFile] = useState(null);

  const inputStyle = {
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #d1d5db",
    fontSize: 14,
  };

  async function handleSubmit(e) {
    e.preventDefault();

    await createAnime({
      title,
      description,
      coverFile,
      releaseYear: Number(releaseYear),
    });

    alert("Anime berhasil ditambahkan!");
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
            placeholder="Contoh: Ibu Mochi Tuyul Tangan Panjang"
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
            placeholder="100rb"
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
