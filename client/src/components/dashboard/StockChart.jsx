import React from "react";
import Plot from "react-plotly.js";

const StockChart = ({ stockData, symbol, companyName, company }) => {
  if (!stockData || stockData.length === 0) return null;

  const trace = {
    x: stockData.map((d) => d.date),
    y: stockData.map((d) => d.close),
    type: "scatter",
    mode: "lines",
    name: `${symbol} Price`,
    line: {
      color: company.color,
      width: 3,
      shape: "spline",
    },
    fill: "tonexty",
    fillcolor: `${company.color}20`,
    hovertemplate:
      "<b>%{fullData.name}</b><br>Date: %{x}<br>Price: $%{y:.2f}<extra></extra>",
    hoverlabel: {
      bgcolor: company.color,
      bordercolor: company.color,
      font: { color: "white", size: 14 },
    },
  };

  const layout = {
    title: {
      text: `${companyName} (${symbol})`,
      font: {
        size: 24,
        color: "#F8FAFC",
        family: "Inter, sans-serif",
        weight: 600,
      },
    },
    xaxis: {
      title: { text: "Date", font: { color: "#CBD5E1", size: 14 } },
      gridcolor: "#334155",
      tickcolor: "#64748B",
      tickfont: { color: "#94A3B8", size: 12 },
      showgrid: true,
      zeroline: false,
    },
    yaxis: {
      title: { text: "Price ($)", font: { color: "#CBD5E1", size: 14 } },
      gridcolor: "#334155",
      tickcolor: "#64748B",
      tickfont: { color: "#94A3B8", size: 12 },
      tickformat: "$.2f",
      showgrid: true,
      zeroline: false,
    },
    plot_bgcolor: "rgba(0,0,0,0)",
    paper_bgcolor: "rgba(0,0,0,0)",
    font: { color: "#F1F5F9", family: "Inter, sans-serif" },
    margin: { t: 80, b: 60, l: 80, r: 40 },
    showlegend: false,
    hovermode: "x unified",
  };

  const config = {
    responsive: true,
    displayModeBar: false,
  };

  return (
    <div className="w-full h-96 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-fade-in">
      <Plot
        data={[trace]}
        layout={layout}
        config={config}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default StockChart;
