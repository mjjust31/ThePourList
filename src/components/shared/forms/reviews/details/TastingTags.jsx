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
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {TAG_OPTIONS.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => toggleTag(tag)}
          className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
            selectedTags.includes(tag)
              ? "bg-burgundy text-white border-burgundy"
              : "bg-white text-burgundy border-burgundy hover:bg-burgundy hover:text-white"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
