import { Suspense } from "react";
import Refer from "../components/ReferAndEarn/Refer";

export const metadata = {
  title: "Refer & Earn",
  description:
    "Refer your friends and colleagues to Accredian and earn exciting rewards. Share the gift of quality professional education and grow your network together.",
  alternates: {
    canonical: "/referandearn",
  },
};

export default function ReferAndEarnPage() {
  return (
    <>
      <Refer />
      <section className="w-full max-w-5xl mx-auto px-4 py-12 font-circular">
        <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Accredian Referral Program Guidelines &amp; Rewards
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Accredian’s Referral Program enables professionals, current students, and alumni to champion continuous learning by introducing colleagues, friends, and peers to India’s leading executive education programs. Partnered with premier institutions including IIM Lucknow, IIM Visakhapatnam, IIT Kanpur, and XLRI Jamshedpur, our executive certifications in CXO Leadership, Generative AI, Product Management, and Data Science equip leaders with the strategic mindset and technical mastery required for high-impact leadership roles.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">How It Works</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                1. Select the executive program matching your colleague’s profile and generate your custom referral recommendation.
                <br />
                2. Your referee receives direct guidance from senior academic advisors along with comprehensive brochure materials and enrollment support.
                <br />
                3. Once your referee completes admission confirmation, your cash reward is credited directly to your bank account.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Rewards &amp; Referee Privileges</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                • Referrers earn guaranteed cash rewards up to ₹10,000 per successful program enrollment with no upper cap on referrals.
                <br />
                • Referred candidates receive exclusive fee waivers, prioritized admissions review, and complimentary access to pre-program preparatory masterclasses.
              </p>
            </div>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            All payouts are processed transparently via secure bank transfer following batch commencement. For corporate partnerships, cohort bulk referrals, or dedicated referral inquiries, connect directly with our admissions and community support office.
          </p>
        </div>
      </section>
    </>
  );
}