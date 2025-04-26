import React from "react";

const TAG_OPTIONS = [
  "Fruity",
  "Dry",
  "Sweet",
  "Earthy",
  "Spicy",
  "Oaky",
  "Citrus",
  "Floral",
  "Bold",
  "Light",
];

export default function TastingTags({ selectedTags, setSelectedTags }) {
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      const updatedTags = selectedTags.filter((t) => t !== tag);
      setSelectedTags(updatedTags);
      console.log("Removed tag:", tag, "Selected:", updatedTags);
    } else {
      const updatedTags = [...selectedTags, tag];
      setSelectedTags(updatedTags);
      console.log("Added tag:", tag, "Selected:", updatedTags);
    }
  };

  return (
    <div className="flex flex-col gap-4">

      <p className="text-base font-semibold text-gray-700 text-center">
        Choose tags that describe your wine:
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        {TAG_OPTIONS.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => toggleTag(tag)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition transform hover:scale-105 duration-200 
              ${
                selectedTags.includes(tag)
                  ? "bg-pink-700 text-white border-pink-700 shadow-md"
                  : "bg-gray-100 text-pink-700 border border-gray-300 hover:bg-pink-100"
              }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
