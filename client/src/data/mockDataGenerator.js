export const generateMockStockData = (symbol, days = 30) => {
  const basePrice =
    {
      AAPL: 150,
      GOOGL: 2800,
      MSFT: 300,
      AMZN: 3200,
      TSLA: 800,
      META: 250,
      NFLX: 400,
      NVDA: 900,
      AMD: 120,
      INTC: 60,
      BABA: 90,
      CRM: 180,
    }[symbol] || 100;

  const data = [];
  let currentPrice = basePrice;
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    const change = (Math.random() - 0.5) * currentPrice * 0.05;
    currentPrice = Math.max(currentPrice + change, basePrice * 0.7);

    const dayHigh = currentPrice * (1 + Math.random() * 0.02);
    const dayLow = currentPrice * (1 - Math.random() * 0.02);
    const volume = Math.floor(Math.random() * 50000000) + 10000000;

    data.push({
      date: date.toISOString().split("T")[0],
      open: currentPrice * (0.99 + Math.random() * 0.02),
      high: dayHigh,
      low: dayLow,
      close: currentPrice,
      volume: volume,
    });
  }

  return data;
};
