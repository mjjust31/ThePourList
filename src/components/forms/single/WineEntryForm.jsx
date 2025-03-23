import React, { useState } from "react";
import PhotoUpload from "../../photo/PhotoUpload";

// Generate year list from 2025 to 1900
const years = Array.from({ length: 2025 - 1900 + 1 }, (_, i) => 2025 - i);

const wineColors = ["Red", "White", "Rosé", "Sparkling", "Dessert", "Other"];

const wineTypeOptions = {
  Red: [
    "Pinot Noir",
    "Cabernet Sauvignon",
    "Merlot",
    "Syrah",
    "Malbec",
    "Zinfandel",
    "Sangiovese",
    "Grenache",
    "Nebbiolo",
    "Tempranillo",
    "Other",
  ],
  White: [
    "Chardonnay",
    "Riesling",
    "Pinot Grigio/Pinot Gris",
    "Sauvignon Blanc",
    "Gewürztraminer",
    "Moscato/Muscat",
    "Semillon",
    "Viognier",
    "Chenin Blanc",
    "Torrontés",
    "Other",
  ],
  Sparkling: ["Champagne", "Prosecco", "Moscato", "Cava", "Other"],
  Rosé: ["Rosé", "Other"],
  Dessert: ["Port", "Sherry", "Other"],
  Other: ["Other"],
};

export default function WineEntryForm({ wineData, onChange }) {
  const [showOptional, setShowOptional] = useState(false);

  const handleChange = (field, value) => {
    onChange({
      ...wineData,
      [field]: value,
      ...(field === "color" && {
        type:
          wineTypeOptions[value]?.length === 1 ? wineTypeOptions[value][0] : "",
        customType: "",
      }),
    });
  };

  const FormRow = ({ label, children }) => (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
      <label className="w-full sm:w-1/3 text-burgundy font-semibold">
        {label}
      </label>
      <div className="w-full sm:w-2/3">{children}</div>
    </div>
  );

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      handleChange("price", value);
    }
  };

  return (
    <form className="p-4 bg-white rounded-lg shadow-md w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-burgundy mb-6 text-center">
        Wine Entry Form
      </h2>

      {/* Color */}
      <FormRow label="Color *">
        <select
          className="w-full p-2 border border-gray-300 rounded"
          value={wineData.color || ""}
          onChange={(e) => handleChange("color", e.target.value)}>
          <option value="">Select color</option>
          {wineColors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </FormRow>

      {/* Wine Type */}
      <FormRow label="Wine Type *">
        <select
          className="w-full p-2 border border-gray-300 rounded"
          value={wineData.type || ""}
          onChange={(e) => handleChange("type", e.target.value)}
          disabled={!wineData.color}>
          <option value="">Select wine type</option>
          {(wineTypeOptions[wineData.color] || []).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </FormRow>

      {/* Custom Type */}
      {wineData.type === "Other" && (
        <FormRow label="Enter Wine Type">
          <input
            type="text"
            placeholder="Custom wine type"
            className="w-full p-2 border border-gray-300 rounded"
            value={wineData.customType || ""}
            onChange={(e) => handleChange("customType", e.target.value)}
          />
        </FormRow>
      )}

      {/* Wine Brand Name */}
      <FormRow label="Wine Brand Name *">
        <input
          type="text"
          placeholder="e.g. Robert Mondavi Reserve"
          className="w-full p-2 border border-gray-300 rounded"
          value={wineData.name || ""}
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </FormRow>

      {/* Toggle Optional Section */}
      <div className="text-center mb-4">
        <button
          type="button"
          onClick={() => setShowOptional(!showOptional)}
          className="text-burgundy underline font-medium">
          {showOptional
            ? "➖ Hide Optional Fields"
            : "➕ Add More Info (Optional)"}
        </button>
      </div>

      {showOptional && (
        <div className="transition-all duration-300">
          {/* Year */}
          <FormRow label="Year">
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={wineData.year || ""}
              onChange={(e) => handleChange("year", e.target.value)}>
              <option value="">Select year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </FormRow>

          {/* Price */}
          <FormRow label="Price ($)">
            <input
              type="text"
              placeholder="e.g. 14.99"
              className="w-full p-2 border border-gray-300 rounded"
              value={wineData.price || ""}
              onChange={handlePriceChange}
            />
          </FormRow>

          {/* Location */}
          <FormRow label="Location Purchased">
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={wineData.location || ""}
              onChange={(e) => handleChange("location", e.target.value)}>
              <option value="">Select</option>
              <option value="Grocery Store">Grocery Store</option>
              <option value="Winery">Winery</option>
              <option value="Beverage Store">Beverage Store</option>
              <option value="Other">Other</option>
            </select>
          </FormRow>

          {/* Location Name (always show if selected) */}
          {wineData.location && (
            <FormRow label="Location Name">
              <input
                type="text"
                placeholder="e.g. Trader Joe's, Silver Oak Winery"
                className="w-full p-2 border border-gray-300 rounded"
                value={wineData.locationName || ""}
                onChange={(e) => handleChange("locationName", e.target.value)}
              />
            </FormRow>
          )}

          {/* Sweetness */}
          <FormRow label="Sweetness">
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={wineData.sweetness || ""}
              onChange={(e) => handleChange("sweetness", e.target.value)}>
              <option value="">Select</option>
              <option value="Dry">Dry</option>
              <option value="Semi-dry">Semi-dry</option>
              <option value="Semi-sweet">Semi-sweet</option>
              <option value="Sweet">Sweet</option>
            </select>
          </FormRow>

          {/* Grape Origin */}
          <FormRow label="Grape Origin">
            <input
              type="text"
              placeholder="e.g. Napa Valley, France"
              className="w-full p-2 border border-gray-300 rounded"
              value={wineData.origin || ""}
              onChange={(e) => handleChange("origin", e.target.value)}
            />
          </FormRow>

          {/* Upload Photo */}
          <FormRow label="Wine Label Photo">
            <PhotoUpload
              label="Upload Wine Photo"
              file={wineData.photo}
              onChange={(file) => handleChange("photo", file)}
            />
          </FormRow>
        </div>
      )}
    </form>
  );
}
