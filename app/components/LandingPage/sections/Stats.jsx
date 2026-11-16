"use client";

import React from "react";

export default function Stats({ data = [] }) {
  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <section className="stats">
      <div className="wrap">
        <div className="stats-grid">
          {data.map((stat, idx) => (
            <div className="stat" key={idx}>
              <b>{stat.value}</b>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

