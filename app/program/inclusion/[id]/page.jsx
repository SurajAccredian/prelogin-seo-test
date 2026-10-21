import { notFound } from "next/navigation";
import PROGRAM_INCLUSION from "../../../components/Assets/program_inclusion.json";
import HomePageWrapper from "../../../components/Wrapper/HomePageWrapper";
import "../../../components/Policies/Policy.css";

const IIT_GUWAHATI_KEY_ORDER = [
  "institute name",
  "program name",
  "program faculty",
  "duration",
  "alumni status",
  "certificates",
  "physical copy of program completion certificate",
  "campus immersion",
  "campus immersion fee",
  "program terms/pillars/modules",
  "live session hours",
  "capstone project",
  "program highlights",
  "minimum attendance required",
  "industry immersion sessions",
  "career assistance sessions",
  "tools covered",
  "physical ID card",
];

const normalize = (s) => {
  if (!s) return "";
  try {
    return decodeURIComponent(s)
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]/g, "");
  } catch {
    return s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]/g, "");
  }
};

function getInclusionData(id) {
  const targetId = normalize(id);
  return PROGRAM_INCLUSION.find((item) => normalize(item.id) === targetId) || null;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const item = getInclusionData(id);

  if (!item) {
    notFound();
  }

  return {
    title: `${item.title} - Program Inclusions`,
    description: `Explore detailed program inclusions, curriculum details, and certifications for ${item.title} at Accredian.`,
    alternates: {
      canonical: `/program/inclusion/${id}`,
    },
  };
}

const renderValue = (value) => {
  if (Array.isArray(value)) {
    return (
      <ol>
        {value.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ol>
    );
  }
  if (typeof value === "object" && value !== null) {
    return (
      <ol>
        {Object.entries(value).map(([k, v]) => (
          <li key={k}>{v}</li>
        ))}
      </ol>
    );
  }
  return value;
};

export default async function InclusionPage({ params }) {
  const { id } = await params;
  const item = getInclusionData(id);

  if (!item) {
    notFound();
  }

  const isIITGuwahati =
    item.data["institute name"] === "E&ICT Academy, IIT Guwahati";

  const rows = isIITGuwahati
    ? IIT_GUWAHATI_KEY_ORDER.map((key) => {
        const value = item.data[key];
        if (value === undefined) return null;
        return { key, value };
      }).filter(Boolean)
    : Object.entries(item.data).map(([key, value]) => ({
        key,
        value,
      }));

  return (
    <HomePageWrapper>
      <div>
        <div className="w-full min-h-screen flex justify-center xl:px-12 px-4 font-circular">
          <div id="program-inclusion" className="max-w-[85rem] w-full py-8">
            <h1 className="lg:mt-0 mt-6 text-xl text-neutral-700 font-semibold text-center">
              Program Inclusion
            </h1>
            <h2 className="mt-4 text-lg text-neutral-600 font-medium text-center">
              {item.title}
            </h2>

            <div className="policy-inner w-full py-0 md:py-2 lg:py-4 mt-2 flex justify-center">
              <table border="1">
                <tbody>
                  {rows.map(({ key, value }) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{renderValue(value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="mx-2 mt-4 text-sm text-neutral-600">
              <span className="font-semibold">Disclaimer:</span> The timing,
              duration, instructors, and curriculum mentioned above are subject
              to change or revision based on prevailing circumstances and at the
              discretion of the concerned Institute or Accredian.
            </h3>
          </div>
        </div>
      </div>
    </HomePageWrapper>
  );
}
