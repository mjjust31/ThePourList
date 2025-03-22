import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import DrinkSwitcher from "../components/DrinkSwitcher"; // Importing DrinkSelector

export default function Home() {
  const [drinkType, setDrinkType] = useState(null); // State for the selected drink
  const [bottleCount, setBottleCount] = useState(null); // State for the number of bottles
  const navigate = useNavigate();

  // When the user selects a drink type, show the bottle count question
  const handleDrinkSelection = (type) => {
    setDrinkType(type); // Set the selected drink type
  };

  // When the user selects the number of bottles, navigate to the respective page
  const handleBottleCountSelection = (count) => {
    setBottleCount(count); // Set the bottle count
    if (count === 1) {
      navigate("/single-tasting"); // Navigate to single wine tasting page
    } else {
      navigate("/wine-showdown"); // Navigate to wine showdown page
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-800 text-white">
      <h1 className="text-4xl font-semibold mb-6 text-yellow-300">Welcome to RankMyPour 🍷</h1>
      <p className="text-xl mb-8 text-green-400">Begin your tasting journey</p>

      {!drinkType ? (
        // Display drink selection buttons
        <DrinkSwitcher onDrinkSelect={handleDrinkSelection} />
      ) : (
        // After selecting drink type, ask how many bottles they're trying
        <div className="bottle-count p-6 bg-white rounded-lg shadow-lg w-full max-w-sm">
          <p className="text-xl text-blue-600 mb-4">How many bottles are you trying today?</p>
          <div className="flex space-x-4">
            <button
              onClick={() => handleBottleCountSelection(1)}
              className="bg-red-600 text-white px-6 py-2 rounded-lg transition duration-300 hover:bg-red-700"
            >
              1 Bottle
            </button>
            <button
              onClick={() => handleBottleCountSelection(2)}
              className="bg-yellow-600 text-white px-6 py-2 rounded-lg transition duration-300 hover:bg-yellow-700"
            >
              2 Bottles
            </button>
            <button
              onClick={() => handleBottleCountSelection(3)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-300 hover:bg-blue-700"
            >
              3 Bottles
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
