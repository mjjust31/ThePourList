// src/components/shared/forms/showdown/WineShowdownForm.jsx

import { useState } from "react";
import NavSpacer from "../../layout/NavSpacer";
import WineCard from "../../cards/WineCard";
import WineReview from "../../../user/review/singleEntry/WineReview";

export default function WineShowdownForm({ selectedWines }) {
  const [placements, setPlacements] = useState({});
  const [reviews, setReviews] = useState({});
  const [currentWineIndex, setCurrentWineIndex] = useState(null);
  const [wantsToReview, setWantsToReview] = useState(null);
  const [showReviewChoiceModal, setShowReviewChoiceModal] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);

  const winesLeft = selectedWines.length - Object.keys(placements).length;
  const allDone = winesLeft === 0;

  const availablePlacements = () => {
    const usedPlaces = Object.values(placements);
    return Array.from({ length: selectedWines.length }, (_, i) => i + 1).filter(
      (num) => !usedPlaces.includes(num)
    );
  };

  const handleWineClick = (index) => {
    setCurrentWineIndex(index);

    if (wantsToReview === null) {
      setShowReviewChoiceModal(true);
    } else {
      if (wantsToReview) {
        setIsReviewing(true);
      }
    }
  };

  const handleReviewChoice = (choice) => {
    setWantsToReview(choice);
    setShowReviewChoiceModal(false);
    if (choice) {
      setIsReviewing(true);
    }
  };

  const handleAssignPlacement = (placementNumber) => {
    const wineId = selectedWines[currentWineIndex]?.id;
    setPlacements((prev) => {
      // Remove previous wine that had this placement
      const updated = { ...prev };
      for (const id in updated) {
        if (updated[id] === placementNumber) {
          delete updated[id];
        }
      }
      updated[wineId] = placementNumber;
      return updated;
    });

    if (!wantsToReview) {
      setCurrentWineIndex(null);
    } else {
      setIsReviewing(true);
    }
  };

  const handleSaveReview = (reviewData) => {
    const wineId = selectedWines[currentWineIndex]?.id;
    setReviews((prev) => ({
      ...prev,
      [wineId]: reviewData,
    }));
    setIsReviewing(false);
    setCurrentWineIndex(null);
  };

  const firstPlace = Object.entries(placements).find(([, place]) => place === 1);
  const secondPlace = Object.entries(placements).find(([, place]) => place === 2);
  const thirdPlace = Object.entries(placements).find(([, place]) => place === 3);

  const getWineById = (id) => selectedWines.find((wine) => wine.id === parseInt(id));

  return (
    <div className="p-4">
      <NavSpacer />

      {/* Top Section */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-rose-700 mb-2">
          🍷 Showdown Tasting
        </h2>
        <p className="text-gray-600">
          {allDone
            ? "🎉 All wines ranked! Ready to submit!"
            : `You have ${winesLeft} wine${winesLeft !== 1 ? "s" : ""} left to rank.`}
        </p>
      </div>

      {/* Podium View */}
      {(firstPlace || secondPlace || thirdPlace) && (
        <div className="flex justify-center items-end gap-6 mb-8">
          {secondPlace && (
            <div className="flex flex-col items-center">
              <span className="text-2xl">🥈</span>
              <WineCard wineData={getWineById(secondPlace[0])} index={0} small />
            </div>
          )}
          {firstPlace && (
            <div className="flex flex-col items-center">
              <span className="text-3xl">🥇</span>
              <WineCard wineData={getWineById(firstPlace[0])} index={0} />
            </div>
          )}
          {thirdPlace && (
            <div className="flex flex-col items-center">
              <span className="text-2xl">🥉</span>
              <WineCard wineData={getWineById(thirdPlace[0])} index={0} small />
            </div>
          )}
        </div>
      )}

      {/* Horizontal Card Deck */}
      <div className="overflow-x-scroll flex space-x-6 py-6 px-2">
        {selectedWines.map((wine, index) => {
          const wineId = wine.id;
          const isRanked = placements[wineId];

          return (
            <div
              key={wineId}
              className={`min-w-[250px] p-2 rounded-xl shadow-lg transition-all duration-300
                ${isRanked ? "bg-green-100 opacity-80" : "bg-white"}
                hover:scale-105 cursor-pointer`}
              onClick={() => handleWineClick(index)}
            >
              <WineCard wineData={wine} index={index} />
              {isRanked && (
                <div className="absolute top-2 left-2 bg-rose-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  {placements[wineId]} Place
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Placement Modal */}
      {currentWineIndex !== null && !isReviewing && !placements[selectedWines[currentWineIndex]?.id] && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-sm w-full space-y-4 text-center">
            <h2 className="text-xl font-bold">Rank this Wine</h2>
            <div className="flex flex-wrap gap-4 justify-center mt-4">
              {availablePlacements().map((place) => (
                <button
                  key={place}
                  onClick={() => handleAssignPlacement(place)}
                  className="px-4 py-2 bg-rose-700 text-white rounded hover:bg-rose-600"
                >
                  {place} Place
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Would You Like to Review Modal */}
      {showReviewChoiceModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowReviewChoiceModal(false)}
        >
          <div
            className="bg-white rounded-xl p-6 shadow-lg max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold mb-4 text-center">Quick Question!</h3>
            <p className="text-gray-600 text-center mb-6">
              Would you like to review each wine while ranking?
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => handleReviewChoice(true)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Yes, Review Wines
              </button>
              <button
                onClick={() => handleReviewChoice(false)}
                className="px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700"
              >
                No, Just Rank
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {isReviewing && currentWineIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-sm w-full relative">
            <WineReview
              wine={selectedWines[currentWineIndex]}
              onComplete={handleSaveReview}
            />
          </div>
        </div>
      )}

      {/* Submit Rankings */}
      {allDone && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => alert("🎉 Rankings Submitted!")}
            className="px-6 py-3 bg-green-700 text-white font-bold rounded-full hover:bg-green-600 transition"
          >
            ✅ Submit My Final Rankings
          </button>
        </div>
      )}
    </div>
  );
}
