import React from "react";

const getIconSvg = (iconName) => {
  const normName = iconName?.toLowerCase() || "";
  if (normName === "star") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.6 7-6.2-3.9-6.2 3.9 1.6-7L2 9.5l7.1-.6z" />
      </svg>
    );
  }
  if (normName === "settings") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    );
  }
  if (normName === "edit") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 20h9M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4z" />
      </svg>
    );
  }
  if (normName === "mic") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
        <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" />
      </svg>
    );
  }
  if (normName === "chart") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21.21 15.89A10 10 0 118 2.83M22 12A10 10 0 0012 2v10z" />
      </svg>
    );
  }
  if (normName === "lightning") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    );
  }
  if (normName === "search") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    );
  }
  if (normName === "target") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    );
  }
  if (normName === "map") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
        <line x1="8" y1="2" x2="8" y2="18" />
        <line x1="16" y1="6" x2="16" y2="22" />
      </svg>
    );
  }
  
  if (normName === "checklist") {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g id="SVGRepo_iconCarrier">
        <path
          d="M2 5.5L3.21429 7L7.5 3"
          stroke="#3b60d8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity="0.5"
          d="M2 12.5L3.21429 14L7.5 10"
          stroke="#3b60d8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 19.5L3.21429 21L7.5 17"
          stroke="#3b60d8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 19L12 19"
          stroke="#3b60d8"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          opacity="0.5"
          d="M22 12L12 12"
          stroke="#3b60d8"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M22 5L12 5"
          stroke="#3b60d8"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

if (normName === "experiment") {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M10 2v7.31a2 2 0 01-.29.98L4.14 19.4A2 2 0 005.86 22h12.28a2 2 0 001.72-2.6l-5.57-9.11a2 2 0 01-.29-.98V2" />
      <path d="M8.5 2h7" />
      <path d="M7 16h10" />
    </svg>
  );
}

if (normName === "rocket") {
  return (
    <svg
      fill="#3b60d8"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g id="SVGRepo_iconCarrier">
        <path d="M2.67 10.73a3.52 3.52 0 0 0-.94 1.93 5 5 0 0 0-.07 1.1v.58h.8a5.05 5.05 0 0 0 .88-.08 3.46 3.46 0 0 0 1.93-.94 1.76 1.76 0 0 0-.14-2.48 1.76 1.76 0 0 0-2.46-.11zm1.74 1.73a2.26 2.26 0 0 1-1.26.6h-.22v-.22a2.26 2.26 0 0 1 .6-1.26.36.36 0 0 1 .24-.08.67.67 0 0 1 .47.22.54.54 0 0 1 .17.74zM14.65 2.24a.91.91 0 0 0-.89-.89A8.75 8.75 0 0 0 7.27 3.5L5.64 5.4l-2.4-.5a1 1 0 0 0-.92.27l-.68.68a1 1 0 0 0-.28.81 1 1 0 0 0 .45.74l2.06 1.32.13.08 3.2 3.25.08.08 1.32 2.06a1 1 0 0 0 .74.45h.11a1 1 0 0 0 .7-.29l.68-.68a1 1 0 0 0 .27-.92l-.5-2.39 1.84-1.58a8.79 8.79 0 0 0 2.21-6.54zM3.11 6.15l1.32.28-.64.75-1-.67zm6.38 7.1-.67-1 .75-.64.28 1.32zm2.39-5.11.18.17zm-.28-.28L7.92 11 5 8.08 8.14 4.4a7.44 7.44 0 0 1 5.26-1.8 7.48 7.48 0 0 1-1.8 5.26zM11.13 6.63a1.19 1.19 0 0 0-.06-1.7 1.16 1.16 0 1 0-1.64 1.63 1.2 1.2 0 0 0 1.7.07z" />
      </g>
    </svg>
  );
}

return null;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
};

const WhatYouWillLearn = ({ data }) => {
  return (
    <div className="learn-grid">
      {data.what_you_will_learn?.map((item, idx) => (
        <div key={idx} className="learn-card">
          <div className="icon-badge tint-blue">
            {getIconSvg(item.icon_name)}
          </div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default WhatYouWillLearn;
