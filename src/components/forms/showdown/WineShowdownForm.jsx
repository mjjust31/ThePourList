import { useState } from "react";
import WineCard from "./WineCard";
import EntryFormModal from "./WineEntryForm"; // your existing modal/form

const WineShowdownForm = () => {
  const [wineCount, setWineCount] = useState(3); // default to 3 for now
  const [wineData, setWineData] = useState(Array.from({ length: wineCount }, () => ({})));
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Wine Showdown</h2>

      {/* Horizontal Carousel */}
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {wineData.map((wine, idx) => (
          <WineCard
            key={idx}
            index={idx}
            wineData={wine}
            onClick={handleCardClick}
          />
        ))}
      </div>

      {/* Modal Form */}
      {showModal && selectedIndex !== null && (
        <EntryFormModal
          initialData={wineData[selectedIndex]}
          onSave={handleFormSave}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default WineShowdownForm;
