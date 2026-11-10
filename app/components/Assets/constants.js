// constants.ts — rename from constants.js, add IconType for icons
import { GiArtificialIntelligence, GiMaterialsScience } from "react-icons/gi";
import { IoBagOutline } from "react-icons/io5";
import { GoProjectRoadmap } from "react-icons/go";
import { FaConnectdevelop, FaUsers } from "react-icons/fa";
import { GrResources, GrAnnounce } from "react-icons/gr";
import { TbInfoSquareRounded } from "react-icons/tb";
import { PiStrategy } from "react-icons/pi";
import { MdOutlineLeaderboard } from "react-icons/md";
import { IoCardOutline } from "react-icons/io5";
import { LiaBrainSolid } from "react-icons/lia";
import { RiMoneyDollarCircleLine, RiShieldKeyholeLine } from "react-icons/ri";
import { LuBrainCircuit } from "react-icons/lu";



// ✅ All data below is IDENTICAL to original — zero changes
export const STREAMS = [
  { category: "Microsoft", icon: GoProjectRoadmap, order: -2 },
  { category: "Free Courses", icon: GoProjectRoadmap, order: -1 },
  { category: "PG Diploma", icon: GoProjectRoadmap, order: 1 },
  { category: "design thinking", icon: GoProjectRoadmap, order: 2 },
  { category: "product management", icon: GoProjectRoadmap, order: 8 },
  { category: "CXO Leadership", icon: LiaBrainSolid, order: 1 },
  { category: "artificial intelligence", icon: LuBrainCircuit, order: 4 },
  { category: "finance", icon: IoCardOutline, order: 5 },
  { category: "Human Resource", icon: FaUsers, order: 6 },
  { category: "project management", icon: GoProjectRoadmap, order: 7 },
  { category: "strategy & leadership", icon: PiStrategy, order: 2 },
  { category: "General Management", icon: IoBagOutline, order: 4 },
  { category: "digital Transformation", icon: FaConnectdevelop, order: 11 },
  { category: "business management", icon: RiMoneyDollarCircleLine, order: 9 },
  { category: "senior management", icon: MdOutlineLeaderboard, order: 3 },
];

export const allowedIds = [];

export const VERTICALS = [
  "data science",
  "Product Management",
  "business management",
  "Project Management",
  "Digital Transformation",
  "Strategy & Leadership",
  "Senior Management",
  "Fintech",
  "Business Analytics",
];

export const categoriesWithContacts = [
  { category: "human resource", contact: "+91 8851827093" },
  { category: "cxo leadership", contact: "+91 8851827053" },
  { category: "finance", contact: "+91 9289224842" },
  { category: "product management", contact: "+91 7619555873" },
  { category: "general management", contact: "+91 8851827053" },
  { category: "digital transformation", contact: "+91 7619555873" },
  { category: "data science", contact: "+91 7619555873" },
  { category: "project management", contact: "+91 9818329799" },
  { category: "strategic management", contact: "+91 8851827053" },
  { category: "senior management", contact: "+91 7678385465" },
  { category: "strategy & leadership", contact: "+91 8882597163" },
  { category: "business management", contact: "+91 8851827053" },
  { category: "artificial intelligence", contact: "+91 9211285411" },
  { category: "cybersecurity", contact: "+91 9211285411" },
  { category: "PG Diploma", contact: "+91 8130897175" },
  { category: "design thinking", contact: "+91 9818329799" },
  { category: "Microsoft", contact: "+91 9818329799" },
  { category: "Free Courses", contact: "+91 9818329799" },
];

export const REFER_BAR_LINK = [
  { name: "Refer", scrollTo: "referHero" },
  { name: "Benefits", scrollTo: "benefitsSection" },
  { name: "FAQ's", scrollTo: "faqsSection" },
  { name: "Support", scrollTo: "supportSection" },
];

