// src/components/CompanyDetails.jsx
import React from "react";
import "./CompanyDetails.css";

/**
 * Props:
 * - company: {
 *     name: string,
 *     symbol: string,
 *     sector: string,
 *     industry: string,
 *     description: string,
 *     marketCap: number,
 *     ceo: string
 *   }
 */
export default function CompanyDetails({ company }) {
  if (!company) {
    return (
      <div className="company-details-placeholder">
        Select a company to view details.
      </div>
    );
  }

  return (
    <div className="company-details">
      <h2>
        {company.name} ({company.symbol})
      </h2>
      <p>
        <strong>Sector:</strong> {company.sector}
      </p>
      <p>
        <strong>Industry:</strong> {company.industry}
      </p>
      <p>
        <strong>CEO:</strong> {company.ceo || "N/A"}
      </p>
      <p>
        <strong>Market Cap:</strong> $
        {company.marketCap?.toLocaleString() || "N/A"}
      </p>
      <p className="description">
        {company.description || "No description available."}
      </p>
    </div>
  );
}
