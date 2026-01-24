import { useState } from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

export default function Navbar({ search, setSearch }) {
  const navigate = useNavigate();

  const [select, setSelect] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSelect(value);
    if (value) navigate(value);
  };

  return (
    <>
      <nav>
        <ul>
          {/* <li onClick={() => navigate("/")}>Home</li> */}
          <li onClick={() => navigate("/anime")}>Anime</li>
          <li onClick={() => navigate("/manga")}>Manga</li>
          <li>
            <select
              name=""
              id=""
              onChange={handleChange}
              value={select}
              className="data"
            >
              <option value="" disabled hidden>
                Add data
              </option>
              <option value="/add-data">Add Anime</option>
              <option value="/add-manga">Add Manga</option>
            </select>
          </li>
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
          <button onClick={() => navigate("/auth")} className="login-navbar">
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}
