import React from "react";

const LoadingSpinner = ({ message = "Loading premium market data..." }) => (
  <div className="flex items-center justify-center py-16">
    <div className="relative">
      <div className="w-12 h-12 rounded-full border-4 border-purple-500/30 border-t-purple-500 animate-spin"></div>
      <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-transparent border-r-pink-500 animate-spin animate-reverse animation-delay-150"></div>
    </div>
    <span className="ml-4 text-gray-300 text-lg">{message}</span>
  </div>
);
