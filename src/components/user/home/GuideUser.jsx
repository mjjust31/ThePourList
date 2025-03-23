import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation

export default function GuideUser({ drinkType }) {
  const [numBottles, setNumBottles] = useState(1); // Default to 1 bottle
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = () => {
    if (numBottles === 1) {
      console.log(`User selected ${numBottles} bottle of ${drinkType}`);
      navigate("/single-tasting"); // Navigate to Single Wine page (example)
    } else {
      console.log(`User selected ${numBottles} bottles for ${drinkType}`);
      navigate("/wine-showdown"); // Navigate to Wine Showdown page (example)
    }
  };

  return (
    <div className="guide-user p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <p className="text-lg font-semibold mb-4">
        How many different bottles of {drinkType} will you be trying today?
      </p>
      <input
        type="number"
        value={numBottles}
        min="1"
        max="5"
        onChange={(e) => setNumBottles(Number(e.target.value))}
        className="border-2 border-gray-300 rounded-lg p-2 mb-4 w-full text-center"
      />
      <button
        onClick={handleSubmit}
        className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
      >
        Start Tasting
      </button>
    </div>
  );
}
