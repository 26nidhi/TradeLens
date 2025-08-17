// server.js


import express from "express";
import cors from "cors";
import pkg from "pg";
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;
const port = process.env.PORT
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DB,
});

// ========================================
// REAL-TIME DATA FUNCTIONS
// ========================================

// Store current prices in memory for real-time updates
let currentPrices = new Map();

// Function to get real stock data from Alpha Vantage API (FREE)
const fetchRealStockData = async (symbol) => {
  try {
    // FREE API - get one from: https://www.alphavantage.co/support/#api-key
    const API_KEY = process.env.API_KEY; // Replace with your free key
    const response = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
    );
    const data = await response.json();
    
    if (data['Global Quote']) {
      const quote = data['Global Quote'];
      return {
        symbol: quote['01. symbol'],
        price: parseFloat(quote['05. price']),
        change: parseFloat(quote['09. change']),
        changePercent: quote['10. change percent'].replace('%', ''),
        volume: parseInt(quote['06. volume']),
        lastUpdate: new Date().toISOString()
      };
    }
    return null;
  } catch (error) {
    console.error(`Error fetching real data for ${symbol}:`, error);
    return null;
  }
};

// Function to simulate real-time price updates (if no API key)
const simulateRealTimeUpdate = (symbol) => {
  const currentPrice = currentPrices.get(symbol) || 100;
  const change = (Math.random() - 0.5) * currentPrice * 0.02; // 2% max change
  const newPrice = Math.max(currentPrice + change, 1);
  
  currentPrices.set(symbol, newPrice);
  
  return {
    symbol,
    price: newPrice,
    change: change,
    changePercent: ((change / currentPrice) * 100).toFixed(2),
    volume: Math.floor(Math.random() * 1000000) + 100000,
    lastUpdate: new Date().toISOString()
  };
};

// ========================================
// API ENDPOINTS
// ========================================

// GET company list
app.get("/api/companies", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM companies ORDER BY name ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// GET historical stock data for a symbol
app.get("/api/stocks/:symbol", async (req, res) => {
  const { symbol } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM stock_data WHERE symbol = $1 ORDER BY date ASC",
      [symbol]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// GET real-time price for a symbol
app.get("/api/realtime/:symbol", async (req, res) => {
  const { symbol } = req.params;
  try {
    // Try to get real data first, fallback to simulation
    let realTimeData = await fetchRealStockData(symbol);
    if (!realTimeData) {
      realTimeData = simulateRealTimeUpdate(symbol);
    }
    res.json(realTimeData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching real-time data" });
  }
});

// POST endpoint to start real-time updates for a symbol
app.post("/api/start-realtime/:symbol", (req, res) => {
  const { symbol } = req.params;
  console.log(`Starting real-time updates for ${symbol}`);
  res.json({ message: `Real-time updates started for ${symbol}` });
});

// Insert mock data (enhanced)
app.post("/api/mock-data", async (req, res) => {
  const companies = [
    [
      "AAPL",
      "Apple Inc.",
      "Technology",
      "#007AFF",
      "from-blue-500 to-blue-600",
    ],
    [
      "GOOGL",
      "Alphabet Inc.",
      "Technology",
      "#EA4335",
      "from-red-500 to-pink-600",
    ],
    [
      "MSFT",
      "Microsoft Corp.",
      "Technology",
      "#00BCF2",
      "from-cyan-500 to-blue-600",
    ],
    [
      "AMZN",
      "Amazon.com Inc.",
      "E-Commerce",
      "#FF9900",
      "from-orange-500 to-yellow-600",
    ],
    ["TSLA", "Tesla Inc.", "Automotive", "#CC0000", "from-red-600 to-red-700"],
    [
      "META",
      "Meta Platforms Inc.",
      "Social Media",
      "#1877F2",
      "from-blue-600 to-indigo-600",
    ],
    [
      "NFLX",
      "Netflix Inc.",
      "Entertainment",
      "#E50914",
      "from-red-600 to-pink-600",
    ],
    [
      "NVDA",
      "NVIDIA Corp.",
      "Technology",
      "#76B900",
      "from-green-500 to-emerald-600",
    ],
    [
      "AMD",
      "Advanced Micro Devices",
      "Technology",
      "#ED1C24",
      "from-red-500 to-red-600",
    ],
    [
      "INTC",
      "Intel Corp.",
      "Technology",
      "#0071C5",
      "from-blue-600 to-blue-700",
    ],
    [
      "BABA",
      "Alibaba Group",
      "E-Commerce",
      "#FF6A00",
      "from-orange-500 to-orange-600",
    ],
    [
      "CRM",
      "Salesforce Inc.",
      "Technology",
      "#00A1E0",
      "from-sky-500 to-blue-600",
    ],
    [
      "ORCL",
      "Oracle Corp.",
      "Technology",
      "#F80000",
      "from-red-600 to-red-700",
    ],
    [
      "IBM",
      "IBM Corp.",
      "Technology",
      "#1261FE",
      "from-blue-700 to-indigo-700",
    ],
    [
      "PYPL",
      "PayPal Holdings",
      "Fintech",
      "#0070BA",
      "from-blue-600 to-cyan-600",
    ],
  ];

  try {
    // Clear and insert companies
    await pool.query("DELETE FROM stock_data");
    await pool.query("DELETE FROM companies");

    for (let c of companies) {
      await pool.query(
        "INSERT INTO companies (symbol, name, sector, color, bgGradient) VALUES ($1, $2, $3, $4, $5)",
        c
      );
      // Initialize current prices
      currentPrices.set(c[0], Math.random() * 500 + 50);
    }

    // Insert historical data (last 30 days)
    const today = new Date();
    for (let c of companies) {
      let price = currentPrices.get(c[0]);
      
      for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        if (date.getDay() === 0 || date.getDay() === 6) continue;
        
        price += (Math.random() - 0.5) * price * 0.03;
        price = Math.max(price, 10);

        await pool.query(
          "INSERT INTO stock_data (symbol, date, open, high, low, close, volume) VALUES ($1, $2, $3, $4, $5, $6, $7)",
          [
            c[0],
            date.toISOString().split("T")[0],
            (price * 0.999).toFixed(2),
            (price * 1.015).toFixed(2),
            (price * 0.985).toFixed(2),
            price.toFixed(2),
            Math.floor(Math.random() * 10000000) + 1000000
          ]
        );
      }
      // Update current price to latest historical price
      currentPrices.set(c[0], price);
    }

    res.json({ message: "Mock data with real-time initialization complete" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error inserting mock data" });
  }
});

// ========================================
// WEBSOCKET REAL-TIME UPDATES
// ========================================

io.on('connection', (socket) => {
  console.log('Client connected for real-time updates');
  
  socket.on('subscribe', (symbol) => {
    console.log(`Client subscribed to ${symbol}`);
    socket.join(`stock_${symbol}`);
    
    // Send current price immediately
    const currentData = simulateRealTimeUpdate(symbol);
    socket.emit('price_update', currentData);
  });
  
  socket.on('unsubscribe', (symbol) => {
    console.log(`Client unsubscribed from ${symbol}`);
    socket.leave(`stock_${symbol}`);
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Real-time price broadcaster (runs every 3 seconds)
setInterval(() => {
  currentPrices.forEach((price, symbol) => {
    const updateData = simulateRealTimeUpdate(symbol);
    io.to(`stock_${symbol}`).emit('price_update', updateData);
  });
}, 3000); // Update every 3 seconds

// Start server
server.listen(port, () => console.log(`Server with real-time updates running on port ${port}`));