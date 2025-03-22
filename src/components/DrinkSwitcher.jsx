import React from "react";
import { useDrink } from "../contexts/DrinkContext"; // Import the context

export default function DrinkSwitcher() {
  const { changeDrink } = useDrink(); // Access the changeDrink function from context

  return (
    <div className="drink-switcher">
      <p>Select what you are sampling today?</p>
      <div className="drink-buttons">
        <button onClick={() => changeDrink("wine")}>🍷 Wine</button>
        <button onClick={() => changeDrink("beer")}>🍺 Beer</button>
        <button onClick={() => changeDrink("cocktail")}>🍸 Cocktail</button>
      </div>
    </div>
  );
}
