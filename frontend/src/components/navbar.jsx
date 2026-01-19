import "./navbar.css";
import { useNavigate } from "react-router-dom";

export default function Navbar({ search, setSearch }) {
  const navigate = useNavigate();

  return (
    <nav>
      <ul>
        <li onClick={() => navigate("/")}>Home</li>
        <li onClick={() => navigate("/anime")}>Anime</li>
        <li>Manga</li>
        <li onClick={() => navigate("/add-data")}>Add Data</li>
      </ul>
      <div className="nav-right">
        <input
          type="text"
          className="search-btn"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
        />
        <img
          src="https://i.pinimg.com/1200x/64/ea/c9/64eac9d3e7906fa45b3f7f298f29e11e.jpg"
          alt="profile"
          onClick={() => navigate("/profile")}
        />
        <button onClick={() => navigate("/login")} className="login-navbar">
          Logout
        </button>
      </div>
    </nav>
  );
}
