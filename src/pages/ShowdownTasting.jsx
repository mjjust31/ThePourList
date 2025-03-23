import { useLocation } from "react-router-dom";
import WineShowdownForm from "../components/forms/showdown/WineShowdownForm";
import NavSpacer from "../components/layout/NavSpacer";

const ShowdownTasting = () => {
  const location = useLocation();
  const passedCount = location.state?.wineCount || 3;

  return (
    <div className="p-4">
      <NavSpacer />
      <WineShowdownForm wineCount={passedCount} />
    </div>
  );
};

export default ShowdownTasting;
