import "./navbar.css";

export default function Navbar({ onHomeClick, onProfileClick }) {
  return (
    <nav>
      <ul>
        <li onClick={onHomeClick}>Home</li>
        <li>Anime</li>
        <li>Manga</li>
        <li>Comunitiy</li>
      </ul>
      <div className="nav-right">
        <input type="text" className="search-btn" placeholder="Search..." />
        <img
          src="https://i.pinimg.com/1200x/64/ea/c9/64eac9d3e7906fa45b3f7f298f29e11e.jpg"
          alt="profile"
          onClick={onProfileClick}
        />
      </div>
    </nav>
  );
}