
"use client";

import React, { useEffect } from "react";
import "./Policy.css";
import HomePageWrapper from "../Wrapper/HomePageWrapper";

const Cancellation = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <HomePageWrapper>
      <div className="w-full min-h-screen flex justify-center xl:px-12 px-4 font-circular policy-page-container">
        <div className="max-w-[85rem] w-full py-8">
          <h1 className="lg:mt-0 mt-6 text-xl text-neutral-700 font-semibold text-center">
            Cancellation Policy
          </h1>

          <div className="policy-inner w-full py-0 md:py-2 lg:py-8 mt-4">
            <h2>Overview of the Cancellation Policy</h2>
            <p>
              At Accredian, we are committed to delivering high-quality
              executive education in partnership with premier academic
              institutions. Because our programs are offered in academic
              collaboration with partner institutes, including IIMs, IITs,
              XLRI, and technology partners, cancellation terms, cooling-off
              periods, and refund eligibility are governed by the specific
              policy of the partner institution offering the program.
            </p>

            <p>
              This policy applies strictly to tuition and program fees.
              Application fees, registration fees, and administrative charges
              are subject to the applicable terms of the relevant program and
              partner institution.
            </p>

            <h2>1. Institute-Specific Cancellation and Cooling-Off Terms</h2>
            <p>
              Each partner institute establishes its own guidelines regarding
              enrollment cancellations, cooling-off periods, and refund
              calculations.
            </p>

            <h3>Cooling-Off Period</h3>
            <p>
              Any applicable cooling-off period, eligibility criteria, or
              penalty deductions are subject to the specific partner
              institute&apos;s rules for your enrolled program and batch.
            </p>

            <h3>Governing Agreement</h3>
            <p>
              The exact timelines, refund percentages, and terms applicable
              to your enrollment are detailed in the applicable offer letter,
              program admission brochure, and student agreement.
            </p>

            <h2>2. How to Request a Cancellation</h2>
            <p>
              To initiate a cancellation or refund request, submit a formal
              written application from your registered email address.
            </p>

            <h3>Email Contact</h3>
            <p>
              Send your request to{" "}
              <a
                className="c6"
                href="mailto:admissions@accredian.com"
              >
                admissions@accredian.com
              </a>
              .
            </p>

            <h3>Request Date</h3>
            <p>
              The official request date will be determined according to the
              applicable submission procedure for the program.
            </p>

            <h2>3. Review and Approval Process</h2>
            <p>
              Cancellation requests may be reviewed by the relevant program
              team and partner institution in accordance with the applicable
              policy.
            </p>

            <p>
              Approval decisions, deductions, and processing timelines are
              governed by the specific partner institute&apos;s applicable
              terms.
            </p>

            <p>
              Supporting documentation or alternative resolutions, such as
              batch transfers or deferrals, may be requested or offered where
              permitted by the applicable policy.
            </p>

            <h2>4. Refund Processing</h2>
            <p>
              Once a refund is approved, it will be processed according to
              the procedure and timeline specified by the partner institution
              and applicable payment provider.
            </p>

            <p>
              Any treatment of third-party loan or EMI processing fees, bank
              transaction charges, or interest is subject to the applicable
              lender, bank, and program terms.
            </p>

            <h2>5. Important Terms and Conditions</h2>

            <h3>Non-Transferability</h3>
            <p>
              Program enrollment is subject to the transfer rules established
              by the relevant partner institution. Transfers to another
              individual, batch, or program require approval wherever
              specified by the applicable policy.
            </p>

            <h3>Requests After the Applicable Deadline</h3>
            <p>
              Cancellation and refund requests submitted after the applicable
              deadline or cooling-off period will be handled according to the
              relevant institution&apos;s policy. Eligibility may be
              restricted after the applicable deadline.
            </p>

            <h3>Policy Amendments</h3>
            <p>
              The applicable cancellation and refund terms are those
              governing the student&apos;s enrollment, as specified by the
              relevant partner institution and the applicable student
              agreement.
            </p>
          </div>
        </div>
      </div>
    </HomePageWrapper>
  );
};

export default Cancellation;
