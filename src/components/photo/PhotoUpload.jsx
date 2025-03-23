import React from "react";
import { FaCamera } from "react-icons/fa"; // You can use any icon lib you like

export default function PhotoUpload({
  label = "Upload Photo",
  file,
  onChange,
}) {
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) onChange(selected);
  };

  return (
    <div className="flex flex-col gap-3 items-center sm:items-start">
      <label className="bg-burgundy text-white px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 hover:bg-burgundy/80 transition-all">
        <FaCamera className="text-black text-xl" />

        {label}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {file && (
        <img
          src={URL.createObjectURL(file)}
          alt="Wine Label Preview"
          className="rounded shadow-md w-full max-w-xs"
        />
      )}
    </div>
  );
}
