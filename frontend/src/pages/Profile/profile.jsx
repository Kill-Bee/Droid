import { useEffect, useState } from "react";
import { getMyProfile } from "../../services/profile.service";
import "./profile.css";

export default function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getMyProfile();
        setProfile(data);
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    }
    loadProfile();
  }, []);

  if (!profile) return <div>Loading profile...</div>;

  return (
    <>
      <div className="box"></div>

      <div className="bacground">
        {/* HEADER */}
        <div
          className="headerProfile"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.75), rgba(0,0,0,0)),
              url(https://i.pinimg.com/1200x/4f/4c/fc/4f4cfc93f7b8af19d1a5330fc60e512f.jpg)
            `,
          }}
        >
          <div className="biodata">
            <img src={profile.avatar} alt="profile" className="fotoProfile" />
            <div>
              <h1>{profile.username}</h1>

              <div className="hero-tags">
                <span className="tag">DEVELOPER</span>
                <span className="tag">ANIME LOVER</span>
              </div>

              <label>{profile.deskripsi || "No description yet"}</label>
              <p>Joined on September 17, 2025</p>
            </div>
          </div>
        </div>

        {/* RATING SECTION */}
        <div className="mainProfile">
          <h1>Your Rating</h1>

          {profile.rated_anime?.length === 0 && (
            <p>You haven't rated any anime yet.</p>
          )}

          <div className="slider-wrapper-profile">
            <div className="container-slide">
              {profile.rated_anime?.map((item) => (
                <div className="card" key={item.anime_id}>
                  <img src={item.cover_image} alt={item.title} />
                  <h3>{item.title}</h3>
                  <p>⭐ {item.rating}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
