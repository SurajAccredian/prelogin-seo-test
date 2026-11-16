"use client";

import React, { useState } from "react";
import { useLandingPage } from "../LandingPageContext";

export default function Curriculum({ data = {} }) {
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const { scrollToForm } = useLandingPage();

  const activePillar = data.pillars?.[activePillarIndex] || data.pillars?.[0] || {};
  const modulesMap = new Map((data.modules || []).map((m) => [m.id, m]));

  const handleTabClick = (index) => {
    setActivePillarIndex(index);
    if (typeof window !== "undefined" && data.pillars?.[index]) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "curriculum_tab",
        pillar: data.pillars[index].name,
      });
    }
  };

  return (
    <section className="soft" id="curriculum">
      <div className="wrap">
        {/* Section Heading */}
        <div>
          {data.eyebrow && <span className="eyebrow">{data.eyebrow}</span>}
          {data.heading && <h2 className="h2">{data.heading}</h2>}
          {data.lead && <p className="lead">{data.lead}</p>}
        </div>

        {/* 6-Step Journey Stepper */}
        {data.journey && data.journey.length > 0 && (
          <ol className="journey">
            {data.journey.map((item, idx) => (
              <li key={idx}>
                <span className="jdot">
                  {item.is_final ? (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  ) : (
                    item.step || idx + 1
                  )}
                </span>
                <b>{item.title}</b>
                <small>{item.subtitle}</small>
              </li>
            ))}
          </ol>
        )}

        {/* 6-Pillars Interactive Tabs */}
        {data.pillars && data.pillars.length > 0 && (
          <div className="pillars">
            {/* Tabs List */}
            <div className="ptabs" role="tablist">
              {data.pillars.map((pillar, idx) => (
                <button
                  key={idx}
                  role="tab"
                  type="button"
                  aria-selected={idx === activePillarIndex}
                  className={idx === activePillarIndex ? "on" : ""}
                  onClick={() => handleTabClick(idx)}
                >
                  <span>0{idx + 1}</span>
                  {pillar.name}
                </button>
              ))}
            </div>

            {/* Tab Panel */}
            <div className="ppanel">
              <div className="pleft">
                <span className="ptag">
                  Pillar {activePillarIndex + 1} of {data.pillars.length}
                </span>
                <h3>{activePillar.name}</h3>
                <p>{activePillar.intro}</p>

                <h5>You&apos;ll be able to</h5>
                <ul className="pout">
                  {activePillar.outcomes?.map((outcome, oIdx) => (
                    <li key={oIdx}>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#12A150"
                        strokeWidth="2.5"
                      >
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Modules associated with this pillar */}
              <div className="pmods">
                {activePillar.module_ids?.map((modId) => {
                  const moduleData = modulesMap.get(modId);
                  if (!moduleData) return null;

                  return (
                    <div className="pmod" key={modId}>
                      <div className="pmod-h">
                        <span className="num">M{String(modId).padStart(2, "0")}</span>
                        <h4>{moduleData.title}</h4>
                      </div>
                      <ul>
                        {moduleData.topics?.map((topic, tIdx) => (
                          <li key={tIdx}>{topic}</li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Mid-CTA Banner */}
        {data.mid_cta && (
          <div className="mid-cta">
            <div>
              <h4>{data.mid_cta.heading}</h4>
              <p>{data.mid_cta.subheading}</p>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => scrollToForm("curriculum")}
            >
              {data.mid_cta.button_text || "Talk to our Advisor"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

