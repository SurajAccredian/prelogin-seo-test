export const dynamic = "force-dynamic";

export default async function EventsPage({ searchParams }) {
  const params = await searchParams;
  const cb = params?.cb;

  return (
    <div style={{ padding: "40px", fontFamily: "monospace" }}>
      <h1>Events (Dummy Page)</h1>
      <p style={{ fontSize: "18px" }}>
        <strong>cb:</strong> {cb || "undefined"}
      </p>
      <div style={{ marginTop: "20px" }}>
        <strong>All Query Parameters:</strong>
        <pre style={{ background: "#f4f4f4", padding: "16px", borderRadius: "6px" }}>
          {JSON.stringify(params, null, 2)}
        </pre>
      </div>
    </div>
  );
}
