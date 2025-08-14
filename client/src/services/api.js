import axios from "axios";

const API_KEY = "YOUR_ALPHA_VANTAGE_API_KEY"; // Get it from https://www.alphavantage.co
const BASE_URL = "https://www.alphavantage.co/query";

// Fetch daily stock price data
export const getStockData = async (symbol) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: "TIME_SERIES_DAILY_ADJUSTED",
        symbol: symbol,
        apikey: API_KEY,
      },
    });

    if (response.data["Time Series (Daily)"]) {
      return response.data["Time Series (Daily)"];
    } else {
      throw new Error(
        response.data["Note"] || "Invalid stock symbol or API limit reached"
      );
    }
  } catch (error) {
    console.error("Error fetching stock data:", error);
    throw error;
  }
};

// Fetch company overview
export const getCompanyOverview = async (symbol) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: "OVERVIEW",
        symbol: symbol,
        apikey: API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching company details:", error);
    throw error;
  }
};
