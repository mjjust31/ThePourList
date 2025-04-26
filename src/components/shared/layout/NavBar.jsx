import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDrink } from "../../../contexts/DrinkContext"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  const { drinkType } = useDrink();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      {/* Nav Container */}
      <nav className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white fixed top-0 left-0 right-0 z-50 w-full">
        
        {/* Notification Icon */}
        <div className="relative">
          <button className="text-white text-xl relative">
            <FontAwesomeIcon icon={faBell} />
            <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>
        </div>

        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold hover:no-underline">
          🍷 <span>The Pour List</span>
        </Link>

        {/* Hamburger Button for Mobile */}
        <button onClick={toggleMenu} className="lg:hidden text-white text-2xl">
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Faded Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Offcanvas Menu */}
      {isMenuOpen && (
        <div className="fixed top-0 right-0 h-full w-64 z-50 bg-gray-700 text-white shadow-lg p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold"></h2>
            <button onClick={toggleMenu} className="text-xl">✕</button>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col gap-6 text-lg">
            <Link to="/" className="hover:text-yellow-400 hover:no-underline py-2" onClick={toggleMenu}>
              Home
            </Link>

            <Link to="/inventory" className="hover:text-yellow-400 hover:no-underline py-2" onClick={toggleMenu}>
              Wine Cellar
            </Link>

            <Link to="/profile" className="hover:text-yellow-400 hover:no-underline py-2" onClick={toggleMenu}>
              My {drinkType ? `${drinkType}` : "Drink"} Profile
            </Link>

            <Link to="/single-tasting" className="hover:text-yellow-400 hover:no-underline py-2" onClick={toggleMenu}>
              Single {drinkType ? `${drinkType}` : "Drink"} Tasting
            </Link>

            <Link to="/showdown" className="hover:text-yellow-400 hover:no-underline py-2" onClick={toggleMenu}>
              {drinkType ? `${drinkType}` : "Drink"} Showdown
            </Link>

            <Link to="/events" className="hover:text-yellow-400 hover:no-underline py-2" onClick={toggleMenu}>
              My Events
            </Link>
          </div>
        </div>
      )}

      {/* Desktop Menu */}
      <div className="hidden lg:flex justify-center space-x-8 bg-gray-800 text-white fixed top-0 left-0 right-0 z-50 py-4">
        <Link to="/" className="hover:text-yellow-400 hover:no-underline text-lg px-4 py-2">
          Home
        </Link>
        <Link to="/inventory" className="hover:text-yellow-400 hover:no-underline text-lg px-4 py-2">
          Wine Cellar
        </Link>
        <Link to="/profile" className="hover:text-yellow-400 hover:no-underline text-lg px-4 py-2">
          My {drinkType ? `${drinkType}` : "Drink"} Profile
        </Link>
        <Link to="/tasting" className="hover:text-yellow-400 hover:no-underline text-lg px-4 py-2">
          Single {drinkType ? `${drinkType}` : "Drink"} Tasting
        </Link>
        <Link to="/showdown" className="hover:text-yellow-400 hover:no-underline text-lg px-4 py-2">
          {drinkType ? `${drinkType}` : "Drink"} Showdown
        </Link>
        <Link to="/events" className="hover:text-yellow-400 hover:no-underline text-lg px-4 py-2">
          My Events
        </Link>
      </div>
    </>
  );
}
