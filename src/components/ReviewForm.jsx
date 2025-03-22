import React, { useState } from "react";

export default function ReviewForm({ value, onChange, onSubmit }) {
  return (
    <div style={{ marginTop: '1rem' }}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your tasting notes..."
        rows={5}
        cols={40}
        style={{ borderRadius: '8px', padding: '0.5rem' }}
      />
      <br />
      <button onClick={onSubmit} style={{ marginTop: '0.5rem' }}>
        Submit Tasting
      </button>
    </div>
  );
}
