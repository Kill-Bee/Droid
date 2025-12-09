export default function Header() {
  return (
    < header className="header" >
      <div className="header-container">
        <div className="logo">DROID</div>
        <nav className="menu-categories">
          <a href="#" className="menu-item">MENU</a>
          <a href="#" className="menu-item">CATEGORIES</a>
          <a href="#" className="menu-item">TOP 50</a>
        </nav>
        <div className="search-container">
          <input type="text" className="search-bar" placeholder="" />
          <button className="search-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle
                cx="8"
                cy="8"
                r="6"
                stroke="currentColor"
                stroke-width="2"
              />
              <path d="M12 12L18 18" stroke="currentColor" stroke-width="2" />
            </svg>
          </button>
        </div>
        <div className="profile-icon">
          <img
            src="./images/people_15675853.png"
            alt="Profile"
            className="avatar"
          />
        </div>
      </div>
    </header >
  );
}
