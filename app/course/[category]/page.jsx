import MainVerticals from "../../components/Home/VerticalPage/MainVerticals";

export async function generateMetadata({ params }) {
  const { category } = await params;
  const readable = decodeURIComponent(category)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `${readable} Programs`,
    description: `Explore top ${readable} certification programs at Accredian from IITs, IIMs & leading institutions. Advance your career with industry-relevant skills and expert mentorship.`,
  };
}

export default function CourseCategoryPage() {
  return <MainVerticals />;
}
