import React, { useState } from "react";
import RatingStars from "../../../shared/forms/reviews/details/RatingStars";
import TastingTags from "../../../shared/forms/reviews/details/TastingTags";
import WouldBuyAgainToggle from "../../../shared/forms/reviews/details/WouldBuyToggle";

export default function WineReview({ drink }) {
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [wouldBuyAgain, setWouldBuyAgain] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const reviewData = {
      drinkId: drink.id,
      name: drink.name,
      rating,
      notes,
      selectedTags,
      wouldBuyAgain,
    };

    console.log("Review Submitted:", reviewData);
    setSubmitted(true);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md">
      {submitted ? (
        <div className="text-center text-burgundy">
          <h2 className="text-2xl font-bold mb-4">Thanks for your review! 🍷</h2>
          <p className="italic">Your tasting notes have been saved.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-burgundy mb-6 text-center">
            Tasting Review
          </h2>

          <div className="mb-4">
            <label className="block text-burgundy font-medium mb-1">
              Your Rating
            </label>
            <RatingStars value={rating} onChange={setRating} />
          </div>

          <div className="mb-4">
            <label className="block text-burgundy font-medium mb-1">
              Tasting Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What did you taste? What stood out?"
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows={4}
            />
          </div>

          <div className="mb-4">
            <label className="block text-burgundy font-medium mb-1">
              Tasting Tags
            </label>
            <TastingTags
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
          </div>

          <div className="mb-6">
            <label className="block text-burgundy font-medium mb-1">
              Would You Buy Again?
            </label>
            <WouldBuyAgainToggle
              value={wouldBuyAgain}
              onChange={setWouldBuyAgain}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-burgundy text-white py-3 rounded-full font-semibold hover:bg-pink-700 transition"
          >
            Save Review
          </button>
        </form>
      )}
    </div>
  );
}
