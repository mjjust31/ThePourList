import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDrink } from "../../contexts/DrinkContext";
import DrinkSwitcher from "../../components/user/buttons/DrinkSwitcher";

export default function Home() {
  const { changeDrink } = useDrink();
  const [hasSelectedDrink, setHasSelectedDrink] = useState(false);
  const [bottleCount, setBottleCount] = useState(1);
  const navigate = useNavigate();

  const handleDrinkSelection = (type) => {
    changeDrink(type);
    setHasSelectedDrink(true);
  };

  const handleBottleCountSelection = () => {
    if (bottleCount === 1) {
      navigate("/tasting");
    } else {
      navigate("/showdown", { state: { wineCount: bottleCount } });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-ivy-green to-burgundy text-white p-6">
      <h1 className="text-4xl font-semibold mb-4 text-center">
        Welcome to The Pour List 🍷
      </h1>
      <p className="text-xl mb-8 text-center">Begin your tasting journey</p>

      {!hasSelectedDrink ? (
        <DrinkSwitcher onDrinkSelect={handleDrinkSelection} />
      ) : (
        <div className="flex flex-col items-center justify-center bg-cream p-6 rounded-lg shadow-lg text-burgundy w-full max-w-md text-center">
          <p className="text-xl font-semibold mb-6">
            How many bottles are you trying today?
          </p>

          <div className="flex flex-col items-center mb-6">
            <button
              onClick={() => setBottleCount((prev) => Math.min(prev + 1, 50))}
              className="text-2xl font-bold hover:text-burgundy/80">
              ▲
            </button>
            <span className="text-2xl font-semibold my-2">{bottleCount}</span>
            <button
              onClick={() => setBottleCount((prev) => Math.max(prev - 1, 1))}
              className="text-2xl font-bold hover:text-burgundy/80">
              ▼
            </button>
          </div>

          <button
            onClick={handleBottleCountSelection}
            className="mt-2 px-8 py-3 bg-burgundy text-white rounded-lg hover:bg-burgundy/80 transition-all">
            Start Tasting
          </button>
        </div>
      )}
    </div>
  );
}
