"use client";

import React from "react";
import Link from "next/link";

export default function Footer({ data = {} }) {
  return (
    <footer className="landing-footer">
      <div className="wrap">
        <div className="row">
          <div>{data.copyright || "© 2026 Accredian, a brand of FullStack Education Pvt Ltd."}</div>
          <div>
            {data.links?.map((link, idx) => (
              <Link key={idx} href={link.href} target="_blank" rel="noopener">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        {data.warning && <p className="warn">{data.warning}</p>}
      </div>
    </footer>
  );
}

