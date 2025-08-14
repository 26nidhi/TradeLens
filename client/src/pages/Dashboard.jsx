// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StockChart from "../components/StockChart";
import CompanyDetails from "../components/CompanyDetails";
import Footer from "../components/Footer";
import { fetchCompanies, fetchCompanyData } from "../services/api";
import "./Dashboard.css";

export default function Dashboard() {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    // Fetch all companies once
    fetchCompanies().then((data) => {
      setCompanies(data);
      setFilteredCompanies(data);
    });
  }, []);

  const handleSearch = (query) => {
    const filtered = companies.filter((c) =>
      c.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCompanies(filtered);
  };

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
    fetchCompanyData(company.symbol).then((data) => {
      setStockData(data);
    });
  };

  return (
    <div className="dashboard">
      <Sidebar
        companies={filteredCompanies}
        onCompanyClick={handleCompanyClick}
      />
      <div className="main-content">
        <Header onSearch={handleSearch} />
        {selectedCompany ? (
          <>
            <CompanyDetails company={selectedCompany} />
            <StockChart data={stockData} />
          </>
        ) : (
          <p>Select a company to view details</p>
        )}
        <Footer />
      </div>
    </div>
  );
}
