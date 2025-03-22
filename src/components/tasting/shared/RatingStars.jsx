import React from "react";

export default function RatingStars({ rating, onRatingChange }) {
  const maxStars = 5;

  return (
    <div className="flex justify-center">
      {Array.from({ length: maxStars }, (_, i) => {
        const starValue = i + 1;
        return (
          <button
            key={starValue}
            onClick={() => onRatingChange(starValue)}
            className="text-3xl text-yellow-400 hover:scale-110 transition-transform"
          >
            {starValue <= rating ? "★" : "☆"}
          </button>
        );
      })}
    </div>
  );
}
