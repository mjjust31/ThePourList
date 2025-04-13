import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavSpacer from "../../../components/shared/layout/NavSpacer";
import WineEntryForm from "../../../components/shared/forms/entry/WineEntryForm";

export default function InventoryPage() {
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [wineData, setWineData] = useState({});

  const tabs = [
    { id: "toTaste", label: "To Taste", path: "/inventory/to-taste" },
    { id: "tastings", label: "Tastings", path: "/inventory/tastings" },
    { id: "showdowns", label: "Showdowns", path: "/inventory/showdowns" },
    { id: "buyAgain", label: "Buy Again", path: "/inventory/buy-again" },
  ];

  const handleAddWine = () => {
    setWineData({});
    setShowForm(true);
  };

  const handleSaveWine = () => {
    if (!wineData.color || !wineData.type || !wineData.name) return;
    // Save logic here — likely should lift inventory to context or parent state in final version
    setShowForm(false);
    setShowSuccess(true);
  };

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  return (
    <div className="p-4 max-w-md mx-auto min-h-screen bg-pink-50">
      <NavSpacer />
      <h1 className="text-2xl font-bold mb-4 text-center text-pink-800">Your Inventory</h1>

      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {tabs.map((tab) => (
          <Link key={tab.id} to={tab.path}>
            <button className="px-4 py-2 rounded-full text-sm font-medium border bg-white text-pink-600 border-pink-300 hover:bg-pink-100 transition-colors duration-200">
              {tab.label}
            </button>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mb-4">
        <button
          onClick={handleAddWine}
          className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 shadow-md"
        >
          + Add a New Wine
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 max-w-lg w-full">
            <WineEntryForm
              wineData={wineData}
              onChange={setWineData}
              onAdd={handleSaveWine}
              onClose={() => setShowForm(false)}
              inventory={[]} // Pass real inventory if needed later
            />
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow-md z-50">
          Wine entered successfully! Go to "To Taste" to view your wines!
        </div>
      )}
    </div>
  );
}
