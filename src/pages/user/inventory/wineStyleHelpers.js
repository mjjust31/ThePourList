// wineStyleHelpers.js

export const getWineColorClass = (color) => {
  if (!color) return "bg-gray-100 text-black";

  switch (color.toLowerCase()) {
    case "red":
      return "bg-red-900 text-white";
    case "white":
      return "bg-yellow-700 text-white";
    case "rosé":
      return "bg-pink-300 text-black";
    case "sparkling":
      return "bg-gray-200 text-black sparkle";
    case "dessert":
      return "bg-amber-300 text-black";
    default:
      return "bg-gray-100 text-black";
  }
};

export const filterPriceRange = (price, range) => {
  switch (range) {
    case "under-10":
      return price < 10;
    case "10-20":
      return price >= 10 && price <= 20;
    case "21-30":
      return price > 20 && price <= 30;
    case "31-40":
      return price > 30 && price <= 40;
    case "41-50":
      return price > 40 && price <= 50;
    case "over-50":
      return price > 50;
    default:
      return true;
  }
};

export const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: currentYear - 1950 + 1 }, (_, i) => {
    const year = currentYear - i;
    return { label: year.toString(), value: year.toString() };
  });
};
