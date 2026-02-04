import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyProfile } from "../../services/profile/profile.service";
import SearchBar from "./components/SearchBar";
import AuthButton from "./components/AuthButton";
import "./navbar.css";

export default function Navbar({ search, setSearch }) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getMyProfile()
      .then(setProfile)
      .catch((error) => console.error("Error fetching profile:", error));
  }, []);

  return (
    <nav>
      <ul>
        <li onClick={() => navigate("/anime")}>Anime</li>
        <li onClick={() => navigate("/manga")}>Manga</li>
      </ul>

      <div className="nav-right">
        <SearchBar value={search} onChange={setSearch} />
        <AuthButton avatar={profile?.avatar} />
      </div>
    </nav>
  );
}
