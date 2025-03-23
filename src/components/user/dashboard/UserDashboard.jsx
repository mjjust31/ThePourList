import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DrinkSwitcherDropdown from "../dropdowns/DrinkSwitcherDroperdown"; // Fixed typo
import GuideUser from "../home/GuideUser";

export default function UserDashboard() {
  const [showGuide, setShowGuide] = useState(false);
  const navigate = useNavigate();

  const handleTastingPartyClick = () => {
    setShowGuide(true); // Show the guide instead of navigating directly
  };

  const handleGuideComplete = (numBottles) => {
    if (numBottles === 1) {
      navigate("/single");
    } else {
      navigate("/showdown", { state: { wineCount: numBottles } });
    }
  };

  return (
    <div className="dashboard text-white text-left space-y-8">
      {/* Drink Switcher */}
      <div>
        <p className="text-xl mb-2">
          Select your drink and let’s have some fun!
        </p>
        <DrinkSwitcherDropdown />
      </div>

      {/* Coming Soon: Favorites & Ratings */}
      <div className="bg-gray-700 p-4 rounded-lg">
        <p className="text-lg font-semibold text-[var(--custom-gold)] mb-2">
          Favorites & Ratings
        </p>
        <p className="text-sm text-gray-300">
          Coming soon: Recent tastings, star ratings, and your top picks.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3">
        <Link
          to="/single"
          className="inline-block bg-[var(--custom-gold)] text-gray-900 font-semibold py-2 px-6 rounded-xl shadow-md hover:bg-yellow-400 hover:shadow-lg transition-all duration-300 ease-in-out"
        >
          Start a Single Bottle Tasting
        </Link>

        <button
          onClick={handleTastingPartyClick}
          className="inline-block bg-pink-500 text-white font-semibold py-2 px-6 rounded-xl shadow-md hover:bg-pink-600 hover:shadow-lg transition-all duration-300 ease-in-out"
        >
          Start a Tasting Party
        </button>

        <Link
          to="/profile/friends"
          className="inline-block bg-[var(--custom-gold)] text-gray-900 font-semibold py-2 px-6 rounded-xl shadow-md hover:bg-yellow-400 hover:shadow-lg transition-all duration-300 ease-in-out"
        >
          My Friends
        </Link>

        {/* Optional: View My Wineries (disabled for now) */}
        {false && (
          <button className="bg-[var(--custom-gold)] text-gray-900 py-2 px-4 rounded hover:opacity-90 transition">
            View My Wineries
          </button>
        )}
      </div>

      {/* Guide Component */}
      {showGuide && (
        <div className="mt-6">
          <GuideUser
            onComplete={handleGuideComplete}
            defaultBottleCount={2}
          />
        </div>
      )}

      {/* Navigation */}
      <div className="mt-6">
        <a
          href="/"
          className="text-[var(--custom-gold)] underline hover:text-white transition"
        >
          ← Return to Home
        </a>
      </div>
    </div>
  );
}
