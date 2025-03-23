import React from "react";

export default function FriendList({ friends }) {
  if (!friends || friends.length === 0) {
    return (
      <p className="text-sm text-gray-400 italic">
        You haven’t added any friends yet.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {friends.map((friend) => (
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
