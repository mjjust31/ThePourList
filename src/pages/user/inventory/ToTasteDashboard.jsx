import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavSpacer from "../../../components/shared/layout/NavSpacer";
import WineData from "./WineInventoryData";
import {
  getWineColorClass,
  filterPriceRange,
  generateYearOptions,
} from "./wineStyleHelpers";
import WineEntryForm from "../../../components/shared/forms/entry/WineEntryForm";

const colorTextStyles = {
  Red: "text-red-700",
  White: "text-yellow-600",
  Rosé: "text-pink-600",
  Sparkling: "text-blue-600",
  Dessert: "text-purple-600",
  Other: "text-gray-600",
};

const borderColorStyles = {
  Red: "border-red-200",
  White: "border-yellow-200",
  Rosé: "border-pink-200",
  Sparkling: "border-blue-200",
  Dessert: "border-purple-200",
  Other: "border-gray-200",
};

const bgTintStyles = {
  Red: "bg-red-50",
  White: "bg-yellow-50",
  Rosé: "bg-pink-50",
  Sparkling: "bg-blue-50",
  Dessert: "bg-purple-50",
  Other: "bg-gray-50",
};

export default function ToTasteDashboard() {
  const [selectedWines, setSelectedWines] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    color: "",
    wineType: "",
    grapeOrigin: "",
    sweetness: "",
    locationPurchased: "",
    price: "",
    year: "",
  });

  const handleToggleTasting = (wine) => {
    setSelectedWines((prevSelected) =>
      prevSelected.find((w) => w.id === wine.id)
        ? prevSelected.filter((w) => w.id !== wine.id)
        : [...prevSelected, wine]
    );
  };

  const isSelected = (wineId) =>
    selectedWines.some((w) => w.id === wineId);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const getUniqueOptions = (key) => [
    ...new Set(WineData.map((wine) => wine[key]).filter(Boolean)),
  ];

  const yearOptions = generateYearOptions();

  const filteredWines = WineData.filter((wine) => {
    return (
      (filters.color ? wine.color === filters.color : true) &&
      (filters.wineType ? wine.wineType === filters.wineType : true) &&
      (filters.grapeOrigin ? wine.grapeOrigin === filters.grapeOrigin : true) &&
      (filters.sweetness ? wine.sweetness === filters.sweetness : true) &&
      (filters.locationPurchased
        ? wine.locationPurchased === filters.locationPurchased
        : true) &&
      (filters.price ? filterPriceRange(wine.price, filters.price) : true) &&
      (filters.year ? wine.year.toString() === filters.year : true)
    );
  });

  const colorOrder = ["Red", "White", "Rosé", "Sparkling", "Dessert", "Other"];

  const sortedWines = [...filteredWines].sort((a, b) => {
    const colorA = colorOrder.indexOf(a.color);
    const colorB = colorOrder.indexOf(b.color);
    if (colorA !== colorB) return colorA - colorB;
    return a.wineType.localeCompare(b.wineType);
  });

  const groupedByColor = colorOrder.reduce((acc, color) => {
    acc[color] = sortedWines.filter((wine) => wine.color === color);
    return acc;
  }, {});

  return (
    <div className="p-4 max-w-2xl mx-auto bg-white text-black">
      <NavSpacer />
      <h1 className="text-2xl font-bold text-center mb-6 text-burgundy">
        Wines To Taste
      </h1>

      {selectedWines.length > 0 && (
        <div className="mb-4 text-center">
          <Link
            to={
              selectedWines.length === 1
                ? "/single-tasting"
                : "/showdown-tasting"
            }
          >
            <button className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 shadow">
              {selectedWines.length === 1
                ? "Start Tasting (1)"
                : `Start Showdown Tasting (${selectedWines.length})`}
            </button>
          </Link>
        </div>
      )}

      <div className="flex justify-center gap-4 mb-4 flex-wrap">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 text-sm bg-gray-200 text-black rounded shadow hover:bg-gray-300"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>

        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 text-sm bg-green-600 text-white rounded shadow hover:bg-green-700"
        >
          + Add New Wine
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 max-w-lg w-full">
            <WineEntryForm onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}

      {showFilters && (
        <div className="grid grid-cols-2 gap-4 mb-4 text-black">
          <select
            name="color"
            className="p-2 border rounded"
            value={filters.color}
            onChange={handleFilterChange}
          >
            <option value="">All Colors</option>
            {colorOrder.map((color) => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>

          {["wineType", "grapeOrigin"].map((key) => (
            <select
              key={key}
              name={key}
              className="p-2 border rounded"
              value={filters[key]}
              onChange={handleFilterChange}
            >
              <option value="">All {key}</option>
              {getUniqueOptions(key).map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          ))}

          <select
            name="sweetness"
            className="p-2 border rounded"
            value={filters.sweetness}
            onChange={handleFilterChange}
          >
            <option value="">All Sweetness Levels</option>
            {["Dry", "Semi-Dry", "Semi-Sweet", "Sweet"].map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>

          <select
            name="locationPurchased"
            className="p-2 border rounded"
            value={filters.locationPurchased}
            onChange={handleFilterChange}
          >
            <option value="">All Locations</option>
            {["Beverage Store", "Winery", "Grocery Store", "Other"].map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>

          <select
            name="price"
            className="p-2 border rounded"
            value={filters.price}
            onChange={handleFilterChange}
          >
            <option value="">All Prices</option>
            <option value="under-10">Under $10</option>
            <option value="10-20">$10–20</option>
            <option value="21-30">$21–30</option>
            <option value="31-40">$31–40</option>
            <option value="41-50">$41–50</option>
            <option value="over-50">Over $50</option>
          </select>

          <select
            name="year"
            className="p-2 border rounded"
            value={filters.year}
            onChange={handleFilterChange}
          >
            <option value="">All Years</option>
            {yearOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      )}

      {sortedWines.length === 0 ? (
        <p className="text-center text-gray-600">No wines available for selected filters.</p>
      ) : (
        <div className="overflow-y-auto max-h-[60vh] mt-4 px-1">
          {colorOrder.map((color) => {
            const wines = groupedByColor[color];
            if (!wines || wines.length === 0) return null;

            const groupedByType = wines.reduce((acc, wine) => {
              acc[wine.wineType] = acc[wine.wineType] || [];
              acc[wine.wineType].push(wine);
              return acc;
            }, {});

            return (
              <div key={color} className="mb-6">
                <h2 className={`text-lg font-semibold px-3 py-2 mb-2 ${colorTextStyles[color]}`}>{color} Wines</h2>
                {Object.entries(groupedByType).map(([type, wines]) => (
                  <details key={type} className={`mb-3 rounded border ${borderColorStyles[color]} ${bgTintStyles[color]}`}>
                    <summary className="px-4 py-2 cursor-pointer font-semibold flex justify-between items-center">
                      <span>{type}</span>
                      <span className="text-sm">QTY: {wines.length}</span>
                    </summary>
                    <div className="bg-white">
                      {wines.map((wine) => (
                        <details key={wine.id} className="border-t">
                          <summary className="p-2 cursor-pointer flex justify-between items-center">
                            <span>{wine.wineBrand} – {wine.locationPurchased} – ${wine.price}</span>
                            <div className="flex flex-col items-end">
                              <span className="text-xs italic text-gray-600">Click for more details</span>
                              <button
                                onClick={() => handleToggleTasting(wine)}
                                className="text-sm text-green-700 underline"
                              >
                                {isSelected(wine.id) ? "✓ Remove" : "+ Add to Tasting"}
                              </button>
                            </div>
                          </summary>
                          <div className="px-4 py-2 text-sm text-gray-700">
                            <img
                              src={wine.wineLabelPhoto || "https://via.placeholder.com/100"}
                              alt="wine label"
                              className="mb-2 w-24 h-24 object-cover rounded"
                            />
                            <p><strong>Grape Origin:</strong> {wine.grapeOrigin}</p>
                            <p><strong>Sweetness:</strong> {wine.sweetness}</p>
                            <p><strong>Year:</strong> {wine.year}</p>
                            <p><strong>Location Name:</strong> {wine.locationName}</p>
                          </div>
                        </details>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
