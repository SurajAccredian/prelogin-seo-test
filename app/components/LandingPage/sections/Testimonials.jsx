"use client";

import React from "react";

export default function Testimonials({ data = {} }) {
  return (
    <section>
      <div className="wrap">
        <div>
          {data.eyebrow && <span className="eyebrow">{data.eyebrow}</span>}
          {data.heading && <h2 className="h2">{data.heading}</h2>}
        </div>

        {data.cards && data.cards.length > 0 && (
          <div className="alumni">
            {data.cards.map((card, idx) => (
              <figure className="al" key={idx}>
                {card.image && (
                  <img src={card.image} alt={card.name} loading="lazy" />
                )}
                <blockquote>&ldquo;{card.quote}&rdquo;</blockquote>
                <figcaption>
                  <b>{card.name}</b>
                  <span>{card.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

