export async function getCroppedImage(imageSrc, croppedAreaPixels) {
  // imageSrc = URL/dataURL gambar (dari ObjectURL)
  // croppedAreaPixels = { x, y, width, height } ukuran area yg di-crop

  const image = new Image();
  image.src = imageSrc;

  return new Promise((resolve, reject) => {
    image.onload = () => {
      // Hitung scale (canvas koordinat vs pixel asli)
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      // Buat canvas dengan ukuran crop area
      const canvas = document.createElement("canvas");
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      // Draw gambar ke canvas dengan posisi crop
      const ctx = canvas.getContext("2d");
      ctx.drawImage(
        image,
        croppedAreaPixels.x * scaleX,           // X position di gambar asli
        croppedAreaPixels.y * scaleY,           // Y position di gambar asli
        croppedAreaPixels.width * scaleX,       // Width crop area
        croppedAreaPixels.height * scaleY,      // Height crop area
        0,    // X position di canvas
        0,    // Y position di canvas
        croppedAreaPixels.width,    // Width di canvas
        croppedAreaPixels.height    // Height di canvas
      );

      // Convert canvas ke JPEG Blob
      canvas.toBlob((blob) => {
        if (blob) resolve(blob); // Return Blob untuk upload
        else reject(new Error("Failed to create blob"));
      }, "image/jpeg");
    };

    image.onerror = () => {
      reject(new Error("Failed to load image"));
    };
  });
}