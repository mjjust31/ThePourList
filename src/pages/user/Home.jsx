import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-emerald-900 to-rose-900 text-white p-6">
      <h1 className="text-4xl font-semibold mb-4 text-center">
        Welcome to The Pour List 🍷
      </h1>
      <p className="text-xl mb-10 text-center">
        Begin your wine tasting journey
      </p>

      <div className="flex flex-col items-center gap-6 w-full max-w-sm">
        <button
          onClick={() => navigate("/add-wine")}
          className="w-full bg-white text-rose-800 font-semibold py-4 rounded-lg shadow hover:bg-gray-100 transition"
        >
          ➕ Add Some Wines
        </button>

        <button
          onClick={() => navigate("/inventory")}
          className="w-full bg-white text-rose-800 font-semibold py-4 rounded-lg shadow hover:bg-gray-100 transition"
        >
          🍷 Let's Begin Tasting
        </button>

        <button
          onClick={() => navigate("/profile")}
          className="w-full bg-white text-rose-800 font-semibold py-4 rounded-lg shadow hover:bg-gray-100 transition"
        >
          🧑‍💼 Go to Your Pourfile
        </button>
      </div>
    </div>
  );
}
