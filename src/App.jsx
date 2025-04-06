import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import { DrinkProvider } from "./contexts/DrinkContext"; // Import DrinkProvider
import Home from "./pages/Home";
import NavBar from "./components/shared/layout/NavBar";
import SingleTaste from "./pages/SingleTasting";
import Profile from "./pages/Profile";
import Showdown from "./pages/ShowdownTasting";
import Friends from "./pages/Friendship";
import Inventory from "./pages/Inventory";
import "./index.css";

function App() {
  return (
    <DrinkProvider> {/* Wrap the app with DrinkProvider */}
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/single" element={<SingleTaste />} />
        <Route path="/showdown" element={<Showdown />} />
        <Route path="/profile/friends" element={<Friends />} />
        <Route path="/inventory" element={<Inventory />} />
        {/* Add more routes here */}
      </Routes>
    </DrinkProvider>
  );
}

export default App;
