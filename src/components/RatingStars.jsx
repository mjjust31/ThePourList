
import React, { useState } from "react";


export default function RatingStars({ label, value, onChange }) {
  return (
    <div style={{ margin: '0.5rem 0' }}>
      <p>{label}</p>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: star <= value ? '#6e0e18' : '#ccc',
          }}
          onClick={() => onChange(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
}
