import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";
import React from "react";
import Home from "./pages/Home";
import Tasting from "./pages/SingleTasting";
import NavBar from "./components/navigation/NavBar";
import Profile from "./pages/Profile";
import Showdown from "./pages/ShowdownTasting";

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tasting" element={<Tasting />} />
        <Route path="/showdown" element={<Showdown />} />
        {/* Add more routes here */}
      </Routes>
    </>
  );
}
export default App;
