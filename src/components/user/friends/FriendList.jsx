import React from "react";

// Temporary mock data for development
const mockFriends = [
  { id: 1, username: "wineLover92" },
  { id: 2, username: "grapeGuru88" },
  { id: 3, username: "sipNSavor" },
];

export default function FriendList() {
  if (mockFriends.length === 0) {
    return (
      <p className="text-sm text-gray-400">You haven’t added any friends yet.</p>
    );
  }

  return (
    <ul className="space-y-2">
      {mockFriends.map((friend) => (
        <li
          key={friend.id}
          className="bg-gray-700 p-3 rounded-lg flex justify-between items-center shadow-md"
        >
          <span className="font-medium">{friend.username}</span>
          <button
            disabled
            className="text-xs bg-gray-500 text-white px-3 py-1 rounded-full opacity-60 cursor-not-allowed"
            title="Feature coming soon"
          >
            View Profile
          </button>
        </li>
      ))}
    </ul>
  );
}
