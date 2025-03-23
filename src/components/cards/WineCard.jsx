// components/WineCard.jsx
const WineCard = ({ index, wineData, onClick }) => {
  const isFilled = wineData?.name; // basic way to check if data exists

  return (
    <div
      className="min-w-[200px] sm:min-w-[250px] bg-white border rounded-lg shadow p-4 flex flex-col justify-between cursor-pointer hover:bg-gray-50 transition"
      onClick={() => onClick(index)}
    >
      <div className="text-center mb-2">
        <h3 className="text-lg font-bold">
          {isFilled ? wineData.name : `Wine ${index + 1}`}
        </h3>
        <p className="text-sm text-gray-500">
          {isFilled ? "Click to edit" : "Click to add details"}
        </p>
      </div>

      {isFilled && (
        <div className="text-sm mt-2">
          <p><strong>Year:</strong> {wineData.year}</p>
          <p><strong>Type:</strong> {wineData.category}</p>
        </div>
      )}
    </div>
  );
};

export default WineCard;
