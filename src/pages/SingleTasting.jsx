import React, { useState } from "react";
import WineDetails from "../components/WineDetails";
import RatingStars from "../components/RatingStars";
import ReviewForm from "../components/ReviewForm";

// Mock wine data
const mockWine = {
  name: "Cabernet Sauvignon",
  year: 2019,
  type: "Red",
  notes: "Dark cherry, plum, hints of oak.",
  image: "/wine-placeholder.png", // You can use any placeholder or skip for now
};

export default function SingleTasting() {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleRating = (newRating) => {
    setRating(newRating);
  };

  const handleReview = (newReview) => {
    setReview(newReview);
  };

  return (
    <div className="single-wine-tasting flex flex-col items-center bg-gray-50 min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-center text-burgundy mb-6">Single Wine Tasting</h2>

        {/* Wine Details */}
        <WineDetails wine={mockWine} />

        {/* Rating */}
        <div className="my-6">
          <h3 className="text-xl font-semibold text-center mb-3">Rate this Wine</h3>
          <RatingStars rating={rating} onRatingChange={handleRating} />
        </div>

        {/* Review Form */}
        <div className="my-6">
          <h3 className="text-xl font-semibold text-center mb-3">Leave a Review</h3>
          <ReviewForm review={review} onReviewChange={handleReview} />
        </div>
      </div>
    </div>
  );
}
