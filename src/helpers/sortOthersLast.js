// utils/sortHelpers.js

export const getSortedTypesWithOtherLast = (typesArray) => {
  const others = typesArray.filter((type) => type.toLowerCase() === "other");
  const rest = typesArray.filter((type) => type.toLowerCase() !== "other").sort();
  return [...rest, ...others];
};
