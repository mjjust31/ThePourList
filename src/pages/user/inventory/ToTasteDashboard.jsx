import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavSpacer from "../../../components/shared/layout/NavSpacer";
import WineData from "./WineInventoryData";
import {
  getWineColorClass,
  filterPriceRange,
  generateYearOptions,
} from "./wineStyleHelpers";

const colorStyles = {
  Red: "bg-red-200",
  White: "bg-yellow-100",
  Rosé: "bg-pink-200",
  Sparkling: "bg-blue-100",
  Dessert: "bg-purple-200",
  Other: "bg-gray-200",
};

export default function ToTasteDashboard() {
  const [selectedWines, setSelectedWines] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
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

      <div className="text-center mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 text-sm bg-gray-200 text-black rounded shadow hover:bg-gray-300"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {showFilters && (
        <div className="grid grid-cols-2 gap-4 mb-4 text-black">
          {/* Filters retained as-is */}
        </div>
      )}

      {sortedWines.length === 0 ? (
        <p className="text-center">No wines available for selected filters.</p>
      ) : (
        colorOrder.map((color) => {
          const winesByColor = sortedWines.filter((wine) => wine.color === color);
          if (winesByColor.length === 0) return null;

          const groupedByType = winesByColor.reduce((acc, wine) => {
            if (!acc[wine.wineType]) acc[wine.wineType] = [];
            acc[wine.wineType].push(wine);
            return acc;
          }, {});

          const wineTypes = Object.keys(groupedByType).sort();

          return (
            <div key={color} className="mb-6 p-4 rounded">
              <h2 className="text-xl font-bold text-center text-burgundy mb-2">{color} Wines</h2>
              {wineTypes.map((type) => (
                <details key={type} className="mb-3 border rounded-lg shadow overflow-hidden">
                  <summary className={`font-semibold px-4 py-2 flex justify-between items-center cursor-pointer transition-all bg-opacity-80 ${colorStyles[color] || "bg-gray-200"}`}>
                    <span>{type}</span>
                    <span className="text-sm">QTY: {groupedByType[type].length}</span>
                  </summary>
                  <div className="px-4 pb-2 bg-white">
                    {groupedByType[type].map((wine) => (
                      <details key={wine.id} className="mt-3 border-t pt-2">
                        <summary className="text-sm font-medium flex flex-col sm:flex-row sm:justify-between items-center text-center cursor-pointer hover:underline">
                          <span className="text-xs text-gray-500">Tap to view details</span>
                          <span>{wine.wineBrand} – {wine.locationPurchased} – ${wine.price}</span>
                          <button
                            onClick={() => handleToggleTasting(wine)}
                            className="mt-1 sm:mt-0 text-xs text-green-600 underline"
                          >
                            {isSelected(wine.id) ? "✓ Remove" : "+ Add to Tasting"}
                          </button>
                        </summary>
                        <div className="text-sm text-gray-600 mt-2 space-y-1 text-center">
                          <img
                            src={wine.wineLabelPhoto || "https://via.placeholder.com/100"}
                            alt="wine label"
                            className="mb-2 w-24 h-24 object-cover mx-auto rounded"
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
        })
      )}
    </div>
  );
}
