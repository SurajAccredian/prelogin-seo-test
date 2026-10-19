import Refund from "../../components/Policies/Refund";

export const metadata = {
  title: "Refund Policy",
  description:
    "Learn about Accredian's refund policy, eligibility criteria, and the process for requesting a refund for our professional certification programs.",
  alternates: {
    canonical: "/terms/refund",
  },
};

export default function RefundPolicyPage() {
  return <Refund />;
}
