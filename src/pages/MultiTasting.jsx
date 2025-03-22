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
    <div className="multi-tasting-page">
      <h1>Wine Showdown</h1>
      <p>Rank and rate your wines below:</p>
      
      <div className="wines-list">
        {wines.map((wine, index) => (
          <div key={wine.id} className="wine-card">
            <h3>{wine.name}</h3>
            <p>{wine.description}</p>
            
            {/* Rating Section */}
            <div className="rating">
              <label>Rate this wine: </label>
              <select
                value={ratings[wine.id] || 0}
                onChange={(e) => handleRating(wine.id, parseInt(e.target.value))}
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
            <div className="ranking">
              <label>Rank this wine: </label>
              <select
                value={rankings.indexOf(wine.id) + 1 || 0}
                onChange={(e) => handleRanking(wine.id, parseInt(e.target.value))}
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

      <button onClick={handleSubmit}>Submit Rankings and Ratings</button>
    </div>
  );
}
