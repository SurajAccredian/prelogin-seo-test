import ContactUs from "../components/contact-us/ContactUs";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Accredian's support team. We're here to help you choose the right program, answer your queries, and guide your career growth journey.",
  alternates: {
    canonical: "/contact-us",
  },
};

export default function ContactUsPage() {
  return <ContactUs />;
}
