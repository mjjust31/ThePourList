import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";
import React from "react";
import Home from "./pages/Home";
import NavBar from "./components/shared/layout/NavBar";
import SingleTaste from "./pages/SingleTasting";
import Profile from "./pages/Profile";
import Showdown from "./pages/ShowdownTasting";
import Friends from "./pages/Friendship"

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/single" element={<SingleTaste />} />
        <Route path="/showdown" element={<Showdown />} />
        <Route path="/profile/friends" element={<Friends/>} />
        {/* Add more routes here */}
      </Routes>
    </>
  );
}
export default App;
