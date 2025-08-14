import React from "react";
import CompanyAvatar from "../common/CompanyAvatar";

const CompanyListItem = ({ company, isSelected, onClick, index }) => (
  <div
    onClick={() => onClick(company)}
    className={`p-5 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:bg-white/10 group ${
      isSelected
        ? "bg-gradient-to-r from-white/20 to-white/10 border-l-4 border-l-purple-500 shadow-lg"
        : ""
    }`}
    style={{ animationDelay: `${index * 50}ms` }}
  >
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <CompanyAvatar company={company} />
        <div>
          <h3 className="font-bold text-white text-lg group-hover:text-purple-200 transition-colors">
            {company.symbol}
          </h3>
          <p className="text-gray-300 text-sm mt-1 group-hover:text-gray-200 transition-colors">
            {company.name}
          </p>
          <div className="flex items-center mt-1">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
              {company.sector}
            </p>
          </div>
        </div>
      </div>
      {isSelected && (
        <div className="w-3 h-3 bg-purple-500 rounded-full shadow-lg animate-pulse"></div>
      )}
    </div>
  </div>
);

export default CompanyListItem;
