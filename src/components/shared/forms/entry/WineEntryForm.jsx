import React, { useState } from "react";
import PhotoUpload from "../../photo/PhotoUpload";
import { getSortedTypesWithOtherLast } from "../../../../helpers/sortOthersLast";
import AddToInventoryButton from "../../buttons/AddtoInventoryButton";
import years from "../../data/Year";
import wineColors from "../../data/wine/WineColors";
import wineTypeOptions from "../../data/wine/WineTypeOptions";
import {
  handlePhotoChange,
  handleInputChange,
  handlePriceChange,
} from "../../utils/formHandler";

// Moved out of component to avoid re-creation on every render
const FormRow = ({ label, children }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
    <label className="w-full sm:w-1/3 text-burgundy font-semibold">
      {label}
    </label>
    <div className="w-full sm:w-2/3">{children}</div>
  </div>
);

export default function WineEntryForm({ wineData, onChange, onClose, onAdd }) {
  const [showOptional, setShowOptional] = useState(false);

  const handleChange = (e) => {
    handleInputChange(e, wineData, onChange, wineTypeOptions);
  };

  return (
    <form
      className="p-4 bg-white rounded-lg shadow-md w-full max-w-2xl mx-auto"
      onSubmit={(e) => e.preventDefault()}>
      <h2 className="text-2xl font-bold text-burgundy mb-6 text-center">
        Wine Entry Form
      </h2>

      <FormRow label="Color *">
        <select
          name="color"
          className="w-full p-2 border border-gray-300 rounded"
          value={wineData.color || ""}
          onChange={handleChange}>
          <option value="">Select color</option>
          {wineColors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </FormRow>

      <FormRow label="Wine Type *">
        <select
          name="type"
          className="w-full p-2 border border-gray-300 rounded"
          value={wineData.type || ""}
          onChange={handleChange}
          disabled={!wineData.color}>
          <option value="">Select wine type</option>
          {getSortedTypesWithOtherLast(
            wineTypeOptions[wineData.color] || []
          ).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </FormRow>

      {wineData.type === "Other" && (
        <FormRow label="Enter Wine Type">
          <input
            type="text"
            name="customType"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Custom wine type"
            value={wineData.customType || ""}
            onChange={handleChange}
          />
        </FormRow>
      )}

      <FormRow label="Wine Brand Name *">
        <input
          type="text"
          name="name"
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="e.g. Robert Mondavi Reserve"
          value={wineData.name || ""}
          onChange={handleChange}
        />
      </FormRow>

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
          <FormRow label="Year">
            <select
              name="year"
              className="w-full p-2 border border-gray-300 rounded"
              value={wineData.year || ""}
              onChange={handleChange}>
              <option value="">Select year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </FormRow>

          <FormRow label="Price ($)">
            <input
              type="text"
              name="price"
              placeholder="e.g. 14.99"
              className="w-full p-2 border border-gray-300 rounded"
              value={wineData.price || ""}
              onChange={(e) => handlePriceChange(e, wineData, onChange)}
            />
          </FormRow>

          <FormRow label="Location Purchased">
            <select
              name="location"
              className="w-full p-2 border border-gray-300 rounded"
              value={wineData.location || ""}
              onChange={handleChange}>
              <option value="">Select</option>
              <option value="Grocery Store">Grocery Store</option>
              <option value="Winery">Winery</option>
              <option value="Beverage Store">Beverage Store</option>
              <option value="Other">Other</option>
            </select>
          </FormRow>

          {wineData.location && (
            <FormRow label="Location Name">
              <input
                type="text"
                name="locationName"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="e.g. Trader Joe's, Silver Oak Winery"
                value={wineData.locationName || ""}
                onChange={handleChange}
              />
            </FormRow>
          )}

          <FormRow label="Sweetness">
            <select
              name="sweetness"
              className="w-full p-2 border border-gray-300 rounded"
              value={wineData.sweetness || ""}
              onChange={handleChange}>
              <option value="">Select</option>
              <option value="Dry">Dry</option>
              <option value="Semi-dry">Semi-dry</option>
              <option value="Semi-sweet">Semi-sweet</option>
              <option value="Sweet">Sweet</option>
            </select>
          </FormRow>

          <FormRow label="Grape Origin">
            <input
              type="text"
              name="origin"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="e.g. Napa Valley, France"
              value={wineData.origin || ""}
              onChange={handleChange}
            />
          </FormRow>

          <FormRow label="Wine Label Photo">
            <PhotoUpload
              label="Upload Wine Photo"
              file={wineData.photo}
              onChange={(file) => handlePhotoChange(file, wineData, onChange)}
            />
          </FormRow>
        </div>
      )}

      {onAdd && (
        <div className="text-center mt-6">
          <AddToInventoryButton onClick={onAdd} />
        </div>
      )}
    </form>
  );
}
