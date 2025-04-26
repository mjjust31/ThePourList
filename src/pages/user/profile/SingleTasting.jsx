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
  const [phase, setPhase] = useState("setup");
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
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-10 px-4">
      <NavSpacer />

      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-2xl p-8 text-center">
        {/* Setup Phase */}
        {phase === "setup" && (
          <>
            <h1 className="text-3xl font-bold text-rose-800 mb-2">
              🍷 Single Bottle Tasting
            </h1>
            <p className="text-gray-500 mb-6">
              Choose a wine to begin your tasting.
            </p>

            {!selectedWine && (
              <>
                <p className="text-red-600 mb-4 text-sm">
                  No wine selected yet.
                </p>
                <button
                  onClick={goBackToInventory}
                  className="text-rose-700 font-semibold hover:underline mb-6"
                >
                  🔙 Back to Your Inventory
                </button>

                <select
                  onChange={handleWineSelect}
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-rose-300"
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
              </>
            )}

            {selectedWine && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-100 rounded-xl p-6 mb-6"
                >
                  <img
                    src={selectedWine.wineLabelPhoto || placeHolder}
                    alt={selectedWine.wineBrand}
                    className="w-full h-48 object-cover rounded-md mb-4"
                    onClick={() => setIsModalOpen(true)}
                  />
                  <h2 className="text-xl font-bold text-rose-700">{selectedWine.wineBrand}</h2>
                  <p className="text-gray-600 text-sm">
                    {selectedWine.color} · {selectedWine.wineType}
                    {selectedWine.year ? ` · ${selectedWine.year}` : ""}
                  </p>
                </motion.div>

                <button
                  onClick={goBackToInventory}
                  className="text-sm text-rose-700 font-semibold mb-6 hover:underline"
                >
                  🔄 Choose a Different Wine
                </button>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4"
                >
                  <button
                    onClick={startTasting}
                    className="w-full bg-rose-800 hover:bg-rose-700 text-white py-4 rounded-full text-lg font-bold shadow-lg transition-all"
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
            className="flex flex-col items-center justify-center mt-20 space-y-6"
          >
            <h2 className="text-3xl font-bold text-rose-800">⏳ Sip & Savor...</h2>
            <p className="text-gray-500">Enjoy your tasting moment!</p>
            <p className="text-5xl font-bold">{countdown}s</p>
            <p className="text-rose-600 text-lg">{currentTrivia}</p>
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
    </div>
  );
}
