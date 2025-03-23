import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import PhotoCropper from "./PhotoCropper";


export default function PhotoUpload({
  label = "Upload Photo",
  file,
  onChange,
}) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [rawFile, setRawFile] = useState(null); // Original file before cropping

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setRawFile(selected); // Don't send to parent yet — wait for cropping
    }
  };

  // Update preview when cropped file is saved
  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleCropComplete = (croppedImage) => {
    onChange(croppedImage); // Send cropped file to parent
    setRawFile(null); // Hide cropper after use
  };

  return (
    <div className="flex flex-col gap-3 items-center sm:items-start w-full">
      {/* Upload Button */}
      <label className="bg-burgundy text-white px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 hover:bg-burgundy/80 transition-all text-sm sm:text-base">
        <FaCamera className="text-black text-xl" />
        {label}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {/* If user selects a file, show cropping interface */}
      {rawFile && (
        <div className="w-full">
          <PhotoCropper imageFile={rawFile} onCropComplete={handleCropComplete} />
        </div>
      )}

      {/* Show preview only if cropped image exists */}
      {previewUrl && !rawFile && (
        <img
          src={previewUrl}
          alt="Wine Label Preview"
          className="rounded shadow-md w-full max-w-[250px] object-cover"
        />
      )}
    </div>
  );
}
