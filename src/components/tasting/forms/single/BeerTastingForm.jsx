import React, { useState } from "react";
import RatingStars from "../../shared/RatingStars";
import ReviewForm from "../../shared/ReviewForm";

const mockBeer = {
  name: "Hazy IPA",
  type: "IPA",
  abv: "6.5%",
  notes: "Tropical fruit aroma with a smooth bitter finish.",
};

export default function BeerTastingForm() {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please rate the beer before continuing.");
      return;
    }

    console.log("Beer:", mockBeer.name);
    console.log("Rating:", rating);
    console.log("Review:", review);

    alert("Tasting saved! (next step coming soon)");
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-burgundy mb-6">
        Single Beer Tasting
      </h2>

      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold">{mockBeer.name}</h3>
        <p className="text-gray-700">{mockBeer.type} • ABV: {mockBeer.abv}</p>
        <p className="mt-2 text-gray-600 italic">"{mockBeer.notes}"</p>
      </div>

      <div className="my-6 flex flex-col items-center">
        <h3 className="text-xl font-semibold text-center mb-3">Rate this Beer</h3>
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
  );
}
