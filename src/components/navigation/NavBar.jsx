import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDrink } from "../../contexts/DrinkContext"; // Import the context
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  const { drinkType } = useDrink();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <button className="text-white text-xl">
            <FontAwesomeIcon icon={faBell} />
            <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>
        </div>

        <Link
          to="/"
          className="text-xl font-semibold text-white flex items-center gap-2">
          🍷 <span>RankMyPour</span>
        </Link>

        {/* Hamburger Button */}
        <button onClick={toggleMenu} className="lg:hidden text-white">
          {isMenuOpen ? "X" : "☰"}
        </button>
      </nav>

      {/* Faded Overlay (semi-transparent to allow background to be seen) */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-30 z-40"
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
            <Link to="/" className="hover:text-yellow-400" onClick={toggleMenu}>
              Home
            </Link>
            <Link
              to="/profile"
              className="hover:text-yellow-400"
              onClick={toggleMenu}>
              My {drinkType ? `${drinkType}` : "Drink"} Profile
            </Link>

            <Link
              to="/tasting"
              className="hover:text-yellow-400"
              onClick={toggleMenu}>
              Single {drinkType ? `${drinkType}` : "Drink"} Tasting
            </Link>

            <Link
              to="/multi-tasting"
              className="hover:text-yellow-400"
              onClick={toggleMenu}>
              {drinkType ? `${drinkType}` : "Drink"} Showdown
            </Link>

            <Link
              to="/events"
              className="hover:text-yellow-400"
              onClick={toggleMenu}>
              My Events
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
