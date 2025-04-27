// src/components/buttons/StartShowdownButton.jsx

const StartShowdownButton = ({ disabled, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`mt-6 px-6 py-3 rounded-xl font-semibold text-white transition 
        ${
          disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-rose-700 hover:bg-rose-600 shadow-md"
        }`}
    >
      🍷 Start Showdown
    </button>
  );
};

export default StartShowdownButton;
