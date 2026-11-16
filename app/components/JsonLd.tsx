/**
 * Renders one JSON-LD graph as a <script> tag. Works in Server Components (App Router).
 * "<" is escaped so content can never close the script tag early (as recommended by Next.js).
 */
type JsonLdProps = { data: object | null | undefined };

export function JsonLd({ data }: JsonLdProps) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
