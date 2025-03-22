import React, { useState } from "react";

export default function WineDetails({ wine }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <h2>{wine.name} ({wine.year})</h2>
      <p><strong>Type:</strong> {wine.type}</p>
      <p><strong>Tasting Notes:</strong> {wine.notes}</p>
    </div>
  );
}
