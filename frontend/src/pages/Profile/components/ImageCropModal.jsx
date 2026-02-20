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
        <div className="crop-modal-header">
          <button className="crop-back-btn" onClick={handleClose}>←</button>
          <h2>{title}</h2>
          <button className="crop-apply-btn" onClick={handleConfirm}>Apply</button>
        </div>
        
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
            objectFit="auto-cover"
            minZoom={0.1}
            maxZoom={3}
            restrictPosition={true}
          />
        </div>

        <div className="crop-controls-bottom">
          <button className="zoom-out-btn" onClick={() => setZoom(Math.max(0.1, zoom - 0.2))}>−</button>
          <input
            type="range"
            min={0.1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="crop-slider"
          />
          <button className="zoom-in-btn" onClick={() => setZoom(Math.min(3, zoom + 0.2))}>+</button>
        </div>
      </div>
    </div>
  );
}
