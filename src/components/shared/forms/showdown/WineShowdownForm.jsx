// src/components/shared/forms/showdown/WineShowdownForm.jsx

import { useState } from "react";
import NavSpacer from "../../layout/NavSpacer";
import WineCard from "../../cards/WineCard";
import WineReview from "../../../user/review/singleEntry/WineReview";

export default function WineShowdownForm({ selectedWines }) {
  const [phase, setPhase] = useState("review");
  const [wantsToReview, setWantsToReview] = useState(null);
  const [placements, setPlacements] = useState({});
  const [reviews, setReviews] = useState({});
  const [currentWineIndex, setCurrentWineIndex] = useState(null);
  const [showReviewChoiceModal, setShowReviewChoiceModal] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [selectedWineId, setSelectedWineId] = useState(null);

  const winesLeft = selectedWines.length - Object.keys(placements).length;
  const allDone = winesLeft === 0;

  const availablePlacements = () => {
    return Array.from({ length: selectedWines.length }, (_, i) => i + 1)
      .filter((place) => !Object.values(placements).includes(place));
  };

  const handleWineClick = (wineId, index) => {
    setSelectedWineId(wineId);
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
    setPlacements((prev) => ({
      ...prev,
      [wineId]: placementNumber,
    }));

    if (!wantsToReview) {
      setSelectedWineId(null);
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
    setSelectedWineId(null);
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
        <div className="flex justify-center items-end gap-6 mb-8 animate-bounce-small">
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

      {/* Stacked Card Deck */}
      <div className="relative w-full h-[500px] mt-10">
        {selectedWines.map((wine, index) => {
          const alreadyRanked = placements[wine.id];
          return (
            <div
              key={wine.id}
              className={`absolute left-0 right-0 mx-auto w-72 transition-all duration-500 ease-in-out
                ${selectedWineId === wine.id ? "scale-105 z-50" : `z-${30 - index} top-[${index * 10}px]`}
                ${alreadyRanked ? "bg-green-100 opacity-80 translate-y-[-20px]" : "bg-white"}
                ${alreadyRanked ? "transition-transform transition-opacity" : ""}
                rounded-xl shadow-lg cursor-pointer`}
              style={{
                top: `${index * 10}px`,
                zIndex: 50 - index,
              }}
              onClick={() => handleWineClick(wine.id, index)}
            >
              <WineCard wineData={wine} index={index} />
              {alreadyRanked && (
                <div className="absolute bottom-2 left-2 bg-rose-700 text-white text-xs font-bold px-2 py-1 rounded">
                  {placements[wine.id]} Place
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Placement Modal */}
      {selectedWineId && !isReviewing && !placements[selectedWines[currentWineIndex]?.id] && (
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
      {isReviewing && selectedWineId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-sm w-full relative">
            <WineReview
              wine={selectedWines[currentWineIndex]}
              onComplete={handleSaveReview}
            />
          </div>
        </div>
      )}

      {/* Submit Button */}
      {allDone && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => alert("Submit Rankings! 🎯")}
            className="px-6 py-3 bg-green-700 text-white rounded-full font-semibold hover:bg-green-600 transition"
          >
            ✅ Submit My Final Rankings!
          </button>
        </div>
      )}
    </div>
  );
}
