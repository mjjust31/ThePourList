import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import { DrinkProvider } from "./contexts/DrinkContext"; // Import DrinkProvider
import Home from "./pages/user/Home";
import NavBar from "./components/shared/layout/NavBar";
import SingleTaste from "./pages/user/profile/SingleTasting";
import Profile from "./pages/user/profile/Profile";
import Showdown from "./pages/user/profile/ShowdownTasting";
import Friends from "./pages/user/profile/Friendship";
import Inventory from "./pages/user/inventory/Inventory";
import ToTasteDashboard from "./pages/user/inventory/ToTasteDashboard";

import "./index.css";


function App() {
  return (
    <DrinkProvider>
      {" "}
      {/* Wrap the app with DrinkProvider */}
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/single" element={<SingleTaste />} />
        <Route path="/showdown" element={<Showdown />} />
        <Route path="/profile/friends" element={<Friends />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/inventory/to-taste" element={<ToTasteDashboard />} />

        {/* Add more routes here */}
      </Routes>
    </DrinkProvider>
  );
}

export default App;
