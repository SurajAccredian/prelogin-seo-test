"use client";
import React from "react";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

/**
 * Reusable SEO Breadcrumb Component with schema.org BreadcrumbList microdata
 * @param {Array<{ label: string, href?: string }>} items
 */
export default function SearchIntentBreadcrumb({ items = [] }) {
  if (!items || items.length === 0) return null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? `https://accredian.com${item.href}` : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav aria-label="Breadcrumb" className="w-full bg-white border-b border-neutral-200">
        <div className="si-wrap py-2.5 sm:py-3.5 flex items-center gap-1.5 sm:gap-2 text-xs md:text-sm text-neutral-500 font-circular overflow-x-auto whitespace-nowrap">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <React.Fragment key={index}>
                {index > 0 && <IoIosArrowForward className="text-neutral-400 text-xs flex-shrink-0" />}
                {isLast || !item.href ? (
                  <span className="font-semibold text-neutral-900">{item.label}</span>
                ) : (
                  <Link href={item.href} className="hover:text-universal transition-colors">
                    {item.label}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </nav>
    </>
  );
}
