import React from "react";

const getAudienceIcon = (idx) => {
  if (idx === 0) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
      </svg>
    );
  }
  if (idx === 1) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 11H5a2 2 0 00-2 2v7a2 2 0 002 2h4M9 11V7a2 2 0 012-2h2a2 2 0 012 2v4M9 11h6m0 0h4a2 2 0 012 2v7a2 2 0 01-2 2h-4m0-11v11" />
      </svg>
    );
  }
  if (idx === 2) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <path d="M20 8v6M23 11h-6" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 20V10M18 20V4M6 20v-4" />
    </svg>
  );
};

const WhoShouldJoin = ({ data }) => {
  return (
    <div className="audience-grid">
      {data.who_should_join?.map((audience, idx) => (
        <div key={idx} className="audience-item">
          <div className="audience-icon">
            {getAudienceIcon(idx)}
          </div>
          <div>
            <h3>{audience.title}</h3>
            <p>{audience.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WhoShouldJoin;
