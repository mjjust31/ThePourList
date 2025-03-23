// src/forms/wine/WineShowdownForm.jsx

import { useState } from "react";
import { useLocation } from "react-router-dom";
import WineCard from "../../cards/WineCard";
import WineEntryForm from "../single/WineEntryForm";
import NavSpacer from "../../layout/NavSpacer";
import {
  handleCardClick,
  handleFormSubmit,
  goToPrevious,
  goToNext,
} from "../shared/utils/formHandler";

const defaultWineData = {
  name: "",
  year: "",
  color: "",
  category: "",
  notes: "",
  type: "",
  customType: "",
  price: "",
  location: "",
  locationName: "",
  sweetness: "",
  origin: "",
  photo: null,
};

const WineShowdownForm = () => {
  const location = useLocation();
  const passedCount = location.state?.wineCount || 3;

  const [wineData, setWineData] = useState(
    Array.from({ length: passedCount }, () => ({ ...defaultWineData }))
  );
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onCardClick = (index) =>
    handleCardClick(index, setSelectedIndex, setShowModal);

  const onFormSubmit = () => handleFormSubmit(setShowModal);

  const onGoToPrevious = () =>
    goToPrevious(currentIndex, setCurrentIndex);

  const onGoToNext = () =>
    goToNext(currentIndex, wineData.length - 1, setCurrentIndex);

  const handleWineChange = (updatedWine) => {
    const updated = [...wineData];
    updated[selectedIndex] = updatedWine;
    setWineData(updated);
  };

  return (
    <div className="p-4">
      <NavSpacer />
      <h2 className="text-2xl font-semibold mb-4 text-center text-burgundy">
        🍷 Pour and Score Showdown
      </h2>

      <div className="flex items-center justify-center space-x-4 bg-cream p-6 rounded-xl shadow-md max-w-lg mx-auto">
        <button
          onClick={onGoToPrevious}
          disabled={currentIndex === 0}
          className="text-4xl px-2 text-burgundy disabled:opacity-30"
        >
          ←
        </button>

        <WineCard
          index={currentIndex}
          wineData={wineData[currentIndex]}
          onClick={onCardClick}
        />

        <button
          onClick={onGoToNext}
          disabled={currentIndex === wineData.length - 1}
          className="text-4xl px-2 text-burgundy disabled:opacity-30"
        >
          →
        </button>
      </div>

      {showModal && selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <WineEntryForm
              wineData={wineData[selectedIndex] || defaultWineData}
              onChange={handleWineChange}
              onAdd={onFormSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WineShowdownForm;
