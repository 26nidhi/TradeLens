// src/pages/StockDashboard.jsx
import React, { useState, useEffect } from "react";
import AnimatedBackground from "../components/common/AnimatedBackground";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import CompanyList from "../components/dashboard/CompanyList";
import StockInfoCard from "../components/dashboard/StockInfoCard";
import StockChart from "../components/dashboard/StockChart";
import StatisticsGrid from "../components/dashboard/StatisticsGrid";
import CustomStyles from "../components/layout/CustomStyles";
import { companies } from "../data/companies";
import { generateMockStockData } from "../data/mockDataGenerator";

const StockDashboard = () => {
  const [selectedStock, setSelectedStock] = useState(companies[0]);
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Simulate fetching stock data
  const fetchStockData = async (symbol) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    const data = generateMockStockData(symbol);
    setStockData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchStockData(selectedStock.symbol);
  }, [selectedStock]);

  const getCurrentPrice = () => {
    if (stockData.length === 0) return 0;
    return stockData[stockData.length - 1].close;
  };

  const getPriceChange = () => {
    if (stockData.length < 2) return { change: 0, percentage: 0 };
    const current = stockData[stockData.length - 1].close;
    const previous = stockData[stockData.length - 2].close;
    const change = current - previous;
    const percentage = (change / previous) * 100;
    return { change, percentage };
  };

  const currentPrice = getCurrentPrice();
  const priceChange = getPriceChange();

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          <DashboardHeader />

          <div className="flex gap-8 h-auto">
            <CompanyList
              companies={companies}
              selectedStock={selectedStock}
              onSelectStock={setSelectedStock}
            />

            <div className="flex-1 space-y-8">
              <StockInfoCard
                selectedStock={selectedStock}
                loading={loading}
                currentPrice={currentPrice}
                priceChange={priceChange}
              />

              {!loading && stockData.length > 0 && (
                <>
                  <StockChart
                    stockData={stockData}
                    symbol={selectedStock.symbol}
                    companyName={selectedStock.name}
                    company={selectedStock}
                  />
                  <StatisticsGrid stockData={stockData} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <CustomStyles />
    </div>
  );
};

export default StockDashboard;
