import React, { useState } from "react";
import RatingStars from "../../../shared/forms/reviews/details/RatingStars";
import TastingTags from "../../../shared/forms/reviews/details/TastingTags";
import WouldBuyAgainToggle from "../../../shared/forms/reviews/details/WouldBuyToggle";

export default function WineReview({ wine }) {
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [wouldBuyAgain, setWouldBuyAgain] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  if (!wine) {
    return (
      <div className="text-center p-6">
        <h2 className="text-xl font-semibold text-gray-600">Loading wine info...</h2>
      </div>
    );
  }

  const handleSaveClick = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const handleConfirmSave = () => {
    const reviewData = {
      wineId: wine.id,
      name: wine.name,
      rating,
      notes,
      selectedTags,
      wouldBuyAgain,
    };

    console.log("Review Submitted:", reviewData);
    setSubmitted(true);
    setShowConfirmModal(false);
  };

  const handleCancelSave = () => {
    setShowConfirmModal(false);
  };

  const isSaveEnabled = rating > 0;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-3xl shadow-xl space-y-8">
        {submitted ? (
          <div className="text-center text-pink-700 mt-10">
            <h2 className="text-3xl font-bold mb-4">Thanks for your review! 🍷</h2>
            <p className="italic text-gray-600">Your tasting notes have been saved.</p>
          </div>
        ) : (
          <form className="space-y-8">
            {/* Wine Details */}
            <div className="text-center space-y-1">
              <h2 className="text-3xl font-bold text-pink-700 mb-2">
                Tasting Review
              </h2>
              <p className="text-sm text-gray-500">
                Tell us what you thought about this wine!
              </p>
              <div className="bg-gray-100 rounded-xl p-4 mt-4 space-y-1">
                <p><strong>Wine:</strong> {wine.name}</p>
                <p><strong>Color:</strong> {wine.color}</p>
                <p><strong>Type:</strong> {wine.type}</p>
                <p><strong>Price:</strong> ${wine.price}</p>
                <p><strong>Purchased At:</strong> {wine.purchaseLocation || "Unknown"}</p>
              </div>
            </div>

            {/* Rating */}
            <div className="border-t pt-6">
              <label className="block text-left text-pink-700 font-semibold mb-2 text-lg">
                Your Rating
              </label>
              <RatingStars rating={rating} onRatingChange={setRating} />
            </div>

            {/* Would Buy Again */}
            <div className="border-t pt-6">
              <label className="block text-left text-pink-700 font-semibold mb-2 text-lg">
                Would You Buy Again?
              </label>
              <WouldBuyAgainToggle
                value={wouldBuyAgain}
                onChange={setWouldBuyAgain}
              />
            </div>

            {/* Tasting Tags */}
            <div className="border-t pt-6">
              <label className="block text-left text-pink-700 font-semibold mb-2 text-lg">
                Tasting Tags
              </label>

              {/* 🎯 Wrap TastingTags in a soft gray box */}
              <div className="bg-gray-100 p-4 rounded-xl">
                <TastingTags
                  selectedTags={selectedTags}
                  setSelectedTags={setSelectedTags}
                />
              </div>
            </div>

            {/* Tasting Notes */}
            <div className="border-t pt-6">
              <label className="block text-left text-pink-700 font-semibold mb-2 text-lg">
                Tasting Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="What did you taste? Any standout flavors?"
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-300 focus:border-pink-400"
                rows={5}
              />
            </div>

            {/* Save Button */}
            <div className="pt-6">
              <button
                type="button"
                onClick={handleSaveClick}
                disabled={!isSaveEnabled}
                className={`w-full py-4 rounded-full font-semibold shadow-md text-lg transition 
                  ${isSaveEnabled
                    ? "bg-pink-700 hover:bg-pink-800 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                Save Review
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl">
            <h2 className="text-xl font-bold text-pink-700">Save Your Review?</h2>
            <p className="text-sm text-gray-600">Are you ready to submit your tasting notes?</p>
            <div className="flex justify-center gap-4 pt-2">
              <button
                onClick={handleConfirmSave}
                className="bg-pink-700 text-white px-6 py-2 rounded-full hover:bg-pink-800 transition"
              >
                Save
              </button>
              <button
                onClick={handleCancelSave}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-400 transition"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
