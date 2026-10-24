import { notFound } from "next/navigation";
import parse from "html-react-parser";
import Link from "next/link";
import { REFUND_POLICIES } from "../../components/Assets/refund-policies";
import HomePageWrapper from "../../components/Wrapper/HomePageWrapper";
import { JsonLd } from "../../components/JsonLd";
import { policyPageGraph } from "../../lib/schema";
import "../../components/Policies/Policy.css";

function getRefundPolicy(id) {
  return REFUND_POLICIES.find((policy) => policy.tab === id) || null;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const policy = getRefundPolicy(id);

  if (!policy) {
    notFound();
  }

  return {
    title: { absolute: `${policy.title} Refund Policy | Accredian` },
    description: `Read Accredian's ${policy.title} refund policy, fee terms, and cancellation guidelines for our professional certification programs.`,
    alternates: {
      canonical: `/refund-policies/${id}`,
    },
  };
}

export default async function RefundPolicyPage({ params }) {
  const { id } = await params;
  const currentPolicy = getRefundPolicy(id);

  if (!currentPolicy) {
    notFound();
  }

  const schema = policyPageGraph({
    type: "refund",
    id,
    title: currentPolicy.title,
    pageTitle: `${currentPolicy.title} Refund Policy | Accredian`,
    description: `Read Accredian's ${currentPolicy.title} refund policy, fee terms, and cancellation guidelines for our professional certification programs.`,
  });

  return (
    <HomePageWrapper>
      <JsonLd data={schema} />
      <div className="w-full min-h-screen flex justify-center xl:px-12 px-4 font-circular policy-page-container">
        <div className="max-w-[85rem] w-full py-8">
          {/* Upper Section */}
          <div className="w-full flex md:gap-4 xl:gap-12">
            <div className="flex-[0.32] lg:block hidden">
              <div className="w-full xl:px-5 rounded">
                <h2 className="text-xl font-semibold text-neutral-600">
                  Refund Policies
                </h2>
              </div>
            </div>
            <div className="flex-1">
              <h1 className="lg:mt-0 mt-6 text-xl text-neutral-700 text-start font-semibold lg:text-center">
                {currentPolicy.title}
              </h1>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div
            className="lg:hidden w-full overflow-x-auto no-scrollbar py-2 mt-4 mb-2 flex items-center gap-2 border-b border-neutral-200"
            data-lenis-prevent
          >
            {REFUND_POLICIES.map((policy) => {
              const isActive = currentPolicy.tab === policy.tab;
              return (
                <Link
                  key={policy.tab}
                  href={`/refund-policies/${policy.tab}`}
                  className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-universal text-white shadow-sm"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  {policy.title}
                </Link>
              );
            })}
          </div>

          {/* Body Section */}
          <div className="w-full flex md:gap-4 xl:gap-12">
            <div className="flex-[0.32] py-2 lg:block hidden">
              <div className="w-full xl:px-5 rounded">
                <div
                  className="flex flex-col gap-1 mt-2 max-h-[60vh] overflow-y-auto custom-scrollbar policy-sidebar-scroll overscroll-contain"
                  data-lenis-prevent
                >
                  {REFUND_POLICIES.map((policy, index) => {
                    const isActive = currentPolicy.tab === policy.tab;
                    return (
                      <Link
                        href={`/refund-policies/${policy.tab}`}
                        className={`w-full ${
                          isActive
                            ? "bg-universal drop-shadow text-white rounded"
                            : "border-b border-dashed border-universal text-neutral-600"
                        } px-3 py-2 mt-2 cursor-pointer flex items-center justify-between gap-4`}
                        key={index}
                      >
                        <span className="font-medium text-base">{policy.title}</span>
                        <div className="w-5 h-5 flex-shrink-0">
                          <svg
                            className="w-full h-full"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9 6L15 12L9 18"
                              stroke={isActive ? "#fff" : "#1A73E8"}
                              strokeWidth="1.3"
                            />
                          </svg>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="policy-inner w-full py-0 md:py-2 lg:py-5 lg:px-4">
                {parse(currentPolicy.body)}
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </HomePageWrapper>
  );
}
