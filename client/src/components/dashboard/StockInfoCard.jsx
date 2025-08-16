// src/components/dashboard/StockInfoCard.jsx
import React from "react";
import CompanyAvatar from "../common/CompanyAvatar";
import LoadingSpinner from "../common/LoadingSpinner";
import PriceChangeIndicator from "../common/PriceChangeIndicator";

const StockInfoCard = ({
  selectedStock,
  loading,
  currentPrice,
  priceChange,
}) => (
  <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8">
    <div className="flex justify-between items-start mb-6">
      <div className="flex items-center space-x-4">
        <CompanyAvatar company={selectedStock} size="w-16 h-16" />
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">
            {selectedStock.name}
          </h2>
          <div className="flex items-center space-x-3">
            <span className="text-gray-300 text-lg">
              {selectedStock.symbol}
            </span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-xs text-gray-200 backdrop-blur-sm">
              {selectedStock.sector}
            </span>
          </div>
        </div>
      </div>

      {!loading && (
        <div className="text-right">
          <div className="text-4xl font-bold text-white mb-2 animate-pulse">
            ${currentPrice.toFixed(2)}
          </div>
          <PriceChangeIndicator
            change={priceChange.change}
            percentage={priceChange.percentage}
          />
        </div>
      )}
    </div>

    {loading && <LoadingSpinner />}
  </div>
);

export default StockInfoCard;
