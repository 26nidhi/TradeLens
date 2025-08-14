// src/components/Sidebar.jsx
import React from "react";

/**
 * Props:
 * - companies: Array<{ symbol: string, name: string }>
 * - selected:  { symbol: string, name: string } | null
 * - onSelect:  (company) => void
 */
export default function Sidebar({ companies = [], selected, onSelect }) {
  return (
    <aside className="sidebar">
      <div className="sidebar__title">Companies</div>

      <div className="sidebar__list">
        {companies.length === 0 && (
          <div style={{ padding: "10px", color: "#64748b" }}>
            No companies loaded.
          </div>
        )}

        {companies.map((c) => {
          const active = selected?.symbol === c.symbol;
          return (
            <div
              key={c.symbol}
              className={`company-item ${active ? "company-item--active" : ""}`}
              onClick={() => onSelect?.(c)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onSelect?.(c);
              }}
              title={`${c.name} (${c.symbol})`}
            >
              <span>{c.name}</span>
              <span style={{ marginLeft: "auto", opacity: 0.7 }}>
                {c.symbol}
              </span>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
