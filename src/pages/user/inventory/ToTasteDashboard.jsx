import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavSpacer from "../../../components/shared/layout/NavSpacer";
import WineData from "./WineInventoryData";
import {
  getWineColorClass,
  filterPriceRange,
  generateYearOptions,
} from "./wineStyleHelpers";

export default function ToTasteDashboard() {
  const [selectedWines, setSelectedWines] = useState([]);
  const [openWineId, setOpenWineId] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    color: "",
    type: "",
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

  const toggleAccordion = (wineId) => {
    setOpenWineId(openWineId === wineId ? null : wineId);
  };

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
      (filters.type ? wine.type === filters.type : true) &&
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
    const colorA = colorOrder.indexOf(a.color) !== -1 ? colorOrder.indexOf(a.color) : colorOrder.length;
    const colorB = colorOrder.indexOf(b.color) !== -1 ? colorOrder.indexOf(b.color) : colorOrder.length;

    if (colorA !== colorB) {
      return colorA - colorB;
    }

    return new Date(b.dateAdded) - new Date(a.dateAdded);
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
          <select
            name="color"
            className="p-2 border rounded"
            value={filters.color}
            onChange={handleFilterChange}
          >
            <option value="">All Colors</option>
            {["Red", "White", "Rosé", "Sparkling", "Dessert", "Other"].map(
              (color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              )
            )}
          </select>

          {["type", "grapeOrigin"].map((filterKey) => (
            <select
              key={filterKey}
              name={filterKey}
              className="p-2 border rounded"
              value={filters[filterKey]}
              onChange={handleFilterChange}
            >
              <option value="">{`All ${filterKey}`}</option>
              {getUniqueOptions(filterKey).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
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
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>

          <select
            name="locationPurchased"
            className="p-2 border rounded"
            value={filters.locationPurchased}
            onChange={handleFilterChange}
          >
            <option value="">All Purchase Locations</option>
            {["Beverage Store", "Winery", "Grocery Store", "Other"].map(
              (location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              )
            )}
          </select>

          <select
            name="price"
            className="p-2 border rounded"
            value={filters.price}
            onChange={handleFilterChange}
          >
            <option value="">All Prices</option>
            <option value="under-10">Less than $10</option>
            <option value="10-20">$10 - $20</option>
            <option value="21-30">$21 - $30</option>
            <option value="31-40">$31 - $40</option>
            <option value="41-50">$41 - $50</option>
            <option value="over-50">Above $50</option>
          </select>

          <select
            name="year"
            className="p-2 border rounded"
            value={filters.year}
            onChange={handleFilterChange}
          >
            <option value="">All Years</option>
            {yearOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {sortedWines.length === 0 ? (
        <p className="text-center">No wines available for selected filters.</p>
      ) : (
        <ul className="space-y-3">
          {sortedWines.map((wine) => (
            <li
              key={wine.id}
              className={`border rounded shadow-sm ${getWineColorClass(wine.color)} text-black text-center`}
            >
              <div className="flex justify-between items-center p-3">
                <button
                  className="text-left flex-1 text-black"
                  onClick={() => toggleAccordion(wine.id)}
                >
                  <p className="font-semibold">{wine.name}</p>
                  <p className="text-sm">{wine.type} ({wine.color})</p>
                </button>
                <button
                  className="ml-2 px-3 py-1 rounded bg-white text-black text-sm font-bold shadow border"
                  onClick={() => handleToggleTasting(wine)}
                >
                  {isSelected(wine.id) ? "✓ Remove" : "+ Add"}
                </button>
              </div>

              {openWineId === wine.id && (
                <div className="p-3 border-t text-sm bg-white text-black">
                  <img
                    src={wine.labelPhoto || "https://via.placeholder.com/100"}
                    alt="wine label"
                    className="mb-2 w-24 h-24 object-cover mx-auto"
                  />
                  <p><strong>Brand:</strong> {wine.brand}</p>
                  <p><strong>Origin:</strong> {wine.grapeOrigin}</p>
                  <p><strong>Sweetness:</strong> {wine.sweetness}</p>
                  <p>
                    <strong>Purchased at:</strong> {wine.locationName} (
                    {wine.locationPurchased})
                  </p>
                  <p><strong>Price:</strong> ${wine.price}</p>
                  <p><strong>Year:</strong> {wine.year}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
