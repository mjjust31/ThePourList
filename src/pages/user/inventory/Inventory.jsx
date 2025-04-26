import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavSpacer from "../../../components/shared/layout/NavSpacer";
import WineEntryForm from "../../../components/shared/forms/entry/WineEntryForm";

export default function InventoryPage() {
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [wineData, setWineData] = useState({});
  const navigate = useNavigate();

  const handleAddWine = () => {
    setWineData({});
    setShowForm(true);
  };

  const handleSaveWine = () => {
    if (!wineData.color || !wineData.type || !wineData.name) return;
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
    <div className="p-6 max-w-3xl mx-auto min-h-screen bg-gray-50">
      <NavSpacer />

      <h1 className="text-4xl font-bold mb-8 text-center text-rose-900">
        🍷 Your Wine Inventory
      </h1>

      <div className="flex flex-col items-center gap-6 mb-10">
        {/* Saved Wines Button */}
        <Link to="/inventory/to-taste" className="w-full max-w-xs">
          <button className="w-full py-4 bg-white text-rose-800 font-semibold rounded-lg shadow hover:bg-rose-50 transition-all">
            📚 View Saved Wines
          </button>
        </Link>

        {/* Add a New Wine Button */}
        <button
          onClick={handleAddWine}
          className="w-full max-w-xs py-4 bg-rose-800 text-white font-semibold rounded-lg shadow hover:bg-rose-700 transition-all"
        >
          ➕ Add a New Wine
        </button>

        {/* Go to Pourfile Button */}
        <button
          onClick={() => navigate("/pourfile")}
          className="w-full max-w-xs py-4 bg-white text-rose-800 font-semibold rounded-lg shadow hover:bg-rose-50 transition-all"
        >
          🧑‍💼 Go to Your Pourfile
        </button>
      </div>

      {/* Wine Entry Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-2xl w-full">
            <WineEntryForm
              wineData={wineData}
              onChange={setWineData}
              onAdd={handleSaveWine}
              onClose={() => setShowForm(false)}
              inventory={[]} // Pass real inventory later
            />
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 text-center">
          🎉 Wine entered successfully! Check "Saved Wines" to view!
        </div>
      )}
    </div>
  );
}