export const NAV_ITEMS = [
  {
    label: "For Business",
    redirect: true,
    icon: GrAnnounce,
    href: "https://enterprise.accredian.com",
  },
  {
    label: "Resources",
    icon: GrResources,
    children: [
      { label: "Blog", href: "/blog" },
      { label: "Success Stories", href: "/successstories" },
    ],
  },
  {
    label: "About Us",
    icon: TbInfoSquareRounded,
    children: [
      { label: "Career", href: "/career" },
      { label: "Why Accredian", href: "/whyaccredian" },
      { label: "Vision & Mission", href: "/about" },
      { label: "Contact Us", href: "/contact-us" },
    ],
  },
  {
    label: "More",
    icon: TbInfoSquareRounded,
    children: [
      { label: "Become a Trainer", icon: GrAnnounce, href: "/career/mentor" },
      { label: "Refer & Earn", icon: GrAnnounce, href: "/referandearn" },
    ],
  },
];

export const DEPARTMENTS = [
  { value: "management", label: "Management" },
  { value: "sales", label: "Sales" },
  { value: "academic operations", label: "Academic Operations" },
  { value: "product", label: "Product" },
  { value: "human resource", label: "Human Resource" },
  { value: "growth marketing", label: "Growth Marketing" },
  { value: "web development", label: "Web Development" },
  { value: "operations", label: "Operations" },
  { value: "strategy & new initiatives", label: "Strategy & New Initiatives" },
];

// TESTIMONIALS array — identical, just rename file to .ts
export const TESTIMONIALS = [
  {
    photo_url:
      "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/home-page-images/alumni1.webp",
    review:
      "I would like to thank the Accredian team for keeping me busy with material and helping me develop the discipline needed to become a Data Scientist.",
    name: "Anirudha Acharya",
    designation: "Data Scientist",
    company_logo:
      "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/home-page-images/alumnilogo1.webp",
  },
  {
    photo_url:
      "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/home-page-images/alumni2.webp",
    review:
      "Accredian alleviated my lack of confidence coming from a non-coding background. Eventually, I became sure I'll do justice to Data Science projects.",
    name: "Lalit Garg",
    designation: "Assistant General Manager",
    company_logo:
      "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/home-page-images/alumnilogo2.webp",
  },
  {
    photo_url:
      "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/home-page-images/alumni3.webp",
    review:
      "I come from a statistics background with no exposure to coding. I was fortunate enough to come across Accredian which provided the right pace and right guidance.",
    name: "Jigna Thacker",
    designation: "Group Director Analytics",
    company_logo:
      "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/home-page-images/alumnilogo3.webp",
  },
  {
    photo_url:
      "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/home-page-images/alumni4.webp",
    review:
      "Accredian conducts different helpful sessions like Fireside chat and Industry Speakers to keep us informed of the world moving into something that we are far away from.",
    name: "Sanjit Ghosh",
    designation: "Senior, Project Manager",
    company_logo:
      "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/home-page-images/alumnilogo5.webp",
  },
  {
    photo_url:
      "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/home-page-images/alumni5.webp",
    review:
      "Accredian has designed the course after thorough research in a structured and well-thought-out way. It helps you in the real-world and practical aspects of your actual business or work.",
    name: "Sunitha Sharma",
    designation: "Assistant Vice President",
    company_logo:
      "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/home-page-images/alumnilogo6.webp",
  },
  {
    photo_url:
      "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/home-page-images/alumni6.webp",
    review:
      "Accredian faculty is talented and friendly and the curriculum is helpful. The initial confidence-building comes from the starter kits. They are extremely user-friendly.",
    name: "Nilesh Joshi",
    designation: "Vice President",
    company_logo:
      "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/home-page-images/alumnilogo7.webp",
  },
  {
    photo_url:
      "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/home-page-images/alumni7.webp",
    review:
      "I found Accredian is the best as compared to the other online programs. Accredian’s curriculum is way ahead than what other institutes are providing.",
    name: "Siboli Mukherjee",
    designation: "Data Analyst",
    company_logo:
      "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/home-page-images/alumnilogo8.webp",
  },
  {
    photo_url:
      "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/home-page-images/alumni8.webp",
    review:
      "Accredian proved to be the right platform to bridge all gaps and helped me achieve my main goal, which was to work as a Data Scientist.",
    name: "Rahul Sinha",
    designation: "Data Analytics Manager",
    company_logo:
      "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/home-page-images/alumnilogo9.webp",
  },
  {
    photo_url:
      "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/home-page-images/alumni9.webp",
    review:
      "I am the National Head of Strategy for Kinetic Worldwide with little, prior coding experience. I owe my learning & inquisitiveness to Accredian and it's team of coders who is highly responsive.",
    name: "Arijit Chakrabarti",
    designation: "National Head of Strategy",
    company_logo:
      "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/home-page-images/alumnilogo10.webp",
  },
];

