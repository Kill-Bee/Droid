import "./footer.css";

export default function Footer() {
  return (
    <>

    <div className="banner-bottom-bg-footer" aria-hidden="true" />
    <footer className="footer">
      <div className="footer-content">
        {/* Logo Section */}
        <div className="footer-section footer-logo">
          <h2>DROID</h2>
          <p>Anime & Manga Platform</p>
        </div>

        {/* Menu Columns */}
        <div className="footer-section">
          <h4>WEEBLY THEMES</h4>
          <ul>
            <li><a href="#">PRE-SALE FAQS</a></li>
            <li><a href="#">SUBMIT A TICKET</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>SERVICES</h4>
          <ul>
            <li><a href="#">THEME TWEAK</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>SHOWCASE</h4>
          <ul>
            <li><a href="#">WIDGETKIT</a></li>
            <li><a href="#">SUPPORT</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>ABOUT US</h4>
          <ul>
            <li><a href="#">CONTACT US</a></li>
            <li><a href="#">AFFILIATES</a></li>
            <li><a href="#">RESOURCES</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-divider"></div>

      <div className="footer-bottom">
        <div className="social-icons">
          <a href="https://github.com/Kill-Bee" className="social-btn"><img src="src/assets/Github.svg" alt="" /></a>
          <a href="https://github.com/Kill-Bee" className="social-btn"><img src="src/assets/gmail.svg" alt="" /></a>
        </div>

        <p className="copyright">© Copyright. All rights reserved.</p>
      </div>
    </footer>
    </>
  );
}