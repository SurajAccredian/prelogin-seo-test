import React from "react";

const getWhyIcon = (idx) => {
  if (idx === 0) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    );
  }
  if (idx === 1) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="5" />
        <path d="M20 21a8 8 0 10-16 0" />
      </svg>
    );
  }
  if (idx === 2) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
};

const WhyThisCourse = ({ data }) => {
  return (
    <div className="why-panel">
      <div className="section-head">
        <span className="eyebrow">Why this course</span>
        <h2>Built on real Microsoft credentials, not just marketing claims</h2>
      </div>

      <div className="why-list">
        {data.why_this_course?.map((item, idx) => (
          <div key={idx} className="why-item">
            <div className="why-item-icon">
              {getWhyIcon(idx)}
            </div>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyThisCourse;
