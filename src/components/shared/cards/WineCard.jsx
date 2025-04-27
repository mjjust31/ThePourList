import emptyWine from "../../../assets/images/emptyWine.jpeg";

export default function WineCard({ index, wineData, onClick }) {
  const isFilled = Boolean(wineData?.name);
  const wineName = wineData?.name || `Wine #${index + 1}`;
  const wineImage = wineData?.photo
    ? URL.createObjectURL(wineData.photo)
    : emptyWine;

  return (
    <div
      className="min-w-[200px] sm:min-w-[250px] bg-white border rounded-lg shadow p-4 flex flex-col justify-between cursor-pointer hover:bg-gray-50 transition"
      onClick={() => onClick(index)}
    >
      <div className="text-center mb-2">
        <h3 className="text-lg font-bold text-burgundy">#{index + 1} {wineName}</h3>
        <p className="text-sm text-gray-500 italic">
          {isFilled ? "Click to edit" : "Click to add details"}
        </p>
      </div>

      <div className="w-full h-40 overflow-hidden rounded mb-3">
        <img
          src={wineImage}
          alt={wineName}
          className="w-full h-full object-cover"
        />
      </div>

      {isFilled && (
        <div className="text-sm mt-2 text-center text-burgundy">
          {wineData.color && <p className="font-semibold">{wineData.color}</p>}
          {wineData.type && <p className="italic">{wineData.type}</p>}
        </div>
      )}
    </div>
  );
}
