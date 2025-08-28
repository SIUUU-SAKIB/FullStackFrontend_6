import React from "react";

const RegLoader = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-white/70 fixed top-0 left-0 z-50">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-700 font-medium">Registering your account...</p>
      </div>
    </div>
  );
};

export default RegLoader;
