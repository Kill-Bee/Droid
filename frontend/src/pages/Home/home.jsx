import "./home.css";

export default function Home({ onLoginClick }) {
  return (
    <>
      <div className="header-home">
        <div className="background-home">
          <img
            src="https://i.pinimg.com/736x/a5/5d/7e/a55d7ee21bda038f84162d8e57cfe3d2.jpg"
            alt="background"
            className="img-home"
          />
          <div className="hero-content-home">
            <h1 className="h1-home">Welcome to DROID</h1>
            <p className="p-home">
              Here You can Ratings Anime && Manga 👇👇👇{" "}
            </p>
            <button className="button-home" onClick={onLoginClick}>
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
