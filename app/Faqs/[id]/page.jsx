import { notFound } from "next/navigation";
import { faq } from "../../components/Assets/faq";
import HomePageWrapper from "../../components/Wrapper/HomePageWrapper";
import { FaqJsonLd } from "../../components/SEO/JsonLd";

function getFaqGroup(id) {
  return faq.find((obj) => obj.id === id) || null;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const faqGroup = getFaqGroup(id);

  if (!faqGroup) {
    notFound();
  }

  return {
    title: `${faqGroup.hadding} FAQs | Accredian`,
    description: `Frequently asked questions regarding ${faqGroup.hadding} at Accredian.`,
    alternates: {
      canonical: `/Faqs/${id}`,
    },
  };
}

export default async function SingleFaqPage({ params }) {
  const { id } = await params;
  const faqGroup = getFaqGroup(id);

  if (!faqGroup) {
    notFound();
  }

  const structuredItems = (faqGroup.Faqaccd || []).map((item) => ({
    question: item.faqhadding,
    answer: Array.isArray(item.subfaq)
      ? item.subfaq
          .map((s) => (typeof s === "string" ? s : ""))
          .filter(Boolean)
          .join(" ")
      : String(item.subfaq || ""),
  }));

  return (
    <HomePageWrapper>
      <FaqJsonLd title={faqGroup.hadding} items={structuredItems} />
      <div className="w-full min-h-screen py-12 px-4 xl:px-12 flex justify-center font-circular">
        <div className="max-w-[85rem] w-full">
          <h1 className="text-3xl font-bold mb-8 text-neutral-900">
            {faqGroup.hadding}
          </h1>
          <div className="space-y-4">
            {faqGroup.Faqaccd?.map((item, idx) => (
              <details
                key={idx}
                open={idx === 0}
                className="group border border-neutral-200 rounded-lg p-4 bg-white shadow-sm"
              >
                <summary className="font-semibold text-lg cursor-pointer list-none flex justify-between items-center text-neutral-800">
                  <span>{item.faqhadding}</span>
                  <span className="transition-transform group-open:rotate-180 text-blue-600">
                    ▼
                  </span>
                </summary>
                <div className="mt-4 text-neutral-600 text-sm leading-relaxed space-y-2 border-t pt-3">
                  {item.subfaq?.map((para, pIdx) => (
                    <div key={pIdx}>
                      {typeof para === "string" ? <p>{para}</p> : para}
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </HomePageWrapper>
  );
}
