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
    <div className="home-page">
      <h1>Welcome to RankMyPour 🍷</h1>
      <p>Begin your tasting journey</p>
      {!drinkType ? (
        // Display drink selection buttons
        <DrinkSwitcher onDrinkSelect={handleDrinkSelection} />
      ) : (
        // After selecting drink type, ask how many bottles they're trying
        <div className="bottle-count">
          <p>How many bottles are you trying today?</p>
          <button onClick={() => handleBottleCountSelection(1)}>1 Bottle</button>
          <button onClick={() => handleBottleCountSelection(2)}>2 Bottles</button>
          <button onClick={() => handleBottleCountSelection(3)}>3 Bottles</button>
        </div>
      )}
    </div>
  );
}
