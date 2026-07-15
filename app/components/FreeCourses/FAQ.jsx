import React from "react";

const FAQ = ({ data }) => {
  return (
    <div className="faq-list">
      {data.faq?.map((item, idx) => (
        <details key={idx} className="faq-item">
          <summary className="faq-item-summary-btn">
            <span className="faq-item-summary-title">{item.question}</span>
            <svg
              className="chevron"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </summary>
          <div className="faq-answer">
            <p>{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
};

export default FAQ;
