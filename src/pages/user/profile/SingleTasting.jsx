import React, { useState } from "react";
import WineData from "../inventory/WineInventoryData"; // adjust path
import placeHolder from "../../../assets/images/emptyWine.jpeg"; // adjust path
import WineModal from "../../../components/shared/modals/WineModal"; // this will be a modal component
import { motion } from "framer-motion";

export default function SingleTastingPage() {
  const [selectedWine, setSelectedWine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tastingStarted, setTastingStarted] = useState(false);

  const handleWineSelect = (e) => {
    const wineId = parseInt(e.target.value);
    const wine = WineData.find((w) => w.id === wineId);
    setSelectedWine(wine);
  };

  const startTasting = () => {
    setTastingStarted(true);
    // Here’s where you could add a timestamp or redirect to the tasting form
    console.log("Tasting started:", new Date().toISOString());
  };

  return (
    <div className="p-4 max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold mb-2">🍷 Welcome to Your Single Bottle Tasting</h1>
      <p className="text-sm text-gray-500 mb-6">
        Select a wine and begin your tasting journey!
      </p>

      {!selectedWine && (
        <select
          onChange={handleWineSelect}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        >
          <option value="">Select a wine from your inventory</option>
          {WineData.map((wine) => (
            <option key={wine.id} value={wine.id}>
              {wine.brand} - {wine.name} ({wine.year})
            </option>
          ))}
        </select>
      )}

      {selectedWine && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200"
        >
          <img
            src={selectedWine.labelPhoto || placeHolder}
            alt={selectedWine.name}
            className="w-full h-48 object-cover rounded cursor-pointer mb-3"
            onClick={() => setIsModalOpen(true)}
          />
          <h2 className="text-lg font-semibold">{selectedWine.name}</h2>
          <p className="text-sm text-gray-600">{selectedWine.type} · {selectedWine.color}</p>
        </motion.div>
      )}

      {selectedWine && !tastingStarted && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={startTasting}
          className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md"
        >
          🍷 Start Drinking Your Wine!
        </motion.button>
      )}

      {tastingStarted && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-green-600 font-medium"
        >
          🎉 Tasting started! Your review is now being tracked.
        </motion.p>
      )}

      {isModalOpen && selectedWine && (
        <WineModal wine={selectedWine} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
