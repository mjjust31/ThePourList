import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function RatingStars({ rating, onRatingChange }) {
  const maxStars = 5;

  const handleClick = (e, starIndex) => {
    const { left, width } = e.target.getBoundingClientRect();
    const clickX = e.clientX - left;
    const isHalf = clickX < width / 2;
    const newRating = isHalf ? starIndex + 0.5 : starIndex + 1;
    onRatingChange(newRating);
  };

  return (
    <div className="flex justify-center space-x-2">
      {Array.from({ length: maxStars }, (_, i) => (
        <div
          key={i}
          onClick={(e) => handleClick(e, i)}
          className="text-yellow-400 text-5xl cursor-pointer select-none hover:scale-110 transition-transform"
        >
          {rating >= i + 1 ? (
            <FaStar />
          ) : rating >= i + 0.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </div>
      ))}
    </div>
  );
}
