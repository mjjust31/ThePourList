import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import WineData from "../inventory/WineInventoryData";
import placeHolder from "../../../assets/images/emptyWine.jpeg";
import WineModal from "../../../components/shared/modals/WineModal";
import WineReview from "../../../components/user/review/singleEntry/WineReview";
import { motion } from "framer-motion";
import NavSpacer from "../../../components/shared/layout/NavSpacer";

// Mock trivia facts
const wineTrivia = [
  "🍇 Did you know? The oldest known wine cellar was on the Titanic!",
  "🍷 Red wines typically age better than white wines.",
  "🌍 Over 10,000 varieties of wine grapes exist worldwide!",
];

export default function SingleTastingPage() {
  const [inventory, setInventory] = useState([...WineData]);
  const [selectedWine, setSelectedWine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phase, setPhase] = useState("setup"); // 'setup' | 'loading' | 'review'
  const [countdown, setCountdown] = useState(30);
  const [currentTrivia, setCurrentTrivia] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const sortedInventory = [...inventory].sort((a, b) => {
    if (a.color < b.color) return -1;
    if (a.color > b.color) return 1;
    if (a.wineBrand.toLowerCase() < b.wineBrand.toLowerCase()) return -1;
    if (a.wineBrand.toLowerCase() > b.wineBrand.toLowerCase()) return 1;
    return 0;
  });

  useEffect(() => {
    if (location.state?.selectedWineId) {
      const wineId = location.state.selectedWineId;
      const wine = inventory.find((w) => w.id === wineId);
      if (wine) {
        setSelectedWine(wine);
        navigate(location.pathname, { replace: true });
      }
    }
  }, [location.state, location.pathname, navigate, inventory]);

  useEffect(() => {
    if (phase === "loading") {
      setCurrentTrivia(wineTrivia[0]);

      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "loading") {
      if (countdown % 10 === 0 && countdown !== 30 && countdown !== 0) {
        const factIndex = Math.floor((30 - countdown) / 10) % wineTrivia.length;
        setCurrentTrivia(wineTrivia[factIndex]);
      }

      if (countdown === 0) {
        setPhase("review");
      }
    }
  }, [countdown, phase]);

  const handleWineSelect = (e) => {
    const wineId = parseInt(e.target.value);
    const wine = inventory.find((w) => w.id === wineId);
    setSelectedWine(wine);
  };

  const startTasting = () => {
    if (selectedWine) {
      setInventory((prevInventory) =>
        prevInventory.filter((wine) => wine.id !== selectedWine.id)
      );
      setPhase("loading");
    }
  };

  const goBackToInventory = () => {
    navigate("/inventory/to-taste");
  };

  return (
    <div className="p-4 max-w-md mx-auto text-center">
      <NavSpacer />

      {/* Setup Phase */}
      {phase === "setup" && (
        <>
          <h1 className="text-2xl font-bold mb-1">🍷 Single Bottle Tasting</h1>
          <p className="text-sm text-gray-500 mb-4">Choose a wine to begin.</p>

          {!selectedWine && (
            <div className="mb-6">
              <p className="text-red-500 text-sm mb-2">
                No wine selected yet. Do you want to view your inventory?
              </p>
              <button
                onClick={goBackToInventory}
                className="mt-2 text-pink-600 underline text-xs"
              >
                🔙 Back to Inventory
              </button>

              <div className="mt-4">
                <select
                  onChange={handleWineSelect}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                >
                  <option value="">Select a wine from your inventory</option>
                  {sortedInventory.map((wine) => (
                    <option key={wine.id} value={wine.id}>
                      {wine.color ? `· ${wine.color} ` : ""}
                      {wine.wineBrand}
                      {wine.wineType ? ` · ${wine.wineType}` : ""}
                      {wine.year ? ` · ${wine.year}` : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {selectedWine && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white shadow rounded-lg p-4 mb-4 border border-gray-100"
              >
                <img
                  src={selectedWine.wineLabelPhoto || placeHolder}
                  alt={selectedWine.wineBrand}
                  className="w-full h-48 object-cover rounded-md mb-3"
                  onClick={() => setIsModalOpen(true)}
                />
                <h2 className="text-lg font-semibold">{selectedWine.wineBrand}</h2>
                <p className="text-sm text-gray-600">
                  {selectedWine.color} · {selectedWine.wineType}
                  {selectedWine.year ? ` · ${selectedWine.year}` : ""}
                </p>
              </motion.div>

              {/* Choose a Different Wine Link */}
              <div className="mb-6">
                <button
                  onClick={goBackToInventory}
                  className="text-pink-600 underline text-xs"
                >
                  🔄 Choose a Different Wine
                </button>
              </div>

              {/* Start Tasting Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="fixed bottom-4 left-0 right-0 px-4 z-10"
              >
                <button
                  onClick={startTasting}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-xl text-base font-semibold shadow-lg"
                >
                  🍷 Start Tasting!
                </button>
              </motion.div>
            </>
          )}
        </>
      )}

      {/* Loading Phase */}
      {phase === "loading" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-20"
        >
          <h2 className="text-2xl font-bold mb-2">⏳ Sip & Savor...</h2>
          <p className="text-gray-500 mb-6">Tasting in progress. Please enjoy your wine!</p>
          <p className="text-3xl font-semibold mb-4">{countdown}s</p>
          <p className="text-pink-600 text-lg">{currentTrivia}</p>
        </motion.div>
      )}

      {/* Review Phase */}
      {phase === "review" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10"
        >
          <WineReview wine={selectedWine} />
        </motion.div>
      )}

      {/* Wine Modal */}
      {isModalOpen && selectedWine && (
        <WineModal wine={selectedWine} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
