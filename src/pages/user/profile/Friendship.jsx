import React, { useState } from "react";
import NavSpacer from "../../../components/shared/layout/NavSpacer";
import FriendList from "../../../components/user/friends/FriendList";
import AddFriendButton from "../../../components/user/friends/AddFriendButton";
import InviteFriendModal from "../../../components/user/friends/InviteFriendModal";
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
    <div className="p-4 max-w-2xl mx-auto text-white space-y-8">
      <NavSpacer />

      {/* Back to Dashboard */}
      <div>
        <a
          href="/dashboard"
          className="text-sm text-gray-400 underline hover:text-white">
          ← Back to Dashboard
        </a>
      </div>

      {/* Title and Subtitle */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-pink-400">
          Friendship Management
        </h1>
        <p className="text-gray-300 text-sm">
          You have <span className="font-semibold">{mockFriends.length}</span>{" "}
          friends
        </p>
      </div>

      {/* Search + Add Friend */}
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Search Section */}
        <div className="flex-1 space-y-2">
          <label htmlFor="search" className="block text-sm font-semibold">
            Search Friends
          </label>
          <input
            id="search"
            type="text"
            placeholder="Start typing a username"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

          {/* Search Results */}
          {searchTerm && (
            <div className="bg-gray-800 p-3 mt-2 rounded-xl shadow space-y-2">
              <h3 className="text-sm font-semibold text-[var(--custom-gold)]">
                Search Results
              </h3>
              {filteredFriends.length > 0 ? (
                <FriendList friends={filteredFriends} />
              ) : (
                <p className="text-sm text-gray-400 italic">
                  No friends found.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Add Friend */}
        <div className="flex-1 space-y-2">
          <label className="block text-sm font-semibold">Add a Friend</label>
          <AddFriendButton />
        </div>
      </div>

      {/* Pending Requests */}
      <section className="bg-gray-800 p-4 rounded-xl shadow space-y-3">
        <h2 className="text-lg font-semibold text-[var(--custom-gold)]">
          Pending Friend Requests
        </h2>
        <p className="text-sm text-gray-400 italic">
          No pending requests at the moment.
        </p>
        {/* <PendingFriendRequests /> */}
      </section>

      {/* Invite to Party */}
      <div className="space-y-3 text-center">
        <h2 className="text-xl font-semibold text-pink-300">
          Invite Friends to a Party!
        </h2>
        <button
          onClick={handleInviteClick}
          className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-6 rounded-xl shadow transition-all duration-300">
          🎉 Invite to Tasting Party
        </button>
        {showInviteModal && <InviteFriendModal onClose={handleCloseModal} />}
      </div>
    </div>
  );
}
