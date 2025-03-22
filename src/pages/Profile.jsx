import React from "react";
import DrinkSwitcher from "../components/DrinkSwitcher";

export default function Profile() {
  return (
    <div className="profile-page px-6 py-10 max-w-[800px] mx-auto text-center bg-gray-800 rounded-lg shadow-lg">
      <h1 className="font-serif text-4xl text-[var(--custom-gold)] mb-8">My Pourfile</h1>
      
      {/* Profile picture placeholder */}
      <div className="profile-img mb-6">
        <img 
          src="https://via.placeholder.com/150" 
          alt="Profile Picture" 
          className="w-32 h-32 rounded-full mx-auto border-4 border-[var(--custom-gold)]" 
        />
      </div>

      {/* Example of user info */}
      <div className="user-info mb-6 text-white">
        <p className="text-xl mb-2">Name: <span className="font-semibold text-[var(--custom-gold)]">John Doe</span></p>
        <p className="text-xl">Drink Preference: <span className="font-semibold text-[var(--custom-gold)]">Red Wine</span></p>
      </div>

      {/* Drink Type Switcher */}
      <DrinkSwitcher />

      {/* Placeholder for future content */}
      <div className="additional-info mt-6 text-gray-400">
        <p className="text-lg">Explore your favorite drinks and start tasting!</p>
      </div>
    </div>
  );
}
