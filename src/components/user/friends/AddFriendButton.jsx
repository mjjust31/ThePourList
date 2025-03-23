import React, { useState } from "react";

export default function AddFriendButton() {
  const [friendUsername, setFriendUsername] = useState("");
  const [requestSent, setRequestSent] = useState(false);

  const handleAddFriend = () => {
    if (friendUsername.trim() !== "") {
      // For now, fake sending the request
      console.log(`Friend request sent to: ${friendUsername}`);
      setRequestSent(true);
    }
  };

  return (
    <div className="space-y-2">
      <input
        type="text"
        value={friendUsername}
        onChange={(e) => setFriendUsername(e.target.value)}
        placeholder="Enter username"
        className="w-full p-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-pink-500"
      />
      <button
        onClick={handleAddFriend}
        className="w-full bg-[var(--custom-gold)] text-gray-900 font-semibold py-2 px-4 rounded-xl hover:bg-yellow-400 transition-all duration-300"
      >
        Add Friend
      </button>

      {requestSent && (
        <p className="text-sm text-green-400">Friend request sent!</p>
      )}
    </div>
  );
}
