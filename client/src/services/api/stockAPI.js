class StockAPI {
  constructor() {
    this.baseURL =
      process.env.REACT_APP_STOCK_API_URL || "https://api.polygon.io/v2";
    this.apiKey = process.env.REACT_APP_STOCK_API_KEY;
    this.cache = new Map();
    this.cacheTimeout = 60000; // 1 minute
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const cacheKey = `${url}_${JSON.stringify(options)}`;

    // Check cache first
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    try {
      const response = await fetch(`${url}?apikey=${this.apiKey}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Cache the response
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now(),
      });

      return data;
    } catch (error) {
      console.error("Stock API request failed:", error);
      throw error;
    }
  }

  async getStockPrice(symbol) {
    try {
      const response = await this.request(`/aggs/ticker/${symbol}/prev`);
      return response.results?.[0] || null;
    } catch (error) {
      console.error(`Failed to fetch price for ${symbol}:`, error);
      throw error;
    }
  }

  async getStockHistory(symbol, timespan = "day", from, to) {
    try {
      const response = await this.request(
        `/aggs/ticker/${symbol}/range/1/${timespan}/${from}/${to}`
      );
      return response.results || [];
    } catch (error) {
      console.error(`Failed to fetch history for ${symbol}:`, error);
      throw error;
    }
  }

  async getCompanyDetails(symbol) {
    try {
      const response = await this.request(`/reference/tickers/${symbol}`);
      return response.results || null;
    } catch (error) {
      console.error(`Failed to fetch details for ${symbol}:`, error);
      throw error;
    }
  }

  async getMarketNews(limit = 10) {
    try {
      const response = await this.request(`/reference/news?limit=${limit}`);
      return response.results || [];
    } catch (error) {
      console.error("Failed to fetch market news:", error);
      throw error;
    }
  }

  async searchTickers(search) {
    try {
      const response = await this.request(
        `/reference/tickers?search=${encodeURIComponent(search)}`
      );
      return response.results || [];
    } catch (error) {
      console.error("Failed to search tickers:", error);
      throw error;
    }
  }

  clearCache() {
    this.cache.clear();
  }
}

export const stockAPI = new StockAPI();
