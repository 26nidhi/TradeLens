// src/services/api.js - Complete API Service with Real-time
import { io } from "socket.io-client";

// ✅ Use deployed backend URL instead of localhost
const API_BASE_URL = "https://tradelens-7hio.onrender.com/api";
const SOCKET_URL = "https://tradelens-7hio.onrender.com";

class ApiService {
  constructor() {
    this.socket = null;
    this.subscribers = new Map();
  }

  // Initialize WebSocket connection
  initializeRealTime() {
    if (this.socket) return this.socket;

    // ✅ Connect socket to deployed server
    this.socket = io(SOCKET_URL, {
      transports: ["websocket"],
    });

    this.socket.on("connect", () => {
      console.log("Connected to real-time server");
    });

    this.socket.on("disconnect", () => {
      console.log("Disconnected from real-time server");
    });

    this.socket.on("price_update", (data) => {
      const callbacks = this.subscribers.get(data.symbol) || [];
      callbacks.forEach((callback) => callback(data));
    });

    return this.socket;
  }

  // Subscribe to real-time updates for a symbol
  subscribeToRealTime(symbol, callback) {
    this.initializeRealTime();

    if (!this.subscribers.has(symbol)) {
      this.subscribers.set(symbol, []);
      this.socket.emit("subscribe", symbol);
    }

    this.subscribers.get(symbol).push(callback);
  }

  // Unsubscribe from real-time updates
  unsubscribeFromRealTime(symbol, callback) {
    if (!this.subscribers.has(symbol)) return;

    const callbacks = this.subscribers.get(symbol);
    const index = callbacks.indexOf(callback);
    if (index > -1) {
      callbacks.splice(index, 1);
    }

    if (callbacks.length === 0) {
      this.subscribers.delete(symbol);
      if (this.socket) {
        this.socket.emit("unsubscribe", symbol);
      }
    }
  }

  async fetchCompanies() {
    try {
      const response = await fetch(`${API_BASE_URL}/companies`);
      if (!response.ok) throw new Error("Failed to fetch companies");
      return await response.json();
    } catch (error) {
      console.error("Error fetching companies:", error);
      throw error;
    }
  }

  async fetchStockData(symbol) {
    try {
      const response = await fetch(`${API_BASE_URL}/stocks/${symbol}`);
      if (!response.ok)
        throw new Error(`Failed to fetch stock data for ${symbol}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching stock data for ${symbol}:`, error);
      throw error;
    }
  }

  async fetchRealTimePrice(symbol) {
    try {
      const response = await fetch(`${API_BASE_URL}/realtime/${symbol}`);
      if (!response.ok)
        throw new Error(`Failed to fetch real-time data for ${symbol}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching real-time data for ${symbol}:`, error);
      throw error;
    }
  }

  async populateMockData() {
    try {
      const response = await fetch(`${API_BASE_URL}/mock-data`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to populate mock data");
      return await response.json();
    } catch (error) {
      console.error("Error populating mock data:", error);
      throw error;
    }
  }
}

export default new ApiService();
