import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // NEW
import PhotoUpload from "../../photo/PhotoUpload";
import { getSortedTypesWithOtherLast } from "../../../../helpers/sortOthersLast";
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
    <label className="w-full sm:w-1/3 text-pink-700 font-semibold">
      {label}
    </label>
    <div className="w-full sm:w-2/3">{children}</div>
  </div>
);

export default function WineEntryForm({
  wineData = {},
  onChange = () => {},
  onClose = () => {},
  onAdd = () => {},
  inventory = [],
}) {
  const navigate = useNavigate(); // NEW

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
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

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

  const resetForm = () => {
    setWineDataState({
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
    setShowOptional(false);
    setSuggestions([]);
  };

  // Handle Save and Exit
  const handleSaveAndExit = () => {
    console.log("Wine added:", wineDataState);
    onAdd(wineDataState);
    resetForm();
    setShowConfirmModal(false);
    navigate("/inventory"); // REDIRECT!
  };

  // Handle Save and Add Another
  const handleSaveAndAddAnother = () => {
    console.log("Wine added:", wineDataState);
    onAdd(wineDataState);
    resetForm();
    setShowConfirmModal(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  // Handle Cancel / Go Back to Editing
  const handleCancelSave = () => {
    setShowConfirmModal(false);
  };

  return (
    <div className="min-h-screen max-h-[90vh] overflow-y-auto px-2 sm:px-4 relative bg-gray-50 pt-8">
      <button
        onClick={onClose}
        className="absolute top-2 right-4 text-xl text-gray-600 hover:text-black"
      >
        ×
      </button>

      {showToast && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-md z-50">
          🍷 Wine successfully added!
        </div>
      )}

      <form
        className="p-4 sm:p-6 bg-white rounded-lg shadow-md w-full max-w-[95vw] sm:max-w-2xl mx-auto"
        onSubmit={(e) => e.preventDefault()}
      >
        <h2 className="text-2xl font-bold text-pink-700 mb-6 text-center">
          Wine Entry Form
        </h2>

        {/* Required Fields */}
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

        {/* Optional Error Message */}
        {isIncomplete && (
          <p className="text-center text-red-600 text-sm mb-4">
            Please fill out all required fields: Color, Wine Type, and Wine Brand Name.
          </p>
        )}

        {/* Optional Fields Toggle */}
        <div className="text-center mb-4">
          <button
            type="button"
            onClick={() => setShowOptional(!showOptional)}
            className="text-pink-700 underline font-medium"
          >
            {showOptional
              ? "➖ Hide Optional Fields"
              : "➕ Add More Info (Optional)"}
          </button>
        </div>

        {/* Optional Fields Section */}
        {showOptional && (
          <div className="transition-all duration-300">
            {/* Year, Price, Location, Sweetness, Origin, Photo */}
            {/* ... same as before */}
          </div>
        )}

        {/* Save Button */}
        {isValid && (
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => setShowConfirmModal(true)}
              className="bg-pink-700 hover:bg-pink-800 text-white font-semibold py-3 px-8 rounded-full shadow-md transition duration-300"
            >
              Add to Inventory
            </button>
          </div>
        )}
      </form>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl">
            <h2 className="text-xl font-bold text-pink-700">Confirm Save</h2>
            <p className="text-sm text-gray-600">What would you like to do?</p>

            <div className="flex flex-col gap-4 pt-4">
              <button
                onClick={handleSaveAndExit}
                className="bg-pink-700 text-white py-3 rounded-full hover:bg-pink-800 transition"
              >
                Save and Exit
              </button>
              <button
                onClick={handleSaveAndAddAnother}
                className="bg-green-500 text-white py-3 rounded-full hover:bg-green-600 transition"
              >
                Save and Add Another
              </button>
              <button
                onClick={handleCancelSave}
                className="bg-gray-300 text-gray-700 py-3 rounded-full hover:bg-gray-400 transition"
              >
                Go Back to Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
