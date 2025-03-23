import React, { useState } from "react";
import { useDrink } from "../contexts/DrinkContext";
import Layout from "../components/layout/Layout";
import NavSpacer from "../components/layout/NavSpacer";

import WineEntryForm from "../components/forms/single/WineEntryForm";
import BeerEntryForm from "../components/forms/single/BeerEntryForm";
import CocktailEntryForm from "../components/forms/single/CocktailEntryForm";

export default function SingleTasting() {
  const { drinkType } = useDrink();
  const [formData, setFormData] = useState({}); // ✅ initialize with empty object

  return (
    <Layout>
      <NavSpacer />
      {drinkType === "wine" && (
        <WineEntryForm wineData={formData} onChange={setFormData} />
      )}
      {drinkType === "beer" && (
        <BeerEntryForm beerData={formData} onChange={setFormData} />
      )}
      {drinkType === "cocktail" && (
        <CocktailEntryForm cocktailData={formData} onChange={setFormData} />
      )}
      {!drinkType && (
        <div className="text-center mt-12 text-burgundy text-xl font-medium">
          Please select a drink type from the home screen.
        </div>
      )}
    </Layout>
  );
}
