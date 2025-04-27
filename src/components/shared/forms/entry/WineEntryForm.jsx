import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-6">
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
  const navigate = useNavigate();

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

  const handleSaveAndExit = () => {
    onAdd(wineDataState);
    resetForm();
    setShowConfirmModal(false);
    navigate("/inventory");
  };

  const handleSaveAndAddAnother = () => {
    onAdd(wineDataState);
    resetForm();
    setShowConfirmModal(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleCancelSave = () => {
    setShowConfirmModal(false);
  };

  return (
    <div className="min-h-screen max-h-[90vh] overflow-y-auto px-2 sm:px-6 pt-10 bg-gray-50 relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-6 text-2xl text-gray-500 hover:text-black"
      >
        ×
      </button>

      {showToast && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg z-50">
          🍷 Wine successfully added!
        </div>
      )}

      <form
        className="bg-white rounded-3xl shadow-lg p-8 max-w-2xl mx-auto"
        onSubmit={(e) => e.preventDefault()}
      >
        <h2 className="text-3xl font-bold text-pink-700 mb-10 text-center">
          Wine Entry Form
        </h2>

        {/* Required Fields */}
        <FormRow label="Color *">
          <select
            name="color"
            className="w-full p-3 border border-gray-300 rounded-xl"
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
            className="w-full p-3 border border-gray-300 rounded-xl"
            value={wineDataState.type || ""}
            onChange={handleChange}
            disabled={!wineDataState.color}
          >
            <option value="">Select wine type</option>
            {getSortedTypesWithOtherLast(wineTypeOptions[wineDataState.color] || []).map((type) => (
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
              className="w-full p-3 border border-gray-300 rounded-xl"
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
              className="w-full p-3 border border-gray-300 rounded-xl"
              placeholder="e.g. Robert Mondavi Reserve"
              value={wineDataState.name || ""}
              onChange={handleChange}
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded shadow mt-1 max-h-48 overflow-y-auto">
                {suggestions.map((wine) => (
                  <li
                    key={wine.id || `${wine.name}-${wine.year}`}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSuggestionClick(wine)}
                  >
                    {wine.name} ({wine.year || "Unknown Year"}) – {wine.type}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </FormRow>

        {/* Optional Message */}
        {!isValid && (
          <p className="text-center text-red-600 text-sm mb-6">
            Please fill out all required fields.
          </p>
        )}

        {/* Optional Fields Section */}
        <div className="text-center mb-6">
          <button
            type="button"
            onClick={() => setShowOptional(!showOptional)}
            className="text-pink-700 underline font-medium"
          >
            {showOptional ? "➖ Hide Optional Fields" : "➕ Add More Info (Optional)"}
          </button>
        </div>

        {showOptional && (
          <div className="transition-all duration-300">
            <FormRow label="Year">
              <select
                name="year"
                className="w-full p-3 border border-gray-300 rounded-xl"
                value={wineDataState.year || ""}
                onChange={handleChange}
              >
                <option value="">Select year</option>
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </FormRow>

            <FormRow label="Price ($)">
              <input
                type="number"
                name="price"
                className="w-full p-3 border border-gray-300 rounded-xl"
                placeholder="e.g. 25"
                value={wineDataState.price || ""}
                onChange={handleChange}
              />
            </FormRow>

            <FormRow label="Location Purchased">
              <select
                name="location"
                className="w-full p-3 border border-gray-300 rounded-xl"
                value={wineDataState.location || ""}
                onChange={handleChange}
              >
                <option value="">Select store</option>
                <option value="Binny's">Binny's</option>
                <option value="Costco">Costco</option>
                <option value="Trader Joe's">Trader Joe's</option>
                <option value="Other">Other</option>
              </select>
            </FormRow>

            {wineDataState.location === "Other" && (
              <FormRow label="Specify Location">
                <input
                  type="text"
                  name="locationName"
                  className="w-full p-3 border border-gray-300 rounded-xl"
                  placeholder="Enter store name"
                  value={wineDataState.locationName || ""}
                  onChange={handleChange}
                />
              </FormRow>
            )}

            <FormRow label="Sweetness">
              <input
                type="text"
                name="sweetness"
                className="w-full p-3 border border-gray-300 rounded-xl"
                placeholder="Dry, Semi-Sweet, Sweet"
                value={wineDataState.sweetness || ""}
                onChange={handleChange}
              />
            </FormRow>

            <FormRow label="Origin">
              <input
                type="text"
                name="origin"
                className="w-full p-3 border border-gray-300 rounded-xl"
                placeholder="e.g. Napa Valley, California"
                value={wineDataState.origin || ""}
                onChange={handleChange}
              />
            </FormRow>

            <FormRow label="Wine Label Photo">
              <PhotoUpload
                photo={wineDataState.photo}
                onPhotoChange={(photo) => handlePhotoChange(photo, setWineDataState)}
              />
            </FormRow>
          </div>
        )}

        {/* Save Button */}
        {isValid && (
          <div className="text-center mt-8">
            <button
              type="button"
              onClick={() => setShowConfirmModal(true)}
              className="bg-pink-700 hover:bg-pink-800 text-white font-semibold py-4 px-10 rounded-full shadow-lg transition duration-300"
            >
              Add to Inventory
            </button>
          </div>
        )}
      </form>

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl">
            <h2 className="text-xl font-bold text-pink-700">Confirm Save</h2>
            <p className="text-sm text-gray-600">What would you like to do?</p>
            <div className="flex flex-col gap-4 pt-4">
              <button onClick={handleSaveAndExit} className="bg-pink-700 text-white py-3 rounded-full hover:bg-pink-800 transition">
                Save and Exit
              </button>
              <button onClick={handleSaveAndAddAnother} className="bg-green-500 text-white py-3 rounded-full hover:bg-green-600 transition">
                Save and Add Another
              </button>
              <button onClick={handleCancelSave} className="bg-gray-300 text-gray-700 py-3 rounded-full hover:bg-gray-400 transition">
                Go Back to Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
