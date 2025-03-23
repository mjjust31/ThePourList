import React, { useState } from "react";
import { useDrink } from "../contexts/DrinkContext";
import Layout from "../components/shared/layout/Layout";
import NavSpacer from "../components/shared/layout/NavSpacer";
import WineEntryForm from "../components/shared/forms/entry/WineEntryForm";
import BeerEntryForm from "../components/shared/forms/entry/BeerEntryForm";
import CocktailEntryForm from "../components/shared/forms/entry/CocktailEntryForm";

export default function SingleTasting() {
  const { drinkType } = useDrink();
  const [formData, setFormData] = useState({});

  const handleAdd = () => {
    // For now, we can just log the data — later you could navigate or show a confirmation
    console.log("Single wine entry submitted:", formData);
    alert("Wine entry saved! 🎉");
  };

  return (
    <Layout>
      <NavSpacer />
      {drinkType === "wine" && (
        <WineEntryForm
          wineData={formData}
          onChange={setFormData}
          onAdd={handleAdd}
          showAddButton={true}
        />
      )}
      {drinkType === "beer" && (
        <BeerEntryForm
          beerData={formData}
          onChange={setFormData}
          // Placeholder if you want a similar button for beer
        />
      )}
      {drinkType === "cocktail" && (
        <CocktailEntryForm
          cocktailData={formData}
          onChange={setFormData}
          // Placeholder if you want a similar button for cocktails
        />
      )}
      {!drinkType && (
        <div className="text-center mt-12 text-burgundy text-xl font-medium">
          Please select a drink type from the home screen.
        </div>
      )}
    </Layout>
  );
}
