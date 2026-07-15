import React from "react";

const Steps = ({ data }) => {
  return (
    <div className="steps-grid">
      {data.steps?.map((step, idx) => {
        const isPaid = step.type === "paid" || step.type === "paid_final";
        return (
          <div
            key={idx}
            className={`step-card ${isPaid ? "step-paid" : ""}`}
          >
            <span className="step-card-number">{step.number}</span>
            <div className="step-card-title-row">
              <h3>{step.title}</h3>
              {step.type === "free" && (
                <span className="step-tag free">Free</span>
              )}
              {step.type === "paid" && (
                <span className="step-tag paid">
                  &#8377;{data.exam_amount} + GST (indicative)
                </span>
              )}
            </div>
            <p>{step.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Steps;
