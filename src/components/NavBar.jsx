import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDrink } from "../contexts/DrinkContext"; // Import the context
import { capitalizeFirstLetter } from "../helpers/stringHelpers";

// FontAwesome Icon import (now correctly added)
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  const { drinkType } = useDrink();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const drinkName = capitalizeFirstLetter(drinkType);

  // Toggle menu open/close
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      {/* Nav Container */}
      <nav className="flex justify-between items-center p-4 bg-gray-800 text-white fixed top-0 left-0 right-0 z-50">
        {/* Notification Icon */}
        <div className="relative">
          {/* Notification Bell Icon */}
          <button className="text-white text-xl">
            <FontAwesomeIcon icon={faBell} />
            <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>
        </div>

        <Link
          to="/"
          className="text-xl font-semibold text-white flex items-center gap-2"
        >
          🍷 <span>RankMyPour</span>
        </Link>

        {/* Hamburger Button */}
        <button onClick={toggleMenu} className="lg:hidden text-white">
          {isMenuOpen ? "X" : "☰"}
        </button>
      </nav>

      {/* Faded Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        />
      )}

      {/* Offcanvas Menu */}
      {isMenuOpen && (
        <div className="fixed top-0 right-0 h-full w-64 z-50 bg-gray-700 text-white">
          {/* Menu Header */}
          <div className="flex justify-between items-center p-4 bg-gray-600">
            <h2>Menu</h2>
            <button onClick={toggleMenu}>Close</button>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col p-6 space-y-4">
            <Link
              to="/profile"
              className="hover:text-yellow-400"
              onClick={toggleMenu}
            >
              My {drinkName} Profile
            </Link>

            <Link
              to="/tasting"
              className="hover:text-yellow-400"
              onClick={toggleMenu}
            >
              Single {drinkName} Tasting
            </Link>

            <Link
              to="/multi-tasting"
              className="hover:text-yellow-400"
              onClick={toggleMenu}
            >
              {drinkName} Showdown
            </Link>

            <Link
              to="/events"
              className="hover:text-yellow-400"
              onClick={toggleMenu}
            >
              My Events
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
