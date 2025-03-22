import React, { useState } from "react";

export default function GuideUser({ drinkType }) {
  const [numBottles, setNumBottles] = useState(1); // Default to 1 bottle

  const handleSubmit = () => {
    if (numBottles === 1) {
      console.log(`User selected ${numBottles} bottle of ${drinkType}`);
      // Navigate to Single Wine page (for example)
    } else {
      console.log(`User selected ${numBottles} bottles for ${drinkType}`);
      // Navigate to Wine Showdown page (for example)
    }
  };

  return (
    <div className="guide-user">
      <p>How many different bottles of {drinkType} will you be trying today?</p>
      <input
        type="number"
        value={numBottles}
        min="1"
        max="5"
        onChange={(e) => setNumBottles(Number(e.target.value))}
      />
      <button onClick={handleSubmit}>Start Tasting</button>
    </div>
  );
}
