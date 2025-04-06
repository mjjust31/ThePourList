import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavSpacer from "../../../components/shared/layout/NavSpacer";

export default function ToTasteDashboard() {
  // Test data for development
  const [wines, setWines] = useState([
    { name: "Prosecco Extra Dry", type: "Sparkling", color: "White" },
    { name: "Sonoma Chardonnay", type: "White", color: "White" },
    { name: "Provence Rosé", type: "Rosé", color: "Pink" },
    { name: "Napa Cabernet Sauvignon", type: "Red", color: "Red" },
    { name: "Moscato d'Asti", type: "Dessert", color: "White" },
  ]);

  const [selectedWines, setSelectedWines] = useState([]);

  const handleAddToTasting = (wine) => {
    setSelectedWines((prevSelected) => {
      if (!prevSelected.includes(wine)) {
        return [...prevSelected, wine];
      }
      return prevSelected;
    });
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <NavSpacer />
      <h1 className="text-2xl font-bold text-center mb-6 text-burgundy">
        Wines To Taste
      </h1>

      {wines.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>No wines to taste yet.</p>
          <Link to="/inventory">
            <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 shadow">
              + Add a New Wine
            </button>
          </Link>
        </div>
      ) : (
        <>
          <ul className="space-y-3">
            {wines.map((wine, index) => (
              <li
                key={index}
                className="border rounded p-3 shadow-sm flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{wine.name}</p>
                  <p className="text-sm text-gray-500">
                    {wine.type} ({wine.color})
                  </p>
                </div>
                <button
                  className={`text-sm underline ${
                    selectedWines.includes(wine)
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-pink-600 hover:text-pink-800"
                  }`}
                  onClick={() => handleAddToTasting(wine)}
                  disabled={selectedWines.includes(wine)}
                >
                  {selectedWines.includes(wine) ? "Added" : "Add to Tasting"}
                </button>
              </li>
            ))}
          </ul>

          {selectedWines.length > 0 && (
            <div className="mt-6 text-center">
              <Link to="/rank-tasting">
                <button className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 shadow">
                  Start Ranking ({selectedWines.length})
                </button>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
