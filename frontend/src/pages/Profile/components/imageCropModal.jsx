import React, { useState } from "react";
import Cropper from "react-easy-crop";
import "../profile.css";

export default function ImageCropModal({
  isOpen,
  onClose,
  onConfirm,
  imageSrc,
  aspectRatio = 1,
  title = "Crop Image",
  cropShape = "round",
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleConfirm = () => {
    onConfirm(croppedAreaPixels);
    handleClose();
  };
  const handleClose = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="crop-modal-overlay">
      <div className="crop-modal">
        <h2>{title}</h2>
        
        <div className="crop-container">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspectRatio}
            onCropChange={setCrop}
            onCropComplete={handleCropComplete}
            onZoomChange={setZoom}
            cropShape={cropShape}
            showGrid={false}
          />
        </div>

        <div className="crop-controls">
          <div className="control-group">
            <label>Zoom</label>
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="crop-slider"
            />
            <span className="zoom-value">{zoom.toFixed(1)}x</span>
          </div>
        </div>

        <div className="crop-modal-actions">
          <button onClick={handleClose} className="cancel-btn">
            Cancel
          </button>
          <button onClick={handleConfirm} className="confirm-btn">
            Confirm Crop
          </button>
        </div>
      </div>
    </div>
  );
}
