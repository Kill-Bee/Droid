import React from "react";
import "../profile.css";

export default function EditProfileModal({
  isOpen,
  onClose,
  onSave,
  loading,
  editForm,
  onChange,
  avatarPreview,
  bannerPreview,
  avatarInputRef,
  bannerInputRef,
  onAvatarChange,
  onBannerChange,
}) {
  if (!isOpen) return null;

  const avatarSrc =
    avatarPreview ||
    editForm.avatar ||
    "https://i.pinimg.com/736x/32/9c/c6/329cc6ad5210a2c666554d58c7a433e8.jpg";

  const bannerSrc =
    bannerPreview ||
    editForm.banner ||
    "https://i.pinimg.com/1200x/4f/4c/fc/4f4cfc93f7b8af19d1a5330fc60e512f.jpg";

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal">
        <h2>Edit Profile</h2>

        <label>Display Name</label>
        <input
          name="displayName"
          value={editForm.displayName}
          onChange={onChange}
          placeholder="Your display name"
          disabled={loading}
        />

        <label>Avatar</label>
        <div className="file-upload-wrapper">
          <input
            type="file"
            accept="image/*"
            ref={avatarInputRef}
            onChange={onAvatarChange}
            style={{ display: "none" }}
          />
          <div className="file-upload-preview">
            <img
              src={avatarSrc}
              alt="Avatar preview"
              className="avatar-preview"
            />
            <button
              type="button"
              className="upload-btn"
              onClick={() => avatarInputRef.current?.click()}
              disabled={loading}
            >
              Choose Avatar
            </button>
          </div>
        </div>

        <label>Badge</label>
        <input
          name="badge"
          value={editForm.badge}
          onChange={onChange}
          placeholder="Your badge can be 2 using comma"
          disabled={loading}
        />
        
        <div className="badge-preview">
          {editForm.badge ? (
            editForm.badge.split(',').map((badge, index) => (
              <span className="tag" key={index}>
                {badge.trim().toUpperCase()}
              </span>
            ))
          ) : (
            <span className="tag">MEMBER</span>
          )}
        </div>

        <label>Banner</label>
        <div className="file-upload-wrapper">
          <input
            type="file"
            accept="image/*"
            ref={bannerInputRef}
            onChange={onBannerChange}
            style={{ display: "none" }}
          />
          <div className="file-upload-preview banner">
            <img
              src={bannerSrc}
              alt="Banner preview"
              className="banner-preview"
            />
            <button
              type="button"
              className="upload-btn"
              onClick={() => bannerInputRef.current?.click()}
              disabled={loading}
            >
              Choose Banner
            </button>
          </div>
        </div>

        <label>Bio</label>
        <textarea
          name="bio"
          value={editForm.bio}
          onChange={onChange}
          placeholder="Tell us about yourself..."
          rows={4}
          disabled={loading}
        />

        <div className="edit-modal-actions">
          <button onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button onClick={onSave} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
