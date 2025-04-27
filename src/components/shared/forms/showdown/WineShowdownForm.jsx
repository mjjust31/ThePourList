// src/components/shared/forms/showdown/WineShowdownForm.jsx
import { useState } from "react";
import NavSpacer from "../../layout/NavSpacer";
import WineCard from "../../cards/WineCard";
import LoadingScreen from "../../layout/LoadingScreen";
import WineReview from "../../../user/review/singleEntry/WineReview";

export default function WineShowdownForm({ selectedWines }) {
  const [phase, setPhase] = useState("review"); // review, loading, ranking
  const [wantsToReview, setWantsToReview] = useState(null); // true/false
  const [placements, setPlacements] = useState({}); // { wineId: place }
  const [reviews, setReviews] = useState({}); // { wineId: reviewData }
  const [currentWineIndex, setCurrentWineIndex] = useState(null); // which wine user clicked
  const [showReviewChoiceModal, setShowReviewChoiceModal] = useState(false); // ask if they want to review
  const [isCarouselOpen, setIsCarouselOpen] = useState(false); // open carousel modal
  const [isReviewing, setIsReviewing] = useState(false); // inside WineReview form
  // Helper inside file
function availablePlacements() {
  return Array.from({ length: selectedWines.length }, (_, i) => i + 1)
    .filter((place) => !Object.values(placements).includes(place));
}

  const handleWineClick = (index) => {
    if (wantsToReview === null) {
      // First time clicking any wine, ask if they want to review
      setShowReviewChoiceModal(true);
      setCurrentWineIndex(index);
    } else {
      openCarousel(index);
    }
  };

  const openCarousel = (index) => {
    setCurrentWineIndex(index);
    setIsCarouselOpen(true);
  };

  const handleReviewChoice = (choice) => {
    setWantsToReview(choice);
    setShowReviewChoiceModal(false);
    setIsCarouselOpen(true); // Start with the clicked wine
  };

  const handleAssignPlacement = (placementNumber) => {
    const wineId = selectedWines[currentWineIndex]?.id;
    setPlacements((prev) => ({
      ...prev,
      [wineId]: placementNumber,
    }));

    if (wantsToReview) {
      setIsReviewing(true);
    } else {
      moveToNextWine();
    }
  };

  const handleSaveReview = (reviewData) => {
    const wineId = selectedWines[currentWineIndex]?.id;
    setReviews((prev) => ({
      ...prev,
      [wineId]: reviewData,
    }));
    setIsReviewing(false);
    moveToNextWine();
  };

  const moveToNextWine = () => {
    const nextIndex = selectedWines.findIndex(
      (wine, idx) => !placements[wine.id] && idx !== currentWineIndex
    );
    if (nextIndex !== -1) {
      setCurrentWineIndex(nextIndex);
    } else {
      setIsCarouselOpen(false); // All wines done!
    }
  };

  const winesLeft = selectedWines.length - Object.keys(placements).length;
  const allDone = winesLeft === 0;

  const firstPlaceWine = Object.entries(placements).find(
    ([, place]) => place === 1
  );
  const firstPlaceWineId = firstPlaceWine ? parseInt(firstPlaceWine[0]) : null;
  const firstPlaceWineData = selectedWines.find((w) => w.id === firstPlaceWineId);

  return (
    <div className="p-4">
      <NavSpacer />

      {/* Top Section */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-rose-700 mb-2">
          🍷 Showdown Tasting
        </h2>
        {!allDone ? (
          <p className="text-gray-600">
            You have {winesLeft} wine{winesLeft !== 1 ? "s" : ""} left to rank.
          </p>
        ) : (
          <p className="text-green-600 font-bold text-lg">
            🎉 All wines ranked! Ready to submit!
          </p>
        )}
      </div>

      {/* Featured 1st Place Wine */}
      {firstPlaceWineData && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-center text-rose-700 mb-4">
            🥇 Your #1 Wine (so far)
          </h3>
          <div className="max-w-sm mx-auto">
            <WineCard wineData={firstPlaceWineData} index={0} />
          </div>
        </div>
      )}

      {/* Wine Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {selectedWines.map((wine, idx) => (
          <div
            key={wine.id}
            className="relative bg-white border rounded-xl p-4 shadow hover:shadow-lg cursor-pointer transition"
            onClick={() => handleWineClick(idx)}
          >
            <WineCard wineData={wine} index={idx} />

            {placements[wine.id] && (
              <div className="absolute top-2 left-2 bg-rose-700 text-white rounded-full px-3 py-1 text-xs font-bold shadow">
                {placements[wine.id]} Place
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Submit Button */}
      {allDone && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => alert("Submit Rankings and Reviews! 🎯")}
            className="px-6 py-3 bg-rose-800 text-white rounded-full font-semibold hover:bg-rose-700 transition"
          >
            ✅ Submit My Rankings!
          </button>
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
              Would you like to review each wine for your inventory records too?
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

      {/* Carousel + Review Modal */}
      {isCarouselOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div
            className="bg-white rounded-xl p-6 shadow-lg max-w-sm w-full relative"
          >
            {!isReviewing ? (
              <>
                {/* Carousel / Placement inside modal */}
                <h3 className="text-center text-lg font-bold mb-4">
                  {selectedWines[currentWineIndex]?.name || "Selected Wine"}
                </h3>
                <WineCard wineData={selectedWines[currentWineIndex]} index={0} />
                <div className="flex flex-wrap justify-center mt-6 gap-4">
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
              </>
            ) : (
              <WineReview
                wine={selectedWines[currentWineIndex]}
                onComplete={handleSaveReview}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}


