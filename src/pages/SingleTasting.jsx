import React from "react";
import { useDrink } from "../contexts/DrinkContext";
import Layout from "../components/Layout";
import NavSpacer from "../components/navigation/NavSpacer";

// Import form components
import WineTastingForm from "../components/tasting/forms/single/WineTastingForm";
import BeerTastingForm from "../components/tasting/forms/single/BeerTastingForm";
import CocktailTastingForm from "../components/tasting/forms/single/CocktailTastingForm";

export default function SingleTasting() {
  const { drinkType } = useDrink(); // 'wine', 'beer', 'cocktail'

  return (
    <Layout>
      <NavSpacer />
      {drinkType === "wine" && <WineTastingForm />}
      {drinkType === "beer" && <BeerTastingForm />}
      {drinkType === "cocktail" && <CocktailTastingForm />}
      {!drinkType && (
        <div className="text-center mt-12 text-burgundy text-xl font-medium">
          Please select a drink type from the home screen.
        </div>
      )}
    </Layout>
  );
}
