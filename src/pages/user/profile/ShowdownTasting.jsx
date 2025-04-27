// src/pages/ShowdownTasting.jsx
import { useLocation, useNavigate } from "react-router-dom";
import WineShowdownForm from "../../../components/shared/forms/showdown/WineShowdownForm";
import NavSpacer from "../../../components/shared/layout/NavSpacer";
import WineData from "../inventory/WineInventoryData"; // Full wine inventory data

const ShowdownTasting = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedWineIds = location.state?.selectedWines?.map((wine) => wine.id) || [];

  const matchedWines = WineData.filter((wine) => selectedWineIds.includes(wine.id));

  // 🛠 Map your wine data properly to what WineShowdown expects
  const selectedWines = matchedWines.map((wine) => ({
    id: wine.id,
    name: wine.wineBrand,           // ✅ Mapped correctly
    photo: wine.wineLabelPhoto,     // ✅ Mapped correctly
    color: wine.color,
    type: wine.wineType,
    year: wine.year,
    sweetness: wine.sweetness,
    locationPurchased: wine.locationPurchased,
    grapeOrigin: wine.grapeOrigin,
  }));

  if (selectedWines.length === 0) {
    navigate("/inventory/to-taste");
    return null;
  }

  return (
    <div className="p-4">
      <NavSpacer />
      <WineShowdownForm selectedWines={selectedWines} />
    </div>
  );
};

export default ShowdownTasting;
