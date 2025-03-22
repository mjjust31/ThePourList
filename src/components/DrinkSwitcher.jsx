import React from "react";
import { useDrink } from "../contexts/DrinkContext"; // Import the context

export default function DrinkSwitcher() {
  const { changeDrink } = useDrink(); // Access the changeDrink function from context

  return (
    <div className="drink-switcher flex flex-col items-center p-6 bg-gradient-to-r from-ivy-green to-burgundy rounded-lg shadow-lg w-full max-w-sm mx-auto">
      <p className="text-2xl font-semibold text-cream mb-6">Select what you are sampling today?</p>
      <div className="drink-buttons flex gap-6 justify-center">
        <button
          onClick={() => changeDrink("wine")}
          className="px-6 py-3 bg-burgundy text-cream rounded-lg shadow-xl hover:bg-burgundy/80 transition-colors duration-300"
        >
          🍷 Wine
        </button>
        <button
          onClick={() => changeDrink("beer")}
          className="px-6 py-3 bg-gold text-cream rounded-lg shadow-xl hover:bg-gold/80 transition-colors duration-300"
        >
          🍺 Beer
        </button>
        <button
          onClick={() => changeDrink("cocktail")}
          className="px-6 py-3 bg-ivy-green text-cream rounded-lg shadow-xl hover:bg-ivy-green/80 transition-colors duration-300"
        >
          🍸 Cocktail
        </button>
      </div>
    </div>
  );
}
