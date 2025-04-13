import React from "react";

export default function WouldBuyAgainToggle({ value, onChange }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-burgundy font-medium">No</span>
      
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={value}
          onChange={() => onChange(!value)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-pink-300 rounded-full peer peer-checked:bg-burgundy transition-all"></div>
        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-full"></div>
      </label>

      <span className="text-burgundy font-medium">Yes</span>
    </div>
  );
}
