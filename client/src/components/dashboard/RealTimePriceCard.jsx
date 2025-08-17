// src/components/dashboard/RealTimePriceCard.jsx
import React, { useState, useEffect } from "react";
import ApiService from "../../services/api";

const RealTimePriceCard = ({ selectedStock }) => {
  const [realTimeData, setRealTimeData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!selectedStock) return;

    const handleRealTimeUpdate = (data) => {
      setRealTimeData(data);
      setIsConnected(true);
    };

    // Subscribe to real-time updates
    ApiService.subscribeToRealTime(selectedStock.symbol, handleRealTimeUpdate);

    // Cleanup on unmount or symbol change
    return () => {
      ApiService.unsubscribeFromRealTime(
        selectedStock.symbol,
        handleRealTimeUpdate
      );
    };
  }, [selectedStock]);

  if (!realTimeData) {
    return (
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-white/10">
        <div className="flex items-center justify-center">
          <div className="animate-pulse flex space-x-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
          <span className="ml-3 text-white text-sm">
            Connecting to real-time data...
          </span>
        </div>
      </div>
    );
  }

  const isPositive = parseFloat(realTimeData.change) >= 0;

  return (
    <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg p-4 border border-white/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div
            className={`w-3 h-3 rounded-full animate-pulse ${
              isConnected ? "bg-green-400" : "bg-red-400"
            }`}
          ></div>
          <span className="text-white font-medium">Real-time Price</span>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">
            ${parseFloat(realTimeData.price).toFixed(2)}
          </div>
          <div
            className={`text-sm flex items-center ${
              isPositive ? "text-green-400" : "text-red-400"
            }`}
          >
            <svg
              className={`w-4 h-4 mr-1 ${isPositive ? "" : "rotate-180"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            ${Math.abs(parseFloat(realTimeData.change)).toFixed(2)} (
            {realTimeData.changePercent}%)
          </div>
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-400">
        Last updated: {new Date(realTimeData.lastUpdate).toLocaleTimeString()}
      </div>
    </div>
  );
};

export default RealTimePriceCard;
