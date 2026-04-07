"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PROGRAM_INCLUSION from "../Assets/program_inclusion.json";
import "../Policies/Policy.css";
import NotFound from "../NotFound/NotFound";
import HomePageWrapper from "../Wrapper/HomePageWrapper";
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

const Inclusive = () => {
  const { id } = useParams();
  const [inclusiveWithId, setInclusiveWithId] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const data = PROGRAM_INCLUSION.find((item) => item.id === id);
    if (data) {
      setInclusiveWithId(data);
      setNotFound(false);
    } else {
      setInclusiveWithId(null);
      setNotFound(true);
    }

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [id]);

  if (notFound) {
    return <NotFound />;
  }

  if (!inclusiveWithId) {
    return null;
  }

  const isIITGuwahati =
    inclusiveWithId.data["institute name"] === "E&ICT Academy, IIT Guwahati";

  const rows = isIITGuwahati
    ? IIT_GUWAHATI_KEY_ORDER.map((key) => {
      const value = inclusiveWithId.data[key];
      if (value === undefined) return null;
      return { key, value };
    }).filter(Boolean)
    : Object.entries(inclusiveWithId.data).map(([key, value]) => ({
      key,
      value,
    }));

  return (
    <HomePageWrapper>

      <div>
        <div className="w-full min-h-screen flex justify-center xl:px-12 px-4 font-circular">
          <div id="program-inclusion" className="max-w-[85rem] w-full py-8">
            {/* Upper section */}
            <h1 className="lg:mt-0 mt-6 text-xl text-neutral-700 font-semibold text-center">
              Program Inclusion
            </h1>
            <h2 className="mt-4 text-lg text-neutral-600 font-medium text-center">
              {inclusiveWithId.title}
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

            <h3 className="mx-2">
              <span className="font-semibold">Disclaimer:</span>{" "}
              The timing, duration, instructors, and curriculum mentioned above
              are subject to change or revision based on prevailing circumstances
              and at the discretion of the concerned Institute or Accredian.
            </h3>

            {id === "iimt-chief-technology-officer-programme-10-months" && (
              <h3 className="mx-2">
                <span className="font-semibold">Disclaimer:</span>{" "}
                Evaluation criteria may vary by batch and are subject to the
                Program Director&apos;s discretion.
              </h3>
            )}
          </div>
        </div>
      </div>

    </HomePageWrapper>
  );
};

export default Inclusive;
