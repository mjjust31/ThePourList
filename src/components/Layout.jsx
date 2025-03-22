import React from "react";

export default function Layout({ children }) {
  return (
    <div className="relative pt-[100px] px-4 bg-red-200 min-h-screen">
      {children}
    </div>
  );
}
