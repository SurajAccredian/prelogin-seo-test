import type { ReactNode } from "react";

/**
 * FAQ accordion whose answers are ALWAYS in the HTML: closed items are collapsed, not removed.
 * Google and AI crawlers read the HTML, so answers that only load after a click are invisible to them.
 *
 * Uses native <details>/<summary>: keyboard accessible and works without JavaScript.
 * Pass your existing class names to keep the current design.
 */
export interface FaqAccordionItem {
  question: string;
  answer: ReactNode; // render the answer however you do today (e.g. your markdown component)
}

interface FaqAccordionProps {
  items: FaqAccordionItem[];
  className?: string;
  itemClassName?: string;
  questionClassName?: string;
  answerClassName?: string;
  /** Index of an item to show open on first load, if any. */
  defaultOpenIndex?: number;
}

export function FaqAccordion({
  items,
  className,
  itemClassName,
  questionClassName,
  answerClassName,
  defaultOpenIndex,
}: FaqAccordionProps) {
  return (
    <div className={className}>
      {items.map((item, i) => (
        <details key={item.question} className={itemClassName} open={i === defaultOpenIndex}>
          <summary className={questionClassName}>{item.question}</summary>
          <div className={answerClassName}>{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
