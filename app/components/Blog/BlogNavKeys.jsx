"use client";

// The dropdowns are pure CSS (:hover / :focus-within) and every link is in the server HTML. This leaf
// only adds "Escape closes the open menu" (WCAG 1.4.13): blurring the focused element ends :focus-within.
export default function BlogNavKeys({ children, className }) {
  return (
    <div
      className={className}
      onKeyDown={(event) => {
        if (event.key === "Escape" && document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }}
    >
      {children}
    </div>
  );
}
