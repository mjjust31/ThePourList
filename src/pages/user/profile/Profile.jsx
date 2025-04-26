import React from "react";
import { useNavigate } from "react-router-dom";
import NavSpacer from "../../../components/shared/layout/NavSpacer";
import ProfilePhotoUpload from "../../../components/shared/photo/ProfilePhotoUpload";

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="px-6 py-10 min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 flex flex-col items-center">
      <NavSpacer />

      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 text-center">
        {/* Page Title */}
        <h1 className="text-4xl font-serif font-bold text-amber-700 mb-8">
          🍷 My Pourfile
        </h1>

        {/* Profile Photo */}
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-amber-400 shadow-lg">
            <ProfilePhotoUpload />
          </div>
        </div>

        {/* User Info */}
        <div className="bg-gray-100 rounded-xl py-4 px-6 mb-8 shadow">
          <p className="text-gray-800 text-xl">
            Name:{" "}
            <span className="font-bold text-amber-700">
              Welcome, User
            </span>
          </p>
        </div>

        {/* Friendly Inventory Message */}
        <div className="mb-10">
          <p className="text-gray-700 text-lg font-medium">
            📦 Got your inventory ready? Time to start tasting!
          </p>
        </div>

        {/* Dashboard Buttons */}
        <div className="flex flex-wrap justify-center gap-4">

          {/* Row 1 */}
          <button
            onClick={() => navigate("/inventory")}
            className="flex-1 min-w-[140px] max-w-[180px] py-4 bg-amber-100 text-amber-900 font-semibold rounded-lg hover:bg-amber-200 transition-all shadow"
          >
            📦 My Inventory
          </button>

          <button
            onClick={() => navigate("/pourfile/buy-again")}
            className="flex-1 min-w-[140px] max-w-[180px] py-4 bg-amber-100 text-amber-900 font-semibold rounded-lg hover:bg-amber-200 transition-all shadow"
          >
            🛒 Would Buy Again
          </button>

          {/* Row 2 */}
          <button
            onClick={() => navigate("/pourfile/tasting-history")}
            className="flex-1 min-w-[140px] max-w-[180px] py-4 bg-amber-100 text-amber-900 font-semibold rounded-lg hover:bg-amber-200 transition-all shadow"
          >
            🍷 Tasting History
          </button>

          <button
            onClick={() => navigate("/pourfile/showdown-history")}
            className="flex-1 min-w-[140px] max-w-[180px] py-4 bg-amber-100 text-amber-900 font-semibold rounded-lg hover:bg-amber-200 transition-all shadow"
          >
            ⚔️ Showdown History
          </button>

          {/* Row 3 */}
          <div className="w-full flex justify-center">
            <button
              onClick={() => navigate("/pourfile/wineries-visited")}
              className="w-full max-w-[180px] py-4 bg-amber-100 text-amber-900 font-semibold rounded-lg hover:bg-amber-200 transition-all shadow"
            >
              🏛️ Wineries History
            </button>
          </div>

        </div>

        {/* Full-width Start Tasting Button */}
        <div className="w-full pt-10">
          <button
            onClick={() => navigate("/tasting-setup")}
            className="w-full py-5 bg-rose-800 text-white font-bold text-lg rounded-full hover:bg-rose-700 transition-all shadow-md"
          >
            🎉 Start a Tasting with Friends
          </button>
        </div>

      </div>
    </div>
  );
}
