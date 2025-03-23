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
        className="bg-burgundy text-white px-6 py-2 rounded hover:bg-burgundy/80 transition-all disabled:opacity-50"
      >
        {label}
      </button>
    </div>
  );
}
