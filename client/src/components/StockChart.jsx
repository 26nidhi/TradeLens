// src/components/StockChart.jsx
import React from "react";
import Plot from "react-plotly.js";

/**
 * Props:
 * - data: Array<{ date: string, price: number }>
 * - companyName: string
 */
export default function StockChart({ data = [], companyName = "" }) {
  if (!data.length) {
    return (
      <div style={{ textAlign: "center", padding: "20px", color: "#64748b" }}>
        Select a company to view its stock chart.
      </div>
    );
  }

  const dates = data.map((item) => item.date);
  const prices = data.map((item) => item.price);

  return (
    <div className="stock-chart">
      <Plot
        data={[
          {
            x: dates,
            y: prices,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "#2563eb" },
            line: { shape: "spline" },
          },
        ]}
        layout={{
          title: `${companyName} Stock Price`,
          xaxis: { title: "Date" },
          yaxis: { title: "Price (USD)" },
          autosize: true,
          margin: { t: 40, r: 20, l: 50, b: 50 },
        }}
        style={{ width: "100%", height: "100%" }}
        useResizeHandler={true}
      />
    </div>
  );
}
