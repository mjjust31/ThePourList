import WineDetails from "../components/WineDetails";
import RatingStars from "../components/RatingStars";
import ReviewForm from "../components/ReviewForm";
import React, { useState } from "react";

const mockWine = {
  name: "Cabernet Sauvignon",
  year: 2019,
  type: "Red",
  notes: "Dark cherry, plum, hints of oak.",
  image: "/wine-placeholder.png", // you can use any placeholder or skip for now
};


export default function SingleTasting() {
  return (
    <div className="single-wine-tasting">
      <h2>Single Wine Tasting</h2>
      {/* Render the single wine tasting form and functionality */}
    </div>
  );
}
