import React, { useState, useEffect } from "react";
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

const FormRow = ({ label, children }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
    <label className="w-full sm:w-1/3 text-burgundy font-semibold">
      {label}
    </label>
    <div className="w-full sm:w-2/3">{children}</div>
  </div>
);

export default function WineEntryForm({
  wineData = {},
  onChange = () => {},
  onClose = () => {},
  onAdd,
  inventory = [],
}) {
  const [wineDataState, setWineDataState] = useState({
    color: "",
    type: "",
    customType: "",
    name: "",
    year: "",
    price: "",
    location: "",
    locationName: "",
    sweetness: "",
    origin: "",
    photo: null,
  });

  const [showOptional, setShowOptional] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (Object.keys(wineData).length > 0) {
      setWineDataState((prev) => ({ ...prev, ...wineData }));
    }
  }, [wineData]);

  const handleChange = (e) => {
    const updated = { ...wineDataState };
    handleInputChange(e, updated, setWineDataState, wineTypeOptions);

    if (e.target.name === "name") {
      const value = e.target.value.toLowerCase();
      if (value.length >= 2) {
        const matches = inventory.filter((wine) =>
          wine.name.toLowerCase().includes(value)
        );
        setSuggestions(matches);
      } else {
        setSuggestions([]);
      }
    }
  };

  const handleSuggestionClick = (wine) => {
    setWineDataState({ ...wine, tasted: false });
    setSuggestions([]);
  };

  const isValid = wineDataState.color && wineDataState.type && wineDataState.name;
  const isIncomplete = !isValid;

  return (
    <div className="max-h-[90vh] overflow-y-auto px-2 sm:px-4 relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-4 text-xl text-gray-600 hover:text-black"
      >
        ×
      </button>
      <form
        className="p-4 sm:p-6 bg-white rounded-lg shadow-md w-full max-w-[95vw] sm:max-w-2xl mx-auto"
        onSubmit={(e) => e.preventDefault()}
      >
        <h2 className="text-2xl font-bold text-burgundy mb-6 text-center">
          Wine Entry Form
        </h2>

        <FormRow label="Color *">
          <select
            name="color"
            className="w-full p-2 border border-gray-300 rounded"
            value={wineDataState.color || ""}
            onChange={handleChange}
          >
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
            value={wineDataState.type || ""}
            onChange={handleChange}
            disabled={!wineDataState.color}
          >
            <option value="">Select wine type</option>
            {getSortedTypesWithOtherLast(
              wineTypeOptions[wineDataState.color] || []
            ).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </FormRow>

        {wineDataState.type === "Other" && (
          <FormRow label="Enter Wine Type">
            <input
              type="text"
              name="customType"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Custom wine type"
              value={wineDataState.customType || ""}
              onChange={handleChange}
            />
          </FormRow>
        )}

        <FormRow label="Wine Brand Name *">
          <div className="relative">
            <input
              type="text"
              name="name"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="e.g. Robert Mondavi Reserve"
              value={wineDataState.name || ""}
              onChange={handleChange}
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow mt-1 max-h-48 overflow-y-auto">
                {suggestions.map((wine) => (
                  <li
                    key={wine.id || `${wine.name}-${wine.year}`}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSuggestionClick(wine)}
                  >
                    {wine.name} ({wine.year || "Unknown Year"}) – {wine.type}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </FormRow>

        {isIncomplete && (
          <p className="text-center text-red-600 text-sm mb-4">
            Please fill out all required fields: Color, Wine Type, and Wine Brand Name.
          </p>
        )}

        <div className="text-center mb-4">
          <button
            type="button"
            onClick={() => setShowOptional(!showOptional)}
            className="text-burgundy underline font-medium"
          >
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
                value={wineDataState.year || ""}
                onChange={handleChange}
              >
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
                value={wineDataState.price || ""}
                onChange={(e) =>
                  handlePriceChange(e, wineDataState, setWineDataState)
                }
              />
            </FormRow>

            <FormRow label="Location Purchased">
              <select
                name="location"
                className="w-full p-2 border border-gray-300 rounded"
                value={wineDataState.location || ""}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Grocery Store">Grocery Store</option>
                <option value="Winery">Winery</option>
                <option value="Beverage Store">Beverage Store</option>
                <option value="Other">Other</option>
              </select>
            </FormRow>

            {wineDataState.location && (
              <FormRow label="Location Name">
                <input
                  type="text"
                  name="locationName"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="e.g. Trader Joe's, Silver Oak Winery"
                  value={wineDataState.locationName || ""}
                  onChange={handleChange}
                />
              </FormRow>
            )}

            <FormRow label="Sweetness">
              <select
                name="sweetness"
                className="w-full p-2 border border-gray-300 rounded"
                value={wineDataState.sweetness || ""}
                onChange={handleChange}
              >
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
                value={wineDataState.origin || ""}
                onChange={handleChange}
              />
            </FormRow>

            <FormRow label="Wine Label Photo">
              <PhotoUpload
                label="Upload Wine Photo"
                file={wineDataState.photo}
                onChange={(file) =>
                  handlePhotoChange(file, wineDataState, setWineDataState)
                }
              />
            </FormRow>
          </div>
        )}

        {isValid && (
          <div className="text-center mt-6">
            <AddToInventoryButton
              onClick={onAdd || (() => alert("No handler provided for adding wine."))}
            />
          </div>
        )}
      </form>
    </div>
  );
}
