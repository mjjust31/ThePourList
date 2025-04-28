import { useState, useEffect } from "react";
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
  const [podiumBounce, setPodiumBounce] = useState(true);
  const [confirmReassign, setConfirmReassign] = useState({ show: false, place: null });

  useEffect(() => {
    if (podiumBounce) {
      const timer = setTimeout(() => {
        setPodiumBounce(false);
      }, 3000); // Bounce for 3 seconds
      return () => clearTimeout(timer);
    }
  }, [podiumBounce]);

  const winesLeft = selectedWines.length - Object.keys(placements).length;
  const allDone = winesLeft === 0;

  const availablePlacements = () =>
    Array.from({ length: selectedWines.length }, (_, i) => i + 1);

  const usedPlacements = Object.values(placements);

  const handleWineClickById = (wineId) => {
    const wineIndex = selectedWines.findIndex((wine) => wine.id === wineId);
    setCurrentWineIndex(wineIndex);

    if (wantsToReview === null) {
      setShowReviewChoiceModal(true);
    } else if (wantsToReview) {
      setIsReviewing(true);
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

  const handlePlacementClick = (place) => {
    if (usedPlacements.includes(place)) {
      setConfirmReassign({ show: true, place });
    } else {
      handleAssignPlacement(place);
    }
  };

  const confirmChangePlacement = () => {
    handleAssignPlacement(confirmReassign.place);
    setConfirmReassign({ show: false, place: null });
  };

  const cancelChangePlacement = () => {
    setConfirmReassign({ show: false, place: null });
  };

  const isRanked = (wineId) => Object.keys(placements).includes(String(wineId));

  const firstPlace = Object.entries(placements).find(([, place]) => place === 1);
  const secondPlace = Object.entries(placements).find(([, place]) => place === 2);
  const thirdPlace = Object.entries(placements).find(([, place]) => place === 3);

  const getWineById = (id) => selectedWines.find((wine) => wine.id === parseInt(id));

  const podiumWines = [secondPlace, firstPlace, thirdPlace]
    .filter(Boolean)
    .map(([id]) => getWineById(id));

  const rankedWinesBeyondTop3 = Object.entries(placements)
    .filter(([, place]) => place > 3)
    .sort(([, a], [, b]) => a - b)
    .map(([id]) => getWineById(id));

  return (
    <div className="p-4">
      <NavSpacer />

      {/* Title */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-rose-700 mb-2">🍷 Showdown Tasting</h2>
        <p className="text-gray-600">
          {allDone
            ? "🎉 All wines ranked! Ready to submit!"
            : `You have ${winesLeft} wine${winesLeft !== 1 ? "s" : ""} left to rank.`}
        </p>
      </div>

      {/* Podium */}
      {podiumWines.length > 0 && (
        <div className={`flex justify-center items-end gap-6 mb-8 ${podiumBounce ? "animate-bounce" : ""}`}>
          {secondPlace && (
            <div className="flex flex-col items-center">
              <span className="text-2xl">🥈</span>
              <div
                onClick={() => handleWineClickById(parseInt(secondPlace[0]))}
                className="cursor-pointer"
              >
                <WineCard wineData={getWineById(secondPlace[0])} index={0} small />
              </div>
            </div>
          )}
          {firstPlace && (
            <div className="flex flex-col items-center">
              <span className="text-3xl">🥇</span>
              <div
                onClick={() => handleWineClickById(parseInt(firstPlace[0]))}
                className="cursor-pointer"
              >
                <WineCard wineData={getWineById(firstPlace[0])} index={0} />
              </div>
            </div>
          )}
          {thirdPlace && (
            <div className="flex flex-col items-center">
              <span className="text-2xl">🥉</span>
              <div
                onClick={() => handleWineClickById(parseInt(thirdPlace[0]))}
                className="cursor-pointer"
              >
                <WineCard wineData={getWineById(thirdPlace[0])} index={0} small />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Ranked Wines Beyond Podium */}
      {rankedWinesBeyondTop3.length > 0 && (
        <div className="flex flex-col items-center mt-8 space-y-4">
          {rankedWinesBeyondTop3.map((wine) => (
            <div
              key={wine.id}
              className="relative w-64 bg-green-100 p-4 rounded-xl shadow-lg cursor-pointer hover:scale-105 transition"
              onClick={() => handleWineClickById(wine.id)}
            >
              <WineCard wineData={wine} index={0} />
              <div className="absolute top-2 left-2 bg-rose-700 text-white text-xs font-bold px-3 py-1 rounded-full">
                {placements[wine.id]} Place
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Unranked Wines Stacked */}
      <div className="relative w-full h-[500px] mt-10">
        {selectedWines.map((wine, index) => {
          if (isRanked(wine.id)) return null;
          return (
            <div
              key={wine.id}
              className="absolute left-0 right-0 mx-auto w-72 transition-all duration-500 ease-in-out bg-white rounded-xl shadow-lg cursor-pointer hover:scale-105"
              style={{
                top: `${index * 10}px`,
                zIndex: 50 - index,
              }}
              onClick={() => handleWineClickById(wine.id)}
            >
              <WineCard wineData={wine} index={index} />
            </div>
          );
        })}
      </div>

      {/* Placement Modal */}
      {currentWineIndex !== null && !isReviewing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-sm w-full space-y-4 text-center">
            <h2 className="text-xl font-bold mb-2">Rank This Wine</h2>
            <p className="text-sm text-gray-600 mb-4">
              {selectedWines[currentWineIndex]?.color} · {selectedWines[currentWineIndex]?.wineBrand} · {selectedWines[currentWineIndex]?.wineType}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {availablePlacements().map((place) => (
                <button
                  key={place}
                  onClick={() => handlePlacementClick(place)}
                  className={`px-4 py-2 rounded font-semibold ${
                    usedPlacements.includes(place)
                      ? "bg-gray-400 text-white cursor-pointer"
                      : "bg-rose-700 text-white hover:bg-rose-600"
                  }`}
                >
                  {place} Place
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Confirm Change Modal */}
      {confirmReassign.show && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-sm w-full space-y-6 text-center">
            <h2 className="text-xl font-bold text-rose-700">Reassign Placement?</h2>
            <p className="text-gray-600">
              This place is already assigned. Are you sure you want to change it?
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={confirmChangePlacement}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Yes, Change It
              </button>
              <button
                onClick={cancelChangePlacement}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                No, Cancel
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
