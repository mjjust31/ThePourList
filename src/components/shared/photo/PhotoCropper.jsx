import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../utils/cropUtils"; // ✅
// your updated file

export default function PhotoCropper({ imageFile, onCropComplete }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropAreaComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleCropConfirm = async () => {
    const croppedImage = await getCroppedImg(
      URL.createObjectURL(imageFile), // passing the image source (file object)
      croppedAreaPixels
    );
    onCropComplete(croppedImage);
  };

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] bg-black">
      <Cropper
        image={URL.createObjectURL(imageFile)}
        crop={crop}
        zoom={zoom}
        aspect={1} // square crop
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropAreaComplete}
      />

      <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center gap-3 bg-white/80 py-2 px-4 sm:flex-row sm:justify-between sm:items-center">
        <input
          type="range"
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="w-full sm:w-1/2"
        />

        <button
          onClick={handleCropConfirm}
          className="mt-2 sm:mt-0 bg-burgundy text-white px-4 py-2 rounded-lg hover:bg-burgundy/90 transition">
          ✅ Use This Crop
        </button>
      </div>
    </div>
  );
}
