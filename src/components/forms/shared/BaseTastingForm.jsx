import React, { useState } from "react";

export default function BaseTastingForm({ requiredFields, optionalFields }) {
  const [showOptional, setShowOptional] = useState(false);

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-white rounded-lg shadow-md w-full max-w-xl mx-auto space-y-6">

      {/* Required Fields */}
      <div className="space-y-4">{requiredFields}</div>

      {/* Optional Toggle */}
      <div className="text-right">
        <button
          type="button"
          onClick={() => setShowOptional((prev) => !prev)}
          className="text-sm text-burgundy underline hover:text-burgundy/80"
        >
          {showOptional ? "Hide optional fields" : "Add more info (optional)"}
        </button>
      </div>

      {/* Optional Fields */}
      {showOptional && <div className="space-y-4">{optionalFields}</div>}
    </div>
  );
}
