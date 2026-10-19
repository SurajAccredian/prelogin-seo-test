"use client";
import React, { useEffect } from "react";

import "./Policy.css";
import Wrapper from "../Wrapper/HomePageWrapper";

const Terms = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <Wrapper>
      <div className="w-full min-h-screen flex justify-center xl:px-12 px-4 font-circular policy-page-container">
        <div className="max-w-[85rem] w-full py-8">
          {/* upper section */}
          <h1 className="lg:mt-0 mt-6 text-xl text-neutral-700 font-semibold text-center">
            Referral Policy
          </h1>
          <div className="policy-inner w-full py-0 md:py-2 lg:py-4 mt-4">
            <h2>Accredian Referral Policy</h2>
            <p>
              At Accredian, we appreciate the support and recommendations of our
              students and community members. To express our gratitude, we have
              introduced a referral program to reward referrers.
            </p>
            <h2>Referral Bonus:</h2>
            <p>
              Upon successful completion of the admission process by the
              referred individual, the referrer will receive a referral bonus of
              INR 10,000 for enrolling in any Accredian program.
            </p>

            {/* <p>
              Your rewards are based on the program chosen by the referral; and
              applicable slab bonuses will be provided accordingly. Please refer
              to the table for a detailed breakdown.
            </p> */}
            <h2>How It Works:</h2>
            <ol id="num-list">
              <li>
                <strong>Referral Submission:</strong> Referrals can be submitted
                via Accredian's website’s referral section.
              </li>
              <li>
                <strong>Admission Process Completion:</strong> Once the referred
                individual completes the admission process for any Accredian
                program, the referrer will become eligible for the referral
                bonus.
              </li>
              <li>
                <strong>Bonus Distribution:</strong>
                <ol id="in-num-list">
                  <li>
                    The referral bonus will be credited to the referrer only.
                  </li>
                  <li>
                    The bonus will be processed via direct money transfer to the
                    bank account provided by the referrer.
                  </li>
                </ol>
              </li>
              <li>
                <strong>Referral Exclusions:</strong>
                <ol>
                  <li>
                    The referral bonus will not be processed if Accredian has
                    received an earlier inquiry or application from the referred
                    individual for any intake or program, and someone from the
                    team is already in contact with them. However, if no one is
                    in touch with the referred individual, the referral bonus
                    will be credited to the referrer.
                  </li>
                  <li>
                    The referral bonus cannot be clubbed with any group
                    discounts or other promotional offers.
                  </li>
                </ol>
              </li>
            </ol>
            <h2>Terms and Conditions:</h2>
            <ol>
              <li>
                Referral bonus eligibility is contingent upon the successful
                completion of the admission process by the referred individual.
                The admission process will be considered complete only once the
                full program fee has been paid to Accredian.
              </li>
              <li>
                Referral bonuses will be processed within 30 days of the
                referred individual's admission process completion.
              </li>
              <li>
                Accredian reserves the right to modify or terminate the referral
                program at any time without prior notice.
              </li>
              <li>
                If multiple referrals are received from the same individual, the
                referral bonus will be processed for all referrals that have
                completed their admission process and meet the aforementioned
                criteria.
              </li>
            </ol>
            <h2>Effective Date:</h2>
            <p>
              This referral policy is effective for referrals received on or
              after 23rd Jan, 2025.
            </p>
            <p>
              For any inquiries or referral submissions, please contact our
              admissions team at admissions@accredian.com.
            </p>
            <p>
              We appreciate your support in spreading the word about Accredian's
              educational programs.
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Terms;
