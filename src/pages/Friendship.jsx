import React, { useState } from "react";
import NavSpacer from "../components/shared/layout/NavSpacer";
import FriendList from "../components/user/friends/FriendList";
import AddFriendButton from "../components/user/friends/AddFriendButton";
import InviteFriendModal from "../components/user/friends/InviteFriendModal";
// import PendingFriendRequests from "../components/user/friends/PendingFriendRequests";

export default function Friendship() {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const mockFriends = [
    { id: 1, username: "wineLover92" },
    { id: 2, username: "grapeGuru88" },
    { id: 3, username: "sipNSavor" },
  ];

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredFriends = mockFriends.filter((friend) =>
    friend.username.toLowerCase().startsWith(normalizedSearch)
  );

  const handleInviteClick = () => setShowInviteModal(true);
  const handleCloseModal = () => setShowInviteModal(false);

  return (
    <div className="p-4 max-w-md mx-auto text-white space-y-6">
      <NavSpacer />

      {/* Header */}
      <h1 className="text-2xl font-bold text-center text-pink-400">
        🍷 Friendship Management
      </h1>

      <p className="text-center text-sm text-gray-300">
        You have <span className="font-semibold">{mockFriends.length}</span>{" "}
        friends
      </p>

      {/* Search + Add Friend side by side */}
      <div className="flex flex-col sm:flex-row sm:gap-4 gap-6">
        {/* Search */}
        <div className="flex-1 space-y-2">
          <label htmlFor="search" className="block text-sm font-semibold">
            🔍 Search Friends
          </label>
          <input
            id="search"
            type="text"
            placeholder="Start typing a username"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Add Friend */}
        <div className="flex-1 space-y-2">
          <h2 className="text-sm font-semibold">➕ Add a Friend</h2>
          <AddFriendButton />
        </div>
      </div>

      {/* Filtered Friend List (only when searching) */}
      {searchTerm && (
        <section className="bg-gray-800 p-4 rounded-xl shadow space-y-3">
          <h2 className="text-lg font-semibold text-[var(--custom-gold)]">
            🔍 Search Results
          </h2>
          {filteredFriends.length > 0 ? (
            <FriendList friends={filteredFriends} />
          ) : (
            <p className="text-sm text-gray-400 italic">No friends found.</p>
          )}
        </section>
      )}

      {/* Pending Friend Requests */}
      <section className="bg-gray-800 p-4 rounded-xl shadow space-y-3">
        <h2 className="text-lg font-semibold text-[var(--custom-gold)]">
          🔔 Pending Requests
        </h2>
        <p className="text-sm text-gray-400 italic">
          No pending requests at the moment.
        </p>
        {/* <PendingFriendRequests /> */}
      </section>

      {/* Invite to Tasting Party */}
      <div className="text-center">
        <button
          onClick={handleInviteClick}
          className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-6 rounded-xl shadow transition-all duration-300"
        >
          🎉 Invite to Tasting Party
        </button>
      </div>

      {showInviteModal && <InviteFriendModal onClose={handleCloseModal} />}

      {/* Back Navigation */}
      <div className="text-center mt-6">
        <a
          href="/dashboard"
          className="text-sm text-gray-300 underline hover:text-white"
        >
          ← Back to Dashboard
        </a>
      </div>
    </div>
  );
}
