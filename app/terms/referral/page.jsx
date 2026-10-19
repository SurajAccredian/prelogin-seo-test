import Referral from "../../components/Policies/Referral";

export const metadata = {
  title: "Referral Policy",
  description:
    "Read Accredian's referral program terms, reward structure, and eligibility conditions for referring friends and colleagues.",
  alternates: {
    canonical: "/terms/referral",
  },
};

export default function ReferralPolicyPage() {
  return <Referral />;
}
