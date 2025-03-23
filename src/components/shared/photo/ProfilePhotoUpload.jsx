import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import PhotoCropper from "./PhotoCropper";

export default function ProfilePhotoUpload() {
  const [croppedFile, setCroppedFile] = useState(null);
  const [rawFile, setRawFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setRawFile(selected); // Wait for crop
    }
  };

  const handleCropComplete = (croppedImage) => {
    setCroppedFile(croppedImage);
    setRawFile(null);
  };

  useEffect(() => {
    if (!croppedFile) return;

    const url = URL.createObjectURL(croppedFile);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [croppedFile]);

  return (
    <div className="flex flex-col items-center gap-3">
      <label className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[var(--custom-gold)] bg-gray-300 cursor-pointer group">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            <FaCamera className="text-2xl" />
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center transition">
          <p className="text-white text-xs opacity-0 group-hover:opacity-100">
            Change Photo
          </p>
        </div>
      </label>

      {rawFile && (
        <div className="w-full max-w-md">
          <PhotoCropper imageFile={rawFile} onCropComplete={handleCropComplete} />
        </div>
      )}
    </div>
  );
}
