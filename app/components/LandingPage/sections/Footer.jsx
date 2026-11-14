"use client";

import React from "react";
import Link from "next/link";

const DEFAULT_COPYRIGHT = "© 2026 Accredian, a brand of FullStack Education Pvt Ltd.";

const DEFAULT_LINKS = [
  { label: "Privacy", href: "/terms/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Refund Policy", href: "/refund-policies/accredian-policy" },
];

const DEFAULT_WARNING =
  "Important: Ignore payment requests on WhatsApp or unofficial sources. Only trust emails ending with @accredian.com. All company names and logos are trademarks of their respective holders and do not imply affiliation or endorsement.";

export default function Footer({ data = {} }) {
  const copyright = data?.copyright || DEFAULT_COPYRIGHT;
  const links = data?.links && data.links.length > 0 ? data.links : DEFAULT_LINKS;
  const warning = data?.warning || DEFAULT_WARNING;

  return (
    <footer className="landing-footer">
      <div className="wrap">
        <div className="row">
          <div className="copy">{copyright}</div>
          <div className="links">
            {links.map((link, idx) => (
              <Link key={idx} href={link.href} target="_blank" rel="noopener">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        {warning && <p className="warn">{warning}</p>}
      </div>
    </footer>
  );
}
