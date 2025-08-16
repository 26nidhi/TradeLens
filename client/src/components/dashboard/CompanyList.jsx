// src/components/dashboard/CompanyList.jsx
import React from "react";
import CompanyListItem from "./CompanyListItem";

const CompanyList = ({ companies, selectedStock, onSelectStock }) => (
  <div className="w-96 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
    <div className="p-6 border-b border-white/10 bg-gradient-to-r from-purple-600/20 to-pink-600/20">
      <h2 className="text-2xl font-bold text-white mb-2">Companies</h2>
      <p className="text-gray-300">
        Select a company to explore its market data
      </p>
    </div>

    <div className="overflow-y-auto max-h-[600px] custom-scrollbar">
      {companies.map((company, index) => (
        <CompanyListItem
          key={company.symbol}
          company={company}
          isSelected={selectedStock.symbol === company.symbol}
          onClick={onSelectStock}
          index={index}
        />
      ))}
    </div>
  </div>
);

export default CompanyList;
