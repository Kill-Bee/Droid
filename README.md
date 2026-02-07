# Droid

Aplikasi full-stack untuk eksplorasi Anime & Manga, termasuk fitur autentikasi pengguna, profil, rating, dan ulasan. Repo ini terdiri dari dua bagian: backend (Node.js/Express + PostgreSQL) dan frontend (React + Vite).

## Isi Proyek

- [`backend/`](https://github.com/Kill-Bee/Droid/tree/main/backend) — Server Express untuk API dengan PostgreSQL, JWT, dan middleware autentikasi.
- [`frontend/`](https://github.com/Kill-Bee/Droid/tree/main/frontend) — Aplikasi React (Vite) untuk antarmuka pengguna.

## Teknologi

- Backend:
  - Node.js (>= 18), Express 5
  - PostgreSQL (`pg`)
  - JSON Web Token (`jsonwebtoken`)
  - Hashing password (`bcrypt`)
  - CORS, `dotenv`, `nodemon`
  - Manajer paket: `pnpm` (pnpm@10.24.0)
- Frontend:
  - React 19 + Vite 7
  - React Router 7
  - React Toastify, React Easy Crop, React Loading Skeleton
  - Supabase JS (digunakan pada sisi frontend)
  - ESLint (konfigurasi flat)

## Struktur Direktori

```
.
├── backend
│   ├── package.json
│   └── src
│       ├── app.js
│       ├── server.js
│       ├── config/
│       ├── controllers/
│       ├── errors/
│       ├── middleware/
│       ├── models/
│       └── routes/
└── frontend
    ├── package.json
    ├── index.html
    └── src
        ├── App.jsx
        ├── api/
        ├── assets/
        ├── components/
        ├── context/
        ├── hooks/
        ├── lib/
        ├── pages/
        ├── services/
        ├── index.css
        └── main.jsx
```

## Menjalankan Secara Lokal

Prasyarat:
- Node.js >= 18
- `pnpm` terpasang
- PostgreSQL berjalan (lokal atau remote)

### 1) Backend (API)

1. Masuk ke folder backend dan pasang dependensi:
   ```bash
   cd backend
   pnpm install
   ```

2. Siapkan variabel lingkungan. Buat file `.env` di `backend/` (contoh variabel yang umum dipakai):
   ```
   PORT=3000
   DATABASE_URL=postgres://user:password@host:port/dbname
   JWT_SECRET=your_jwt_secret
   ```
   Catatan:
   - Server membaca `PORT` dari environment (default 3000).
   - Konfigurasi database dan secret JWT harus disesuaikan dengan lingkungan Anda.

3. Jalankan mode pengembangan:
   ```bash
   pnpm dev
   ```
   atau jalankan produksi:
   ```bash
   pnpm start
   ```

Server akan berjalan di `http://localhost:3000`. Origin CORS di backend saat ini di-set ke `http://localhost:5173` (lihat `backend/src/app.js`), sehingga frontend dev server default Vite akan kompatibel.

### 2) Frontend (React)

1. Masuk ke folder frontend dan pasang dependensi:
   ```bash
   cd frontend
   pnpm install
   ```

2. Jika aplikasi frontend membutuhkan konfigurasi environment (misalnya base URL API), tambahkan pada `.env` (contoh):
   ```
   VITE_API_BASE_URL=http://localhost:3000
   ```
   Sesuaikan dengan alamat backend Anda.

3. Jalankan mode pengembangan:
   ```bash
   pnpm dev
   ```
   - Vite akan berjalan di `http://localhost:5173`.

4. Build dan preview (opsional):
   ```bash
   pnpm build
   pnpm preview
   ```

## Ringkasan API

Endpoint inti disusun di folder `backend/src/routes/`. Berikut ringkasannya:

- Health:
  - `GET /api/health` — cek status server (mengembalikan `{ status: "ok" }`)
    - Lihat file: [`backend/src/routes/health.routes.js`](https://github.com/Kill-Bee/Droid/blob/main/backend/src/routes/health.routes.js)

- Autentikasi:
  - `POST /api/auth/login` — login
  - `POST /api/auth/register` — registrasi
    - Lihat file: [`backend/src/routes/auth.routes.js`](https://github.com/Kill-Bee/Droid/blob/main/backend/src/routes/auth.routes.js)

- Profil (butuh autentikasi):
  - `GET /api/profile` — mengambil data profil
  - `PUT /api/profile` — memperbarui data profil
    - Lihat file: [`backend/src/routes/profile.routes.js`](https://github.com/Kill-Bee/Droid/blob/main/backend/src/routes/profile.routes.js)

- Anime:
  - `GET /api/anime` — daftar anime
  - `POST /api/anime` — tambah anime
  - `GET /api/anime/carousel` — daftar carousel anime
  - `POST /api/anime/carousel` — tambah carousel anime
  - `GET /api/anime/search` — antre pencarian anime
  - `GET /api/anime/detail/:id` — detail kartu anime
  - `GET /api/anime/carousel/:id` — carousel anime berdasarkan ID
  - `GET /api/anime/:id` — anime berdasarkan ID
  - Rating (butuh autentikasi):
    - `GET /api/anime/:animeId/rating`
  - Ulasan (butuh autentikasi):
    - `POST /api/anime/:animeId/reviews/upsert`
    - `POST /api/anime/:animeId/reviews`
    - `GET /api/anime/:animeId/reviews`
    - `DELETE /api/anime/:animeId/reviews`
    - Lihat file: [`backend/src/routes/anime.routes.js`](https://github.com/Kill-Bee/Droid/blob/main/backend/src/routes/anime.routes.js)

- Manga (struktur mirip Anime):
  - `GET /api/manga` — daftar manga
  - `POST /api/manga` — tambah manga
  - `GET /api/manga/carousel` — daftar carousel manga
  - `POST /api/manga/carousel` — tambah carousel manga
  - `GET /api/manga/search` — antre pencarian manga
  - `GET /api/manga/detail/:id` — detail kartu manga
  - `GET /api/manga/carousel/:id` — carousel manga berdasarkan ID
  - `GET /api/manga/:id` — manga berdasarkan ID
  - Rating (butuh autentikasi):
    - `GET /api/manga/:mangaId/rating`
  - Ulasan (butuh autentikasi):
    - `POST /api/manga/:mangaId/reviews/upsert`
    - `POST /api/manga/:mangaId/reviews`
    - `GET /api/manga/:mangaId/reviews`
    - `DELETE /api/manga/:mangaId/reviews`
    - Lihat file: [`backend/src/routes/manga.routes.js`](https://github.com/Kill-Bee/Droid/blob/main/backend/src/routes/manga.routes.js)

## Skrip Penting

- Backend:
  - `pnpm dev` — jalankan server dengan `nodemon` (`src/server.js`)
  - `pnpm start` — jalankan server Node (`src/server.js`)
- Frontend:
  - `pnpm dev` — jalankan Vite dev server
  - `pnpm build` — build produksi
  - `pnpm preview` — preview hasil build
  - `pnpm lint` — linting dengan ESLint

## Catatan Pengembangan

- Origin CORS di backend saat ini di-hardcode ke `http://localhost:5173` pada [`backend/src/app.js`](https://github.com/Kill-Bee/Droid/blob/main/backend/src/app.js). Ubah sesuai domain frontend saat deploy produksi.
- Pastikan environment untuk database dan JWT dikonfigurasi dengan benar.
- Backend menggunakan ES Modules (`"type": "module"`), sesuaikan import/export.
- **Masih dalam tahap pengembangan**
