import React, { useState } from "react";

export default function GuideUser({ drinkType = "wine", onComplete, defaultBottleCount = 1 }) {
  const [numBottles, setNumBottles] = useState(defaultBottleCount);

  const handleSubmit = () => {
    if (onComplete) {
      onComplete(numBottles);
    }
  };

  return (
    <div className="guide-user p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg text-black">
      <p className="text-lg font-semibold mb-4">
        How many different bottles of {drinkType} will you be trying today?
      </p>
      <input
        type="number"
        value={numBottles}
        min="1"
        max="99"
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
