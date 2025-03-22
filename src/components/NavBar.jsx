import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDrink } from "../contexts/DrinkContext";
import { capitalizeFirstLetter } from "../helpers/stringHelpers";

export default function NavBar() {
  const { drinkType } = useDrink();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Nav Container */}
      <nav className="bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center">
        <div className="text-sm text-gray-500">Welcome, User</div>

        <Link
          to="/"
          className="text-xl font-semibold text-gray-800 flex items-center gap-1"
        >
          🍷 <span>RankMyPour</span>
        </Link>

        {/* Hamburger Button */}
        <button
          className="text-gray-600 lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Offcanvas Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } bg-[#8b9d70] bg-[url('https://www.transparenttextures.com/patterns/wine-cork.png')] bg-repeat bg-auto bg-blend-multiply text-[#fffaf5]`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-[#e2d3d3] bg-gradient-to-r from-[#fff0f5] to-[#f7e9ec] text-burgundy">
          <h2 className="font-serif text-xl pl-5">Menu</h2>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="[filter:hue-rotate(300deg)]"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col p-8 space-y-3">
          <Link
            to="/profile"
            className="text-[#fffaf0] text-[1.1rem] mb-4 px-4 py-2 rounded-[10px] transition-all duration-300 hover:bg-white/15 hover:text-[#f5e5d9] hover:pl-5"
            onClick={() => setIsMenuOpen(false)}
          >
            My {capitalizeFirstLetter(drinkType)} Profile
          </Link>

          <Link
            to="/tasting"
            className="text-[#fffaf0] text-[1.1rem] mb-4 px-4 py-2 rounded-[10px] transition-all duration-300 hover:bg-white/15 hover:text-[#f5e5d9] hover:pl-5"
            onClick={() => setIsMenuOpen(false)}
          >
            Single {capitalizeFirstLetter(drinkType)} Tasting
          </Link>

          <Link
            to="/multi-tasting"
            className="text-[#fffaf0] text-[1.1rem] mb-4 px-4 py-2 rounded-[10px] transition-all duration-300 hover:bg-white/15 hover:text-[#f5e5d9] hover:pl-5"
            onClick={() => setIsMenuOpen(false)}
          >
            {capitalizeFirstLetter(drinkType)} Showdown
          </Link>

          <Link
            to="/events"
            className="text-[#fffaf0] text-[1.1rem] mb-4 px-4 py-2 rounded-[10px] transition-all duration-300 hover:bg-white/15 hover:text-[#f5e5d9] hover:pl-5"
            onClick={() => setIsMenuOpen(false)}
          >
            My Events
          </Link>

          {/* Conditional Links */}
          {false && drinkType === "wine" && (
            <Link to="/my-wineries">My Wineries</Link>
          )}
          {false && drinkType === "beer" && (
            <Link to="/my-breweries">My Breweries</Link>
          )}
        </div>
      </div>
    </>
  );
}
