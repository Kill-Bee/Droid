import "./navbar.css";

export default function Navbar({
  search,
  setSearch,
  onAnimeClick,
  onProfileClick,
  onLoginClick,
  onAddDataClick,
  onHomeClick
}) {
  return (
    <nav>
      <ul>
        <li onClick={onHomeClick}>Home</li>
        <li onClick={onAnimeClick}>Anime</li>
        <li>Manga</li>
        <li onClick={onAddDataClick}>Comunitiy</li>
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
          onClick={onProfileClick}
        />
        <button onClick={onLoginClick} className="login-navbar">
          Logout
        </button>
      </div>
    </nav>
  );
}
