import React, { useState } from "react";
import Layout from "../components/Layout";
import NavSpacer from "../components/navigation/NavSpacer";
import WineEntryForm from "../components/tasting/forms/single/WineEntryForm";
import RatingStars from "../components/tasting/shared/RatingStars";
import ReviewForm from "../components/tasting/shared/ReviewForm";

export default function SingleTasting() {
  const [wineData, setWineData] = useState({
    color: "",
    type: "",
    name: "",
  });

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = () => {
    if (!wineData.name || !wineData.color || !wineData.type) {
      alert("Please fill in all required wine info.");
      return;
    }
    if (rating === 0) {
      alert("Please rate the wine before continuing.");
      return;
    }

    console.log("Wine Info:", wineData);
    console.log("Rating:", rating);
    console.log("Review:", review);

    alert("Tasting saved! (next step coming soon)");
  };

  return (
    <Layout>
      <NavSpacer />
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto mt-8">
        <h2 className="text-3xl font-bold text-center text-burgundy mb-6">
          Single Wine Tasting
        </h2>

        <WineEntryForm wineData={wineData} onChange={setWineData} />

        <div className="my-6 flex flex-col items-center">
          <h3 className="text-xl font-semibold text-center mb-3">Rate this Wine</h3>
          <RatingStars rating={rating} onRatingChange={setRating} />
        </div>

        <div className="my-6 flex flex-col items-center">
          <h3 className="text-xl font-semibold text-center mb-3">Leave a Review</h3>
          <div className="w-full max-w-md">
            <ReviewForm value={review} onChange={setReview} />
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            className="bg-burgundy text-white px-6 py-3 rounded-lg hover:bg-burgundy/80 transition-all"
          >
            Finish Tasting
          </button>
        </div>
      </div>
    </Layout>
  );
}
