import React from "react";
import { motion } from "framer-motion";

export default function WineModal({ wine, onClose }) {
  if (!wine) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-xl max-w-sm w-full p-5 mx-4"
      >
        <img
          src={wine.labelPhoto}
          alt={wine.name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h2 className="text-xl font-bold mb-1">{wine.name}</h2>
        <p className="text-sm text-gray-600 mb-3">{wine.brand}</p>

        <div className="text-left space-y-1 text-sm text-gray-700">
          <p><strong>Type:</strong> {wine.type}</p>
          <p><strong>Color:</strong> {wine.color}</p>
          <p><strong>Year:</strong> {wine.year}</p>
          <p><strong>Sweetness:</strong> {wine.sweetness}</p>
          <p><strong>Grape Origin:</strong> {wine.grapeOrigin}</p>
          <p><strong>Purchased At:</strong> {wine.locationPurchased} – {wine.locationName}</p>
          <p><strong>Price:</strong> ${wine.price}</p>
          <p><strong>Date Added:</strong> {new Date(wine.dateAdded).toLocaleDateString()}</p>
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg font-semibold"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
}
