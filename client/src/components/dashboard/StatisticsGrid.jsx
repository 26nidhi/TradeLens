import React from "react";
import StatisticCard from "./StatisticCard";

const StatisticsGrid = ({ stockData }) => {
  if (!stockData || stockData.length === 0) return null;

  const latestData = stockData[stockData.length - 1];
  const minPrice = Math.min(...stockData.map((d) => d.low));
  const maxPrice = Math.max(...stockData.map((d) => d.high));

  const statistics = [
    {
      title: "Today's High",
      value: `$${latestData.high.toFixed(2)}`,
      gradient: "from-green-400 to-green-600",
      icon: (
        <path
          fillRule="evenodd"
          d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      ),
    },
    {
      title: "Today's Low",
      value: `$${latestData.low.toFixed(2)}`,
      gradient: "from-red-400 to-red-600",
      iconRotation: "rotate-180",
      icon: (
        <path
          fillRule="evenodd"
          d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      ),
    },
    {
      title: "Volume",
      value: `${(latestData.volume / 1000000).toFixed(1)}M`,
      gradient: "from-blue-400 to-blue-600",
      icon: (
        <path
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ),
    },
    {
      title: "30-Day Range",
      value: `$${minPrice.toFixed(0)} - $${maxPrice.toFixed(0)}`,
      gradient: "from-purple-400 to-pink-600",
      icon: (
        <path
          fillRule="evenodd"
          d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
          clipRule="evenodd"
        />
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up">
      {statistics.map((stat, index) => (
        <StatisticCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default StatisticsGrid;
