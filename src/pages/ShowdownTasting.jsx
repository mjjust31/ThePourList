import { useState } from "react";
import { useLocation } from "react-router-dom";
import WineCard from "../components/cards/WineCard";
import WineEntryForm from "../components/forms/single/WineEntryForm"; // renamed for clarity
import NavSpacer from "../components/layout/NavSpacer";

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

const ShowdownTasting = () => {
  const location = useLocation();
  const passedCount = location.state?.wineCount || 3;

  const [wineData, setWineData] = useState(
    Array.from({ length: passedCount }, () => ({ ...defaultWineData }))
  );
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleCardClick = (index) => {
    setSelectedIndex(index);
    setShowModal(true);
  };

  const handleFormSave = (formData) => {
    const updated = [...wineData];
    updated[selectedIndex] = formData;
    setWineData(updated);
    setShowModal(false);
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < wineData.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="p-4">
      <NavSpacer />
      <h2 className="text-2xl font-semibold mb-4 text-center text-burgundy">
        🍷 Pour and Score Showdown
      </h2>

      {/* Carousel with arrows */}
      <div className="flex items-center justify-center space-x-4 bg-cream p-6 rounded-xl shadow-md max-w-lg mx-auto">
        <button
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className="text-4xl px-2 text-burgundy disabled:opacity-30"
        >
          ←
        </button>

        <WineCard
          index={currentIndex}
          wineData={wineData[currentIndex]}
          onClick={handleCardClick}
        />

        <button
          onClick={goToNext}
          disabled={currentIndex === wineData.length - 1}
          className="text-4xl px-2 text-burgundy disabled:opacity-30"
        >
          →
        </button>
      </div>

      {/* Modal with Wine Form */}
      {showModal && selectedIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative z-50">
            <WineEntryForm
              wineData={wineData[selectedIndex] || defaultWineData}
              onChange={(updatedData) => handleFormSave(updatedData)}
              onAdd={() => setShowModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowdownTasting;
