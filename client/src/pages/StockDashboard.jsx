// src/pages/StockDashboard.jsx - Complete Real-time Dashboard
import React, { useState, useEffect } from "react";
import AnimatedBackground from "../components/common/AnimatedBackground";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import CompanyList from "../components/dashboard/CompanyList";
import StockInfoCard from "../components/dashboard/StockInfoCard";
import RealTimePriceCard from "../components/dashboard/RealTimePriceCard";
import StockChart from "../components/dashboard/StockChart";
import StatisticsGrid from "../components/dashboard/StatisticsGrid";
import CustomStyles from "../components/layout/CustomStyles";
import ApiService from "../services/api";

const StockDashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [companiesLoading, setCompaniesLoading] = useState(true);
  const [error, setError] = useState(null);
  const [realTimeEnabled, setRealTimeEnabled] = useState(true);

  // Load companies on component mount
  useEffect(() => {
    loadCompanies();
  }, []);

  // Load stock data when selected stock changes
  useEffect(() => {
    if (selectedStock) {
      fetchStockData(selectedStock.symbol);
    }
  }, [selectedStock]);

  const loadCompanies = async () => {
    try {
      setCompaniesLoading(true);
      setError(null);

      // First try to get companies from database
      let companiesData = await ApiService.fetchCompanies();

      // If no companies exist, populate with mock data first
      if (companiesData.length === 0) {
        console.log("No companies found, populating mock data...");
        await ApiService.populateMockData();
        companiesData = await ApiService.fetchCompanies();
      }

      setCompanies(companiesData);
      if (companiesData.length > 0) {
        setSelectedStock(companiesData[0]); // Select first company by default
      }
    } catch (error) {
      setError(
        "Failed to load companies. Please make sure your backend server is running on port 5000."
      );
      console.error("Error loading companies:", error);
    } finally {
      setCompaniesLoading(false);
    }
  };

  const fetchStockData = async (symbol) => {
    try {
      setLoading(true);
      setError(null);
      const data = await ApiService.fetchStockData(symbol);

      // Transform database format to match frontend expectations
      const transformedData = data.map((row) => ({
        date: row.date,
        open: parseFloat(row.open),
        high: parseFloat(row.high),
        low: parseFloat(row.low),
        close: parseFloat(row.close),
        volume: parseInt(row.volume),
      }));

      setStockData(transformedData);
    } catch (error) {
      setError(`Failed to load stock data for ${symbol}`);
      console.error("Error fetching stock data:", error);
      setStockData([]); // Clear stock data on error
    } finally {
      setLoading(false);
    }
  };

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

  // Show loading state while companies are loading
  if (companiesLoading) {
    return (
      <div className="min-h-screen text-white relative overflow-hidden flex items-center justify-center">
        <AnimatedBackground />
        <div className="relative z-10">
          <div className="flex items-center justify-center py-16">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-purple-500/30 border-t-purple-500 animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-r-pink-500 animate-spin animate-reverse animation-delay-150"></div>
            </div>
            <div className="ml-6">
              <div className="text-gray-300 text-lg mb-2">
                Loading Market Data...
              </div>
              <div className="text-gray-400 text-sm">
                Connecting to database and real-time feeds
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && companies.length === 0) {
    return (
      <div className="min-h-screen text-white relative overflow-hidden flex items-center justify-center">
        <AnimatedBackground />
        <div className="relative z-10 text-center">
          <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-8 max-w-md backdrop-blur-xl">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-red-400 mb-4">
              Connection Error
            </h2>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              {error}
            </p>
            <div className="space-y-3">
              <button
                onClick={loadCompanies}
                className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors font-medium"
              >
                Retry Connection
              </button>
              <div className="text-xs text-gray-400">
                Make sure your backend is running:{" "}
                <code className="bg-gray-800 px-2 py-1 rounded">
                  npm run dev
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentPrice = getCurrentPrice();
  const priceChange = getPriceChange();

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          <DashboardHeader />

          {/* Real-time Status Bar */}
          <div className="mb-6 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    realTimeEnabled
                      ? "bg-green-400 animate-pulse"
                      : "bg-gray-400"
                  }`}
                ></div>
                <span className="text-sm text-white">
                  {realTimeEnabled ? "Real-time Active" : "Real-time Disabled"}
                </span>
              </div>
              <div className="text-xs text-gray-400">
                Market updates every 3 seconds
              </div>
            </div>

            <button
              onClick={() => setRealTimeEnabled(!realTimeEnabled)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                realTimeEnabled
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
              }`}
            >
              {realTimeEnabled ? "Pause Live Data" : "Enable Live Data"}
            </button>
          </div>

          {error && companies.length > 0 && (
            <div className="mb-6 bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-yellow-400 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-yellow-300 text-sm">{error}</p>
              </div>
            </div>
          )}

          <div className="flex gap-8 h-auto">
            {/* Company List Sidebar */}
            <CompanyList
              companies={companies}
              selectedStock={selectedStock}
              onSelectStock={setSelectedStock}
            />

            {/* Main Content Area */}
            <div className="flex-1 space-y-6">
              {/* Top Row: Stock Info + Real-time Price */}
              {selectedStock && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <StockInfoCard
                    selectedStock={selectedStock}
                    loading={loading}
                    currentPrice={currentPrice}
                    priceChange={priceChange}
                  />

                  {realTimeEnabled && (
                    <RealTimePriceCard selectedStock={selectedStock} />
                  )}
                </div>
              )}

              {/* Chart Section */}
              {!loading && stockData.length > 0 && selectedStock && (
                <StockChart
                  stockData={stockData}
                  symbol={selectedStock.symbol}
                  companyName={selectedStock.name}
                  company={selectedStock}
                />
              )}

              {/* Statistics Grid */}
              {!loading && stockData.length > 0 && selectedStock && (
                <StatisticsGrid stockData={stockData} />
              )}

              {/* No Data State */}
              {!loading &&
                stockData.length === 0 &&
                selectedStock &&
                !error && (
                  <div className="bg-gray-500/20 border border-gray-500/30 rounded-2xl p-8 text-center backdrop-blur-sm">
                    <svg
                      className="w-16 h-16 text-gray-400 mx-auto mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                    <h3 className="text-xl font-medium text-gray-300 mb-3">
                      No Historical Data Available
                    </h3>
                    <p className="text-gray-400 text-sm mb-6">
                      No historical data found for {selectedStock.symbol}
                    </p>
                    <button
                      onClick={() => loadCompanies()}
                      className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-sm font-medium"
                    >
                      Refresh Data
                    </button>
                  </div>
                )}

              {/* Loading State for Stock Data */}
              {loading && selectedStock && (
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 text-center">
                  <div className="flex items-center justify-center py-8">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full border-4 border-purple-500/30 border-t-purple-500 animate-spin"></div>
                      <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-transparent border-r-pink-500 animate-spin animate-reverse animation-delay-150"></div>
                    </div>
                    <span className="ml-4 text-gray-300 text-lg">
                      Loading {selectedStock.symbol} market data...
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-12 text-center text-gray-400 text-sm">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 inline-block">
              <div className="flex items-center justify-center space-x-6">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  <span>Real-time Updates</span>
                </div>
                <div className="w-px h-4 bg-gray-600"></div>
                <div>Historical Data from Database</div>
                <div className="w-px h-4 bg-gray-600"></div>
                <div>WebSocket Connected</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CustomStyles />
    </div>
  );
};

export default StockDashboard;
