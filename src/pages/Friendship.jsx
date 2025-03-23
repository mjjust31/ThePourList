import React, { useState } from "react";
import FriendList from "../components/user/friends/FriendList";
import AddFriendButton from "../components/user/friends/AddFriendButton";
import InviteFriendModal from "../components/user/friends/InviteFriendModal";
import NavSpacer from "../components/shared/layout/NavSpacer";



export default function Friendship() {
  const [showInviteModal, setShowInviteModal] = useState(false);

  const handleInviteClick = () => {
    setShowInviteModal(true);
  };

  const handleCloseModal = () => {
    setShowInviteModal(false);
  };

  return (
    <div className="p-4 max-w-md mx-auto text-white space-y-6">
      <NavSpacer/>
      <h1 className="text-2xl font-bold text-center text-[var(--custom-gold)]">
        My Friends
      </h1>

      {/* Add Friend Section */}
      <div className="bg-gray-800 p-4 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-2">Add a Friend</h2>
        <AddFriendButton />
      </div>

      {/* Friend List Section */}
      <div className="bg-gray-800 p-4 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-2">Your Friends</h2>
        <FriendList />
      </div>

      {/* Invite to Tasting Party */}
      <div className="text-center">
        <button
          onClick={handleInviteClick}
          className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-xl shadow transition-all duration-300"
        >
          Invite Friend to Tasting Party
        </button>
      </div>

      {/* Modal */}
      {showInviteModal && (
        <InviteFriendModal onClose={handleCloseModal} />
      )}

      {/* Navigation */}
      <div className="mt-6 text-center">
        <a
          href="/profile"
          className="text-[var(--custom-gold)] underline hover:text-white transition"
        >
          ← Back to Dashboard
        </a>
      </div>
    </div>
  );
}
