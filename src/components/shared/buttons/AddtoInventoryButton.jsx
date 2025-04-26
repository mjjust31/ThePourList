// components/buttons/AddToInventoryButton.jsx
export default function AddToInventoryButton({ onClick, disabled = false, label = "Add to Inventory" }) {
  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick();
  };

  return (
    <div className="mt-6 text-center">
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className="bg-pink-700 text-white px-6 py-3 rounded-full hover:bg-pink-800 transition-all disabled:opacity-50 shadow-md"
      >
        {label}
      </button>
    </div>
  );
}
