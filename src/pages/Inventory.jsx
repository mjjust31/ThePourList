import { useState, useEffect } from "react";
import NavSpacer from "../components/shared/layout/NavSpacer";
import WineEntryForm from "../components/shared/forms/entry/WineEntryForm";

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState("toTaste");
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [wineData, setWineData] = useState({});
  const [inventory, setInventory] = useState([]);

  const tabs = [
    { id: "toTaste", label: "To Taste" },
    { id: "tastings", label: "Tastings" },
    { id: "showdowns", label: "Showdowns" },
    { id: "buyAgain", label: "Buy Again" },
  ];

  const handleAddWine = () => {
    setWineData({});
    setShowForm(true);
  };

  const handleSaveWine = () => {
    if (!wineData.color || !wineData.type || !wineData.name) return;
    setInventory((prev) => [...prev, { ...wineData, tasted: false }]);
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
    <div className="p-4 max-w-md mx-auto">
      <NavSpacer />
      <h1 className="text-2xl font-bold mb-4 text-center">Your Inventory</h1>

      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-200 ${
              activeTab === tab.id
                ? "bg-pink-600 text-white border-pink-600"
                : "bg-white text-pink-600 border-pink-300 hover:bg-pink-100"
            }`}
          >
            {tab.label}
          </button>
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
              inventory={inventory}
            />
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow-md z-50">
          Wine entered successfully! Go to "To Taste" to view your wines!
        </div>
      )}

      <div className="bg-white p-4 rounded-xl shadow-md">
        {activeTab === "toTaste" && (
          <div>
            {inventory.filter((wine) => wine.tasted === false).length === 0 ? (
              <p className="text-center text-gray-600">Wines you plan to taste will go here.</p>
            ) : (
              <ul className="space-y-2">
                {inventory
                  .filter((wine) => wine.tasted === false)
                  .map((wine, index) => (
                    <li key={index} className="border p-2 rounded shadow-sm">
                      <strong>{wine.name}</strong> - {wine.type} ({wine.color})
                    </li>
                  ))}
              </ul>
            )}
          </div>
        )}
        {activeTab === "tastings" && <p className="text-center text-gray-600">Your single wine tastings will show here.</p>}
        {activeTab === "showdowns" && <p className="text-center text-gray-600">Showdown results coming soon!</p>}
        {activeTab === "buyAgain" && <p className="text-center text-gray-600">Your favorite wines live here 🍷</p>}
      </div>
    </div>
  );
}
