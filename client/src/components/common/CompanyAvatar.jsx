import React from "react";

const CompanyAvatar = ({ company, size = "w-12 h-12" }) => (
  <div
    className={`${size} rounded-xl bg-gradient-to-r ${company.bgGradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}
  >
    <span className="text-white font-bold text-lg">
      {company.symbol.charAt(0)}
    </span>
  </div>
);

export default CompanyAvatar;
