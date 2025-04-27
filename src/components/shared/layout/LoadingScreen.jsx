// src/components/shared/layout/LoadingScreen.jsx
import { useState, useEffect } from "react";
import WineTrivia from "../data/WineTrivia";

export default function LoadingScreen({ onComplete }) {
  const [countdown, setCountdown] = useState(10);
  const [currentTrivia, setCurrentTrivia] = useState("");

  useEffect(() => {
    // 🧠 Show first trivia immediately when component mounts
    const firstIndex = Math.floor(Math.random() * WineTrivia.length);
    setCurrentTrivia(WineTrivia[firstIndex]);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer); // 🛠 Stop countdown at 0
          onComplete(); // 🛠 Move to next phase immediately
          return 0; // 🛠 Clamp countdown at 0
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Clean up if component unmounts
  }, [onComplete]);

  useEffect(() => {
    // 🧠 Update trivia every 10 seconds (except first trivia already shown)
    if (countdown % 10 === 0 && countdown !== 60 && countdown !== 0) {
      const randomIndex = Math.floor(Math.random() * WineTrivia.length);
      setCurrentTrivia(WineTrivia[randomIndex]);
    }
  }, [countdown]);

  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-6">
      <h1 className="text-4xl font-bold text-rose-700">⏳ Sip & Savor...</h1>
      <p className="text-gray-500 text-lg">Enjoy your tasting moment!</p>
      <p className="text-5xl font-bold text-rose-800">{countdown}s</p>
      <p className="text-rose-600 text-lg max-w-md">{currentTrivia}</p>
    </div>
  );
}
