import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavSpacer from "../../../components/shared/layout/NavSpacer";
import WineData from './WineInventoryData';

export default function ToTasteDashboard() {
  const [selectedWines, setSelectedWines] = useState([]);
  const [openWineId, setOpenWineId] = useState(null);
  const [filterColor, setFilterColor] = useState("");

  const handleToggleTasting = (wine) => {
    setSelectedWines((prevSelected) => {
      if (prevSelected.find((w) => w.id === wine.id)) {
        return prevSelected.filter((w) => w.id !== wine.id);
      } else {
        return [...prevSelected, wine];
      }
    });
  };

  const isSelected = (wineId) => selectedWines.some((w) => w.id === wineId);

  const toggleAccordion = (wineId) => {
    setOpenWineId(openWineId === wineId ? null : wineId);
  };

  const colorOrder = ["Sparkling", "White", "Rosé", "Red", "Dessert"];

  const filteredWines = filterColor
    ? WineData.filter((wine) => wine.color === filterColor)
    : WineData;

  const sortedWines = filteredWines.slice().sort((a, b) => {
    const colorSort = colorOrder.indexOf(a.color) - colorOrder.indexOf(b.color);
    if (colorSort !== 0) return colorSort;
    return new Date(b.dateAdded) - new Date(a.dateAdded);
  });

  return (
    <div className="p-4 max-w-2xl mx-auto">
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

      <div className="mb-4">
        <select
          className="p-2 border rounded"
          value={filterColor}
          onChange={(e) => setFilterColor(e.target.value)}
        >
          <option value="">All Colors</option>
          {colorOrder.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>

      <ul className="space-y-3">
        {sortedWines.map((wine) => (
          <li key={wine.id} className="border rounded shadow-sm">
            <div className="flex justify-between items-center p-3">
              <button
                className="text-left flex-1"
                onClick={() => toggleAccordion(wine.id)}
              >
                <p className="font-semibold">{wine.name}</p>
                <p className="text-sm text-gray-500">
                  {wine.type} ({wine.color})
                </p>
              </button>
              <button
                className="ml-2 text-pink-600 hover:underline"
                onClick={() => handleToggleTasting(wine)}
              >
                {isSelected(wine.id) ? "Remove" : "Add to Tasting"}
              </button>
            </div>

            {openWineId === wine.id && (
              <div className="p-3 border-t text-sm bg-gray-50">
                <img
                  src={wine.labelPhoto || "https://via.placeholder.com/100"}
                  alt="wine label"
                  className="mb-2 w-24 h-24 object-cover"
                />
                <p><strong>Brand:</strong> {wine.brand}</p>
                <p><strong>Origin:</strong> {wine.grapeOrigin}</p>
                <p><strong>Sweetness:</strong> {wine.sweetness}</p>
                <p><strong>Purchased at:</strong> {wine.locationPurchased}</p>
                <p><strong>Price:</strong> ${wine.price}</p>
                <p><strong>Year:</strong> {wine.year}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}