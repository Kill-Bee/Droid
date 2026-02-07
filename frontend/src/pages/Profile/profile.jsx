import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMyProfile,
  updateMyProfile,
} from "../../services/profile/profile.service";
import { uploadAvatar, uploadBanner } from "../../services/storage";
import { toast } from "react-toastify";
import StarDisplay from "./components/StarDisplay";
import EditProfile from "./components/EditProfile";
import ImageCropModal from "./components/ImageCropModal";
import { getCroppedImage } from "./utils/cropUtils";
import { useAuth } from "../../hooks/useAuth";
import { MediaCard } from "../../components/common";
import "./profile.css";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    displayName: "",
    avatar: "",
    badge: "",
    banner: "",
    bio: "",
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAvatarCrop, setShowAvatarCrop] = useState(false);
  const [showBannerCrop, setShowBannerCrop] = useState(false);
  const [tempImageSrc, setTempImageSrc] = useState(null);
  const [cropType, setCropType] = useState(null);

  const avatarInputRef = useRef(null);
  const bannerInputRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/auth");
  }

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const data = await getMyProfile();
      setProfile(data);
      setEditForm({
        displayName: data.display_name || "",
        avatar: data.avatar || "",
        badge: data.badge || "",
        banner: data.banner || "",
        bio: data.bio || "",
      });
    } catch (err) {
      console.error("Failed to load profile:", err);
    }
  }

  function handleAvatarChange(e) {
    const file = e.target.files[0];
    if (file) {
      const tempUrl = URL.createObjectURL(file);
      setTempImageSrc(tempUrl);
      setCropType("avatar");
      setShowAvatarCrop(true);
    }
  }

  function handleBannerChange(e) {
    const file = e.target.files[0];
    if (file) {
      // Jika GIF, skip crop dan langsung pakai file asli
      if (file.type === "image/gif") {
        setBannerFile(file);
        setBannerPreview(URL.createObjectURL(file));
        return;
      }
      const tempUrl = URL.createObjectURL(file);
      setTempImageSrc(tempUrl);
      setCropType("banner");
      setShowBannerCrop(true);
    }
  }

  async function handleSave() {
    setLoading(true);
    try {
      let avatarUrl = editForm.avatar;
      let bannerUrl = editForm.banner;

      if (avatarFile) {
        avatarUrl = await uploadAvatar(avatarFile);
      }

      if (bannerFile) {
        bannerUrl = await uploadBanner(bannerFile);
      }

      await updateMyProfile({
        displayName: editForm.displayName,
        avatar: avatarUrl,
        badge: editForm.badge,
        banner: bannerUrl,
        bio: editForm.bio,
      });

      toast.success("Profile updated successfully!");
      await loadProfile();
      setIsEditing(false);
      setAvatarFile(null);
      setBannerFile(null);
      setAvatarPreview(null);
      setBannerPreview(null);
    } catch (err) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleCloseModal() {
    setIsEditing(false);
    setAvatarFile(null);
    setBannerFile(null);
    setAvatarPreview(null);
    setBannerPreview(null);
  }

  async function handleAvatarCropConfirm(croppedAreaPixels) {
    if (!tempImageSrc || !croppedAreaPixels) return;
    try {
      const blob = await getCroppedImage(tempImageSrc, croppedAreaPixels);
      const file = new File([blob], "avatar.jpg", { type: "image/jpeg" });
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(blob));
    } catch (error) {
      toast.error("Failed to crop avatar: " + error.message);
    }
    setShowAvatarCrop(false);
    setTempImageSrc(null);
  }

  async function handleBannerCropConfirm(croppedAreaPixels) {
    if (!tempImageSrc || !croppedAreaPixels) return;
    try {
      const blob = await getCroppedImage(tempImageSrc, croppedAreaPixels);
      const file = new File([blob], "banner.jpg", { type: "image/jpeg" });
      setBannerFile(file);
      setBannerPreview(URL.createObjectURL(blob));
    } catch (error) {
      toast.error("Failed to crop banner: " + error.message);
    }
    setShowBannerCrop(false);
    setTempImageSrc(null);
  }

  function handleCloseCropModal() {
    setShowAvatarCrop(false);
    setShowBannerCrop(false);
    setTempImageSrc(null);
    setCropType(null);
  }

  function formatDate(dateString) {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

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
              url(${
                profile.banner ||
                "https://i.pinimg.com/1200x/4f/4c/fc/4f4cfc93f7b8af19d1a5330fc60e512f.jpg"
              })
            `,
          }}
        >
          <div className="biodata">
            <img
              src={
                profile.avatar ||
                "https://i.pinimg.com/736x/32/9c/c6/329cc6ad5210a2c666554d58c7a433e8.jpg"
              }
              alt="profile"
              className="fotoProfile"
            />
            <div className="penjelasan">
              <div className="header-top">
                <h1>{profile.display_name || profile.username}</h1>
                <div className="hero-tags">
                  {profile.badge ? (
                    profile.badge.split(",").map((badge, index) => (
                      <span className="tag" key={index}>
                        {badge.trim()}
                      </span>
                    ))
                  ) : (
                    <span className="tag">MEMBER</span>
                  )}
                </div>
              </div>
              <p className="username">@{profile.username}</p>
            </div>
            <div className="profile-actions">
              <button
                className="edit-profile-btn"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
              <button
                className="logout-btn"
                onClick={handleLogout}
                title="Logout"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <EditProfile
          isOpen={isEditing}
          onClose={handleCloseModal}
          onSave={handleSave}
          loading={loading}
          editForm={editForm}
          onChange={handleChange}
          avatarPreview={avatarPreview}
          bannerPreview={bannerPreview}
          avatarInputRef={avatarInputRef}
          bannerInputRef={bannerInputRef}
          onAvatarChange={handleAvatarChange}
          onBannerChange={handleBannerChange}
        />

        {/* RATING SECTION */}
        <div className="abcd">
          <label>{profile.bio || "No bio yet"}</label>
          <p>Joined on {formatDate(profile.joined_at)}</p>
        </div>
        <div className="mainProfile">
          <h1>Animes Rating</h1>

          {profile.rated_anime?.length === 0 && (
            <p className="info-blank">You haven't rated any anime yet.</p>
          )}

          <div className="slider-wrapper-profile">
            <div className="container-slide">
              {profile.rated_anime?.map((item) => (
                <MediaCard
                  key={item.anime_id}
                  id={item.anime_id}
                  title={item.title}
                  coverImage={item.cover_image}
                  onClick={(id) => navigate(`/anime/${id}`)}
                >
                  <StarDisplay rating={item.rating} />
                </MediaCard>
              ))}
            </div>
          </div>

          <h1>Manga Rating</h1>

          {profile.rated_manga?.length === 0 && (
            <p className="info-blank">You haven't rated any manga yet.</p>
          )}

          <div className="slider-wrapper-profile">
            <div className="container-slide">
              {profile.rated_manga?.map((item) => (
                <MediaCard
                  key={item.manga_id}
                  id={item.manga_id}
                  title={item.title}
                  coverImage={item.cover_image}
                  onClick={(id) => navigate(`/manga/${id}`)}
                >
                  <StarDisplay rating={item.rating} />
                </MediaCard>
              ))}
            </div>
          </div>
        </div>

        {/* CROP MODALS */}
        <ImageCropModal
          isOpen={showAvatarCrop}
          onClose={handleCloseCropModal}
          onConfirm={handleAvatarCropConfirm}
          imageSrc={tempImageSrc}
          aspectRatio={1}
          cropShape="round"
          title="Crop Avatar"
        />

        <ImageCropModal
          isOpen={showBannerCrop}
          onClose={handleCloseCropModal}
          onConfirm={handleBannerCropConfirm}
          imageSrc={tempImageSrc}
          aspectRatio={3 / 1}
          cropShape="rect"
          title="Crop Banner"
        />
      </div>
    </>
  );
}
