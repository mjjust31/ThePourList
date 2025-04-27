import emptyWine from "../../../assets/images/emptyWine.jpeg";

export default function WineCard({ index, wineData, onClick }) {
  const isFilled = Boolean(wineData?.name);
  const wineName = wineData?.name || `Wine #${index + 1}`;

  // 🛠 Fix photo loading based on type
  const wineImage = wineData?.photo instanceof File
    ? URL.createObjectURL(wineData.photo)
    : wineData?.photo || emptyWine;

  return (
    <div
      className={`min-w-[200px] sm:min-w-[250px] bg-gradient-to-b from-rose-100 to-white border border-gray-300 rounded-2xl shadow-md p-4 flex flex-col justify-between ${
        onClick ? "cursor-pointer hover:shadow-lg transition" : ""
      }`}
      onClick={() => onClick && onClick(index)}
    >
      <div className="text-center mb-3">
        <h3 className="text-lg font-semibold text-gray-800">
          #{index + 1} {wineName}
        </h3>
        {onClick && (
          <p className="text-xs text-gray-500 italic mt-1">
            {isFilled ? "Tap to edit" : "Tap to add details"}
          </p>
        )}
      </div>

      <div className="w-full h-40 overflow-hidden rounded-lg mb-4">
        <img
          src={wineImage}
          alt={wineName}
          className="w-full h-full object-cover rounded-md shadow-sm"
        />
      </div>

      {isFilled && (
        <div className="text-xs text-center text-gray-600 space-y-1">
          {wineData.color && <p className="font-medium">{wineData.color}</p>}
          {wineData.type && <p className="italic">{wineData.type}</p>}
        </div>
      )}
    </div>
  );
}
