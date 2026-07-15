import React from "react";

const getRelatedIcon = (idx) => {
  if (idx === 0) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21.21 15.89A10 10 0 118 2.83M22 12A10 10 0 0012 2v10z"/>
      </svg>
    );
  }
  if (idx === 1) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M3 9h18M9 21V9"/>
      </svg>
    );
  }
  if (idx === 2) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 20.5v-1a4 4 0 00-4-4H7a4 4 0 00-4 4v1"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 20.5v-1a4 4 0 00-3-3.87"/>
      <path d="M16 3.13a4 4 0 010 7.75"/>
    </svg>
  );
};

const Related = () => {
  const relatedList = [
    {
      title: "Power BI Fundamentals",
      link: "/courses/power-bi"
    },
    {
      title: "Excel with Copilot",
      link: "/courses/excel-copilot"
    },
    {
      title: "Azure AI Fundamentals",
      link: "/courses/azure-ai"
    },
    {
      title: "Teams for Business",
      link: "/courses/teams"
    }
  ];

  return (
    <div className="related-scroll">
      {relatedList.map((item, idx) => (
        <div key={idx} className="related-card">
          <div className="icon-badge tint-blue">
            {getRelatedIcon(idx)}
          </div>
          <h3>{item.title}</h3>
          <span className="related-price">Free to learn</span>
          <span className="related-price-sub">Certify: &#8377;2,499+GST (indicative)</span>
          <a href={item.link} className="btn btn-secondary">View course</a>
        </div>
      ))}
    </div>
  );
};

export default Related;
