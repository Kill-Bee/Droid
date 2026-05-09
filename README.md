# Droid

A full-stack application for exploring Anime & Manga, including features for user authentication, profiles, ratings, and reviews. This repository consists of two components: the backend (Node.js/Express + PostgreSQL) and the frontend (React + Vite).

## Project Contents

- [`backend/`](https://github.com/Kill-Bee/Droid/tree/main/backend) — Express server for APIs with PostgreSQL, JWT, and authentication middleware.
- [`frontend/`](https://github.com/Kill-Bee/Droid/tree/main/frontend) — React application (Vite) for the user interface.

## Technology Stack

- Backend:
  - Node.js (>= 18), Express 5
  - PostgreSQL (`pg`)
  - JSON Web Token (`jsonwebtoken`)
  - Password hashing (`bcrypt`)
  - CORS, `dotenv`, `nodemon`
  - Package manager: `pnpm` (pnpm@10.24.0)
- Frontend:
  - React 19 + Vite 7
  - React Router 7
  - React Toastify, React Easy Crop, React Loading Skeleton
  - Supabase JS (used on the frontend)
  - ESLint (flat configuration)

## Directory Structure

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

## Running Locally

### Prerequisites
- Node.js >= 18
- `pnpm` installed
- A running PostgreSQL instance (local or remote)

### 1) Backend (API)

1. Navigate to the backend folder and install dependencies:
   ```bash
   cd backend
   pnpm install
   ```

2. Set up environment variables. Create a `.env` file in the `backend/` folder (example variables):
   ```
   PORT=3000
   DATABASE_URL=postgres://user:password@host:port/dbname
   JWT_SECRET=your_jwt_secret
   ```
   Notes:
   - The server reads the `PORT` from the environment (default 3000).
   - Adjust the database configuration and JWT secret as per your environment.

3. Run in development mode:
   ```bash
   pnpm dev
   ```
   or for production:
   ```bash
   pnpm start
   ```

The server will run at `http://localhost:3000`. The default CORS origin in the backend is set to `http://localhost:5173` (see `backend/src/app.js`).

### 2) Frontend (React)

1. Navigate to the frontend folder and install dependencies:
   ```bash
   cd frontend
   pnpm install
   ```

2. If the frontend application requires environment configuration (e.g., API base URL), add it in `.env` (example):
   ```
   VITE_API_BASE_URL=http://localhost:3000
   ```
   Adjust according to your backend address.

3. Run in development mode:
   ```bash
   pnpm dev
   ```
   - Vite will run at `http://localhost:5173`.

4. Build and preview (optional):
   ```bash
   pnpm build
   pnpm preview
   ```

## API Endpoints Summary

The core endpoints are organized in the `backend/src/routes/` folder. Here is a summary:

- Health:
  - `GET /api/health` — Check server status (returns `{ status: "ok" }`)
    - File: [`backend/src/routes/health.routes.js`](https://github.com/Kill-Bee/Droid/blob/main/backend/src/routes/health.routes.js)

- Authentication:
  - `POST /api/auth/login` — Login
  - `POST /api/auth/register` — Register
    - File: [`backend/src/routes/auth.routes.js`](https://github.com/Kill-Bee/Droid/blob/main/backend/src/routes/auth.routes.js)

- Profile (authentication required):
  - `GET /api/profile` — Retrieve profile data
  - `PUT /api/profile` — Update profile data
    - File: [`backend/src/routes/profile.routes.js`](https://github.com/Kill-Bee/Droid/blob/main/backend/src/routes/profile.routes.js)

- Anime:
  - `GET /api/anime` — List of animes
  - `POST /api/anime` — Add anime
  - `GET /api/anime/carousel` — List of anime carousel
  - `POST /api/anime/carousel` — Add anime carousel
  - `GET /api/anime/search` — Anime search queue
  - `GET /api/anime/detail/:id` — Anime card detail
  - `GET /api/anime/carousel/:id` — Anime carousel by ID
  - `GET /api/anime/:id` — Anime by ID
  - Rating (authentication required):
    - `GET /api/anime/:animeId/rating`
  - Reviews (authentication required):
    - `POST /api/anime/:animeId/reviews/upsert`
    - `POST /api/anime/:animeId/reviews`
    - `GET /api/anime/:animeId/reviews`
    - `DELETE /api/anime/:animeId/reviews`
    - File: [`backend/src/routes/anime.routes.js`](https://github.com/Kill-Bee/Droid/blob/main/backend/src/routes/anime.routes.js)

- Manga (similar structure to Anime):
  - `GET /api/manga` — List of mangas
  - `POST /api/manga` — Add manga
  - `GET /api/manga/carousel` — List of manga carousel
  - `POST /api/manga/carousel` — Add manga carousel
  - `GET /api/manga/search` — Manga search queue
  - `GET /api/manga/detail/:id` — Manga card detail
  - `GET /api/manga/carousel/:id` — Manga carousel by ID
  - `GET /api/manga/:id` — Manga by ID
  - Rating (authentication required):
    - `GET /api/manga/:mangaId/rating`
  - Reviews (authentication required):
    - `POST /api/manga/:mangaId/reviews/upsert`
    - `POST /api/manga/:mangaId/reviews`
    - `GET /api/manga/:mangaId/reviews`
    - `DELETE /api/manga/:mangaId/reviews`
    - File: [`backend/src/routes/manga.routes.js`](https://github.com/Kill-Bee/Droid/blob/main/backend/src/routes/manga.routes.js)

## Important Scripts

- Backend:
  - `pnpm dev` — Run the server with `nodemon` (`src/server.js`)
  - `pnpm start` — Run the Node server (`src/server.js`)
- Frontend:
  - `pnpm dev` — Run the Vite development server
  - `pnpm build` — Build for production
  - `pnpm preview` — Preview the build
  - `pnpm lint` — Run ESLint for linting

## Development Notes

- The backend CORS origin is currently hardcoded to `http://localhost:5173` in [`backend/src/app.js`](https://github.com/Kill-Bee/Droid/blob/main/backend/src/app.js). Update it to match your frontend domain.
- Ensure environment variables for the database and JWT are correctly configured.
- The backend uses ES Modules (`"type": "module"`), adjust imports/exports accordingly.
- **Still in development phase.**