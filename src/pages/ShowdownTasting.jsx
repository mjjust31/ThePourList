import React from "react";

export default function ShowdownTasting() {
  return (
    <div className="wine-showdown flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center bg-white rounded-lg shadow-md p-8 max-w-[800px] w-full">
        <h2 className="text-3xl font-bold text-center text-burgundy mb-6">
          Pour & Score: Showdown
        </h2>

        {/* Placeholder for wine showdown functionality */}
        <div className="wine-comparison">
          <p className="text-xl text-gray-700 mb-6">
            Compare your favorite wines and select the best one!
          </p>
          {/* You can render the wine comparison functionality here */}
          <div className="wine-list">
            <div className="wine-item mb-4">
              <h3 className="font-semibold text-xl">Wine A</h3>
              <p className="text-gray-600">A red wine with rich flavors.</p>
            </div>
            <div className="wine-item mb-4">
              <h3 className="font-semibold text-xl">Wine B</h3>
              <p className="text-gray-600">
                A light white wine with fruity notes.
              </p>
            </div>
            <div className="wine-item mb-4">
              <h3 className="font-semibold text-xl">Wine C</h3>
              <p className="text-gray-600">
                A rose wine with floral undertones.
              </p>
            </div>
          </div>
        </div>

        {/* Placeholder for buttons or functionality */}
        <div className="mt-8">
          <button className="bg-[#8b9d70] text-white py-2 px-6 rounded-lg shadow-lg hover:bg-[#7a8e60]">
            Start Tasting
          </button>
        </div>
      </div>
    </div>
  );
}
