import React, { useState } from 'react';

export default function MultiTastingPage() {
  // Dummy data for wines (this can later be dynamic)
  const wines = [
    { id: 1, name: 'Wine A', description: 'A red wine with rich flavors.' },
    { id: 2, name: 'Wine B', description: 'A light white wine with fruity notes.' },
    { id: 3, name: 'Wine C', description: 'A rose wine with floral undertones.' },
  ];

  const [ratings, setRatings] = useState({}); // Track user ratings for each wine
  const [rankings, setRankings] = useState([]); // Track rankings (1st, 2nd, etc.)

  // Handle rating for each wine
  const handleRating = (wineId, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [wineId]: rating,
    }));
  };

  // Handle ranking of wines (1st, 2nd, 3rd)
  const handleRanking = (wineId, rank) => {
    const newRankings = [...rankings];
    newRankings[rank - 1] = wineId; // Place the wine in the correct rank
    setRankings(newRankings);
  };

  const handleSubmit = () => {
    // Submit the ratings and rankings (for now, we'll just log them)
    console.log('Ratings:', ratings);
    console.log('Rankings:', rankings);
    // Here you could send this data to the backend or perform other actions
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center mb-6 text-yellow-300">Wine Showdown</h1>
      <p className="text-xl text-center mb-8 text-green-400">Rank and rate your wines below:</p>
      
      <div className="space-y-6">
        {wines.map((wine) => (
          <div key={wine.id} className="wine-card p-4 bg-gray-700 rounded-lg shadow-sm hover:bg-gray-600 transition-all">
            <h3 className="text-2xl font-bold mb-2 text-orange-400">{wine.name}</h3>
            <p className="text-gray-300 mb-4">{wine.description}</p>
            
            {/* Rating Section */}
            <div className="rating mb-4">
              <label className="block text-gray-200">Rate this wine: </label>
              <select
                value={ratings[wine.id] || 0}
                onChange={(e) => handleRating(wine.id, parseInt(e.target.value))}
                className="w-full p-2 border rounded-lg bg-gray-600 text-white"
              >
                <option value={0}>Select Rating</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>

            {/* Ranking Section */}
            <div className="ranking mb-4">
              <label className="block text-gray-200">Rank this wine: </label>
              <select
                value={rankings.indexOf(wine.id) + 1 || 0}
                onChange={(e) => handleRanking(wine.id, parseInt(e.target.value))}
                className="w-full p-2 border rounded-lg bg-gray-600 text-white"
              >
                <option value={0}>Select Rank</option>
                <option value={1}>1st</option>
                <option value={2}>2nd</option>
                <option value={3}>3rd</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={handleSubmit} 
        className="mt-6 px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
      >
        Submit Rankings and Ratings
      </button>
    </div>
  );
}
