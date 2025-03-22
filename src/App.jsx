import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css';
import React from 'react';
import Home from './pages/Home';
import Tasting from './pages/SingleTasting';
import NavBar from './components/NavBar';
import Profile from './pages/Profile';
import MultiTasting from './pages/MultiTasting'



function App() {
  return (
    <>
      <NavBar />
      <div className="bg-green-500 text-white text-xl p-4 rounded">
  Tailwind is working ✅
</div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/tasting" element={<Tasting />} />
        <Route path="/multi-tasting" element={MultiTasting}></Route>
        {/* Add more routes here */}
      </Routes>
    </>
  );
}
export default App;
