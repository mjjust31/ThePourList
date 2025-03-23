import React from "react";
import Avatar from "../assets/images/Avatar.png";
import NavSpacer from "../components/shared/layout/NavSpacer";
import UserDashboard from "../components/user/dashboard/UserDashboard"; // you'll customize this

export default function Profile() {
  return (
    <div className="profile-page px-6 py-10 max-w-[800px] mx-auto text-center bg-gray-800 rounded-lg shadow-lg">
      <NavSpacer />
      <h1 className="font-serif text-4xl text-[var(--custom-gold)] mb-8">
        My Pourfile
      </h1>

      {/* Profile picture */}
      <div className="profile-img mb-6">
        <img
          src={Avatar}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto border-4 border-[var(--custom-gold)]"
        />
      </div>

      {/* Welcome message */}
      <div className="user-info mb-6 text-white">
        <p className="text-xl mb-2">
          Name:{" "}
          <span className="font-semibold text-[var(--custom-gold)]">
            Welcome, User
          </span>
        </p>
      </div>

      {/* Main Dashboard */}
      <UserDashboard />
    </div>
  );
}
