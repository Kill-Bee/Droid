import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyProfile } from "../../services/profile/profile.service";
import SearchBar from "./components/SearchBar";
import AuthButton from "./components/AuthButton";
import AddButton from "./components/AddButton";
import "./navbar.css";

export default function Navbar({ search, setSearch }) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [select, setSelect] = useState("");

  useEffect(() => {
    getMyProfile()
      .then(setProfile)
      .catch((error) => console.error("Error fetching profile:", error));
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelect(value);
    navigate(value);
    setSelect("");
  };

  return (
    <nav>
      <ul>
        <li onClick={() => navigate("/anime")}>Anime</li>
        <li onClick={() => navigate("/manga")}>Manga</li>
        <AddButton onChange={handleChange} select={select} />
      </ul>

      <div className="nav-right">
        <SearchBar value={search} onChange={setSearch} />
        <AuthButton profile={profile} />
      </div>
    </nav>
  );
}
