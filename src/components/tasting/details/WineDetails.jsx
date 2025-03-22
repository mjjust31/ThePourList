import React from "react";

export default function WineDetails({ wine }) {
  if (!wine) return null;
  console.log("Rendering WineDetails");
  return (
    <div className="text-center mb-6 mt-4">
      {wine.image && (
        <img
          src={wine.image}
          alt={`${wine.name}`}
          className="mx-auto mb-4 max-h-64 object-contain rounded"
        />
      )}
      <h3 className="text-2xl font-bold text-burgundy">{wine.name}</h3>
      <p className="text-lg text-gray-700">{wine.year} • {wine.type}</p>
      <p className="mt-2 text-gray-600 italic">"{wine.notes}"</p>
    </div>
  );
}
