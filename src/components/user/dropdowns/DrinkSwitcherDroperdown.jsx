// /components/user/buttons/DrinkSwitcherDropdown.jsx
import React from "react";
import { useDrink } from "../../../contexts/DrinkContext";

export default function DrinkSwitcherDropdown({ onDrinkSelect }) {
  const { changeDrink } = useDrink();

  const handleChange = (e) => {
    const selectedDrink = e.target.value;
    changeDrink(selectedDrink);
    if (onDrinkSelect) {
      onDrinkSelect(selectedDrink);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto text-left">
      <select
        id="drink-select"
        onChange={handleChange}
        className="w-full p-3 rounded-lg bg-gray-100 text-gray-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-burgundy">
        <option value="wine">🍷 Wine</option>
        <option value="beer">🍺 Beer</option>
        <option value="cocktail">🍸 Cocktail</option>
      </select>
    </div>
  );
}
