import React from "react";

export default function InviteFriendModal({ onClose }) {
  const handleSendInvite = () => {
    // Fake sending invite
    console.log("Tasting party invite sent!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white p-6 rounded-xl max-w-sm w-full space-y-4">
        <h2 className="text-xl font-bold text-center text-[var(--custom-gold)]">
          Invite a Friend
        </h2>

        <p className="text-sm text-gray-300 text-center">
          Select a friend to invite to your tasting party!
        </p>

        {/* Placeholder — replace with real friend list later */}
        <select className="w-full p-2 rounded-md text-black">
          <option>Select a friend</option>
          <option>wineLover92</option>
          <option>grapeGuru88</option>
        </select>

        <div className="flex justify-between gap-4">
          <button
            onClick={onClose}
            className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-xl transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSendInvite}
            className="w-full py-2 bg-pink-600 hover:bg-pink-700 rounded-xl transition"
          >
            Send Invite
          </button>
        </div>
      </div>
    </div>
  );
}
