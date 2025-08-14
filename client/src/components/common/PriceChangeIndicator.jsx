import React from "react";

const PriceChangeIndicator = ({ change, percentage }) => (
  <div
    className={`text-lg font-bold flex items-center justify-end ${
      change >= 0 ? "text-green-400" : "text-red-400"
    }`}
  >
    <svg
      className={`w-5 h-5 mr-1 ${change >= 0 ? "rotate-0" : "rotate-180"}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      />
    </svg>
    {change >= 0 ? "+" : ""}${Math.abs(change).toFixed(2)} (
    {Math.abs(percentage).toFixed(2)}%)
  </div>
);

export default PriceChangeIndicator;
