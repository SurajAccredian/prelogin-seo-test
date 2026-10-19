import MasterFaq from "../components/Faq/MasterFaq";

export const metadata = {
  title: "Frequently Asked Questions",
  description:
    "Find answers to common questions about Accredian's programs, admission process, fees, EMI options, and career support services.",
  alternates: {
    canonical: "/Faq",
  },
};

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What programs does Accredian offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Accredian offers executive education, advanced certification, and leadership development programs in Artificial Intelligence, CXO Leadership, Generative AI, Data Science, Product Management, Financial Technologies, and Project Management in premier academic collaboration with top institutes."
      }
    },
    {
      "@type": "Question",
      "name": "Who are Accredian's university partners?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Accredian collaborates with premier Indian and international institutions including Indian Institute of Management Lucknow (IIM Lucknow), IIM Visakhapatnam, IIT Kanpur, XLRI Jamshedpur, IIM Tiruchirappalli, IIM Ranchi, IIM Kashipur, and SP Jain School of Global Management to deliver world-class curricula."
      }
    },
    {
      "@type": "Question",
      "name": "What is the eligibility criteria for Accredian's executive programs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eligibility varies by specialization and tier. Senior leadership and CXO programs typically require a minimum of 8 to 10 years of professional work experience along with an undergraduate degree. Mid-level executive certificates require 3 to 5 years of relevant experience, while specialized foundational tracks welcome professionals with 1 to 2 years in tech or management."
      }
    },
    {
      "@type": "Question",
      "name": "Are Accredian programs delivered live online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, all programs feature live, interactive online sessions delivered directly by institute faculty and senior industry practitioners. Sessions are scheduled on weekends to accommodate working executives. Comprehensive lecture recordings, session notes, and case studies are accessible 24/7 on the learning portal."
      }
    },
    {
      "@type": "Question",
      "name": "What are the key pedagogical methods and capstone projects included?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The pedagogy integrates Harvard and IIM business case studies, hands-on masterclasses, peer breakout discussions, and live business simulations. Every participant completes a rigorous real-world capstone project under mentor guidance, addressing complex strategic challenges faced by global enterprises."
      }
    },
    {
      "@type": "Question",
      "name": "Are EMI options and educational financing available for program fees?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, flexible financial assistance options including no-cost EMI plans, monthly installment models, and corporate sponsorship documentation are available through our leading financial partners. Candidates can select tenor options ranging from 6 to 24 months to ensure seamless fee distribution."
      }
    },
    {
      "@type": "Question",
      "name": "What career assistance and placement support does Accredian provide?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Accredian provides structured career management services including 1-on-1 personalized executive coaching, comprehensive resume and LinkedIn profile optimization, CXO interview preparation, and direct access to an active network of over 500 hiring partners and alumni across top tech and consulting firms."
      }
    },
    {
      "@type": "Question",
      "name": "What certification will I receive upon completing the program?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Upon successfully meeting graduation criteria, participants receive an official Executive Certificate issued directly by the partner institute (such as IIM Lucknow, IIM Visakhapatnam, or IIT Kanpur) along with verifiable digital credentials, executive alumni status, and access to institute alumni events."
      }
    },
    {
      "@type": "Question",
      "name": "Is campus immersion included in Accredian executive programs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Select executive and leadership programs feature exclusive on-campus immersion modules ranging from 2 to 5 days at partner institute campuses. Participants attend in-person classroom lectures, engage in workshops, present capstone solutions, and network directly with faculty and industry peers."
      }
    },
    {
      "@type": "Question",
      "name": "How do industry mentorship and 1-on-1 career coaching sessions work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Learners are paired with experienced industry leaders who provide strategic guidance, portfolio critiques, and real-time advice tailored to individual career goals. Dedicated 1-on-1 coaching slots allow professionals to discuss role transitions, managerial challenges, and leadership opportunities in detail."
      }
    },
    {
      "@type": "Question",
      "name": "What is the refund, cancellation, or deferral policy for enrolled candidates?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Accredian maintains transparent admission policies. Candidates facing unexpected professional or personal obligations may apply for cohort deferrals to subsequent batches subject to academic committee review and partner institution batch availability guidelines."
      }
    },
    {
      "@type": "Question",
      "name": "How does Accredian support alumni networking and community engagement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Graduates gain lifelong access to the Accredian Executive Alumni Network, connecting thousands of product leaders, data scientists, founders, and business directors across Fortune 500 organizations. Regular community webinars, roundtables, and leadership mixers foster continuous learning and collaboration."
      }
    },
    {
      "@type": "Question",
      "name": "How are classes scheduled to accommodate working professionals?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "All live instructor-led lectures and masterclasses are intentionally scheduled during weekends, typically on Saturday and Sunday mornings or afternoons. This executive-friendly schedule ensures that working professionals can fulfill their demanding weekday workplace responsibilities while consistently attending interactive sessions, asking real-time questions, and collaborating with cohort peers without career disruption."
      }
    },
    {
      "@type": "Question",
      "name": "What technical requirements and software tools are needed for the coursework?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Participants require a standard laptop or desktop computer with a modern web browser, reliable high-speed internet connectivity, a webcam, and a microphone. Specialized enterprise tools, AI APIs, simulation platforms, and cloud computing environments utilized throughout the modules are either open-source or provisioned directly through Accredian's virtual laboratory integrations at no extra cost."
      }
    }
  ]
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
      <div className="w-full max-w-5xl mx-auto px-4 pt-8 pb-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8 text-base">
          Find clear answers to common questions about Accredian's executive programs, university certifications, admissions, fee structures, and dedicated career assistance.
        </p>
        <div className="space-y-4 mb-8">
          {faqPageSchema.mainEntity.map((item, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                {item.name}
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {item.acceptedAnswer.text}
              </p>
            </div>
          ))}
        </div>
      </div>
      <MasterFaq />
    </>
  );
}
