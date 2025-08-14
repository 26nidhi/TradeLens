import React from "react";

const StatisticCard = ({ title, value, icon, gradient, iconRotation = "" }) => (
  <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
    <div className="flex items-center justify-between mb-4">
      <div
        className={`w-10 h-10 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center`}
      >
        <svg
          className={`w-5 h-5 text-white ${iconRotation}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          {icon}
        </svg>
      </div>
    </div>
    <h3 className="text-sm font-medium text-gray-400 mb-2">{title}</h3>
    <p className="text-2xl font-bold text-white">{value}</p>
  </div>
);

export default StatisticCard;
