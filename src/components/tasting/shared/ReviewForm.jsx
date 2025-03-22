import React from "react";

export default function ReviewForm({ value, onChange }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Write your tasting notes..."
      rows={5}
      className="w-full p-3 border border-gray-300 rounded resize-none min-h-[120px]"
    />
  );
}