/**
 * Configurable list of popular and trending searches shown in the Global Search dropdown.
 * Maps display labels to actual existing program categories and keywords in programs.json.
 */

export const TRENDING_SEARCHES = [
  { label: "Artificial Intelligence & GenAI", value: "Artificial Intelligence" },
  { label: "Leadership & Management", value: "Leadership" },
  { label: "Strategy", value: "Strategy" },
  { label: "Digital Transformation", value: "Digital Transformation" },
  { label: "Product Management", value: "Product Management" },
  { label: "Technology", value: "Technology" },
];

export const SUGGESTED_FALLBACK_SEARCHES = [
  "Artificial Intelligence",
  "Leadership",
  "Product Management",
  "Digital Transformation",
  "Strategy",
  "Technology",
];

// Shared blur placeholder for next/image (flat #F3F4F6 8x5 SVG)
export const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjUiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjUiIGZpbGw9IiNGM0Y0RjYiLz48L3N2Zz4=";


// University Background Image Mapping (SEO-04)
export const UNIVERSITY_BACKGROUNDS = {
  "IIM Visakhapatnam":
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/iimv-bg-v2.webp",
  "IIM Tiruchirappalli":
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/IIMT-bg.webp",
  "IIM Lucknow":
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/IIML-University-Image.webp",
  "IIM Ranchi":
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/iim-ranchi-university-image.jpg",
  "IIM Kashipur":
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/iim-kashipur-university-image.webp",
  "IIM Amritsar":
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/iim-amritsar-cover-v2.webp",
  "IIM Bodh Gaya":
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/iim-2.webp",
  "IIM Sirmaur":
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/iim-sirmaur-university-image.webp",
  XLRI:
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/xlri-cover-v1.webp",
  "XLRI | Delhi-NCR":
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/xlri-cover-v1.webp",
  "SP Jain School of Global Management":
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/sp-jain-cover-v1.webp",
  "E&ICT Academy IIT Kanpur":
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/iit-kanpur-cover.webp",
  "E&ICT Academy IIT Guwahati":
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/iitg-cover-v1.webp",
  "Department of Entrepreneurship and Management, IIT Hyderabad":
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/iith-universityi-image-v2.webp",
  "I3C-IIT JAMMU":
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/iit-jammu-university-image.webp",
  "IITM Pravartak":
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/IITM_Campus_image__1_.webp",
  Microsoft:
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/microsoft-hero-image-v3.webp",
  Accredian:
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/product-management-course.webp",
};

export const isPlaceholderCoverImage = (url) => {
  if (!url) return true;
  return /img-(11|12|20|21)\.webp/i.test(url);
};

export const getProgramCoverImage = (program) => {
  if (!program) return "";
  const uniBg = UNIVERSITY_BACKGROUNDS[program.university_name];
  if (isPlaceholderCoverImage(program.cover_image) && uniBg) {
    return uniBg;
  }
  return uniBg || program.cover_image || program.university_image || "";
};
