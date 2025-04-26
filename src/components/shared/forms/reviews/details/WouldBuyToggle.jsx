import React from "react";

export default function WouldBuyAgainToggle({ value, onChange }) {
  return (
    <div className="flex items-center justify-center gap-6">
      {/* No Label */}
      <span
        className={`text-lg font-semibold transition-colors ${
          !value ? "text-pink-700" : "text-gray-400"
        }`}
      >
        No
      </span>

      {/* Toggle Switch */}
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={value}
          onChange={() => onChange(!value)}
          className="sr-only peer"
        />
        <div className="w-14 h-8 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-pink-300 rounded-full peer peer-checked:bg-pink-700 transition-all"></div>
        <div className="absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform peer-checked:translate-x-6 shadow-md"></div>
      </label>

      {/* Yes Label */}
      <span
        className={`text-lg font-semibold transition-colors ${
          value ? "text-pink-700" : "text-gray-400"
        }`}
      >
        Yes
      </span>
    </div>
  );
}
